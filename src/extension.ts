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
      const title = "FRW Bac-a-sable";
      const pane = config.get<string>("pane");
      const showAll = config.get<boolean>("showAll") || true;
      const column = getColumnFromPane(pane);

      // Get the active text editor
      const editor = vscode.window.activeTextEditor;

      if (editor) {
        if(!editor.document.isUntitled && editor.document.isDirty) {
          editor.document.save();
        }
        const document = editor.document;
        const selection = editor.selection;

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

            const text = document.getText();
            let b: Buffer = Buffer.from(text, 'utf8');

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

              vscode.workspace.onDidChangeConfiguration((e) => {
                const newConfig = vscode.workspace.getConfiguration("mtessFrwBacasable");
                const newUrl = newConfig.get<string>("url");
                const showAll = config.get<boolean>("showAll") || true;

                panel.webview.html = newUrl
                  ? renderHost(newUrl, b.toString('base64'), breadcrumb, showAll)
                  : renderPlaceholder();
           
              });

              panel.webview.html = url ? renderHost(url, b.toString('base64'), breadcrumb, showAll) : renderPlaceholder();
              panel.onDidDispose(() => {
                currentPanel = undefined;
              });
            } else {
              currentPanel.webview.html = url ? renderHost(url, b.toString('base64'), breadcrumb, showAll) : renderPlaceholder();

              currentPanel.reveal(undefined, true);
            }

            //vscode.window.activeTextEditor = editor;
          });
      }

    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
