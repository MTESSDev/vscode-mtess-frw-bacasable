/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderHost: () => (/* binding */ renderHost),
/* harmony export */   renderPlaceholder: () => (/* binding */ renderPlaceholder)
/* harmony export */ });
const renderHost = (url, data, breadcrumb, showAll) => `
<!DOCTYPE html>
<!-- ${Date.now()} -->
<html>
  <head>
    <style>
      html, body, iframe {
        margin: 0;
        padding: 0;
        border: 0;
        height: 100vh;
        width: 100vw;
        overflow: hidden;
      }
      #loading-overlay {
        position: fixed;
        inset: 0;
        z-index: 10;
        background: var(--vscode-editor-background, #1e1e1e);
        color: var(--vscode-editor-foreground, #ccc);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        font-family: sans-serif;
        font-size: 13px;
      }
      .spinner {
        width: 24px;
        height: 24px;
        border: 2px solid var(--vscode-editor-foreground, #ccc);
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }
      @keyframes spin { to { transform: rotate(360deg); } }
      .vscode-btn {
        padding: 0.5rem 1.5rem;
        cursor: pointer;
        background: var(--vscode-button-background, #0e639c);
        color: var(--vscode-button-foreground, #fff);
        border: none;
        border-radius: 2px;
        font-size: 13px;
        font-family: sans-serif;
      }
      .vscode-btn:hover {
        background: var(--vscode-button-hoverBackground, #1177bb);
      }
    </style>
  </head>
  <body>
  <form action="${url}" target="frw-iframe" id="form" method="post">
    <input type="hidden" name="content" id="content" value="${data}">
    <input type="hidden" name="breadcrumb" id="breadcrumb" value="${breadcrumb}">
  </form>

    <iframe name="frw-iframe" id="frw-iframe" src="about:blank"></iframe>
    <div id="loading-overlay">
      <div class="spinner"></div>
      <span>Chargement…</span>
    </div>
    <script>
      var TIMEOUT_MS = 30000;
      var timeoutHandle = null;

      function onLoaded() {
        clearTimeout(timeoutHandle);
        document.getElementById('loading-overlay').style.display = 'none';
      }

      function onTimeout() {
        document.getElementById('loading-overlay').innerHTML =
          '<span>Le serveur n\\'a pas répondu.</span>' +
          '<button class="vscode-btn" onclick="retry()">R\u00e9essayer</button>';
      }

      function retry() {
        document.getElementById('loading-overlay').style.display = 'flex';
        document.getElementById('loading-overlay').innerHTML =
          '<div class="spinner"></div><span>Chargement\u2026</span>';
        clearTimeout(timeoutHandle);
        timeoutHandle = setTimeout(onTimeout, TIMEOUT_MS);
        document.getElementById("form").submit();
      }

      document.getElementById("frw-iframe").addEventListener("load", onLoaded);

      timeoutHandle = setTimeout(onTimeout, TIMEOUT_MS);
      document.getElementById("form").submit();

      window.addEventListener("message", (e) => {
        try { window.dispatchEvent(new KeyboardEvent('keydown', JSON.parse(e.data))); } catch {}
      }, false);

    </script>
  </body>
</html>
`;
const renderPlaceholder = () => `
<!DOCTYPE html>
<html>
  <head>
    <style>
      html, body {
        margin: 0;
        padding: 0;
        overflow: hidden;
      }
      .flex {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .top {
        margin: 15vh 0;
      }

      .instructions {
        margin-bottom: 1rem;
      }

      .illustration {
        height: 30vh
      }
    </style>
  </head>
  <body class="flex">
    <div class="flex top">
      <div class="instructions">Pour utiliser l'outil MTESS - Formulaires - Bac-à-sable il faut configurer quelques paramètres, e.g.</div>
      <pre>{
  "mtessFrwBacasable.url": "https://formulaires.it.mtess.gouv.qc.ca/Form/700000/render?debug=true",
  "mtessFrwBacasable.title": "Local Development",
  "mtessFrwBacasable.pane": "Beside"
}</pre>
    </div>
    <div class="flex illustration">
      <svg id="b710ac8c-5016-430d-bef2-d7bc75088669" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="928.75816" height="567.73661" viewBox="0 0 928.75816 567.73661"><path d="M857.74388,569.26443a10.05579,10.05579,0,0,0,.80113-15.39851l14.4116-32.69992L854.648,524.26882l-10.87859,30.5767a10.11028,10.11028,0,0,0,13.9745,14.41891Z" transform="translate(-135.62092 -166.13169)" fill="#a0616a"/><path d="M885.32645,424.37639l-5.24589-1.04918s-7.34424,3.14754-6.29506,12.59013S859.097,495.72047,859.097,495.72047l-14.1639,41.9671,19.93438,4.19671,13.11472-48.26217Z" transform="translate(-135.62092 -166.13169)" fill="#ccc"/><path d="M909.12092,584.86831h-114a8.50982,8.50982,0,0,1-8.5-8.5v-11a8.50981,8.50981,0,0,1,8.5-8.5h114a8.51013,8.51013,0,0,1,8.5,8.5v11A8.51014,8.51014,0,0,1,909.12092,584.86831Z" transform="translate(-135.62092 -166.13169)" fill="#ffd161"/><polygon points="766.749 539.503 755.248 543.748 733.399 501.407 750.374 495.141 766.749 539.503" fill="#a0616a"/><path d="M883.747,707.64942h23.64386a0,0,0,0,1,0,0v14.88687a0,0,0,0,1,0,0H868.86015a0,0,0,0,1,0,0v0A14.88686,14.88686,0,0,1,883.747,707.64942Z" transform="translate(-328.29968 185.66124) rotate(-20.26053)" fill="#2f2e41"/><polygon points="788.731 557.111 776.483 556.555 772.799 509.051 790.875 509.872 788.731 557.111" fill="#a0616a"/><path d="M767.55224,552.84974h23.64387a0,0,0,0,1,0,0v14.88687a0,0,0,0,1,0,0H752.66539a0,0,0,0,1,0,0v0A14.88686,14.88686,0,0,1,767.55224,552.84974Z" fill="#2f2e41"/><path d="M869.58878,529.29415v0a64.582,64.582,0,0,0-15.886,39.06045l-4.04838,75.29989,35.672,62.95065,19.93437-10.49177-24.13108-47.213,14.68848-45.11464L935.687,572.31043l-3.14753-45.11464Z" transform="translate(-135.62092 -166.13169)" fill="#2f2e41"/><polygon points="789.574 401.982 800.066 406.179 791.673 550.965 767.542 547.818 760.197 437.654 789.574 401.982" fill="#2f2e41"/><path d="M902.86853,553.89864A10.05579,10.05579,0,0,1,916.249,546.2358l22.67947-27.61559,5.49195,17.739-22.37878,23.50466a10.11027,10.11027,0,0,1-19.17309-5.96523Z" transform="translate(-135.62092 -166.13169)" fill="#a0616a"/><circle cx="775.61928" cy="216.38257" r="24.56103" fill="#a0616a"/><path d="M947.75252,429.09769s-28.3278-26.754-67.14737-6.29507c0,0-9.96719,101.24564-16.26225,111.73742,0,0,54.55723-7.34425,69.24572-3.14754,0,0,0-44.06545,9.4426-60.8523S947.75252,429.09769,947.75252,429.09769Z" transform="translate(-135.62092 -166.13169)" fill="#ccc"/><path d="M936.73615,431.72063l11.512-2.12727a29.45574,29.45574,0,0,1,12.61905,14.7174c4.19671,10.49178,15.73766,61.90148,15.73766,61.90148l-45.11464,45.11464-9.4426-13.63931,28.3278-37.77039L935.687,468.44185Z" transform="translate(-135.62092 -166.13169)" fill="#ccc"/><path d="M932.24851,395.65565a2.13479,2.13479,0,0,0-1.85636-2.81905,4.93046,4.93046,0,0,0-3.4761,1.715,13.8334,13.8334,0,0,1-3.07115,2.63711c-1.18812.59889-2.79953.51354-3.47685-.62824-.63605-1.07221-.20023-2.508.18482-3.75347a36.9067,36.9067,0,0,0,1.62991-9.77c.11092-3.70032-.41115-7.562-2.45972-10.44807-2.64387-3.72475-7.37142-5.13883-11.84544-5.0363s-8.87547,1.48362-13.30713,2.35665c-1.52992.30139-3.32826.4555-4.35153-.73025-1.08805-1.26082-.68844-3.3014-.22563-5.00376,1.20094-4.41743,2.475-8.98461,5.26525-12.55224a18.89839,18.89839,0,0,1,12.06081-6.79014,28.93848,28.93848,0,0,1,13.46236,1.52838,36.09628,36.09628,0,0,1,17.68285,12.3186A29.23592,29.23592,0,0,1,944.04269,380.28a26.66715,26.66715,0,0,1-9.88578,16.85462" transform="translate(-135.62092 -166.13169)" fill="#2f2e41"/><path d="M677.62092,588.13169h-533a9.01016,9.01016,0,0,1-9-9v-404a9.01047,9.01047,0,0,1,9-9h533a9.01016,9.01016,0,0,1,9,9v404A9.00984,9.00984,0,0,1,677.62092,588.13169Zm-533-420a7.00786,7.00786,0,0,0-7,7v404a7.00817,7.00817,0,0,0,7,7h533a7.00849,7.00849,0,0,0,7-7v-404a7.00818,7.00818,0,0,0-7-7Z" transform="translate(-135.62092 -166.13169)" fill="#e6e6e6"/><path d="M625.62092,262.13169h-429a9.01047,9.01047,0,0,1-9-9v-31a9.01047,9.01047,0,0,1,9-9h429a9.01016,9.01016,0,0,1,9,9v31A9.01015,9.01015,0,0,1,625.62092,262.13169Zm-429-47a7.00786,7.00786,0,0,0-7,7v31a7.00785,7.00785,0,0,0,7,7h429a7.00818,7.00818,0,0,0,7-7v-31a7.00818,7.00818,0,0,0-7-7Z" transform="translate(-135.62092 -166.13169)" fill="#3f3d56"/><path d="M366.62092,345.13169h-170a9.01047,9.01047,0,0,1-9-9v-31a9.01047,9.01047,0,0,1,9-9h170a9.01047,9.01047,0,0,1,9,9v31A9.01047,9.01047,0,0,1,366.62092,345.13169Zm-170-47a7.00786,7.00786,0,0,0-7,7v31a7.00785,7.00785,0,0,0,7,7h170a7.00786,7.00786,0,0,0,7-7v-31a7.00787,7.00787,0,0,0-7-7Z" transform="translate(-135.62092 -166.13169)" fill="#3f3d56"/><path d="M625.62092,345.13169h-170a9.01047,9.01047,0,0,1-9-9v-31a9.01047,9.01047,0,0,1,9-9h170a9.01016,9.01016,0,0,1,9,9v31A9.01015,9.01015,0,0,1,625.62092,345.13169Zm-170-47a7.00786,7.00786,0,0,0-7,7v31a7.00785,7.00785,0,0,0,7,7h170a7.00818,7.00818,0,0,0,7-7v-31a7.00818,7.00818,0,0,0-7-7Z" transform="translate(-135.62092 -166.13169)" fill="#3f3d56"/><path d="M626.12092,541.13169h-114a8.50981,8.50981,0,0,1-8.5-8.5v-11a8.50982,8.50982,0,0,1,8.5-8.5h114a8.51014,8.51014,0,0,1,8.5,8.5v11A8.51013,8.51013,0,0,1,626.12092,541.13169Z" transform="translate(-135.62092 -166.13169)" fill="#e6e6e6"/><path d="M215.62092,397.13169a8,8,0,1,1,8-8A8.00916,8.00916,0,0,1,215.62092,397.13169Zm0-14a6,6,0,1,0,6,6A6.00656,6.00656,0,0,0,215.62092,383.13169Z" transform="translate(-135.62092 -166.13169)" fill="#e6e6e6"/><path d="M215.62092,423.13169a8,8,0,1,1,8-8A8.00916,8.00916,0,0,1,215.62092,423.13169Zm0-14a6,6,0,1,0,6,6A6.00656,6.00656,0,0,0,215.62092,409.13169Z" transform="translate(-135.62092 -166.13169)" fill="#e6e6e6"/><path d="M215.62092,449.13169a8,8,0,1,1,8-8A8.00916,8.00916,0,0,1,215.62092,449.13169Zm0-14a6,6,0,1,0,6,6A6.00656,6.00656,0,0,0,215.62092,435.13169Z" transform="translate(-135.62092 -166.13169)" fill="#3f3d56"/><path d="M254.62092,382.63169a6.5,6.5,0,0,0,0,13h93a6.5,6.5,0,0,0,0-13Z" transform="translate(-135.62092 -166.13169)" fill="#e6e6e6"/><path d="M254.62092,408.63169a6.5,6.5,0,0,0,0,13h93a6.5,6.5,0,0,0,0-13Z" transform="translate(-135.62092 -166.13169)" fill="#e6e6e6"/><path d="M254.62092,434.63169a6.5,6.5,0,0,0,0,13h93a6.5,6.5,0,0,0,0-13Z" transform="translate(-135.62092 -166.13169)" fill="#e6e6e6"/><path d="M475.12092,397.13169a8,8,0,1,1,8-8A8.00916,8.00916,0,0,1,475.12092,397.13169Zm0-14a6,6,0,1,0,6,6A6.00656,6.00656,0,0,0,475.12092,383.13169Z" transform="translate(-135.62092 -166.13169)" fill="#e6e6e6"/><path d="M475.12092,423.13169a8,8,0,1,1,8-8A8.00916,8.00916,0,0,1,475.12092,423.13169Zm0-14a6,6,0,1,0,6,6A6.00656,6.00656,0,0,0,475.12092,409.13169Z" transform="translate(-135.62092 -166.13169)" fill="#3f3d56"/><path d="M475.12092,449.13169a8,8,0,1,1,8-8A8.00916,8.00916,0,0,1,475.12092,449.13169Zm0-14a6,6,0,1,0,6,6A6.00656,6.00656,0,0,0,475.12092,435.13169Z" transform="translate(-135.62092 -166.13169)" fill="#e6e6e6"/><path d="M475.12092,475.13169a8,8,0,1,1,8-8A8.00916,8.00916,0,0,1,475.12092,475.13169Zm0-14a6,6,0,1,0,6,6A6.00656,6.00656,0,0,0,475.12092,461.13169Z" transform="translate(-135.62092 -166.13169)" fill="#e6e6e6"/><path d="M513.12092,382.63169a6.5,6.5,0,1,0,0,13h93a6.5,6.5,0,0,0,0-13Z" transform="translate(-135.62092 -166.13169)" fill="#e6e6e6"/><path d="M513.12092,408.63169a6.5,6.5,0,1,0,0,13h93a6.5,6.5,0,0,0,0-13Z" transform="translate(-135.62092 -166.13169)" fill="#e6e6e6"/><path d="M513.12092,434.63169a6.5,6.5,0,1,0,0,13h93a6.5,6.5,0,0,0,0-13Z" transform="translate(-135.62092 -166.13169)" fill="#e6e6e6"/><path d="M513.12092,460.63169a6.5,6.5,0,1,0,0,13h93a6.5,6.5,0,0,0,0-13Z" transform="translate(-135.62092 -166.13169)" fill="#e6e6e6"/><path d="M215.74787,314.13169a6.5,6.5,0,1,0,0,13h111a6.5,6.5,0,0,0,0-13Z" transform="translate(-135.62092 -166.13169)" fill="#e6e6e6"/><path d="M215.74787,231.13169a6.5,6.5,0,1,0,0,13h111a6.5,6.5,0,0,0,0-13Z" transform="translate(-135.62092 -166.13169)" fill="#ffd161"/><path d="M345.00373,316.45616a.5.5,0,0,0-.43311.75l4.24414,7.35107a.50016.50016,0,0,0,.86621,0l4.24414-7.35107a.5.5,0,0,0-.4331-.75Z" transform="translate(-135.62092 -166.13169)" fill="#ffd161"/><path d="M474.74787,314.13169a6.5,6.5,0,0,0,0,13h111a6.5,6.5,0,0,0,0-13Z" transform="translate(-135.62092 -166.13169)" fill="#e6e6e6"/><path d="M604.00373,316.45616a.5.5,0,0,0-.43311.75l4.24414,7.35107a.50016.50016,0,0,0,.86621,0l4.24414-7.35107a.5.5,0,0,0-.4331-.75Z" transform="translate(-135.62092 -166.13169)" fill="#ffd161"/><circle cx="339.5" cy="249" r="4" fill="#ffd161"/><circle cx="80" cy="275" r="4" fill="#ffd161"/><path d="M1063.1884,733.86831h-320.294a1.19068,1.19068,0,0,1,0-2.38137h320.294a1.19068,1.19068,0,0,1,0,2.38137Z" transform="translate(-135.62092 -166.13169)" fill="#3f3d56"/></svg>
    </div>
  </body>
</html>
`;


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getColumnFromPane: () => (/* binding */ getColumnFromPane)
/* harmony export */ });
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vscode__WEBPACK_IMPORTED_MODULE_0__);

