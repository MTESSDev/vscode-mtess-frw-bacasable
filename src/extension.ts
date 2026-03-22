import * as vscode from "vscode";
import { renderHost, renderPlaceholder } from "./host";
import { getColumnFromPane } from "./pane";
import claudeMdContent from '../skills/CLAUDE.md';
import skillContent from '../skills/FRW/SKILL.md';
import refForm from '../skills/FRW/references/form.md';
import refBind from '../skills/FRW/references/bind.md';
import refTransmission from '../skills/FRW/references/transmission.md';

const REFERENCES: Record<string, string> = {
  'references/form.md': refForm,
  'references/bind.md': refBind,
  'references/transmission.md': refTransmission,
};

async function deploySkill(extensionUri: vscode.Uri) {
  const folders = vscode.workspace.workspaceFolders;
  if (!folders) { return; }

  const rootUri = folders[0].uri;
  const skillsDir = vscode.Uri.joinPath(rootUri, '.claude', 'skills');

  const write = async (name: string, content: string) => {
    const uri = vscode.Uri.joinPath(skillsDir, name);
    await vscode.workspace.fs.writeFile(uri, new TextEncoder().encode(content));
  };

  await write('FRW/SKILL.md', skillContent);

  const claudeMdUri = vscode.Uri.joinPath(rootUri, 'CLAUDE.md');
  const claudeMdExists = await vscode.workspace.fs.stat(claudeMdUri).then(() => true, () => false);
  if (!claudeMdExists) {
    await vscode.workspace.fs.writeFile(claudeMdUri, new TextEncoder().encode(claudeMdContent));
  }

  for (const [name, content] of Object.entries(REFERENCES)) {
    await write(`FRW/${name}`, content);
  }

  // Deploy the MCP server script
  const mcpSourceUri = vscode.Uri.joinPath(extensionUri, 'out', 'mcp-server.js');
  const mcpTargetUri = vscode.Uri.joinPath(rootUri, '.claude', 'mcp', 'frw-preview.js');
  try {
    const mcpBytes = await vscode.workspace.fs.readFile(mcpSourceUri);
    await vscode.workspace.fs.writeFile(mcpTargetUri, mcpBytes);
  } catch (err: any) {
    console.warn('FRW: impossible de déployer le serveur MCP:', err.message);
  }

  // Configure .mcp.json at workspace root (Claude Code reads MCP servers from here)
  const mcpJsonUri = vscode.Uri.joinPath(rootUri, '.mcp.json');
  let mcpConfig: any = {};
  try {
    const existing = await vscode.workspace.fs.readFile(mcpJsonUri);
    mcpConfig = JSON.parse(new TextDecoder().decode(existing));
  } catch {
    // File doesn't exist or isn't valid JSON — start fresh
  }

  if (!mcpConfig.mcpServers) { mcpConfig.mcpServers = {}; }
  mcpConfig.mcpServers['frw-bacasable'] = {
    command: 'node',
    args: ['.claude/mcp/frw-preview.js'],
  };

  await vscode.workspace.fs.writeFile(
    mcpJsonUri,
    new TextEncoder().encode(JSON.stringify(mcpConfig, null, 2))
  );

  // Auto-allow the MCP tool in .claude/settings.json so Claude doesn't ask permission
  const settingsUri = vscode.Uri.joinPath(rootUri, '.claude', 'settings.json');
  let settings: any = {};
  try {
    const existing = await vscode.workspace.fs.readFile(settingsUri);
    settings = JSON.parse(new TextDecoder().decode(existing));
  } catch {
    // File doesn't exist or isn't valid JSON — start fresh
  }

  if (!settings.permissions) { settings.permissions = {}; }
  if (!Array.isArray(settings.permissions.allow)) { settings.permissions.allow = []; }

  const mcpPermission = 'mcp__frw-bacasable__preview';
  if (!settings.permissions.allow.includes(mcpPermission)) {
    settings.permissions.allow.push(mcpPermission);
  }

  await vscode.workspace.fs.writeFile(
    settingsUri,
    new TextEncoder().encode(JSON.stringify(settings, null, 2))
  );
}

function* iterateSymbols(symbols: vscode.DocumentSymbol[], selection: any): Iterable<vscode.DocumentSymbol> {
  for (const symbol of symbols) {
    if (symbol.range.contains(selection)) {
      yield symbol;
      yield* iterateSymbols(symbol.children, selection);
    }
  }
}

