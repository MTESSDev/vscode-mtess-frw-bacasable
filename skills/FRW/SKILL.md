---
name: FRW
description: >
  Générer et valider des fichiers de configuration YAML pour FRW (Formulaires Web — MTESSDev/MESS Québec).
  Utilise ce skill dès que la conversation implique des fichiers *.form.yml, *.bind.yml, *.transmission.yml,
  un aiguillage FRW, des composants de formulaire FRW, des formules de binding, des workflows FRW,
  ou toute configuration du système FRW gouvernemental québécois.
  Déclenche-toi aussi si l'utilisateur mentionne « FRW », « Formulaire Web », ou demande d'intégrer un formulaire au système FRW.
---

# Skill : FRW — Formulaires Web (MTESSDev / MESS Québec)

FRW est un moteur « low-code » de formulaires gouvernementaux québécois.
Chaque formulaire est décrit par trois types de fichiers YAML :

| Fichier | Rôle | Niveaux valides |
|---|---|---|
| `*.form.yml` | Structure UI, composants, config affichage | Global · Système · Formulaire |
| `*.bind.yml` | Liaison données → PDF/Word et production de bundles | Formulaire uniquement |
| `*.transmission.yml` | Tâches post-soumission (PDF, courriel, API) | Système · Formulaire |

> **Ligne de schéma à toujours inclure en tête de `.form.yml` :**
> ```yaml
> # yaml-language-server: $schema=https://formulaires.it.mtess.gouv.qc.ca/api/v1/SIS/ObtenirSchema/form
> ```

---

## Hiérarchie de fichiers

```
mon-systeme/
├── default.v0.form.yml          # Config système (appliquée à tous les formulaires)
├── default.v0.transmission.yml  # Transmission système
└── MON_FORM/
    ├── MON_FORM.v1.form.yml     # Formulaire spécifique
    ├── MON_FORM.v1.bind.yml     # Binding PDF/Word
    ├── MON_FORM.v0.transmission.yml  # Transmission spécifique (écrase système)
    └── Gabarits/
        ├── MonGabarit.v1.FR.pdf
        └── MonGabarit.v1.EN.pdf
```

**Règles de nommage :**
- Version `v0` = transmission / config système
- Version `v1` = formulaire / binding avec gabarit
- `NOM_DU_FORM` doit correspondre exactement au nom du répertoire

---

## Squelette minimal d'un formulaire

```yaml
# yaml-language-server: $schema=https://formulaires.it.mtess.gouv.qc.ca/api/v1/SIS/ObtenirSchema/form
config:
  securite:
    accesAnonyme: true   # ou false pour portail authentifié

form:
  title:
    fr: Mon formulaire
    en: My form
  sectionsGroup:
    - sectionGroup:
        fr: Section principale
        en: Main section
      classes: icone user
      sections:
        - section:
            fr: Informations
            en: Information
          id: sectionInfo
          components:
            - type: text
              name: nom
              label:
                fr: Nom
                en: Name
              # required est implicite — tous les champs sont obligatoires par défaut
              # Pour valider d'autres règles :
              # validations:
              #   email:
```

---

## Références détaillées — quand les consulter

| Sujet | Fichier de référence |
|---|---|
| Bloc `config`, composants, aiguillage, domaines, validation, `v-if`, groupes répétables, JS injecté | `references/form.md` |
| Structure `bind`, formules, `conditionsEt/Ou`, bundles, estampille | `references/bind.md` |
| Tâches de transmission, `http_client`, courriels, workflows multi-étapes | `references/transmission.md` |

---

## Règles invariantes à appliquer systématiquement

