# Référence : *.form.yml

## Table des matières
1. [Bloc `config`](#1-bloc-config)
2. [Bloc `form` — Structure navigation](#2-bloc-form--structure-navigation)
3. [Composants d'affichage](#3-composants-daffichage)
4. [Composants interactifs](#4-composants-interactifs)
5. [Validation](#5-validation)
6. [Domaines de valeurs](#6-domaines-de-valeurs)
7. [Aiguillage](#7-aiguillage)
8. [JavaScript injecté](#8-javascript-injecté)
9. [Workflows — filtreEtapes et courrielWorkflow](#9-workflows--filtreetapes-et-courrielworkflow)
10. [Section Révision (obligatoire)](#10-section-révision-obligatoire)

---

## 1. Bloc `config`

```yaml
config:
  securite:
    accesAnonyme: true          # true = formulaire public, false = portail authentifié
  
  systemesDelegues:             # GUIDs des systèmes autorisés (Zone Entreprise)
    - 571EE295-FFA1-4A06-9D19-5E6395697D94

  afficherBlocCode: true        # Affiche les exemples de code (mode dev/P700U)
  afficherPartagePage: true     # Bouton de partage de page
  formulaireUnilingue: true       # Formulaire en français seulement (pas de bascule de langue)

  enregistrement:
    actif: false                # Enregistrement/reprise du formulaire
    afficherMessageIncitatif: true

  piv:                          # PIV = Portail Intranet du MESS
    entete:
      recherche:
        actif: true

  postesCanada:
    cle: UX84-TU29-KU11-NC61   # Clé API Postes Canada pour autocomplétion adresse

  confirmationTransmission:
    texteSupplementaire:
      fr: <p>Merci!</p>
    # telechargementCopieFormulaire: true  # Avancé — ajouter seulement si explicitement demandé

  aiguillage:                   # Voir section 7
    choix:
      - mode: confirmation      # confirmation | formulaire | workflow | url | reprise
        
  domaines:                     # Voir section 6
    monDomaine:
      valeurA:
        label:
          fr: Libellé A
          en: Label A

  injecterJs:                   # Voir section 8
    method: {}
    computed: {}
    watch: {}
```

---

## 2. Bloc `form` — Structure navigation

```yaml
form:
  title:
    fr: Titre du formulaire
    en: Form title

  sectionsGroup:
    - sectionGroup:
        fr: Nom du groupe
        en: Group name
      classes: icone user            # Icône du groupe (voir liste ci-dessous)
      v-if: "this.val('champ') === 'val'"   # Condition d'affichage Vue.js
      prefixId: prefixe              # Préfixe ajouté aux sections à répéter avec une ancre
      filtreEtapes:                  # Workflow : étapes où ce groupe est visible
        - initial:
        - contribution:
      
      sections:
        - section:
            fr: Titre de la section
            en: Section title
          id: sectionUniqueId        # OBLIGATOIRE et unique dans tout le formulaire
          cacherTexteExplicatifChampsObligatoires: true
          v-if: "expression Vue.js"
          classes: ma-classe
          filtreEtapes:              # Workflow : étapes où cette section est visible
            - initial:
          components:
            - ...                    # Composants (voir sections 3 et 4)
```

### Icônes disponibles pour `classes` d'un `sectionGroup`

**Legacy FRW** (préfixe `icone `) :
`icone user`, `icone baby2`, `icone cash-dollar`, `icone register`, `icone clipboard-check`

**Nouveau format UTD** (préfixe `utd-icone-svg `) :
`ampoule`, `bilan`, `cadeau`, `calendrier`, `checklist`, `facturation`,
`homme-femme`, `nouveautes`, `parametres`, `recu`, `utilisateur`,
`utilisateurs2`, `utilisateurs3`, `repere-carte`, `services-ligne`

> *Attention il ne faut pas en inventer ni les traduires

---

## 3. Composants d'affichage

### `dynamic` — Contenu HTML libre
```yaml
- type: dynamic
  tag: div                      # div, p, span, h2, h3, etc.
  classes: page-texte mb-32
  v-if: "this.val('champ') === 'oui'"
  text:
    fr: |
      <p>Contenu HTML <strong>riche</strong>.</p>
    en: |
      <p>Rich HTML content.</p>
```

### `avis` — Bloc informatif stylisé
```yaml
- type: avis
  classes: avertissement        # avertissement | information | succes | erreur
  text:
    fr: <p>Message important.</p>
    en: <p>Important message.</p>
```

### `zoneEvidence` — Zone mise en évidence
```yaml
- type: zoneEvidence
  classes: mt-32
  text:
    fr: <p>Texte mis en évidence.</p>
    en: <p>Highlighted text.</p>
```

### `image`
```yaml
- type: image
  src: /images/mon-image.png
  alt:
    fr: Description de l'image
    en: Image description
  classes: mb-16
```

### `blocCode` — Affichage de code (mode dev)
```yaml
- type: blocCode
  text:
    fr: |
      config:
        accesAnonyme: true
```

### `accordeon` — Contenu rétractable
```yaml
- type: accordeon
  label:
    fr: Titre accordéon
    en: Accordion title
  text:
    fr: <p>Contenu caché.</p>
    en: <p>Hidden content.</p>
```

---

## 4. Composants interactifs

> Tous les composants interactifs partagent ces propriétés communes :
> ```yaml
> name: nomChamp            # Identifiant unique, utilisé dans v-if et bind
> label:
>   fr: Libellé
>   en: Label
> v-if: "expression"        # Condition d'affichage
> disabled: "expression"    # Condition de désactivation
> classes: ma-classe
> outerClasses: outer-class
> inputClasses: input-class
> help:
>   fr: Texte   # Texte de précision d'aide pour éviter les erreurs de saisies pour nuancer, pour les détails plus précis, utiliser tooltip
> tooltip:      # Infobulle d'aide avancée pour ajouter un long détail pour facilité la saisie
>   title:
>     fr: Titre court de l'infobulle
>   text:
>     fr: Texte d'aide
>     en: Help text
> validations:              # Voir section 5
>   # required est implicite (tous les champs sont obligatoires par défaut)
>   # Pour rendre un champ optionnel : optional:
> ```

### `text` — Champ texte simple
```yaml
- type: text
  name: nomFamille
  label:
    fr: Nom de famille
    en: Last name
  inputmode: text           # text | numeric | email | tel | url | search
  pattern: "[A-Za-z]+"     # Regex de validation
  value: "valeur par défaut"
  v-else-value: "valeur si v-if est faux"
  validations: 
    min: 2,length   # texte d'une longeur minimale de 2 caractères
    max: 5,length   # texte d'une longeur maximal de 5 caractères
```

### `textarea` — Zone de texte multiligne
```yaml
- type: textarea
  name: description
  label:
    fr: Description
    en: Description
  validations: 
    max: 200    # limite de caractères validée
  additionals:
    max-caracteres: 200   # compteur de caractères restants
    hauteur-automatique: true  # permet de mettre une zone flexible
    rows: 10   # quand le contenu utilisateur attendu est grand on précise le nombre de lignes
```

### `radio` — Boutons radio
```yaml
- type: radio
  name: sexe
  label:
    fr: Sexe
  options:
    Masculin:
      fr: Masculin
    Feminin:
      fr: Féminin
  # Shorthand pour oui/non :
  # options: yesno
  # OU référencer un domaine défini dans config.domaines :
  # options: sports
```

### `checkbox` — Cases à cocher (choix multiples)
```yaml
- type: checkbox
  name: preferences
  label:
    fr: Préférences
  options:
    opt1:
      fr: Option 1
    opt2:
      fr: Option 2
```

### `listeDeroulante` / `select` — Liste déroulante
```yaml
- type: listeDeroulante     # alias : select
  name: region
  label:
    fr: Région
    en: Region
  options: regionsDomaine  # Référence à un domaine défini dans config.domaines
  # Pour données externes (transmission http_client_set requis) :
  # sourceExterne: regions
```

### `date` — Champ date
```yaml
- type: date
  name: dateNaissance
  label:
    fr: Date de naissance
  validations:
    avant: "2020-01-01"   # La date doit être avant cette date
    apres: "1900-01-01"   # La date doit être après cette date
  # Ne pas ajouter "date:" dans validations — la validation de format est gérée par le composant
```

### `montant` / `number` / `nombreEntier` — Champs numériques
```yaml
- type: montant             # Montant monétaire formaté
  name: revenuAnnuel
  label:
    fr: Revenu annuel
    en: Annual income
  min: 0
  max: 999999
```

### `email`
```yaml
- type: email
  name: courriel
  label:
    fr: Adresse courriel
    en: Email address
```

### `tel` / `telInternational` / `telOnzeChiffres`
```yaml
- type: tel
  name: telephone
  label:
    fr: Téléphone
    en: Phone
```

### `codePostal`
```yaml
- type: codePostal
  name: codePostal
  label:
    fr: Code postal
    en: Postal code
```

### `nas` — Numéro d'assurance sociale
```yaml
- type: nas
  name: nas
  label:
    fr: NAS
    en: SIN
```

### `nam` — Numéro d'assurance maladie
```yaml
- type: nam
  name: nam
  label:
    fr: NAM
    en: Health insurance number
```

### `cp12` — Numéro CP12 (MESS)
```yaml
- type: cp12
  name: cp12
  label:
    fr: CP12
    en: CP12
```

### `hidden` — Champ caché (calculé)
```yaml
- type: hidden
  name: champCache
  value: "valeur fixe"
  # OU valeur calculée via v-else-value
```

### `password`
```yaml
- type: password
  name: motDePasse
  label:
    fr: Mot de passe
    en: Password
```

### `adresse` — Adresse normalisée québécoise
```yaml
- type: adresse
  name: adressePrincipale
  label:
    fr: Adresse
    en: Address
  # Champs inclus automatiquement : NoCivique, Appartement, Rue, Municipalite, Province, CodePostal
```

### `adresseInternationale`
```yaml
- type: adresseInternationale
  name: adresseEtranger
  label:
    fr: Adresse à l'étranger
    en: International address
```

### `customfile` — Pièce jointe
```yaml
- type: customfile
  name: pieceJointe
  label:
    fr: Pièce jointe
    en: Attachment
  validations:
    mime: application/pdf,image/jpeg,image/png
    max: 2   # max de fichiers dans le document 
  additionals:
    multiple: true   # ajouter plusieurs fichiers d'un même document             
  # Métadonnées (récupérées dans transmission)
  # Ajouter des champs dans le même groupe pour créer des métadonnées auto
```

### `customfileUlterieure` — Pièce jointe ultérieure
```yaml
- type: customfileUlterieure
  name: documentUlterieur
  label:
    fr: Document à fournir ultérieurement
    en: Document to provide late
  # même attributs que le customfile
```

### `infosBancaires` — Dépôt direct
```yaml
- type: infosBancaires
  name: depotDirect
  label:
    fr: Informations bancaires
    en: Banking information
```

### `moneris` — Paiement en ligne
```yaml
- type: moneris
  name: paiement
  label:
    fr: Paiement
    en: Payment
```

### `signature` — Signature électronique (workflows)
```yaml
- type: signature
  name: signatureLocateur
  label:
    fr: Signature électronique
    en: Electronic signature
  texteConsentement:
    fr: |
      <p>En signant, vous acceptez les conditions.</p>
    en: |
      <p>By signing, you accept the conditions.</p>
```

### `suiviEtapesWF` — Suivi visuel des étapes workflow
```yaml
- type: suiviEtapesWF
```

### `tableauPjManquantes` — Tableau des pièces jointes manquantes
```yaml
- type: tableauPjManquantes
```

### `courrielWorkflow` — Saisie des courriels des participants workflow
```yaml
- type: courrielWorkflow
  name: courrielLocataire
  role: locataire           # Doit correspondre au role défini dans transmission workflow
  label:
    fr: Courriel du locataire
    en: Tenant's email
```

### `inline` — Groupe de composants sur une ligne
```yaml
- type: inline
  components:
    - type: text
      name: prenom
      label:
        fr: Prénom
        en: First name
    - type: text
      name: nom
      label:
        fr: Nom
        en: Last name
```

### `group` — Groupe de composants liés
```yaml
- type: group
  name: groupeInfo
  label:
    fr: Informations
    en: Information
  components:
    - type: text
      name: champDuGroupe
      label:
        fr: Champ
        en: Field
```

### `repeatableGroup` — Groupe répétable
```yaml
- type: repeatableGroup
  name: enfants
  label:
    fr: Enfants
    en: Children
  repeatable: true
  minimum: 0                # Nombre minimum d'instances
  limit: 5                  # Nombre maximum d'instances
  components:
    - type: text
      name: prenomEnfant
      label:
        fr: Prénom de l'enfant
        en: Child's first name
    - type: date
      name: dateNaissanceEnfant
      label:
        fr: Date de naissance
        en: Date of birth
```

---

## 5. Validation

> **Important :** La clé s'appelle `validations:` (avec s). `required` est **implicite** sur tous les champs — ne pas l'ajouter sauf pour le documenter explicitement. Pour rendre un champ optionnel, utiliser `optional:` sous `validations:`.


```yaml
validations:
#Ceci est la liste complète il n'existe pas d'autres validations dans FRW.
  required:                             # Implicite — tous les champs sont obligatoires par défaut
  optional:                             # Rend le champ optionnel (annule le required implicite)
  email:                                # Format courriel
  url:                                  # Format URL
  nas:                                  # NAS valide
  nam:                                  # NAM valide
  alpha:                                # Lettres uniquement
  alphanumeric:                         # Lettres et chiffres
  number:                               # Numérique
  min: 0                                # Valeur minimale (nombre) ou longueur minimale (texte)
  max: 100                              # Valeur maximale ou longueur maximale
  between: [1, 10]                      # Entre deux valeurs
  in: [valA, valB]                      # Doit être parmi ces valeurs
  not: valeurInterdite                  # Ne doit pas être cette valeur
  startsWith: "prefix"                  # Commence par
  endsWith: "suffix"                    # Finit par
  matches: autreChamp                   # Doit correspondre à un autre champ (confirmation)
  before: "2025-12-31"                  # Date avant (pour type: date)
  after: "2000-01-01"                   # Date après (pour type: date)
  avant: "autreChampDate"               # Avant la valeur d'un autre champ date
  accepted:                             # Doit être coché (checkbox)
  bail:                                 # Arrêter à la première erreur
  mime: application/pdf               # Types MIME autorisés (customfile), ne pas mettre sauf si demande explicite de l'utilisateur
  
  # Validation personnalisée
  monValidateur99custom:
    code: |
      (value) {
        return value.length > 3 || 'Minimum 4 caractères';
      }
```

### Messages de validation personnalisés
```yaml
messagesDeValidation:
  required:
    fr: Ce champ est obligatoire.
    en: This field is required.
  email:
    fr: Format courriel invalide.
    en: Invalid email format.
```

---

## 6. Domaines de valeurs

### Domaine statique dans `config.domaines`
```yaml
config:
  domaines:
    sports:
      Basketball:
        label:
          fr: Basketball
        mots-cles:
          fr: Jordan ballon
        v-if: "this.val('filtreSport') !== 'Raquette'"
      Tennis:
        label:
          fr: Tennis
```

### Shorthands intégrés
```yaml
options: yesno        # Oui / Non en français (et Yes / No si bilingue)
```

### Référence à un domaine `config.domaines`
```yaml
- type: radio
  name: sport
  options: sports              # Nom du domaine défini dans config.domaines
```

### Domaine externe (transmission requis)
```yaml
# Dans form.yml :
- type: listeDeroulante
  name: municipalite
  sourceExterne: municipalites   # Correspond à http_client_set dans transmission

# Dans transmission.yml :
# http_client_set:
#   municipalites: ...
```

---

## 7. Aiguillage

L'aiguillage détermine ce qui se passe quand l'utilisateur soumet le formulaire.

### Mode confirmation (défaut)
```yaml
config:
  aiguillage:
    choix:
      - mode: confirmation
```

### Mode formulaire (redirect vers autre formulaire)
```yaml
config:
  aiguillage:
    choix:
      - mode: formulaire
        formulaire: AUTRE_FORM    # Nom du répertoire du formulaire cible
        v-if: "this.val('typeChoix') === 'A'"
      - mode: confirmation
        # v-if absent = fallback par défaut
```

### Mode URL externe
```yaml
config:
  aiguillage:
    choix:
      - mode: url
        url: https://www.quebec.ca
        v-if: "this.val('choix') === 'externe'"
```

### Mode reprise (formulaire différé par courriel)
```yaml
config:
  aiguillage:
    choix:
      - mode: reprise
        formulaire: MON_FORM
        # Envoie un courriel avec lien de reprise à l'utilisateur
```

### Mode workflow
```yaml
config:
  aiguillage:
    choix:
      - mode: workflow
        workflow: idDuWorkflow    # Correspond à l'id dans transmission.yml
```

---

## 8. JavaScript injecté

### Méthodes custom
```yaml
config:
  injecterJs:
    method:
      ajouterJours:
        code: |
          (date, nbJours) {
            const d = new Date(date);
            d.setDate(d.getDate() + nbJours);
            return d;
          }
```

### Propriétés calculées (computed)
```yaml
    computed:
      totalMontants:
        code: |
          () {
            const a = parseFloat(this.val('montantA')) || 0;
            const b = parseFloat(this.val('montantB')) || 0;
            return (a + b).toFixed(2);
          }
```

### Watchers (réaction aux changements)
```yaml
    watch:
      totalMontants:
        code: |
          (value) {
            this.form.montantTotal = value;
          }
```

**API disponible dans les expressions JS :**
- `this.val('nomChamp')` — lire la valeur d'un champ
- `this.val('groupe.sousChamp', index)` — lire dans un groupe répétable
- `this.form.nomChamp = valeur` — écrire une valeur
- `this.wf.etape.nom` — nom de l'étape workflow courante

---

## 9. Workflows — filtreEtapes et courrielWorkflow

Dans un formulaire multi-étapes (workflow), filtrer la visibilité des sections/groupes par étape :

```yaml
form:
  sectionsGroup:
    - sectionGroup:
        fr: Informations locateur
      filtreEtapes:
        - initial:              # Visible à l'étape "initial" seulement
      sections:
        - section:
            fr: Coordonnées
          id: sectionCoordonnees
          filtreEtapes:
            - initial:
            - contributionSignature:
          components:
            - type: courrielWorkflow
              name: courrielLocataire
              role: locataire
              label:
                fr: Courriel du locataire
                en: Tenant's email
```

---

## 10. Section Révision (obligatoire)

La section de révision est **toujours la dernière section** d'un formulaire FRW. Elle affiche un message contextuel selon l'état de validation et permet à l'utilisateur de soumettre le formulaire.

### Structure complète

```yaml
- section:
    fr: Révision
    en: Revision
  id: revision
  cacherTexteExplicatifChampsObligatoires: true
  components:
    # État 1 — Formulaire jamais validé (état initial)
    - type: dynamic
      tag: div
      v-if: "val('EtatRevision') === 'initial'"
      classes: texte-revision
      text:
        fr: |
          Si vous n'avez pas peur, cliquez sur le bouton « Valider » afin de vérifier
          que le formulaire est rempli correctement.

    # État 2 — Validation réussie, aucune erreur
    - type: dynamic
      tag: div
      v-if: "val('EtatRevision') === 'sans-erreur'"
      classes: texte-revision
      text:
        fr: Tout est beau! Vous pouvez soumettre votre formulaire!

    # État 3 — Validation échouée, des erreurs sont présentes
    - type: dynamic
      tag: div
      v-if: "val('EtatRevision') === 'avec-erreur'"
      classes: texte-revision
      text:
        fr: |
          Des erreurs ont été détectées. Veuillez les corriger avant de soumettre
          votre formulaire.
```

### Propriétés de la section

| Propriété | Valeur | Obligatoire | Notes |
|---|---|---|---|
| `id` | `revision` | ✅ | Convention standard FRW — ne pas modifier |
| `cacherTexteExplicatifChampsObligatoires` | `true` | ✅ | Supprime le texte générique « * champ obligatoire » |
| `section.fr` | `Révision` | ✅ | Label affiché dans la navigation |
| `section.en` | `Revision` | — | Seulement si bilinguisme requis |

### États de `EtatRevision`

| Valeur | Quand | Rôle |
|---|---|---|
| `initial` | Chargement du formulaire, avant toute validation | Invite l'utilisateur à cliquer sur « Valider » |
| `sans-erreur` | Après validation sans aucune erreur | Autorise la soumission |
| `avec-erreur` | Après validation avec au moins une erreur | Invite à corriger avant de soumettre |

FRW gère automatiquement la transition entre ces états via son moteur de validation — **ne pas gérer `EtatRevision` manuellement**.

### Règles

- La section ne doit contenir **aucun composant interactif** (`text`, `radio`, `checkbox`, etc.) — uniquement des blocs `dynamic`.
- `v-if` utilise `val('EtatRevision')` — vérifier la version FRW cible (certaines versions requièrent `this.val()`).
- `classes: texte-revision` applique le style CSS standard de FRW pour ces messages — ne pas ometre.

### Erreurs fréquentes

| Erreur | Symptôme |
|---|---|
| `id` manquant ou différent de `revision` | Bouton de soumission absent ou mal positionné |
| `cacherTexteExplicatifChampsObligatoires` absent | Texte parasite « * champ obligatoire » affiché |
| Champs interactifs dans la section | Comportement de validation indéfini |
| Section pas en dernière position | Navigation incorrecte, soumission impossible |
