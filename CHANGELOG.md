# Change Log

## [1.0.6] - 2026-03-22

### Ajouts
- Déploiement automatique des skills IA pour Claude et Gemini au démarrage de l'extension
- Déploiement du skill FRW (`SKILL.md` et références) dans `.claude/skills/FRW/`
- Déploiement de `CLAUDE.md` et `GEMINI.md` à la racine du workspace
- Configuration automatique de `.gemini/settings.json` avec le serveur MCP
- Nouveau paramètre `mtessFrwBacasable.deployAiSkills` pour désactiver le déploiement automatique des skills IA
- Les skills FRW proviennent désormais d'un sous-module Git externe (`MTESSDev/skills`)

### Modifications
- Corrections diverses de messages et de gestion des erreurs

## [1.0.2]
- Ajout du support de claude AI

## [1.0.0]

- L'extension fonctionne maintenant directement dans le navigateur via **github.dev** et **vscode.dev**, sans installation locale
- Correction d'un problème où le prévisualiseur ne se comportait pas correctement selon vos préférences de configuration
- Amélioration de la stabilité générale de l'extension

## [0.0.4]

- Première version publique
- Correction de la documentation
