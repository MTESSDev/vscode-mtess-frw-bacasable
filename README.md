<p align="center"><img src="https://github.com/TrucsPES/vscode-mtess-frw-bacasable/blob/master/docs/icon-400.png?raw=true" width=200></p>
<h1 align="center">MTESS Bac-a-sable des formulaires</h1>
<p align="center">
<strong>Testez votre configuration des formulaires <i>dans</i> VS Code.</strong>
<br><br>

## Comment s'en servir

1. Installez **MTESS Formulaires bac-a-sable** à partir de [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=MTESS.vscode-mtess-frw-bacasable).
2. Ouvrez un fichier YAML avec un nom terminant par **.form.yml**
3. Faites (`F1`) ou (`Cmd`+`Shift`+`P`) et tapez `bac-a-sable` pour ouvrir la fenêtre
 ou
4. Faites (`Ctrl`+`S`) pour enregistrer et prévisualiser
4. Suivez les [instructions de configuration](#extension-settings).

### Extension Settings

Add the following to your User or Workspace settings. Given that your app's development URL is probably project specific, Workspace settings may make more sense.

```js
{
  // Requis: Url du service de rendu
  "mtessFrwBacasable.url": "http://localhost:3000/Form/1/Render",

  // Optionnel: Emplacement d'ouverture du panneau de preview
  "mtessFrwBacasable.pane": "Beside"
}
```

### Outils de developpement

Si quelque chose cloche, il est possible d'ouvrir le panneau de développement de Chrome avec (`Cmd`+`Shift`+`P`) et voir la console.

### Développement local

Installez les dépendances avec `yarn`, puis démarez le projet en debug `Run > Start Debugging` dans VS Code.

## License

[MIT](LICENSE)

## Crédits

Icons made by (https://www.freepik.com) from (https://www.flaticon.com)