const getColumnFromPane = (pane) => {
    switch (pane) {
        case "Active":
            return vscode__WEBPACK_IMPORTED_MODULE_0__.ViewColumn.Active;
        case "Beside":
            return vscode__WEBPACK_IMPORTED_MODULE_0__.ViewColumn.Beside;
        case "One":
            return vscode__WEBPACK_IMPORTED_MODULE_0__.ViewColumn.One;
        case "Two":
            return vscode__WEBPACK_IMPORTED_MODULE_0__.ViewColumn.Two;
        case "Three":
            return vscode__WEBPACK_IMPORTED_MODULE_0__.ViewColumn.Three;
        case "Four":
            return vscode__WEBPACK_IMPORTED_MODULE_0__.ViewColumn.Four;
        case "Five":
            return vscode__WEBPACK_IMPORTED_MODULE_0__.ViewColumn.Five;
        case "Six":
            return vscode__WEBPACK_IMPORTED_MODULE_0__.ViewColumn.Six;
        case "Seven":
            return vscode__WEBPACK_IMPORTED_MODULE_0__.ViewColumn.Seven;
        case "Eight":
            return vscode__WEBPACK_IMPORTED_MODULE_0__.ViewColumn.Eight;
        case "Nine":
            return vscode__WEBPACK_IMPORTED_MODULE_0__.ViewColumn.Nine;
        default:
            return vscode__WEBPACK_IMPORTED_MODULE_0__.ViewColumn.Beside;
    }
};


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = "# CLAUDE.md\n\nCe projet utilise le moteur FRW (Formulaires Web).\nLis `.claude/skills/FRW/SKILL.md` et ses références (`references/form.md`, `references/bind.md`, `references/transmission.md`) au démarrage de chaque conversation avant de répondre à toute demande liée aux formulaires.\n\n**Règle absolue** : après chaque création ou modification d'un fichier `.form.yml`, tu DOIS appeler l'outil de prévisualisation (`preview` via MCP ou `mtess-frw-bacasable_preview` via VS Code) pour afficher le rendu. Si le résultat contient des erreurs, corrige le YAML et rappelle l'outil. Ne considère jamais la tâche terminée sans l'avoir fait.\n";

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = "# Gemini Project Guidelines\n\nTo effectively assist with this project, please adhere to the following guidelines:\n\n1.  **Consult Claude Skills**: This project contains skill definitions in the `.claude/skills/` directory. Before performing any task, please read the `SKILL.md` file located in `.claude/skills/FRW/` and all the files in its `references` subdirectory to understand the specific workflows, rules, and required tools for this project.\n\n2.  **Follow Workflow Rules**: Pay special attention to any mandatory workflow rules, such as using specific tools or validation steps, as described in the skill files.\n";

/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = "---\nname: FRW\ndescription: >\n  Générer et valider des fichiers de configuration YAML pour FRW (Formulaires Web — MTESSDev/MESS Québec).\n  Utilise ce skill dès que la conversation implique des fichiers *.form.yml, *.bind.yml, *.transmission.yml,\n  un aiguillage FRW, des composants de formulaire FRW, des formules de binding, des workflows FRW,\n  ou toute configuration du système FRW gouvernemental québécois.\n  Déclenche-toi aussi si l'utilisateur mentionne « FRW », « Formulaire Web », ou demande d'intégrer un formulaire au système FRW.\n---\n\n# Skill : FRW — Formulaires Web (MTESSDev / MESS Québec)\n\nFRW est un moteur « low-code » de formulaires gouvernementaux québécois.\nChaque formulaire est décrit par trois types de fichiers YAML :\n\n| Fichier | Rôle | Niveaux valides |\n|---|---|---|\n| `*.form.yml` | Structure UI, composants, config affichage | Global · Système · Formulaire |\n| `*.bind.yml` | Liaison données → PDF/Word et production de bundles | Formulaire uniquement |\n| `*.transmission.yml` | Tâches post-soumission (PDF, courriel, API) | Système · Formulaire |\n\n> **Ligne de schéma à toujours inclure en tête de `.form.yml` :**\n> ```yaml\n> # yaml-language-server: $schema=https://formulaires.it.mtess.gouv.qc.ca/api/v1/SIS/ObtenirSchema/form\n> ```\n\n---\n\n## Hiérarchie de fichiers\n\n```\nmon-systeme/\n├── default.v0.form.yml          # Config système (appliquée à tous les formulaires)\n├── default.v0.transmission.yml  # Transmission système\n└── MON_FORM/\n    ├── MON_FORM.v1.form.yml     # Formulaire spécifique\n    ├── MON_FORM.v1.bind.yml     # Binding PDF/Word\n    ├── MON_FORM.v0.transmission.yml  # Transmission spécifique (écrase système)\n    └── Gabarits/\n        ├── MonGabarit.v1.FR.pdf\n        └── MonGabarit.v1.EN.pdf\n```\n\n**Règles de nommage :**\n- Version `v0` = transmission / config système\n- Version `v1` = formulaire / binding avec gabarit\n- `NOM_DU_FORM` doit correspondre exactement au nom du répertoire\n\n---\n\n## Squelette minimal d'un formulaire\n\n```yaml\n# yaml-language-server: $schema=https://formulaires.it.mtess.gouv.qc.ca/api/v1/SIS/ObtenirSchema/form\nconfig:\n  securite:\n    accesAnonyme: true   # ou false pour portail authentifié\n\nform:\n  title:\n    fr: Mon formulaire\n    en: My form\n  sectionsGroup:\n    - sectionGroup:\n        fr: Section principale\n        en: Main section\n      classes: icone user\n      sections:\n        - section:\n            fr: Informations\n            en: Information\n          id: sectionInfo\n          components:\n            - type: text\n              name: nom\n              label:\n                fr: Nom\n                en: Name\n              # required est implicite — tous les champs sont obligatoires par défaut\n              # Pour valider d'autres règles :\n              # validations:\n              #   email:\n```\n\n---\n\n## Références détaillées — quand les consulter\n\n| Sujet | Fichier de référence |\n|---|---|\n| Bloc `config`, composants, aiguillage, domaines, validation, `v-if`, groupes répétables, JS injecté | `references/form.md` |\n| Structure `bind`, formules, `conditionsEt/Ou`, bundles, estampille | `references/bind.md` |\n| Tâches de transmission, `http_client`, courriels, workflows multi-étapes | `references/transmission.md` |\n\n---\n\n## Règles invariantes à appliquer systématiquement\n\n1. **Bilingue** : les clés `fr:` / `en:` sont supportées partout. **Ne jamais écrire `en:` sauf si le client le demande explicitement** — omettre complètement l'attribut pour garder le YAML propre.\n2. **`name` unique** : chaque composant interactif (text, radio, checkbox…) doit avoir un `name` unique dans le formulaire.\n3. **`id` unique** : chaque `section` doit avoir un `id` unique.\n4. **`v-if` = expression Vue.js** : utiliser `this.val('champName')` pour lire les valeurs.\n5. **Formules bind** : syntaxe `{champ:modificateur:valeurSiVrai|valeurSiFaux}` — voir `references/bind.md`.\n6. **Ne jamais mélanger `genererWord` et `genererPdf`** dans la même transmission.\n7. **Gabarits PDF** : référencer sans extension ni chemin (`fr: MonGabarit.v1.FR`).\n8. **Conditions bundle** : une condition vraie = le bundle est **exclu** ; une formule vide = toujours inclus.\n9. **`validations:`** (avec s) et non `validation:`. `required` est implicite — ne pas l'écrire. Pour un champ optionnel : `optional:`.\n\n---\n\n## Règles de syntaxe YAML — guillemets obligatoires\n\n**Toute valeur scalaire contenant `:`, `#`, `{`, `}`, `[`, `]`, `>`, `|` DOIT être entre guillemets.**\n\nCas les plus fréquents en FRW :\n\n```yaml\n# ✅ v-if et disabled — toujours entre guillemets doubles\nv-if: \"this.val('typeChoix') === 'A'\"\ndisabled: \"this.val('champ') !== ''\"\n\n# ✅ Valeurs de texte contenant un \":\"\nobjet: \"Confirmation : demande no {{noConfirmation}}\"\nlabel:\n  fr: \"Statut : en traitement\"\n\n# ✅ Formules bind avec \":\" — utiliser le bloc littéral >- si la formule est longue\nformule: '{locateurs.0.questionRepresentant:{locateurs.0.courrielRepresentant}|{locateurs.0.courrielLocateur}}'\n# Ou avec >- pour les longues formules :\nformule: >-\n  {champ1:{valA}|{valB}}\n\n# ✅ Contenu HTML dans text: — utiliser le bloc littéral |\ntext:\n  fr: |\n    <p>Texte avec des <strong>balises</strong> et des : deux-points.</p>\n\n# ✅ URLs dans http_client\nurl: 'https://api.exemple.gouv.qc.ca/endpoint?param=val&autre=val'\n\n# ❌ INVALIDE — le \":\" dans la valeur casse le parsing YAML\nv-if: this.val('champ') === 'A'\nobjet: Confirmation : demande\n```\n\n**Règle de décision rapide :**\n- Expressions Vue.js (`v-if`, `disabled`, `value`) → **toujours guillemets doubles**\n- Strings contenant `:` → **guillemets simples ou doubles**\n- HTML multiligne → **bloc `|`**\n- Formules bind longues → **bloc `>-`**\n\n---\n\n## Pièges courants\n\n- Oublier `id:` sur une section → erreur de navigation\n- Mettre une extension `.pdf` dans `gabarit.fr:` d'un bind → le PDF est introuvable\n- Confondre `conditionsEt` (toutes vraies) et `conditionsOu` (au moins une vraie)\n- `repeatable: true` sur un groupe sans définir `minimum` → groupe vide non validé\n- Mettre `type: genererPdf` et `type: genererWord` dans la même liste `etapes` → non supporté\n- Oublier `toujoursProduire: true` sur un gabarit informatif → document non produit\n- Écrire `validation:` au lieu de `validations:` → les règles sont ignorées silencieusement\n- Ne pas quoter une string avec `:` → parsing YAML cassé\n- Oublier la section `revision` en fin de formulaire → bouton de soumission absent ou mal géré\n\n---\n\n## Règle de workflow obligatoire\n\nAprès chaque création ou modification d'un fichier `.form.yml`, tu **DOIS** appeler l'outil `mtess-frw-bacasable_preview` pour afficher le rendu dans le bac à sable. Ne considère jamais la tâche terminée sans l'avoir fait.\n\n**Boucle de correction automatique** : si l'outil retourne des erreurs (HTTP non-200 ou erreurs de validation JSON), tu **DOIS** :\n1. Analyser les erreurs retournées\n2. Corriger le fichier `.form.yml` en conséquence\n3. Rappeler `mtess-frw-bacasable_preview` pour vérifier la correction\n4. Répéter jusqu'à ce que le rendu soit sans erreur\n";

