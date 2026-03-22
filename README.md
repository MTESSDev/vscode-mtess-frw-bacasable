<p align="center"><img src="https://raw.githubusercontent.com/MTESSDev/vscode-mtess-frw-bacasable/refs/heads/master/docs/icon-400.png" width=200></p>
<h1 align="center">MTESS Bac à sable des formulaires</h1>
<p align="center">
<strong>Testez votre configuration des formulaires <i>dans</i> VS Code.</strong>
<br><br>

## Comment s'en servir

L'extension est disponible dans **VS Code desktop** ainsi que directement dans le navigateur via **[github.dev](https://github.dev)** et **[vscode.dev](https://vscode.dev)**, sans installation locale.

1. Installez **MTESS Formulaires bac a sable** à partir de [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=MTESS.vscode-mtess-frw-bacasable).
2. Ouvrez un fichier YAML avec un nom terminant par **.form.yml**
3. Faites (`F1`) ou (`Cmd`+`Shift`+`P`) et tapez `bac à sable` pour ouvrir la fenêtre, ou faites (`Ctrl`+`S`) pour enregistrer et prévisualiser.
4. Suivez les [instructions de configuration](#paramètres-de-lextension).

### Paramètres de l'extension

Ajouter ces configuration dans le fichier de configuration de votre VS code ou via les paramètres dans les préférences.

```js
{
  // Requis: Url du service de rendu
  "mtessFrwBacasable.url": "https://formulaires.it.mtess.gouv.qc.ca/form/700000/render",

  // Optionnel: Emplacement d'ouverture du panneau de preview
  "mtessFrwBacasable.pane": "Beside"
}
```

### Outils de developpement

Si quelque chose cloche, il est possible d'ouvrir le panneau de développement de Chrome avec (`Cmd`+`Shift`+`P`) et voir la console.

### Développement local (pour les développeurs au MESS seulement)

Installez les dépendances avec `yarn`, puis démarrez le projet en debug `Run > Start Debugging` dans VS Code.

## License

[MIT](LICENSE)

## Crédits

Icons made by (https://www.freepik.com) from (https://www.flaticon.com)