1. **Bilingue** : les clés `fr:` / `en:` sont supportées partout. **Ne jamais écrire `en:` sauf si le client le demande explicitement** — omettre complètement l'attribut pour garder le YAML propre.
2. **`name` unique** : chaque composant interactif (text, radio, checkbox…) doit avoir un `name` unique dans le formulaire.
3. **`id` unique** : chaque `section` doit avoir un `id` unique.
4. **`v-if` = expression Vue.js** : utiliser `this.val('champName')` pour lire les valeurs.
5. **Formules bind** : syntaxe `{champ:modificateur:valeurSiVrai|valeurSiFaux}` — voir `references/bind.md`.
6. **Ne jamais mélanger `genererWord` et `genererPdf`** dans la même transmission.
7. **Gabarits PDF** : référencer sans extension ni chemin (`fr: MonGabarit.v1.FR`).
8. **Conditions bundle** : une condition vraie = le bundle est **exclu** ; une formule vide = toujours inclus.
9. **`validations:`** (avec s) et non `validation:`. `required` est implicite — ne pas l'écrire. Pour un champ optionnel : `optional:`.

---

## Règles de syntaxe YAML — guillemets obligatoires

**Toute valeur scalaire contenant `:`, `#`, `{`, `}`, `[`, `]`, `>`, `|` DOIT être entre guillemets.**

Cas les plus fréquents en FRW :

```yaml
# ✅ v-if et disabled — toujours entre guillemets doubles
v-if: "this.val('typeChoix') === 'A'"
disabled: "this.val('champ') !== ''"

# ✅ Valeurs de texte contenant un ":"
objet: "Confirmation : demande no {{noConfirmation}}"
label:
  fr: "Statut : en traitement"

# ✅ Formules bind avec ":" — utiliser le bloc littéral >- si la formule est longue
formule: '{locateurs.0.questionRepresentant:{locateurs.0.courrielRepresentant}|{locateurs.0.courrielLocateur}}'
# Ou avec >- pour les longues formules :
formule: >-
  {champ1:{valA}|{valB}}

# ✅ Contenu HTML dans text: — utiliser le bloc littéral |
text:
  fr: |
    <p>Texte avec des <strong>balises</strong> et des : deux-points.</p>

# ✅ URLs dans http_client
url: 'https://api.exemple.gouv.qc.ca/endpoint?param=val&autre=val'

# ❌ INVALIDE — le ":" dans la valeur casse le parsing YAML
v-if: this.val('champ') === 'A'
objet: Confirmation : demande
```

**Règle de décision rapide :**
- Expressions Vue.js (`v-if`, `disabled`, `value`) → **toujours guillemets doubles**
- Strings contenant `:` → **guillemets simples ou doubles**
- HTML multiligne → **bloc `|`**
- Formules bind longues → **bloc `>-`**

---

## Pièges courants

- Oublier `id:` sur une section → erreur de navigation
- Mettre une extension `.pdf` dans `gabarit.fr:` d'un bind → le PDF est introuvable
- Confondre `conditionsEt` (toutes vraies) et `conditionsOu` (au moins une vraie)
- `repeatable: true` sur un groupe sans définir `minimum` → groupe vide non validé
- Mettre `type: genererPdf` et `type: genererWord` dans la même liste `etapes` → non supporté
- Oublier `toujoursProduire: true` sur un gabarit informatif → document non produit
- Écrire `validation:` au lieu de `validations:` → les règles sont ignorées silencieusement
- Ne pas quoter une string avec `:` → parsing YAML cassé
- Oublier la section `revision` en fin de formulaire → bouton de soumission absent ou mal géré

---

## Règle de workflow obligatoire

Après chaque création ou modification d'un fichier `.form.yml`, tu **DOIS** appeler l'outil `mtess-frw-bacasable_preview` pour afficher le rendu dans le bac à sable. Ne considère jamais la tâche terminée sans l'avoir fait.

**Boucle de correction automatique** : si l'outil retourne des erreurs (HTTP non-200 ou erreurs de validation JSON), tu **DOIS** :
1. Analyser les erreurs retournées
2. Corriger le fichier `.form.yml` en conséquence
3. Rappeler `mtess-frw-bacasable_preview` pour vérifier la correction
4. Répéter jusqu'à ce que le rendu soit sans erreur