/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = "# Référence : *.form.yml\n\n## Table des matières\n1. [Bloc `config`](#1-bloc-config)\n2. [Bloc `form` — Structure navigation](#2-bloc-form--structure-navigation)\n3. [Composants d'affichage](#3-composants-daffichage)\n4. [Composants interactifs](#4-composants-interactifs)\n5. [Validation](#5-validation)\n6. [Domaines de valeurs](#6-domaines-de-valeurs)\n7. [Aiguillage](#7-aiguillage)\n8. [JavaScript injecté](#8-javascript-injecté)\n9. [Workflows — filtreEtapes et courrielWorkflow](#9-workflows--filtreetapes-et-courrielworkflow)\n10. [Section Révision (obligatoire)](#10-section-révision-obligatoire)\n\n---\n\n## 1. Bloc `config`\n\n```yaml\nconfig:\n  securite:\n    accesAnonyme: true          # true = formulaire public, false = portail authentifié\n  \n  systemesDelegues:             # GUIDs des systèmes autorisés (Zone Entreprise)\n    - 571EE295-FFA1-4A06-9D19-5E6395697D94\n\n  afficherBlocCode: true        # Affiche les exemples de code (mode dev/P700U)\n  afficherPartagePage: true     # Bouton de partage de page\n  formulaireUnilingue: true       # Formulaire en français seulement (pas de bascule de langue)\n\n  enregistrement:\n    actif: false                # Enregistrement/reprise du formulaire\n    afficherMessageIncitatif: true\n\n  piv:                          # PIV = Portail Intranet du MESS\n    entete:\n      recherche:\n        actif: true\n\n  postesCanada:\n    cle: UX84-TU29-KU11-NC61   # Clé API Postes Canada pour autocomplétion adresse\n\n  confirmationTransmission:\n    texteSupplementaire:\n      fr: <p>Merci!</p>\n    # telechargementCopieFormulaire: true  # Avancé — ajouter seulement si explicitement demandé\n\n  aiguillage:                   # Voir section 7\n    choix:\n      - mode: confirmation      # confirmation | formulaire | workflow | url | reprise\n        \n  domaines:                     # Voir section 6\n    monDomaine:\n      valeurA:\n        label:\n          fr: Libellé A\n          en: Label A\n\n  injecterJs:                   # Voir section 8\n    method: {}\n    computed: {}\n    watch: {}\n```\n\n---\n\n## 2. Bloc `form` — Structure navigation\n\n```yaml\nform:\n  title:\n    fr: Titre du formulaire\n    en: Form title\n\n  sectionsGroup:\n    - sectionGroup:\n        fr: Nom du groupe\n        en: Group name\n      classes: icone user            # Icône du groupe (voir liste ci-dessous)\n      v-if: \"this.val('champ') === 'val'\"   # Condition d'affichage Vue.js\n      prefixId: prefixe              # Préfixe ajouté aux sections à répéter avec une ancre\n      filtreEtapes:                  # Workflow : étapes où ce groupe est visible\n        - initial:\n        - contribution:\n      \n      sections:\n        - section:\n            fr: Titre de la section\n            en: Section title\n          id: sectionUniqueId        # OBLIGATOIRE et unique dans tout le formulaire\n          cacherTexteExplicatifChampsObligatoires: true\n          v-if: \"expression Vue.js\"\n          classes: ma-classe\n          filtreEtapes:              # Workflow : étapes où cette section est visible\n            - initial:\n          components:\n            - ...                    # Composants (voir sections 3 et 4)\n```\n\n### Icônes disponibles pour `classes` d'un `sectionGroup`\n\n**Legacy FRW** (préfixe `icone `) :\n`icone user`, `icone baby2`, `icone cash-dollar`, `icone register`, `icone clipboard-check`\n\n**Nouveau format UTD** (préfixe `utd-icone-svg `) :\n`ampoule`, `bilan`, `cadeau`, `calendrier`, `checklist`, `facturation`,\n`homme-femme`, `nouveautes`, `parametres`, `recu`, `utilisateur`,\n`utilisateurs2`, `utilisateurs3`, `repere-carte`, `services-ligne`\n\n> *Attention il ne faut pas en inventer ni les traduires\n\n---\n\n## 3. Composants d'affichage\n\n### `dynamic` — Contenu HTML libre\n```yaml\n- type: dynamic\n  tag: div                      # div, p, span, h2, h3, etc.\n  classes: page-texte mb-32\n  v-if: \"this.val('champ') === 'oui'\"\n  text:\n    fr: |\n      <p>Contenu HTML <strong>riche</strong>.</p>\n    en: |\n      <p>Rich HTML content.</p>\n```\n\n### `avis` — Bloc informatif stylisé\n```yaml\n- type: avis\n  classes: avertissement        # avertissement | information | succes | erreur\n  text:\n    fr: <p>Message important.</p>\n    en: <p>Important message.</p>\n```\n\n### `zoneEvidence` — Zone mise en évidence\n```yaml\n- type: zoneEvidence\n  classes: mt-32\n  text:\n    fr: <p>Texte mis en évidence.</p>\n    en: <p>Highlighted text.</p>\n```\n\n### `image`\n```yaml\n- type: image\n  src: /images/mon-image.png\n  alt:\n    fr: Description de l'image\n    en: Image description\n  classes: mb-16\n```\n\n### `blocCode` — Affichage de code (mode dev)\n```yaml\n- type: blocCode\n  text:\n    fr: |\n      config:\n        accesAnonyme: true\n```\n\n### `accordeon` — Contenu rétractable\n```yaml\n- type: accordeon\n  label:\n    fr: Titre accordéon\n    en: Accordion title\n  text:\n    fr: <p>Contenu caché.</p>\n    en: <p>Hidden content.</p>\n```\n\n---\n\n## 4. Composants interactifs\n\n> Tous les composants interactifs partagent ces propriétés communes :\n> ```yaml\n> name: nomChamp            # Identifiant unique, utilisé dans v-if et bind\n> label:\n>   fr: Libellé\n>   en: Label\n> v-if: \"expression\"        # Condition d'affichage\n> disabled: \"expression\"    # Condition de désactivation\n> classes: ma-classe\n> outerClasses: outer-class\n> inputClasses: input-class\n> help:\n>   fr: Texte   # Texte de précision d'aide pour éviter les erreurs de saisies pour nuancer, pour les détails plus précis, utiliser tooltip\n> tooltip:      # Infobulle d'aide avancée pour ajouter un long détail pour facilité la saisie\n>   title:\n>     fr: Titre court de l'infobulle\n>   text:\n>     fr: Texte d'aide\n>     en: Help text\n> validations:              # Voir section 5\n>   # required est implicite (tous les champs sont obligatoires par défaut)\n>   # Pour rendre un champ optionnel : optional:\n> ```\n\n### `text` — Champ texte simple\n```yaml\n- type: text\n  name: nomFamille\n  label:\n    fr: Nom de famille\n    en: Last name\n  inputmode: text           # text | numeric | email | tel | url | search\n  pattern: \"[A-Za-z]+\"     # Regex de validation\n  value: \"valeur par défaut\"\n  v-else-value: \"valeur si v-if est faux\"\n  validations: \n    min: 2,length   # texte d'une longeur minimale de 2 caractères\n    max: 5,length   # texte d'une longeur maximal de 5 caractères\n```\n\n### `textarea` — Zone de texte multiligne\n```yaml\n- type: textarea\n  name: description\n  label:\n    fr: Description\n    en: Description\n  validations: \n    max: 200    # limite de caractères validée\n  additionals:\n    max-caracteres: 200   # compteur de caractères restants\n    hauteur-automatique: true  # permet de mettre une zone flexible\n    rows: 10   # quand le contenu utilisateur attendu est grand on précise le nombre de lignes\n```\n\n### `radio` — Boutons radio\n```yaml\n- type: radio\n  name: sexe\n  label:\n    fr: Sexe\n  options:\n    Masculin:\n      fr: Masculin\n    Feminin:\n      fr: Féminin\n  # Shorthand pour oui/non :\n  # options: yesno\n  # OU référencer un domaine défini dans config.domaines :\n  # options: sports\n```\n\n### `checkbox` — Cases à cocher (choix multiples)\n```yaml\n- type: checkbox\n  name: preferences\n  label:\n    fr: Préférences\n  options:\n    opt1:\n      fr: Option 1\n    opt2:\n      fr: Option 2\n```\n\n### `listeDeroulante` / `select` — Liste déroulante\n```yaml\n- type: listeDeroulante     # alias : select\n  name: region\n  label:\n    fr: Région\n    en: Region\n  options: regionsDomaine  # Référence à un domaine défini dans config.domaines\n  # Pour données externes (transmission http_client_set requis) :\n  # sourceExterne: regions\n```\n\n### `date` — Champ date\n```yaml\n- type: date\n  name: dateNaissance\n  label:\n    fr: Date de naissance\n  validations:\n    avant: \"2020-01-01\"   # La date doit être avant cette date\n    apres: \"1900-01-01\"   # La date doit être après cette date\n  # Ne pas ajouter \"date:\" dans validations — la validation de format est gérée par le composant\n```\n\n### `montant` / `number` / `nombreEntier` — Champs numériques\n```yaml\n- type: montant             # Montant monétaire formaté\n  name: revenuAnnuel\n  label:\n    fr: Revenu annuel\n    en: Annual income\n  min: 0\n  max: 999999\n```\n\n### `email`\n```yaml\n- type: email\n  name: courriel\n  label:\n    fr: Adresse courriel\n    en: Email address\n```\n\n### `tel` / `telInternational` / `telOnzeChiffres`\n```yaml\n- type: tel\n  name: telephone\n  label:\n    fr: Téléphone\n    en: Phone\n```\n\n### `codePostal`\n```yaml\n- type: codePostal\n  name: codePostal\n  label:\n    fr: Code postal\n    en: Postal code\n```\n\n### `nas` — Numéro d'assurance sociale\n```yaml\n- type: nas\n  name: nas\n  label:\n    fr: NAS\n    en: SIN\n```\n\n### `nam` — Numéro d'assurance maladie\n```yaml\n- type: nam\n  name: nam\n  label:\n    fr: NAM\n    en: Health insurance number\n```\n\n### `cp12` — Numéro CP12 (MESS)\n```yaml\n- type: cp12\n  name: cp12\n  label:\n    fr: CP12\n    en: CP12\n```\n\n### `hidden` — Champ caché (calculé)\n```yaml\n- type: hidden\n  name: champCache\n  value: \"valeur fixe\"\n  # OU valeur calculée via v-else-value\n```\n\n### `password`\n```yaml\n- type: password\n  name: motDePasse\n  label:\n    fr: Mot de passe\n    en: Password\n```\n\n### `adresse` — Adresse normalisée québécoise\n```yaml\n- type: adresse\n  name: adressePrincipale\n  label:\n    fr: Adresse\n    en: Address\n  # Champs inclus automatiquement : NoCivique, Appartement, Rue, Municipalite, Province, CodePostal\n```\n\n### `adresseInternationale`\n```yaml\n- type: adresseInternationale\n  name: adresseEtranger\n  label:\n    fr: Adresse à l'étranger\n    en: International address\n```\n\n### `customfile` — Pièce jointe\n```yaml\n- type: customfile\n  name: pieceJointe\n  label:\n    fr: Pièce jointe\n    en: Attachment\n  validations:\n    mime: application/pdf,image/jpeg,image/png\n    max: 2   # max de fichiers dans le document \n  additionals:\n    multiple: true   # ajouter plusieurs fichiers d'un même document             \n  # Métadonnées (récupérées dans transmission)\n  # Ajouter des champs dans le même groupe pour créer des métadonnées auto\n```\n\n### `customfileUlterieure` — Pièce jointe ultérieure\n```yaml\n- type: customfileUlterieure\n  name: documentUlterieur\n  label:\n    fr: Document à fournir ultérieurement\n    en: Document to provide late\n  # même attributs que le customfile\n```\n\n### `infosBancaires` — Dépôt direct\n```yaml\n- type: infosBancaires\n  name: depotDirect\n  label:\n    fr: Informations bancaires\n    en: Banking information\n```\n\n### `moneris` — Paiement en ligne\n```yaml\n- type: moneris\n  name: paiement\n  label:\n    fr: Paiement\n    en: Payment\n```\n\n### `signature` — Signature électronique (workflows)\n```yaml\n- type: signature\n  name: signatureLocateur\n  label:\n    fr: Signature électronique\n    en: Electronic signature\n  texteConsentement:\n    fr: |\n      <p>En signant, vous acceptez les conditions.</p>\n    en: |\n      <p>By signing, you accept the conditions.</p>\n```\n\n### `suiviEtapesWF` — Suivi visuel des étapes workflow\n```yaml\n- type: suiviEtapesWF\n```\n\n### `tableauPjManquantes` — Tableau des pièces jointes manquantes\n```yaml\n- type: tableauPjManquantes\n```\n\n### `courrielWorkflow` — Saisie des courriels des participants workflow\n```yaml\n- type: courrielWorkflow\n  name: courrielLocataire\n  role: locataire           # Doit correspondre au role défini dans transmission workflow\n  label:\n    fr: Courriel du locataire\n    en: Tenant's email\n```\n\n### `inline` — Groupe de composants sur une ligne\n```yaml\n- type: inline\n  components:\n    - type: text\n      name: prenom\n      label:\n        fr: Prénom\n        en: First name\n    - type: text\n      name: nom\n      label:\n        fr: Nom\n        en: Last name\n```\n\n### `group` — Groupe de composants liés\n```yaml\n- type: group\n  name: groupeInfo\n  label:\n    fr: Informations\n    en: Information\n  components:\n    - type: text\n      name: champDuGroupe\n      label:\n        fr: Champ\n        en: Field\n```\n\n### `repeatableGroup` — Groupe répétable\n```yaml\n- type: repeatableGroup\n  name: enfants\n  label:\n    fr: Enfants\n    en: Children\n  repeatable: true\n  minimum: 0                # Nombre minimum d'instances\n  limit: 5                  # Nombre maximum d'instances\n  components:\n    - type: text\n      name: prenomEnfant\n      label:\n        fr: Prénom de l'enfant\n        en: Child's first name\n    - type: date\n      name: dateNaissanceEnfant\n      label:\n        fr: Date de naissance\n        en: Date of birth\n```\n\n---\n\n## 5. Validation\n\n> **Important :** La clé s'appelle `validations:` (avec s). `required` est **implicite** sur tous les champs — ne pas l'ajouter sauf pour le documenter explicitement. Pour rendre un champ optionnel, utiliser `optional:` sous `validations:`.\n\n\n```yaml\nvalidations:\n#Ceci est la liste complète il n'existe pas d'autres validations dans FRW.\n  required:                             # Implicite — tous les champs sont obligatoires par défaut\n  optional:                             # Rend le champ optionnel (annule le required implicite)\n  email:                                # Format courriel\n  url:                                  # Format URL\n  nas:                                  # NAS valide\n  nam:                                  # NAM valide\n  alpha:                                # Lettres uniquement\n  alphanumeric:                         # Lettres et chiffres\n  number:                               # Numérique\n  min: 0                                # Valeur minimale (nombre) ou longueur minimale (texte)\n  max: 100                              # Valeur maximale ou longueur maximale\n  between: [1, 10]                      # Entre deux valeurs\n  in: [valA, valB]                      # Doit être parmi ces valeurs\n  not: valeurInterdite                  # Ne doit pas être cette valeur\n  startsWith: \"prefix\"                  # Commence par\n  endsWith: \"suffix\"                    # Finit par\n  matches: autreChamp                   # Doit correspondre à un autre champ (confirmation)\n  before: \"2025-12-31\"                  # Date avant (pour type: date)\n  after: \"2000-01-01\"                   # Date après (pour type: date)\n  avant: \"autreChampDate\"               # Avant la valeur d'un autre champ date\n  accepted:                             # Doit être coché (checkbox)\n  bail:                                 # Arrêter à la première erreur\n  mime: application/pdf               # Types MIME autorisés (customfile), ne pas mettre sauf si demande explicite de l'utilisateur\n  \n  # Validation personnalisée\n  monValidateur99custom:\n    code: |\n      (value) {\n        return value.length > 3 || 'Minimum 4 caractères';\n      }\n```\n\n### Messages de validation personnalisés\n```yaml\nmessagesDeValidation:\n  required:\n    fr: Ce champ est obligatoire.\n    en: This field is required.\n  email:\n    fr: Format courriel invalide.\n    en: Invalid email format.\n```\n\n---\n\n## 6. Domaines de valeurs\n\n### Domaine statique dans `config.domaines`\n```yaml\nconfig:\n  domaines:\n    sports:\n      Basketball:\n        label:\n          fr: Basketball\n        mots-cles:\n          fr: Jordan ballon\n        v-if: \"this.val('filtreSport') !== 'Raquette'\"\n      Tennis:\n        label:\n          fr: Tennis\n```\n\n### Shorthands intégrés\n```yaml\noptions: yesno        # Oui / Non en français (et Yes / No si bilingue)\n```\n\n### Référence à un domaine `config.domaines`\n```yaml\n- type: radio\n  name: sport\n  options: sports              # Nom du domaine défini dans config.domaines\n```\n\n### Domaine externe (transmission requis)\n```yaml\n# Dans form.yml :\n- type: listeDeroulante\n  name: municipalite\n  sourceExterne: municipalites   # Correspond à http_client_set dans transmission\n\n# Dans transmission.yml :\n# http_client_set:\n#   municipalites: ...\n```\n\n---\n\n## 7. Aiguillage\n\nL'aiguillage détermine ce qui se passe quand l'utilisateur soumet le formulaire.\n\n### Mode confirmation (défaut)\n```yaml\nconfig:\n  aiguillage:\n    choix:\n      - mode: confirmation\n```\n\n### Mode formulaire (redirect vers autre formulaire)\n```yaml\nconfig:\n  aiguillage:\n    choix:\n      - mode: formulaire\n        formulaire: AUTRE_FORM    # Nom du répertoire du formulaire cible\n        v-if: \"this.val('typeChoix') === 'A'\"\n      - mode: confirmation\n        # v-if absent = fallback par défaut\n```\n\n### Mode URL externe\n```yaml\nconfig:\n  aiguillage:\n    choix:\n      - mode: url\n        url: https://www.quebec.ca\n        v-if: \"this.val('choix') === 'externe'\"\n```\n\n### Mode reprise (formulaire différé par courriel)\n```yaml\nconfig:\n  aiguillage:\n    choix:\n      - mode: reprise\n        formulaire: MON_FORM\n        # Envoie un courriel avec lien de reprise à l'utilisateur\n```\n\n### Mode workflow\n```yaml\nconfig:\n  aiguillage:\n    choix:\n      - mode: workflow\n        workflow: idDuWorkflow    # Correspond à l'id dans transmission.yml\n```\n\n---\n\n## 8. JavaScript injecté\n\n### Méthodes custom\n```yaml\nconfig:\n  injecterJs:\n    method:\n      ajouterJours:\n        code: |\n          (date, nbJours) {\n            const d = new Date(date);\n            d.setDate(d.getDate() + nbJours);\n            return d;\n          }\n```\n\n### Propriétés calculées (computed)\n```yaml\n    computed:\n      totalMontants:\n        code: |\n          () {\n            const a = parseFloat(this.val('montantA')) || 0;\n            const b = parseFloat(this.val('montantB')) || 0;\n            return (a + b).toFixed(2);\n          }\n```\n\n### Watchers (réaction aux changements)\n```yaml\n    watch:\n      totalMontants:\n        code: |\n          (value) {\n            this.form.montantTotal = value;\n          }\n```\n\n**API disponible dans les expressions JS :**\n- `this.val('nomChamp')` — lire la valeur d'un champ\n- `this.val('groupe.sousChamp', index)` — lire dans un groupe répétable\n- `this.form.nomChamp = valeur` — écrire une valeur\n- `this.wf.etape.nom` — nom de l'étape workflow courante\n\n---\n\n## 9. Workflows — filtreEtapes et courrielWorkflow\n\nDans un formulaire multi-étapes (workflow), filtrer la visibilité des sections/groupes par étape :\n\n```yaml\nform:\n  sectionsGroup:\n    - sectionGroup:\n        fr: Informations locateur\n      filtreEtapes:\n        - initial:              # Visible à l'étape \"initial\" seulement\n      sections:\n        - section:\n            fr: Coordonnées\n          id: sectionCoordonnees\n          filtreEtapes:\n            - initial:\n            - contributionSignature:\n          components:\n            - type: courrielWorkflow\n              name: courrielLocataire\n              role: locataire\n              label:\n                fr: Courriel du locataire\n                en: Tenant's email\n```\n\n---\n\n## 10. Section Révision (obligatoire)\n\nLa section de révision est **toujours la dernière section** d'un formulaire FRW. Elle affiche un message contextuel selon l'état de validation et permet à l'utilisateur de soumettre le formulaire.\n\n### Structure complète\n\n```yaml\n- section:\n    fr: Révision\n    en: Revision\n  id: revision\n  cacherTexteExplicatifChampsObligatoires: true\n  components:\n    # État 1 — Formulaire jamais validé (état initial)\n    - type: dynamic\n      tag: div\n      v-if: \"val('EtatRevision') === 'initial'\"\n      classes: texte-revision\n      text:\n        fr: |\n          Si vous n'avez pas peur, cliquez sur le bouton « Valider » afin de vérifier\n          que le formulaire est rempli correctement.\n\n    # État 2 — Validation réussie, aucune erreur\n    - type: dynamic\n      tag: div\n      v-if: \"val('EtatRevision') === 'sans-erreur'\"\n      classes: texte-revision\n      text:\n        fr: Tout est beau! Vous pouvez soumettre votre formulaire!\n\n    # État 3 — Validation échouée, des erreurs sont présentes\n    - type: dynamic\n      tag: div\n      v-if: \"val('EtatRevision') === 'avec-erreur'\"\n      classes: texte-revision\n      text:\n        fr: |\n          Des erreurs ont été détectées. Veuillez les corriger avant de soumettre\n          votre formulaire.\n```\n\n### Propriétés de la section\n\n| Propriété | Valeur | Obligatoire | Notes |\n|---|---|---|---|\n| `id` | `revision` | ✅ | Convention standard FRW — ne pas modifier |\n| `cacherTexteExplicatifChampsObligatoires` | `true` | ✅ | Supprime le texte générique « * champ obligatoire » |\n| `section.fr` | `Révision` | ✅ | Label affiché dans la navigation |\n| `section.en` | `Revision` | — | Seulement si bilinguisme requis |\n\n### États de `EtatRevision`\n\n| Valeur | Quand | Rôle |\n|---|---|---|\n| `initial` | Chargement du formulaire, avant toute validation | Invite l'utilisateur à cliquer sur « Valider » |\n| `sans-erreur` | Après validation sans aucune erreur | Autorise la soumission |\n| `avec-erreur` | Après validation avec au moins une erreur | Invite à corriger avant de soumettre |\n\nFRW gère automatiquement la transition entre ces états via son moteur de validation — **ne pas gérer `EtatRevision` manuellement**.\n\n### Règles\n\n- La section ne doit contenir **aucun composant interactif** (`text`, `radio`, `checkbox`, etc.) — uniquement des blocs `dynamic`.\n- `v-if` utilise `val('EtatRevision')` — vérifier la version FRW cible (certaines versions requièrent `this.val()`).\n- `classes: texte-revision` applique le style CSS standard de FRW pour ces messages — ne pas ometre.\n\n### Erreurs fréquentes\n\n| Erreur | Symptôme |\n|---|---|\n| `id` manquant ou différent de `revision` | Bouton de soumission absent ou mal positionné |\n| `cacherTexteExplicatifChampsObligatoires` absent | Texte parasite « * champ obligatoire » affiché |\n| Champs interactifs dans la section | Comportement de validation indéfini |\n| Section pas en dernière position | Navigation incorrecte, soumission impossible |\n";

