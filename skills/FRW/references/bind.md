# Référence : *.bind.yml

## Table des matières
1. [Structure générale](#1-structure-générale)
2. [Bloc `config`](#2-bloc-config)
3. [Bloc `bundles`](#3-bloc-bundles)
4. [Bloc `templates`](#4-bloc-templates)
5. [Bloc `bind`](#5-bloc-bind)
6. [Syntaxe des formules](#6-syntaxe-des-formules)
7. [Conditions (conditionsEt / conditionsOu)](#7-conditions-conditionset--conditionsou)
8. [Estampille](#8-estampille)
9. [Accès aux données de tableaux / groupes répétables](#9-accès-aux-données-de-tableaux--groupes-répétables)

---

## 1. Structure générale

```yaml
config:         # (optionnel) options globales PDF
  formulaire:
    systeme: '510001'
    type: MON_FORM
  pdf:
    rapetisserTexteTropLong: true
    redirigerAnnexeTexteTroplong: true
    pourcentageDepassementAnnexe: 20
    verrouillerChampsPdf: true
    overrideTailleChampsAuto: 7

bundles:        # Fichiers en sortie
  - nomSortie: MonDocument.pdf
    templates:
      - idTemplate1

templates:      # Gabarits utilisés
  - id: idTemplate1
    name: Description (non utilisée au runtime)
    gabarit:
      fr: NomGabaritFR        # Sans extension, sans chemin
      en: NomGabaritEN
    conditionsEt: '{champBool}'
    toujoursProduire: false

bind:           # Association champs PDF ↔ données formulaire
  idTemplate1:
    NomChampPDF:
      champs:
        - champFormulaire
      formule: '{champFormulaire}'
```

---

## 2. Bloc `config`

Requis seulement pour gabarits PDF (pas Word).

```yaml
config:
  formulaire:
    systeme: '510001'       # ID système obtenu de l'équipe FRW
    type: MON_FORM          # Nom exact du répertoire du formulaire

  pdf:
    rapetisserTexteTropLong: true
      # Réduit automatiquement la police si le texte dépasse légèrement le champ PDF
    
    redirigerAnnexeTexteTroplong: true
      # Crée une annexe pour les textes qui dépassent vraiment le champ
    
    pourcentageDepassementAnnexe: 20
      # Seuil (%) : en dessous → rapetisser, au dessus → annexe
    
    verrouillerChampsPdf: true
      # Verrouille le PDF après remplissage
    
    overrideTailleChampsAuto: 7
      # Force la taille de police pour les champs à taille "auto"
```

---

## 3. Bloc `bundles`

Un bundle = un fichier PDF en sortie, composé d'un ou plusieurs templates.

```yaml
bundles:
  - nomSortie: Document Principal.pdf
    conditionsEt: '{typeDemande:neContientPas(Autre):false}'
    templates:
      - template1
      - template2
    estampille:
      # Voir section 8

  - nomSortie: Annexe
    conditionsOu: >-
      {champ1:cond:>=3?true|false}
      {champ2:cond:>=3?true|false}
    templates:
      - annexeTemplate
```

**Nom de sortie :**
- Avec gabarit Word → inclure l'extension (`.pdf` ou `.docx`)
- Avec gabarit PDF → sans extension (toujours produit en PDF)

**Ordre des bundles :** L'ordre dans la liste détermine l'ordre des fichiers produits.

---

## 4. Bloc `templates`

```yaml
templates:
  - id: template1                   # Référencé dans bundles.templates et bind
    name: Description lisible        # Ignoré au runtime, pour les humains
    gabarit:
      fr: NomGabaritFR_v1           # Nom sans extension, dossier Gabarits/
      en: NomGabaritEN_v1
    conditionsEt: '{champBool}'     # Condition pour inclure ce template dans le bundle
    conditionsOu: >-
      {champA}
      {champB}
    toujoursProduire: false         # true = produire même si aucun champ associé
                                    # (usage : documents informatifs)
    
    # Pour gabarits Word uniquement — exclure des champs :
    ignorer:
      - champ: NomChampFormulaire   # Exclut tous les champs commençant par ce nom
      - champ: AutreChamp
```

---

## 5. Bloc `bind`

Associe chaque champ du gabarit PDF à une ou plusieurs valeurs du formulaire.

```yaml
bind:
  template1:                        # Doit correspondre à l'id du template
    NomChampPDF:                    # Nom exact du champ dans le gabarit PDF
      champs:
        - champFormulaire           # Chemin vers la donnée du formulaire
        - autreChampFormulaire      # Si plusieurs champs, tous nécessaires pour la formule
      formule: '{champFormulaire}'  # (optionnel) Formule de mise en forme
```

**Chemins de données :**
- Simple : `nomChamp`
- Dans un groupe répétable : `listePersonnes.0.nom` (index base 0)
- Sous-champ d'adresse : `adresse.0.NoCivique`
- Boolean : `champ==true` ou `champ==false` (réduit à true/false pour checkboxes PDF)
- Égalité : `champ==valeur` (true si champ = valeur, pour cases à cocher PDF)
- Appartenance : `champ==valeurA` (vrai si la liste contient valeurA)

---

## 6. Syntaxe des formules

Les formules combinent et transforment les valeurs pour les insérer dans les champs PDF.

### Concaténation simple
```yaml
formule: '{prenom} {nom}'
formule: '{municipalite}, {province}'
```

### Condition ternaire (`{champ:condition:vraiValeur|fauxValeur}`)
```yaml
# Si champBool est truthy → affiche valeurSiVrai, sinon valeurSiFaux
formule: '{champBool:valeurSiVrai|valeurSiFaux}'

# Exemple — afficher le courriel du représentant ou du locataire
formule: '{questionRepresentant:{courrielRepresentant}|{courrielLocateur}}'

# Condition include (valeur contient la sous-chaîne)
formule: '{nbPieces:include(autre):{nbPiecesAutre}|{nbPieces}}'
```

### Modificateur `isnullOrEmpty`
```yaml
# Retourne false si vide/null, true si rempli (utile pour cases à cocher PDF)
formule: '{champ:isnullOrEmpty:false|true}'
```

### Formatage de date
```yaml
formule: '{dateChamp:dd          MM          yyyy}'
formule: '{dateChamp:yyyy-MM-dd}'
```

### Opérateur `cond`
```yaml
# {champ:cond:operateur?vraiValeur|fauxValeur}
formule: '{locateurs.Length:cond:>=3?true|false}'
```

### Modificateur `neContientPas`
```yaml
# (utilisé dans conditionsEt de bundle — pas dans formule bind directement)
conditionsEt: '{TypeDemande:neContientPas(Afdr):false}'
```

### Mustache pour l'estampille (`{{...}}`)
```yaml
lignes:
  - '{{NoConfirmation}}'
  - 'Réf : {{NoConfirmation}}'
  - '{{FormatterDate DateTransmission "yyyy-MM-dd HH:mm:ss"}}'
  - '{{{DonneesFormulaire.form.NomFamille}}}, {{{DonneesFormulaire.form.Prenom}}}'
```

---

## 7. Conditions (conditionsEt / conditionsOu)

Utilisées dans `bundles` et `templates` pour inclure/exclure conditionnellement.

**Logique :** Si la condition retourne une valeur **non vide et non false** → le bloc est **exclu**.
Si la condition retourne vide/falsy → le bloc est **inclus**.

```yaml
# conditionsEt : toutes les conditions doivent être vraies pour exclure
conditionsEt: '{champBool}'
conditionsEt: '{TypeDemande:neContientPas(Afdr):false}'

# conditionsOu : au moins une condition vraie pour inclure (logique OU d'inclusion)
conditionsOu: >-
  {locateurs.Length:cond:>=3?true|false}
  {locataires.Length:cond:>=3?true|false}

# Condition booléenne simple (valeur du formulaire)
conditionsEt: '{possedeServicesAdditionnels}'

# Ne pas confondre : vide = toujours inclus (pas de condition)
```

---

## 8. Estampille

L'estampille est un texte apposé par-dessus le PDF produit.

```yaml
bundles:
  - nomSortie: MonDoc.pdf
    templates:
      - template1
    estampille:
      coinAncrage: BasGauche      # BasGauche (défaut) | BasDroite | HautGauche | HautDroite
      positionX: 600              # Position en points depuis le coin d'ancrage
      positionY: 20
      tailleFont: 12              # Taille de la police
      rotation: 90               # Rotation en degrés (anti-horaire) ; 90 = vertical
      couleurRGBA:
        - 255                     # R
        - 0                       # G
        - 0                       # B
        # - 0.5                   # A (optionnel, transparence)
      toutesPages: true           # Apposer sur toutes les pages
      lignes:
        - '{{NoConfirmation}}'
        - 'Date : {{FormatterDate DateTransmission "yyyy-MM-dd"}}'
        - '{{{DonneesFormulaire.form.NomFamille}}}'
```

**Variables disponibles dans les lignes d'estampille :**
- `{{NoConfirmation}}` — Numéro de confirmation
- `{{FormatterDate DateTransmission "yyyy-MM-dd HH:mm:ss"}}` — Date de transmission formatée
- `{{{DonneesFormulaire.form.MonChamp}}}` — Valeur d'un champ du formulaire (triple accolades = non encodé HTML)
- Variables du pré-remplissage (ex: `{{estampille.texteAuthentification}}`)

---

## 9. Accès aux données de tableaux / groupes répétables

```yaml
bind:
  template1:
    # Premier élément d'un groupe répétable (index 0)
    NomChamp_1:
      champs:
        - locateurs.0.nom

    # Sous-objet d'adresse (lui-même dans un groupe répétable)
    Adresse_NoCivique:
      champs:
        - locateurs.0.adresse.0.NoCivique

    # Deuxième élément
    NomChamp_2:
      champs:
        - locateurs.1.nom

    # Longueur d'un tableau (pour les conditions)
    # Utilisé dans conditionsOu/Et : {locateurs.Length:cond:>=3?true|false}
```

**Champs d'adresse normalisée disponibles :**
`NoCivique`, `Appartement`, `Rue`, `Municipalite`, `Province`, `CodePostal`
