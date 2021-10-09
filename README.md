<p align="center"><img src="https://github.com/jevakallio/vscode-live-frame/blob/master/docs/icon-400.png?raw=true" width=200></p>
<h1 align="center">MTESS Bac-a-sable des formulaires</h1>
<p align="center">
<strong>Testez votre configuration des formulaires <i>dans</i> VS Code.</strong>
<br><br>

## Comment s'en servir

1. Install **Live Frame** from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=jevakallio.vscode-live-frame).
2. Start your local development server
3. Run (`Cmd`+`Shift`+`P`) command `Live Frame: Open`
4. Follow the displayed [configuration instructions](#extension-settings).

### Extension Settings

Add the following to your User or Workspace settings. Given that your app's development URL is probably project specific, Workspace settings may make more sense.

```js
{
  // Required: The website to display
  "mtessFrwBacasable.url": "http://localhost:3000/Form/1/Render",

  // Optional: Which pane to open the frame in
  "mtessFrwBacasable.pane": "Beside"
}
```

If you have a fast hot reloading setup, you can turn on VS Code's **Auto Save** on a short delay when you need an extra blazing feedback loop.

```js
{
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 50,
}
```

### Your site needs to be able to run in an iframe

If your website prevents itself being loaded in an iframe e.g. via `X-Frame-Options` or `Content-Security-Policy`, it won't work inside Live Frame.

### Dev tools work, but element selector doesn't

You can open dev tools by running (`Cmd`+`Shift`+`P`) the `Open WebView Developer Tools` command. However, the point and click element selector doesn't select element inside the iframe.

### Command key combinations (Copy, Paste, Select all...) are disabled

This is a [known issue](https://github.com/microsoft/vscode/issues/65452) in VS Code.

As a workaround, you can send your keystrokes to the extension using `postMessage`, and we'll forward them to VS Code for you. Just add the following somewhere in your application code:

```js
if (window.parent !== window) {
  // If using TypeScript, next line should be:
  // let listener = (e: KeyboardEvent) =>
  let listener = (e) =>
    window.parent.postMessage(
      JSON.stringify({
        altKey: e.altKey,
        code: e.code,
        ctrlKey: e.ctrlKey,
        isComposing: e.isComposing,
        key: e.key,
        location: e.location,
        metaKey: e.metaKey,
        repeat: e.repeat,
        shiftKey: e.shiftKey,
      }),
      "*"
    );

  if (!window.hasOwnProperty("keyhookInstalled")) {
    // If using TypeScript, next line should be:
    // (window as any).keyhookInstalled = true;
    window.keyhookInstalled = true;
    window.addEventListener("keydown", listener);
  }
}
```

If you can think of a better solution (to fix the keyboard issue, or that doesn't involve using an iframe at all), see [Contributing](#contributing).

## Release Notes

### 0.0.2

Corrections du focus

### 0.0.1

Première version

### Développement local

Installez les dépendances avec `yarn`, puis démarez le projet en debug `Run > Start Debugging` dans VS Code.

## License

[MIT](LICENSE)

## Crédits
Icons made by (https://www.freepik.com) from (https://www.flaticon.com)