/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = "# Référence : *.bind.yml\n\n## Table des matières\n1. [Structure générale](#1-structure-générale)\n2. [Bloc `config`](#2-bloc-config)\n3. [Bloc `bundles`](#3-bloc-bundles)\n4. [Bloc `templates`](#4-bloc-templates)\n5. [Bloc `bind`](#5-bloc-bind)\n6. [Syntaxe des formules](#6-syntaxe-des-formules)\n7. [Conditions (conditionsEt / conditionsOu)](#7-conditions-conditionset--conditionsou)\n8. [Estampille](#8-estampille)\n9. [Accès aux données de tableaux / groupes répétables](#9-accès-aux-données-de-tableaux--groupes-répétables)\n\n---\n\n## 1. Structure générale\n\n```yaml\nconfig:         # (optionnel) options globales PDF\n  formulaire:\n    systeme: '510001'\n    type: MON_FORM\n  pdf:\n    rapetisserTexteTropLong: true\n    redirigerAnnexeTexteTroplong: true\n    pourcentageDepassementAnnexe: 20\n    verrouillerChampsPdf: true\n    overrideTailleChampsAuto: 7\n\nbundles:        # Fichiers en sortie\n  - nomSortie: MonDocument.pdf\n    templates:\n      - idTemplate1\n\ntemplates:      # Gabarits utilisés\n  - id: idTemplate1\n    name: Description (non utilisée au runtime)\n    gabarit:\n      fr: NomGabaritFR        # Sans extension, sans chemin\n      en: NomGabaritEN\n    conditionsEt: '{champBool}'\n    toujoursProduire: false\n\nbind:           # Association champs PDF ↔ données formulaire\n  idTemplate1:\n    NomChampPDF:\n      champs:\n        - champFormulaire\n      formule: '{champFormulaire}'\n```\n\n---\n\n## 2. Bloc `config`\n\nRequis seulement pour gabarits PDF (pas Word).\n\n```yaml\nconfig:\n  formulaire:\n    systeme: '510001'       # ID système obtenu de l'équipe FRW\n    type: MON_FORM          # Nom exact du répertoire du formulaire\n\n  pdf:\n    rapetisserTexteTropLong: true\n      # Réduit automatiquement la police si le texte dépasse légèrement le champ PDF\n    \n    redirigerAnnexeTexteTroplong: true\n      # Crée une annexe pour les textes qui dépassent vraiment le champ\n    \n    pourcentageDepassementAnnexe: 20\n      # Seuil (%) : en dessous → rapetisser, au dessus → annexe\n    \n    verrouillerChampsPdf: true\n      # Verrouille le PDF après remplissage\n    \n    overrideTailleChampsAuto: 7\n      # Force la taille de police pour les champs à taille \"auto\"\n```\n\n---\n\n## 3. Bloc `bundles`\n\nUn bundle = un fichier PDF en sortie, composé d'un ou plusieurs templates.\n\n```yaml\nbundles:\n  - nomSortie: Document Principal.pdf\n    conditionsEt: '{typeDemande:neContientPas(Autre):false}'\n    templates:\n      - template1\n      - template2\n    estampille:\n      # Voir section 8\n\n  - nomSortie: Annexe\n    conditionsOu: >-\n      {champ1:cond:>=3?true|false}\n      {champ2:cond:>=3?true|false}\n    templates:\n      - annexeTemplate\n```\n\n**Nom de sortie :**\n- Avec gabarit Word → inclure l'extension (`.pdf` ou `.docx`)\n- Avec gabarit PDF → sans extension (toujours produit en PDF)\n\n**Ordre des bundles :** L'ordre dans la liste détermine l'ordre des fichiers produits.\n\n---\n\n## 4. Bloc `templates`\n\n```yaml\ntemplates:\n  - id: template1                   # Référencé dans bundles.templates et bind\n    name: Description lisible        # Ignoré au runtime, pour les humains\n    gabarit:\n      fr: NomGabaritFR_v1           # Nom sans extension, dossier Gabarits/\n      en: NomGabaritEN_v1\n    conditionsEt: '{champBool}'     # Condition pour inclure ce template dans le bundle\n    conditionsOu: >-\n      {champA}\n      {champB}\n    toujoursProduire: false         # true = produire même si aucun champ associé\n                                    # (usage : documents informatifs)\n    \n    # Pour gabarits Word uniquement — exclure des champs :\n    ignorer:\n      - champ: NomChampFormulaire   # Exclut tous les champs commençant par ce nom\n      - champ: AutreChamp\n```\n\n---\n\n## 5. Bloc `bind`\n\nAssocie chaque champ du gabarit PDF à une ou plusieurs valeurs du formulaire.\n\n```yaml\nbind:\n  template1:                        # Doit correspondre à l'id du template\n    NomChampPDF:                    # Nom exact du champ dans le gabarit PDF\n      champs:\n        - champFormulaire           # Chemin vers la donnée du formulaire\n        - autreChampFormulaire      # Si plusieurs champs, tous nécessaires pour la formule\n      formule: '{champFormulaire}'  # (optionnel) Formule de mise en forme\n```\n\n**Chemins de données :**\n- Simple : `nomChamp`\n- Dans un groupe répétable : `listePersonnes.0.nom` (index base 0)\n- Sous-champ d'adresse : `adresse.0.NoCivique`\n- Boolean : `champ==true` ou `champ==false` (réduit à true/false pour checkboxes PDF)\n- Égalité : `champ==valeur` (true si champ = valeur, pour cases à cocher PDF)\n- Appartenance : `champ==valeurA` (vrai si la liste contient valeurA)\n\n---\n\n## 6. Syntaxe des formules\n\nLes formules combinent et transforment les valeurs pour les insérer dans les champs PDF.\n\n### Concaténation simple\n```yaml\nformule: '{prenom} {nom}'\nformule: '{municipalite}, {province}'\n```\n\n### Condition ternaire (`{champ:condition:vraiValeur|fauxValeur}`)\n```yaml\n# Si champBool est truthy → affiche valeurSiVrai, sinon valeurSiFaux\nformule: '{champBool:valeurSiVrai|valeurSiFaux}'\n\n# Exemple — afficher le courriel du représentant ou du locataire\nformule: '{questionRepresentant:{courrielRepresentant}|{courrielLocateur}}'\n\n# Condition include (valeur contient la sous-chaîne)\nformule: '{nbPieces:include(autre):{nbPiecesAutre}|{nbPieces}}'\n```\n\n### Modificateur `isnullOrEmpty`\n```yaml\n# Retourne false si vide/null, true si rempli (utile pour cases à cocher PDF)\nformule: '{champ:isnullOrEmpty:false|true}'\n```\n\n### Formatage de date\n```yaml\nformule: '{dateChamp:dd          MM          yyyy}'\nformule: '{dateChamp:yyyy-MM-dd}'\n```\n\n### Opérateur `cond`\n```yaml\n# {champ:cond:operateur?vraiValeur|fauxValeur}\nformule: '{locateurs.Length:cond:>=3?true|false}'\n```\n\n### Modificateur `neContientPas`\n```yaml\n# (utilisé dans conditionsEt de bundle — pas dans formule bind directement)\nconditionsEt: '{TypeDemande:neContientPas(Afdr):false}'\n```\n\n### Mustache pour l'estampille (`{{...}}`)\n```yaml\nlignes:\n  - '{{NoConfirmation}}'\n  - 'Réf : {{NoConfirmation}}'\n  - '{{FormatterDate DateTransmission \"yyyy-MM-dd HH:mm:ss\"}}'\n  - '{{{DonneesFormulaire.form.NomFamille}}}, {{{DonneesFormulaire.form.Prenom}}}'\n```\n\n---\n\n## 7. Conditions (conditionsEt / conditionsOu)\n\nUtilisées dans `bundles` et `templates` pour inclure/exclure conditionnellement.\n\n**Logique :** Si la condition retourne une valeur **non vide et non false** → le bloc est **exclu**.\nSi la condition retourne vide/falsy → le bloc est **inclus**.\n\n```yaml\n# conditionsEt : toutes les conditions doivent être vraies pour exclure\nconditionsEt: '{champBool}'\nconditionsEt: '{TypeDemande:neContientPas(Afdr):false}'\n\n# conditionsOu : au moins une condition vraie pour inclure (logique OU d'inclusion)\nconditionsOu: >-\n  {locateurs.Length:cond:>=3?true|false}\n  {locataires.Length:cond:>=3?true|false}\n\n# Condition booléenne simple (valeur du formulaire)\nconditionsEt: '{possedeServicesAdditionnels}'\n\n# Ne pas confondre : vide = toujours inclus (pas de condition)\n```\n\n---\n\n## 8. Estampille\n\nL'estampille est un texte apposé par-dessus le PDF produit.\n\n```yaml\nbundles:\n  - nomSortie: MonDoc.pdf\n    templates:\n      - template1\n    estampille:\n      coinAncrage: BasGauche      # BasGauche (défaut) | BasDroite | HautGauche | HautDroite\n      positionX: 600              # Position en points depuis le coin d'ancrage\n      positionY: 20\n      tailleFont: 12              # Taille de la police\n      rotation: 90               # Rotation en degrés (anti-horaire) ; 90 = vertical\n      couleurRGBA:\n        - 255                     # R\n        - 0                       # G\n        - 0                       # B\n        # - 0.5                   # A (optionnel, transparence)\n      toutesPages: true           # Apposer sur toutes les pages\n      lignes:\n        - '{{NoConfirmation}}'\n        - 'Date : {{FormatterDate DateTransmission \"yyyy-MM-dd\"}}'\n        - '{{{DonneesFormulaire.form.NomFamille}}}'\n```\n\n**Variables disponibles dans les lignes d'estampille :**\n- `{{NoConfirmation}}` — Numéro de confirmation\n- `{{FormatterDate DateTransmission \"yyyy-MM-dd HH:mm:ss\"}}` — Date de transmission formatée\n- `{{{DonneesFormulaire.form.MonChamp}}}` — Valeur d'un champ du formulaire (triple accolades = non encodé HTML)\n- Variables du pré-remplissage (ex: `{{estampille.texteAuthentification}}`)\n\n---\n\n## 9. Accès aux données de tableaux / groupes répétables\n\n```yaml\nbind:\n  template1:\n    # Premier élément d'un groupe répétable (index 0)\n    NomChamp_1:\n      champs:\n        - locateurs.0.nom\n\n    # Sous-objet d'adresse (lui-même dans un groupe répétable)\n    Adresse_NoCivique:\n      champs:\n        - locateurs.0.adresse.0.NoCivique\n\n    # Deuxième élément\n    NomChamp_2:\n      champs:\n        - locateurs.1.nom\n\n    # Longueur d'un tableau (pour les conditions)\n    # Utilisé dans conditionsOu/Et : {locateurs.Length:cond:>=3?true|false}\n```\n\n**Champs d'adresse normalisée disponibles :**\n`NoCivique`, `Appartement`, `Rue`, `Municipalite`, `Province`, `CodePostal`\n";