export function activate(context: vscode.ExtensionContext) {
  let currentPanel: vscode.WebviewPanel | undefined;

  let disposable = vscode.commands.registerCommand(
    "vscode-mtess-frw-bacasable.open",
    async () => {
      const config = vscode.workspace.getConfiguration("mtessFrwBacasable");
      const url = config.get<string>("url");
      const title = "FRW Bac à sable";
      const pane = config.get<string>("pane");
      const showAll = config.get<boolean>("showAll") ?? true;
      const column = getColumnFromPane(pane);

      const editor = vscode.window.activeTextEditor?.document.fileName.endsWith('.form.yml')
        ? vscode.window.activeTextEditor
        : vscode.window.visibleTextEditors.find(e => e.document.fileName.endsWith('.form.yml'));

      if (editor) {
        if(!editor.document.isUntitled && editor.document.isDirty) {
          await editor.document.save();
        }
        const document = editor.document;

        const buildAndRender = (selection: vscode.Selection) => {
          vscode.commands
            .executeCommand<vscode.DocumentSymbol[]>(
              'vscode.executeDocumentSymbolProvider', document.uri)
            .then(symbols => {

              var breadcrumb = "";

              if (symbols !== undefined) {
                for (const symbol of iterateSymbols(symbols, selection)) {
                  //if (symbol.range.contains(selection)) {
                    breadcrumb = breadcrumb + '/' + symbol.name;
                  // }
                }
              }

              vscode.workspace.fs.readFile(document.uri).then(fileBytes => {
                const text = new TextDecoder().decode(fileBytes);
                const base64Text = btoa(unescape(encodeURIComponent(text)));

                if (!currentPanel) {

                  const panel = (currentPanel = vscode.window.createWebviewPanel(
                    "vscode-mtess-frw-bacasable",
                    title,
                    column,
                    {
                      enableCommandUris: true,
                      enableFindWidget: true,
                      localResourceRoots: [],
                      enableScripts: true,
                    }
                  ));

                  const configListener = vscode.workspace.onDidChangeConfiguration(() => {
                    const newConfig = vscode.workspace.getConfiguration("mtessFrwBacasable");
                    const newUrl = newConfig.get<string>("url");
                    const newShowAll = newConfig.get<boolean>("showAll") ?? true;

                    panel.webview.html = newUrl
                      ? renderHost(newUrl, base64Text, breadcrumb, newShowAll)
                      : renderPlaceholder();
                  });

                  panel.webview.html = url ? renderHost(url, base64Text, breadcrumb, showAll) : renderPlaceholder();
                  panel.onDidDispose(() => {
                    currentPanel = undefined;
                    configListener.dispose();
                  });
                } else {
                  currentPanel.webview.html = url ? renderHost(url, base64Text, breadcrumb, showAll) : renderPlaceholder();

                  // Reveal ne fonctionne plus avec VS 1.63
                  // currentPanel.reveal(undefined, true);
                }

                //vscode.window.activeTextEditor = editor;
              });
            });
        };

        buildAndRender(editor.selection);
      }
    }
  );

  context.subscriptions.push(disposable);

  interface PreviewInput {
    filePath?: string;
    line?: number;
  }

  const toolDisposable = vscode.lm.registerTool<PreviewInput>(
    'mtess-frw-bacasable_preview',
    {
      async invoke(options, _token) {
        const { filePath, line } = options.input ?? {};

        let targetUri: vscode.Uri | undefined;

        if (filePath) {
          targetUri = vscode.Uri.file(filePath);
          const doc = await vscode.workspace.openTextDocument(targetUri);
          const editor = await vscode.window.showTextDocument(doc, { preserveFocus: true });
          if (line !== undefined) {
            const position = new vscode.Position(Math.max(0, line - 1), 0);
            editor.selection = new vscode.Selection(position, position);
          }
        } else if (line !== undefined) {
          const editor = vscode.window.activeTextEditor;
          if (editor) {
            targetUri = editor.document.uri;
            const position = new vscode.Position(Math.max(0, line - 1), 0);
            editor.selection = new vscode.Selection(position, position);
          }
        } else {
          targetUri = vscode.window.activeTextEditor?.document.uri;
        }

        // Refresh the webview preview
        await vscode.commands.executeCommand('vscode-mtess-frw-bacasable.open');

        const targetFile = targetUri?.fsPath
          ?? vscode.window.activeTextEditor?.document.fileName
          ?? 'le fichier actif';

        // Try to POST to the backend and capture errors
        const config = vscode.workspace.getConfiguration("mtessFrwBacasable");
        const backendUrl = config.get<string>("url");

        if (backendUrl && targetUri) {
          try {
            const fileBytes = await vscode.workspace.fs.readFile(targetUri);
            const yamlText = new TextDecoder().decode(fileBytes);
            const base64Text = btoa(unescape(encodeURIComponent(yamlText)));

            const body = new URLSearchParams({
              content: base64Text,
              breadcrumb: '',
            });

            const response = await fetch(backendUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: body.toString(),
            });

            const responseText = await response.text();

            if (!response.ok) {
              // Return error details so the LLM can auto-correct
              return new vscode.LanguageModelToolResult([
                new vscode.LanguageModelTextPart(
                  `ERREUR du bac à sable FRW (HTTP ${response.status}) pour ${targetFile}:\n${responseText}\n\nCorrige le YAML selon les erreurs ci-dessus puis rappelle cet outil.`
                ),
              ]);
            }

            // Check if the response body contains error indicators (JSON error response)
            try {
              const json = JSON.parse(responseText);
              if (json.errors || json.error || json.erreurs) {
                const errorDetail = JSON.stringify(json.errors || json.error || json.erreurs, null, 2);
                return new vscode.LanguageModelToolResult([
                  new vscode.LanguageModelTextPart(
                    `ERREUR de validation FRW pour ${targetFile}:\n${errorDetail}\n\nCorrige le YAML selon les erreurs ci-dessus puis rappelle cet outil.`
                  ),
                ]);
              }
            } catch {
              // Response is not JSON (likely HTML success page) — that's fine
            }

            return new vscode.LanguageModelToolResult([
              new vscode.LanguageModelTextPart(
                `Le bac à sable FRW a été ouvert/rafraîchi avec succès pour : ${targetFile}`
              ),
            ]);

          } catch (err: any) {
            return new vscode.LanguageModelToolResult([
              new vscode.LanguageModelTextPart(
                `Le bac à sable FRW a été rafraîchi pour ${targetFile}, mais impossible de valider via le backend: ${err.message}`
              ),
            ]);
          }
        }

        return new vscode.LanguageModelToolResult([
          new vscode.LanguageModelTextPart(
            `Le bac à sable FRW a été ouvert/rafraîchi pour : ${targetFile}`
          ),
        ]);
      },
    }
  );

  context.subscriptions.push(toolDisposable);

  // File watcher: when MCP server writes .frw-trigger, refresh the webview
  const triggerPattern = new vscode.RelativePattern(
    vscode.workspace.workspaceFolders?.[0]?.uri ?? '',
    '.claude/.frw-trigger'
  );
  const triggerWatcher = vscode.workspace.createFileSystemWatcher(triggerPattern);
  const handleTrigger = async () => {
    const folders = vscode.workspace.workspaceFolders;
    if (!folders) { return; }
    const triggerUri = vscode.Uri.joinPath(folders[0].uri, '.claude', '.frw-trigger');
    try {
      const bytes = await vscode.workspace.fs.readFile(triggerUri);
      const filePath = new TextDecoder().decode(bytes).trim();
      if (filePath) {
        // Save the document if it's dirty (Claude Code may have just edited it)
        const uri = vscode.Uri.file(filePath);
        const openDoc = vscode.workspace.textDocuments.find(d => d.uri.fsPath === uri.fsPath);
        if (openDoc && openDoc.isDirty) {
          await openDoc.save();
        }
      }
      await vscode.commands.executeCommand('vscode-mtess-frw-bacasable.open');
      await vscode.workspace.fs.delete(triggerUri);
    } catch {
      // Trigger file may already be deleted or unreadable
    }
  };
  triggerWatcher.onDidCreate(handleTrigger);
  triggerWatcher.onDidChange(handleTrigger);
  context.subscriptions.push(triggerWatcher);

  const config = vscode.workspace.getConfiguration("mtessFrwBacasable");
  if (config.get<boolean>("deployClaudeCodeSkill") !== false) {
    deploySkill(context.extensionUri);
  }

  context.subscriptions.push(
    vscode.commands.registerCommand('vscode-mtess-frw-bacasable.init', async () => {
      const cfg = vscode.workspace.getConfiguration("mtessFrwBacasable");
      if (cfg.get<boolean>("deployClaudeCodeSkill") === false) {
        vscode.window.showInformationMessage('FRW: déploiement du skill Claude Code désactivé dans les paramètres.');
        return;
      }
      await deploySkill(context.extensionUri);
      vscode.window.showInformationMessage('FRW: skill Claude Code déployé dans .claude/skills/');
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() { }
