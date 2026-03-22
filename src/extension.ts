import * as vscode from "vscode";
import { renderHost, renderPlaceholder } from "./host";
import { getColumnFromPane } from "./pane";

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

  const watcher = vscode.workspace.createFileSystemWatcher('**/*.form.yml');
  watcher.onDidChange((uri) => {
    const folders = vscode.workspace.workspaceFolders;
    if (!folders) { return; }

    const lineFile = vscode.Uri.joinPath(folders[0].uri, '.claude', '.frw-line');
    // N'agit que si .frw-line existe (édition Claude)
    // Si absent, c'est un Ctrl+S humain — le keybinding le gère déjà
    vscode.workspace.fs.readFile(lineFile).then((bytes) => {
      vscode.workspace.fs.delete(lineFile, { useTrash: false });
      const line = Math.max(0, parseInt(bytes.toString().trim()) - 1);
      const editor = vscode.window.visibleTextEditors.find(e => e.document.uri.fsPath === uri.fsPath);
      if (editor) {
        const position = new vscode.Position(line, 0);
        editor.selection = new vscode.Selection(position, position);
      }
      vscode.commands.executeCommand('vscode-mtess-frw-bacasable.open');
    });
  });
  context.subscriptions.push(watcher);
}

// this method is called when your extension is deactivated
export function deactivate() { }