/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = "# Référence : *.transmission.yml\n\n## Table des matières\n1. [Structure et niveaux](#1-structure-et-niveaux)\n2. [Tâches disponibles (`etapes`)](#2-tâches-disponibles-etapes)\n3. [Gabarits de courriel (`gabaritsCourriels`)](#3-gabarits-de-courriel-gabaritscourriels)\n4. [Client HTTP (`http_client`)](#4-client-http-http_client)\n5. [Données externes (`http_client_set`)](#5-données-externes-http_client_set)\n6. [Variables disponibles dans `http_client`](#6-variables-disponibles-dans-http_client)\n7. [Workflows multi-étapes](#7-workflows-multi-étapes)\n8. [Conditions dans envoyerCourriel](#8-conditions-dans-envoyercourriel)\n9. [Exemple complet](#9-exemple-complet)\n\n---\n\n## 1. Structure et niveaux\n\n```\nmon-systeme/\n├── default.v0.transmission.yml     # Niveau système (appliqué à tous les formulaires)\n└── MON_FORM/\n    └── MON_FORM.v0.transmission.yml # Niveau formulaire (écrase complètement les étapes système)\n```\n\n**Règle :** Si `etapes` est défini au niveau formulaire, il **remplace entièrement** celui du niveau système.\nLes `http_client` se **cumulent** entre les niveaux.\n\n---\n\n## 2. Tâches disponibles (`etapes`)\n\nL'ordre des tâches est important — le traitement les exécute dans l'ordre déclaré.\n\n```yaml\netapes:\n\n  # ── Génération de documents ──────────────────────────────────────────\n  \n  - tache: genererWord\n    # Produit un PDF/DOCX à partir d'un gabarit Word (générique ou personnalisé)\n    # INCOMPATIBLE avec genererPdf dans la même liste\n    options:\n      fichierBind: MON_FORM.v1.bind.yml   # Optionnel, utilise le bind par défaut sinon\n\n  - tache: genererPdf\n    # Remplit un gabarit PDF avec champs de saisie dynamiques\n    # INCOMPATIBLE avec genererWord dans la même liste\n    # Nécessite un fichier .bind.yml\n\n  # ── Traitement des pièces jointes ────────────────────────────────────\n  \n  - tache: traiterDocumentsSoumis\n    # Scan antivirus + préparation des fichiers joints par l'utilisateur\n    # Requis si le formulaire contient des composants customfile\n    options:\n      desactiverEstampille: false         # true = pas d'estampille sur les PJ\n\n  # ── Enrichissement des données ────────────────────────────────────────\n  \n  - tache: extraireQuestions\n    # Ajoute toutes les questions du formulaire (bilingue) dans questionsFormulaire\n    # Disponible depuis la version 2023.6\n\n  # ── Estampille ────────────────────────────────────────────────────────\n  \n  - tache: ajouterEstampille\n    # Appose l'estampille configurée dans le fichier .bind.yml sur le document produit\n\n  # ── Courriels ─────────────────────────────────────────────────────────\n  \n  - tache: envoyerCourriel\n    # Disponible depuis la release 2024.2\n    # Ajouter une tâche par courriel différent à envoyer\n    options:\n      gabarit: confirmation               # Référence à gabaritsCourriels[].id\n      afficherEstampille: true            # Utiliser la version estampillée des PJ\n      filtresDocuments:\n        - typeFiltre: nomOriginal\n          valeurs: MonDocument.pdf        # Inclure ce document précis\n        - typeFiltre: exclureNomOriginal\n          valeurs: MonDocument.pdf        # Exclure ce document précis\n        - typeFiltre: tacheSource\n          valeurs: genererWord            # Tous les docs produits par genererWord\n        - typeFiltre: tacheSource\n          valeurs: traiterDocumentsSoumis # Toutes les PJ de l'utilisateur\n        - typeFiltre: tacheSource\n          valeurs: genererPDF\n        - typeFiltre: metadonnee\n          clee: TypeDocument\n          valeurs:\n            - INFOPERS\n            - SANTE\n      # Conditions d'envoi (ET ou OU, pas les deux simultanément)\n      conditionsEt:\n        - condition: '=='\n          champFormulaire: 'donneesFormulaire.form.sexe'\n          valeur: 'Masculin'\n      # Parties variables utilisables dans le gabarit courriel\n      partiesVariables:\n        partie1: 'Valeur fixe'\n        partie2: '{{donneesFormulaire.form.champDuFormulaire}}'\n\n  # ── Conservation fichier ──────────────────────────────────────────────\n  \n  - tache: conserverFichier\n    # Conserve une copie du fichier produit dans un répertoire interne\n    # Requis pour le bouton de téléchargement après transmission (confirmationTransmission.telechargementCopieFormulaire)\n    # Disponible depuis la release 2024.3\n\n  # ── Appel API externe ─────────────────────────────────────────────────\n  \n  - tache: appelerServiceExterne\n    options:\n      client: nom_client_http             # Référence à http_client[nom]\n      modeBoutonTesterTransmission: simuler  # ignorer | simuler | (absent = exécuter)\n\n  # ── Expiration (workflows seulement) ──────────────────────────────────\n  \n  - tache: expirerFormulaire\n    options:\n      gabarit: formExpire                 # Gabarit courriel à envoyer à l'expiration\n      delaiExpirationHeures: 48           # Délai avant expiration\n      langue: fr\n      conditionsEt:                       # Optionnel\n        - condition: '=='\n          champFormulaire: 'donneesFormulaire.form.champ'\n          valeur: 'valeur'\n```\n\n---\n\n## 3. Gabarits de courriel (`gabaritsCourriels`)\n\n```yaml\ngabaritsCourriels:\n  - id: confirmation                      # Référencé dans envoyerCourriel.options.gabarit\n    \n    a:                                    # Destinataires\n      tous:\n        - 'nom@ministere.gouv.qc.ca'\n        - '{{donneesFormulaire.form.champCourriel}}'\n      unitaire:                           # Seulement en environnement unitaire\n        - 'test@essais.mess.gouv.qc.ca'\n      acceptation:\n        - 'test-acc@essais.mess.gouv.qc.ca'\n      production:\n        - 'prod@ministere.gouv.qc.ca'\n      techno:\n        - 'dev@ministere.gouv.qc.ca'\n    \n    cc:                                   # Copies conformes\n      tous:\n        - 'cc@ministere.gouv.qc.ca'\n    \n    cci:                                  # Copies conformes invisibles\n      tous:\n        - 'cci@ministere.gouv.qc.ca'\n        - '{{envoyerCourriel.partiesVariables.partie1}}'\n    \n    nomExpediteur: Mon Ministère          # Défaut : \"Formulaires en ligne\"\n    retourA: '{{donneesFormulaire.form.champCourriel}}'\n    \n    objet: 'Confirmation - {{envoyerCourriel.partiesVariables.refDemande}}'\n    \n    corps: |\n      <p>Votre demande a bien été reçue.</p>\n      <p>Numéro de référence : {{noConfirmation}}</p>\n      \n      {{! Liste des pièces jointes téléchargeables }}\n      <ul>\n        {{#listePJ}}\n        <li><a href=\"{{url}}\">{{nomOriginal}}</a></li>\n        {{/listePJ}}\n      </ul>\n      \n      {{! Reçu Moneris (si paiement) }}\n      {{#with donneesFormulaire.form.paiement}}\n        <p>Montant payé : {{receipt.TransAmount}} $</p>\n      {{/with}}\n```\n\n---\n\n## 4. Client HTTP (`http_client`)\n\n```yaml\nhttp_client:\n  mon_api:\n    method: POST              # POST | PUT | PATCH | GET\n    url: https://api.ministere.gouv.qc.ca/endpoint\n    headers:\n      Accept: application/json\n      Content-Type: application/json\n      Authorization: 'Bearer {{token}}'\n    content:\n      json_content: |\n        {{{Json .}}}           # Dump complet de toutes les variables disponibles\n        \n        # OU structure personnalisée :\n        {\n          \"noConfirmation\": \"{{noConfirmation}}\",\n          \"langue\": \"{{langue}}\",\n          \"formulaire\": {{{Json donneesFormulaire.form}}},\n          \"documents\": {{{Json documentsProduits}}}\n        }\n      \n      check_response:\n        throw_exception_if_body_not_contains_all:\n          - success             # Valide que le retour contient ce mot\n        throw_exception_if_body_contains_any:\n          - error               # Lève une exception si le retour contient ce mot\n    \n    # Test de chaos (dev uniquement)\n    chaos:\n      enabled: false\n      injection_rate_percentage: 100\n      delay_milliseconds: 1500\n      simulate_status_code: 500\n```\n\n---\n\n## 5. Données externes (`http_client_set`)\n\nPermet d'alimenter des listes déroulantes depuis des APIs externes.\n\n```yaml\nhttp_client_set:\n  regions:                          # Nom de la source (référencé dans form.yml: sourceExterne: regions)\n    sequence:\n      - http_client: regions_api    # Référence à un http_client défini plus bas\n    data_adapter:\n      template: |\n        {{> GenererDomaine items=regions_api.body.result.records value=\"{{{NO_REG_ADM}}}\" label_fr=\"{{{DESCR}}}\" label_en=\"{{{DESCR_EN}}}\"}}\n\n  municipalites:\n    sequence:\n      - http_client: municipalites_api\n    data_adapter:\n      template: |\n        {{> GenererDomaine items=municipalites_api.body.result.records value=\"{{{mcode}}}\" label_fr=\"{{{munnom}}}\"}}\n\nhttp_client:\n  regions_api:\n    method: GET\n    url: 'https://www.donneesquebec.ca/recherche/api/3/action/datastore_search?resource_id=XXX'\n    headers:\n      Accept: application/json\n\n  municipalites_api:\n    method: GET\n    # Utiliser input.donneesFormulaire.form.NomChamp pour filtrer par valeur d'un champ\n    url: 'https://api.example.com/municipalites?region={{{input.donneesFormulaire.form.regionSelectionnee}}}'\n    headers:\n      Accept: application/json\n```\n\n**Note :** Pour les champs dans des groupes répétables, utiliser `input.donneesFormulaire.groupeCourant.NomChamp`.\n\n---\n\n## 6. Variables disponibles dans `http_client`\n\nSyntaxe Mustache (`{{variable}}` ou `{{{variable}}}` pour non encodé).\n\n| Variable | Type | Description |\n|---|---|---|\n| `langue` | `fr` / `en` | Langue du formulaire |\n| `noFormulaire` | numérique | ID unique séquentiel du formulaire |\n| `typeFormulaire` | string | Code du formulaire (ex: `FORM1234`) |\n| `noConfirmation` | numérique | Numéro de confirmation (se termine par `311`) |\n| `dateTransmission` | date | Moment de la transmission |\n| `modeSimulation` | bool | `true` si bouton \"Tester transmission\" |\n| `donneesFormulaire.form.*` | objet | Toutes les données saisies dans le formulaire |\n| `donneesFormulaire.config.*` | objet | Configuration transmise |\n| `documentsProduits` | liste | Documents PDF/Word générés (nom + base64) |\n| `documentsSoumis` | dict | Pièces jointes de l'utilisateur (url, name, métadonnées) |\n| `questionsFormulaire` | dict | Toutes les questions du formulaire (bilingue) |\n| `IdUtilisateur` | string | Identifiant de l'utilisateur authentifié |\n| `InformationsSupplementaires` | objet | Infos du pré-remplissage |\n\n**Format date :** `{{FormatterDate DateTransmission \"yyyy-MM-dd HH:mm:ss\"}}`\n**Dump JSON :** `{{{Json .}}}` ou `{{{Json monObjet}}}`\n\n---\n\n## 7. Workflows multi-étapes\n\nLe workflow permet d'impliquer plusieurs participants.\n\n```yaml\nworkflows:\n  - id: monWorkflow               # Référencé dans form.yml: config.aiguillage.choix[].workflow\n    roles:\n      - id: initiateur            # Premier rôle = initiateur du formulaire\n        label:\n          fr: Demandeur\n          en: Applicant\n      - id: validateur\n        label:\n          fr: Validateur\n          en: Validator\n    \n    etapes:\n      # ── Étape initiale (toujours \"initial\") ──────────────────────────\n      - id: initial\n        evenements:\n          quandQuelqunTransmet:   # Déclenché quand l'initiateur soumet\n            \n            - tache: interventionParticipant\n              options:\n                role: validateur\n                vers: validation              # Étape destination du participant\n                chargerCourrielsWorkflow: true  # Charge les courriels depuis courrielWorkflow\n                modeBoutonTesterTransmission: simuler\n            \n            - tache: interventionParticipant\n              options:\n                role: initiateur\n                chargerCourrielsWorkflow: true\n                modeBoutonTesterTransmission: simuler\n            \n            - tache: envoyerCourrielParticipant\n              options:\n                role: validateur\n                gabarit: demandeValidation\n            \n            - tache: expirerFormulaire\n              options:\n                gabarit: formExpire\n                delaiExpirationHeures: 48\n                langue: fr\n\n      # ── Étapes intermédiaires ─────────────────────────────────────────\n      - id: validation\n        evenements:\n          quandLeDernierTransmet:   # Quand TOUS les participants de cette étape ont transmis\n            - tache: interventionParticipant\n              options:\n                role: initiateur\n                vers: transmission\n                chargerCourrielsWorkflow: true\n                modeBoutonTesterTransmission: simuler\n            - tache: envoyerCourrielParticipant\n              options:\n                role: initiateur\n                gabarit: retourInitiateur\n          \n          # quandQuelqunTransmet:   # Quand N'IMPORTE QUEL participant transmet\n          # quandQuelqunSoumets:    # Alternative selon version FRW\n\n      # ── Étape finale (toujours \"transmission\") ────────────────────────\n      - id: transmission\n        evenements:\n          quandQuelqunTransmet:\n            - tache: genererWord\n            - tache: traiterDocumentsSoumis\n            - tache: ajouterEstampille\n            - tache: appelerServiceExterne\n              options:\n                client: api_depot\n                modeBoutonTesterTransmission: simuler\n            - tache: envoyerCourrielParticipant\n              options:\n                role: initiateur\n                gabarit: confirmationFinale\n                filtresDocuments:\n                  - typeFiltre: tacheSource\n                    valeurs: genererWord\n\n# Gabarits de courriel workflow\ngabaritsCourriels:\n  - id: demandeValidation\n    a:\n      tous:\n        - '{{wf.participant.courriel}}'   # Courriel du participant courant\n    objet: 'Votre validation est requise'\n    corps: |\n      <p>Bonjour,</p>\n      <p>Veuillez <a href=\"{{wf.lien}}\">cliquer ici</a> pour compléter votre section.</p>\n  \n  - id: formExpire\n    a:\n      tous:\n        - '{{wf.participant.courriel}}'\n    objet: 'Le formulaire a expiré'\n    corps: <p>Le délai de réponse est dépassé.</p>\n```\n\n**Variables spéciales dans les gabarits workflow :**\n- `{{wf.participant.courriel}}` — Courriel du participant destinataire\n- `{{wf.lien}}` — Lien personnalisé vers le formulaire pour ce participant\n\n---\n\n## 8. Conditions dans envoyerCourriel\n\n```yaml\n- tache: envoyerCourriel\n  options:\n    gabarit: monGabarit\n    conditionsEt:               # Toutes les conditions doivent être vraies\n      - condition: '=='\n        champFormulaire: 'donneesFormulaire.form.champChoix'\n        valeur: 'valeurAttendue'\n      - condition: '!='\n        champFormulaire: 'donneesFormulaire.form.autreChamp'\n        valeur: ''\n      - condition: '=='\n        champCalcule: \"{{#ifCond donneesFormulaire.form.langue '==' 'fr'}}true{{/ifCond}}\"\n        valeur: true\n    \n    conditionsOu:               # Au moins une condition doit être vraie\n      - condition: '=='\n        champFormulaire: 'donneesFormulaire.form.sexe'\n        valeur: 'Masculin'\n      - condition: '=='\n        champFormulaire: 'donneesFormulaire.form.sexe'\n        valeur: 'Féminin'\n```\n\n**Opérateurs disponibles :** `==`, `!=`, `>`, `<`, `>=`, `<=`\n\n---\n\n## 9. Exemple complet\n\n```yaml\n# MON_FORM.v0.transmission.yml\n\netapes:\n  - tache: genererPdf\n  - tache: traiterDocumentsSoumis\n  - tache: extraireQuestions\n  - tache: ajouterEstampille\n  - tache: envoyerCourriel\n    options:\n      gabarit: confirmation\n      filtresDocuments:\n        - typeFiltre: tacheSource\n          valeurs: genererPDF\n        - typeFiltre: tacheSource\n          valeurs: traiterDocumentsSoumis\n  - tache: conserverFichier\n  - tache: appelerServiceExterne\n    options:\n      client: api_reception\n      modeBoutonTesterTransmission: simuler\n\ngabaritsCourriels:\n  - id: confirmation\n    a:\n      tous:\n        - '{{donneesFormulaire.form.courrielDemandeur}}'\n    objet: 'Confirmation de votre demande no {{noConfirmation}}'\n    corps: |\n      <p>Votre demande a été transmise avec succès.</p>\n      <p>Numéro de confirmation : <strong>{{noConfirmation}}</strong></p>\n      <ul>\n        {{#listePJ}}\n        <li><a href=\"{{url}}\">{{nomOriginal}}</a></li>\n        {{/listePJ}}\n      </ul>\n\nhttp_client:\n  api_reception:\n    method: POST\n    url: https://api.monsysteme.gouv.qc.ca/receptionFormulaire\n    headers:\n      Accept: application/json\n      Content-Type: application/json\n    content:\n      json_content: |\n        {\n          \"noConfirmation\": \"{{noConfirmation}}\",\n          \"dateTransmission\": \"{{FormatterDate dateTransmission \"yyyy-MM-dd\"}}\",\n          \"langue\": \"{{langue}}\",\n          \"donnees\": {{{Json donneesFormulaire.form}}},\n          \"documents\": {{{Json documentsProduits}}}\n        }\n      check_response:\n        throw_exception_if_body_not_contains_all:\n          - success\n```\n";

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   activate: () => (/* binding */ activate),
/* harmony export */   deactivate: () => (/* binding */ deactivate)
/* harmony export */ });
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vscode__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _host__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _pane__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _skills_CLAUDE_md__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var _skills_GEMINI_md__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
/* harmony import */ var _skills_FRW_SKILL_md__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6);
/* harmony import */ var _skills_FRW_references_form_md__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7);
/* harmony import */ var _skills_FRW_references_bind_md__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8);
/* harmony import */ var _skills_FRW_references_transmission_md__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9);









