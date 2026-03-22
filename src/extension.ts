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

async function deploySkill() {
  const folders = vscode.workspace.workspaceFolders;
  if (!folders) { return; }

  const skillsDir = vscode.Uri.joinPath(folders[0].uri, '.claude', 'skills');

  const write = async (name: string, content: string) => {
    const uri = vscode.Uri.joinPath(skillsDir, name);
    await vscode.workspace.fs.writeFile(uri, new TextEncoder().encode(content));
  };

  await write('FRW/SKILL.md', skillContent);

  const claudeMdUri = vscode.Uri.joinPath(folders[0].uri, 'CLAUDE.md');
  const claudeMdExists = await vscode.workspace.fs.stat(claudeMdUri).then(() => true, () => false);
  if (!claudeMdExists) {
    await vscode.workspace.fs.writeFile(claudeMdUri, new TextEncoder().encode(claudeMdContent));
  }

  for (const [name, content] of Object.entries(REFERENCES)) {
    await write(`FRW/${name}`, content);
  }

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
    () => {
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
          editor.document.save();
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

        if (filePath) {
          const uri = vscode.Uri.file(filePath);
          const doc = await vscode.workspace.openTextDocument(uri);
          const editor = await vscode.window.showTextDocument(doc, { preserveFocus: true });
          if (line !== undefined) {
            const position = new vscode.Position(Math.max(0, line - 1), 0);
            editor.selection = new vscode.Selection(position, position);
          }
        } else if (line !== undefined) {
          const editor = vscode.window.activeTextEditor;
          if (editor) {
            const position = new vscode.Position(Math.max(0, line - 1), 0);
            editor.selection = new vscode.Selection(position, position);
          }
        }

        await vscode.commands.executeCommand('vscode-mtess-frw-bacasable.open');

        const targetFile = filePath
          ?? vscode.window.activeTextEditor?.document.fileName
          ?? 'le fichier actif';

        return new vscode.LanguageModelToolResult([
          new vscode.LanguageModelTextPart(
            `Le bac à sable FRW a été ouvert/rafraîchi pour : ${targetFile}`
          ),
        ]);
      },
    }
  );

  context.subscriptions.push(toolDisposable);

  const config = vscode.workspace.getConfiguration("mtessFrwBacasable");
  if (config.get<boolean>("deployClaudeCodeSkill") !== false) {
    deploySkill();
  }

  context.subscriptions.push(
    vscode.commands.registerCommand('vscode-mtess-frw-bacasable.init', async () => {
      const cfg = vscode.workspace.getConfiguration("mtessFrwBacasable");
      if (cfg.get<boolean>("deployClaudeCodeSkill") === false) {
        vscode.window.showInformationMessage('FRW: déploiement du skill Claude Code désactivé dans les paramètres.');
        return;
      }
      await deploySkill();
      vscode.window.showInformationMessage('FRW: skill Claude Code déployé dans .claude/skills/');
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() { }