const REFERENCES = {
    'references/form.md': _skills_FRW_references_form_md__WEBPACK_IMPORTED_MODULE_6__,
    'references/bind.md': _skills_FRW_references_bind_md__WEBPACK_IMPORTED_MODULE_7__,
    'references/transmission.md': _skills_FRW_references_transmission_md__WEBPACK_IMPORTED_MODULE_8__,
};
async function deploySkill(extensionUri) {
    const folders = vscode__WEBPACK_IMPORTED_MODULE_0__.workspace.workspaceFolders;
    if (!folders) {
        return;
    }
    const rootUri = folders[0].uri;
    const skillsDir = vscode__WEBPACK_IMPORTED_MODULE_0__.Uri.joinPath(rootUri, '.claude', 'skills');
    const write = async (name, content) => {
        const uri = vscode__WEBPACK_IMPORTED_MODULE_0__.Uri.joinPath(skillsDir, name);
        await vscode__WEBPACK_IMPORTED_MODULE_0__.workspace.fs.writeFile(uri, new TextEncoder().encode(content));
    };
    await write('FRW/SKILL.md', _skills_FRW_SKILL_md__WEBPACK_IMPORTED_MODULE_5__);
    const claudeMdUri = vscode__WEBPACK_IMPORTED_MODULE_0__.Uri.joinPath(rootUri, 'CLAUDE.md');
    const claudeMdExists = await vscode__WEBPACK_IMPORTED_MODULE_0__.workspace.fs.stat(claudeMdUri).then(() => true, () => false);
    if (!claudeMdExists) {
        await vscode__WEBPACK_IMPORTED_MODULE_0__.workspace.fs.writeFile(claudeMdUri, new TextEncoder().encode(_skills_CLAUDE_md__WEBPACK_IMPORTED_MODULE_3__));
    }
    const geminiMdUri = vscode__WEBPACK_IMPORTED_MODULE_0__.Uri.joinPath(rootUri, 'GEMINI.md');
    const geminiMdExists = await vscode__WEBPACK_IMPORTED_MODULE_0__.workspace.fs.stat(geminiMdUri).then(() => true, () => false);
    if (!geminiMdExists) {
        await vscode__WEBPACK_IMPORTED_MODULE_0__.workspace.fs.writeFile(geminiMdUri, new TextEncoder().encode(_skills_GEMINI_md__WEBPACK_IMPORTED_MODULE_4__));
    }
    // Configure .gemini/settings.json with MCP server
    const geminiSettingsUri = vscode__WEBPACK_IMPORTED_MODULE_0__.Uri.joinPath(rootUri, '.gemini', 'settings.json');
    let geminiSettings = {};
    try {
        const existing = await vscode__WEBPACK_IMPORTED_MODULE_0__.workspace.fs.readFile(geminiSettingsUri);
        geminiSettings = JSON.parse(new TextDecoder().decode(existing));
    }
    catch {
        // File doesn't exist or isn't valid JSON — start fresh
    }
    if (!geminiSettings.mcpServers) {
        geminiSettings.mcpServers = {};
    }
    geminiSettings.mcpServers['frw-bacasable'] = {
        command: 'node',
        args: ['.claude/mcp/frw-preview.js'],
    };
    await vscode__WEBPACK_IMPORTED_MODULE_0__.workspace.fs.writeFile(geminiSettingsUri, new TextEncoder().encode(JSON.stringify(geminiSettings, null, 2)));
    for (const [name, content] of Object.entries(REFERENCES)) {
        await write(`FRW/${name}`, content);
    }
    // Deploy the MCP server script
    const mcpSourceUri = vscode__WEBPACK_IMPORTED_MODULE_0__.Uri.joinPath(extensionUri, 'out', 'mcp-server.js');
    const mcpTargetUri = vscode__WEBPACK_IMPORTED_MODULE_0__.Uri.joinPath(rootUri, '.claude', 'mcp', 'frw-preview.js');
    try {
        const mcpBytes = await vscode__WEBPACK_IMPORTED_MODULE_0__.workspace.fs.readFile(mcpSourceUri);
        await vscode__WEBPACK_IMPORTED_MODULE_0__.workspace.fs.writeFile(mcpTargetUri, mcpBytes);
    }
    catch (err) {
        console.warn('FRW: impossible de déployer le serveur MCP:', err.message);
    }
    // Configure .mcp.json at workspace root (read by Claude Code and other AI tools)
    const mcpJsonUri = vscode__WEBPACK_IMPORTED_MODULE_0__.Uri.joinPath(rootUri, '.mcp.json');
    let mcpConfig = {};
    try {
        const existing = await vscode__WEBPACK_IMPORTED_MODULE_0__.workspace.fs.readFile(mcpJsonUri);
        mcpConfig = JSON.parse(new TextDecoder().decode(existing));
    }
    catch {
        // File doesn't exist or isn't valid JSON — start fresh
    }
    if (!mcpConfig.mcpServers) {
        mcpConfig.mcpServers = {};
    }
    mcpConfig.mcpServers['frw-bacasable'] = {
        command: 'node',
        args: ['.claude/mcp/frw-preview.js'],
    };
    await vscode__WEBPACK_IMPORTED_MODULE_0__.workspace.fs.writeFile(mcpJsonUri, new TextEncoder().encode(JSON.stringify(mcpConfig, null, 2)));
    // Auto-allow the MCP tool in .claude/settings.json so Claude doesn't ask permission
    const settingsUri = vscode__WEBPACK_IMPORTED_MODULE_0__.Uri.joinPath(rootUri, '.claude', 'settings.json');
    let settings = {};
    try {
        const existing = await vscode__WEBPACK_IMPORTED_MODULE_0__.workspace.fs.readFile(settingsUri);
        settings = JSON.parse(new TextDecoder().decode(existing));
    }
    catch {
        // File doesn't exist or isn't valid JSON — start fresh
    }
    if (!settings.permissions) {
        settings.permissions = {};
    }
    if (!Array.isArray(settings.permissions.allow)) {
        settings.permissions.allow = [];
    }
    const mcpPermission = 'mcp__frw-bacasable__preview';
    if (!settings.permissions.allow.includes(mcpPermission)) {
        settings.permissions.allow.push(mcpPermission);
    }
    await vscode__WEBPACK_IMPORTED_MODULE_0__.workspace.fs.writeFile(settingsUri, new TextEncoder().encode(JSON.stringify(settings, null, 2)));
}
function* iterateSymbols(symbols, selection) {
    for (const symbol of symbols) {
        if (symbol.range.contains(selection)) {
            yield symbol;
            yield* iterateSymbols(symbol.children, selection);
        }
    }
}
function activate(context) {
    let currentPanel;
    let disposable = vscode__WEBPACK_IMPORTED_MODULE_0__.commands.registerCommand("vscode-mtess-frw-bacasable.open", async () => {
        const config = vscode__WEBPACK_IMPORTED_MODULE_0__.workspace.getConfiguration("mtessFrwBacasable");
        const url = config.get("url");
        const title = "FRW Bac à sable";
        const pane = config.get("pane");
        const showAll = config.get("showAll") ?? true;
        const column = (0,_pane__WEBPACK_IMPORTED_MODULE_2__.getColumnFromPane)(pane);
        const editor = vscode__WEBPACK_IMPORTED_MODULE_0__.window.activeTextEditor?.document.fileName.endsWith('.form.yml')
            ? vscode__WEBPACK_IMPORTED_MODULE_0__.window.activeTextEditor
            : vscode__WEBPACK_IMPORTED_MODULE_0__.window.visibleTextEditors.find(e => e.document.fileName.endsWith('.form.yml'));
        if (editor) {
            if (!editor.document.isUntitled && editor.document.isDirty) {
                await editor.document.save();
            }
            const document = editor.document;
            const buildAndRender = (selection) => {
                vscode__WEBPACK_IMPORTED_MODULE_0__.commands
                    .executeCommand('vscode.executeDocumentSymbolProvider', document.uri)
                    .then(symbols => {
                    var breadcrumb = "";
                    if (symbols !== undefined) {
                        for (const symbol of iterateSymbols(symbols, selection)) {
                            //if (symbol.range.contains(selection)) {
                            breadcrumb = breadcrumb + '/' + symbol.name;
                            // }
                        }
                    }
                    vscode__WEBPACK_IMPORTED_MODULE_0__.workspace.fs.readFile(document.uri).then(fileBytes => {
                        const text = new TextDecoder().decode(fileBytes);
                        const base64Text = btoa(unescape(encodeURIComponent(text)));
                        if (!currentPanel) {
                            const panel = (currentPanel = vscode__WEBPACK_IMPORTED_MODULE_0__.window.createWebviewPanel("vscode-mtess-frw-bacasable", title, column, {
                                enableCommandUris: true,
                                enableFindWidget: true,
                                localResourceRoots: [],
                                enableScripts: true,
                            }));
                            const configListener = vscode__WEBPACK_IMPORTED_MODULE_0__.workspace.onDidChangeConfiguration(() => {
                                const newConfig = vscode__WEBPACK_IMPORTED_MODULE_0__.workspace.getConfiguration("mtessFrwBacasable");
                                const newUrl = newConfig.get("url");
                                const newShowAll = newConfig.get("showAll") ?? true;
                                panel.webview.html = newUrl
                                    ? (0,_host__WEBPACK_IMPORTED_MODULE_1__.renderHost)(newUrl, base64Text, breadcrumb, newShowAll)
                                    : (0,_host__WEBPACK_IMPORTED_MODULE_1__.renderPlaceholder)();
                            });
                            panel.webview.html = url ? (0,_host__WEBPACK_IMPORTED_MODULE_1__.renderHost)(url, base64Text, breadcrumb, showAll) : (0,_host__WEBPACK_IMPORTED_MODULE_1__.renderPlaceholder)();
                            panel.onDidDispose(() => {
                                currentPanel = undefined;
                                configListener.dispose();
                            });
                        }
                        else {
                            currentPanel.webview.html = url ? (0,_host__WEBPACK_IMPORTED_MODULE_1__.renderHost)(url, base64Text, breadcrumb, showAll) : (0,_host__WEBPACK_IMPORTED_MODULE_1__.renderPlaceholder)();
                            // Reveal ne fonctionne plus avec VS 1.63
                            // currentPanel.reveal(undefined, true);
                        }
                        //vscode.window.activeTextEditor = editor;
                    });
                });
            };
            buildAndRender(editor.selection);
        }
    });
    context.subscriptions.push(disposable);
    const toolDisposable = vscode__WEBPACK_IMPORTED_MODULE_0__.lm.registerTool('mtess-frw-bacasable_preview', {
        async invoke(options, _token) {
            const { filePath, line } = options.input ?? {};
            let targetUri;
            if (filePath) {
                targetUri = vscode__WEBPACK_IMPORTED_MODULE_0__.Uri.file(filePath);
                const doc = await vscode__WEBPACK_IMPORTED_MODULE_0__.workspace.openTextDocument(targetUri);
                const editor = await vscode__WEBPACK_IMPORTED_MODULE_0__.window.showTextDocument(doc, { preserveFocus: true });
                if (line !== undefined) {
                    const position = new vscode__WEBPACK_IMPORTED_MODULE_0__.Position(Math.max(0, line - 1), 0);
                    editor.selection = new vscode__WEBPACK_IMPORTED_MODULE_0__.Selection(position, position);
                }
            }
            else if (line !== undefined) {
                const editor = vscode__WEBPACK_IMPORTED_MODULE_0__.window.activeTextEditor;
                if (editor) {
                    targetUri = editor.document.uri;
                    const position = new vscode__WEBPACK_IMPORTED_MODULE_0__.Position(Math.max(0, line - 1), 0);
                    editor.selection = new vscode__WEBPACK_IMPORTED_MODULE_0__.Selection(position, position);
                }
            }
            else {
                targetUri = vscode__WEBPACK_IMPORTED_MODULE_0__.window.activeTextEditor?.document.uri;
            }
            // Refresh the webview preview
            await vscode__WEBPACK_IMPORTED_MODULE_0__.commands.executeCommand('vscode-mtess-frw-bacasable.open');
            const targetFile = targetUri?.fsPath
                ?? vscode__WEBPACK_IMPORTED_MODULE_0__.window.activeTextEditor?.document.fileName
                ?? 'le fichier actif';
            // Try to POST to the backend and capture errors
            const config = vscode__WEBPACK_IMPORTED_MODULE_0__.workspace.getConfiguration("mtessFrwBacasable");
            const backendUrl = config.get("url");
            if (backendUrl && targetUri) {
                try {
                    const fileBytes = await vscode__WEBPACK_IMPORTED_MODULE_0__.workspace.fs.readFile(targetUri);
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
                        return new vscode__WEBPACK_IMPORTED_MODULE_0__.LanguageModelToolResult([
                            new vscode__WEBPACK_IMPORTED_MODULE_0__.LanguageModelTextPart(`ERREUR du bac à sable FRW (HTTP ${response.status}) pour ${targetFile}:\n${responseText}\n\nCorrige le YAML selon les erreurs ci-dessus puis rappelle cet outil.`),
                        ]);
                    }
                    // Check if the response body contains error indicators (JSON error response)
                    try {
                        const json = JSON.parse(responseText);
                        if (json.errors || json.error || json.erreurs) {
                            const errorDetail = JSON.stringify(json.errors || json.error || json.erreurs, null, 2);
                            return new vscode__WEBPACK_IMPORTED_MODULE_0__.LanguageModelToolResult([
                                new vscode__WEBPACK_IMPORTED_MODULE_0__.LanguageModelTextPart(`ERREUR de validation FRW pour ${targetFile}:\n${errorDetail}\n\nCorrige le YAML selon les erreurs ci-dessus puis rappelle cet outil.`),
                            ]);
                        }
                    }
                    catch {
                        // Response is not JSON (likely HTML success page) — that's fine
                    }
                    return new vscode__WEBPACK_IMPORTED_MODULE_0__.LanguageModelToolResult([
                        new vscode__WEBPACK_IMPORTED_MODULE_0__.LanguageModelTextPart(`Le bac à sable FRW a été ouvert/rafraîchi avec succès pour : ${targetFile}`),
                    ]);
                }
                catch (err) {
                    return new vscode__WEBPACK_IMPORTED_MODULE_0__.LanguageModelToolResult([
                        new vscode__WEBPACK_IMPORTED_MODULE_0__.LanguageModelTextPart(`Le bac à sable FRW a été rafraîchi pour ${targetFile}, mais impossible de valider via le backend: ${err.message}`),
                    ]);
                }
            }
            return new vscode__WEBPACK_IMPORTED_MODULE_0__.LanguageModelToolResult([
                new vscode__WEBPACK_IMPORTED_MODULE_0__.LanguageModelTextPart(`Le bac à sable FRW a été ouvert/rafraîchi pour : ${targetFile}`),
            ]);
        },
    });
    context.subscriptions.push(toolDisposable);
    // File watcher: when MCP server writes .frw-trigger, refresh the webview
    const triggerPattern = new vscode__WEBPACK_IMPORTED_MODULE_0__.RelativePattern(vscode__WEBPACK_IMPORTED_MODULE_0__.workspace.workspaceFolders?.[0]?.uri ?? '', '.claude/.frw-trigger');
    const triggerWatcher = vscode__WEBPACK_IMPORTED_MODULE_0__.workspace.createFileSystemWatcher(triggerPattern);
    const handleTrigger = async () => {
        const folders = vscode__WEBPACK_IMPORTED_MODULE_0__.workspace.workspaceFolders;
        if (!folders) {
            return;
        }
        const triggerUri = vscode__WEBPACK_IMPORTED_MODULE_0__.Uri.joinPath(folders[0].uri, '.claude', '.frw-trigger');
        try {
            const bytes = await vscode__WEBPACK_IMPORTED_MODULE_0__.workspace.fs.readFile(triggerUri);
            const raw = new TextDecoder().decode(bytes).trim();
            // Format: "filePath:line" or just "filePath"
            const colonIdx = raw.lastIndexOf(':');
            const lineNum = colonIdx > 1 ? parseInt(raw.slice(colonIdx + 1), 10) : NaN;
            const filePath = (!isNaN(lineNum) && colonIdx > 1) ? raw.slice(0, colonIdx) : raw;
            if (filePath) {
                const uri = vscode__WEBPACK_IMPORTED_MODULE_0__.Uri.file(filePath);
                const openDoc = vscode__WEBPACK_IMPORTED_MODULE_0__.workspace.textDocuments.find(d => d.uri.fsPath === uri.fsPath);
                if (openDoc && openDoc.isDirty) {
                    await openDoc.save();
                }
                // Position cursor at the changed line for breadcrumb
                if (!isNaN(lineNum)) {
                    const doc = openDoc ?? await vscode__WEBPACK_IMPORTED_MODULE_0__.workspace.openTextDocument(uri);
                    const editor = await vscode__WEBPACK_IMPORTED_MODULE_0__.window.showTextDocument(doc, { preserveFocus: true });
                    const pos = new vscode__WEBPACK_IMPORTED_MODULE_0__.Position(Math.max(0, lineNum - 1), 0);
                    editor.selection = new vscode__WEBPACK_IMPORTED_MODULE_0__.Selection(pos, pos);
                }
            }
            await vscode__WEBPACK_IMPORTED_MODULE_0__.commands.executeCommand('vscode-mtess-frw-bacasable.open');
            await vscode__WEBPACK_IMPORTED_MODULE_0__.workspace.fs.delete(triggerUri);
        }
        catch {
            // Trigger file may already be deleted or unreadable
        }
    };
    triggerWatcher.onDidCreate(handleTrigger);
    triggerWatcher.onDidChange(handleTrigger);
    context.subscriptions.push(triggerWatcher);
    const config = vscode__WEBPACK_IMPORTED_MODULE_0__.workspace.getConfiguration("mtessFrwBacasable");
    if (config.get("deployAiSkills") !== false) {
        deploySkill(context.extensionUri);
    }
    context.subscriptions.push(vscode__WEBPACK_IMPORTED_MODULE_0__.commands.registerCommand('vscode-mtess-frw-bacasable.init', async () => {
        const cfg = vscode__WEBPACK_IMPORTED_MODULE_0__.workspace.getConfiguration("mtessFrwBacasable");
        if (cfg.get("deployAiSkills") === false) {
            vscode__WEBPACK_IMPORTED_MODULE_0__.window.showInformationMessage('FRW: déploiement des skills IA désactivé dans les paramètres.');
            return;
        }
        await deploySkill(context.extensionUri);
        vscode__WEBPACK_IMPORTED_MODULE_0__.window.showInformationMessage('FRW: skills IA déployés (CLAUDE.md, GEMINI.md, .claude/, .gemini/)');
    }));
}
// this method is called when your extension is deactivated
function deactivate() { }

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map