# Référence : *.transmission.yml

## Table des matières
1. [Structure et niveaux](#1-structure-et-niveaux)
2. [Tâches disponibles (`etapes`)](#2-tâches-disponibles-etapes)
3. [Gabarits de courriel (`gabaritsCourriels`)](#3-gabarits-de-courriel-gabaritscourriels)
4. [Client HTTP (`http_client`)](#4-client-http-http_client)
5. [Données externes (`http_client_set`)](#5-données-externes-http_client_set)
6. [Variables disponibles dans `http_client`](#6-variables-disponibles-dans-http_client)
7. [Workflows multi-étapes](#7-workflows-multi-étapes)
8. [Conditions dans envoyerCourriel](#8-conditions-dans-envoyercourriel)
9. [Exemple complet](#9-exemple-complet)

---

## 1. Structure et niveaux

```
mon-systeme/
├── default.v0.transmission.yml     # Niveau système (appliqué à tous les formulaires)
└── MON_FORM/
    └── MON_FORM.v0.transmission.yml # Niveau formulaire (écrase complètement les étapes système)
```

**Règle :** Si `etapes` est défini au niveau formulaire, il **remplace entièrement** celui du niveau système.
Les `http_client` se **cumulent** entre les niveaux.

---

## 2. Tâches disponibles (`etapes`)

L'ordre des tâches est important — le traitement les exécute dans l'ordre déclaré.

```yaml
etapes:

  # ── Génération de documents ──────────────────────────────────────────
  
  - tache: genererWord
    # Produit un PDF/DOCX à partir d'un gabarit Word (générique ou personnalisé)
    # INCOMPATIBLE avec genererPdf dans la même liste
    options:
      fichierBind: MON_FORM.v1.bind.yml   # Optionnel, utilise le bind par défaut sinon

  - tache: genererPdf
    # Remplit un gabarit PDF avec champs de saisie dynamiques
    # INCOMPATIBLE avec genererWord dans la même liste
    # Nécessite un fichier .bind.yml

  # ── Traitement des pièces jointes ────────────────────────────────────
  
  - tache: traiterDocumentsSoumis
    # Scan antivirus + préparation des fichiers joints par l'utilisateur
    # Requis si le formulaire contient des composants customfile
    options:
      desactiverEstampille: false         # true = pas d'estampille sur les PJ

  # ── Enrichissement des données ────────────────────────────────────────
  
  - tache: extraireQuestions
    # Ajoute toutes les questions du formulaire (bilingue) dans questionsFormulaire
    # Disponible depuis la version 2023.6

  # ── Estampille ────────────────────────────────────────────────────────
  
  - tache: ajouterEstampille
    # Appose l'estampille configurée dans le fichier .bind.yml sur le document produit

  # ── Courriels ─────────────────────────────────────────────────────────
  
  - tache: envoyerCourriel
    # Disponible depuis la release 2024.2
    # Ajouter une tâche par courriel différent à envoyer
    options:
      gabarit: confirmation               # Référence à gabaritsCourriels[].id
      afficherEstampille: true            # Utiliser la version estampillée des PJ
      filtresDocuments:
        - typeFiltre: nomOriginal
          valeurs: MonDocument.pdf        # Inclure ce document précis
        - typeFiltre: exclureNomOriginal
          valeurs: MonDocument.pdf        # Exclure ce document précis
        - typeFiltre: tacheSource
          valeurs: genererWord            # Tous les docs produits par genererWord
        - typeFiltre: tacheSource
          valeurs: traiterDocumentsSoumis # Toutes les PJ de l'utilisateur
        - typeFiltre: tacheSource
          valeurs: genererPDF
        - typeFiltre: metadonnee
          clee: TypeDocument
          valeurs:
            - INFOPERS
            - SANTE
      # Conditions d'envoi (ET ou OU, pas les deux simultanément)
      conditionsEt:
        - condition: '=='
          champFormulaire: 'donneesFormulaire.form.sexe'
          valeur: 'Masculin'
      # Parties variables utilisables dans le gabarit courriel
      partiesVariables:
        partie1: 'Valeur fixe'
        partie2: '{{donneesFormulaire.form.champDuFormulaire}}'

  # ── Conservation fichier ──────────────────────────────────────────────
  
  - tache: conserverFichier
    # Conserve une copie du fichier produit dans un répertoire interne
    # Requis pour le bouton de téléchargement après transmission (confirmationTransmission.telechargementCopieFormulaire)
    # Disponible depuis la release 2024.3

  # ── Appel API externe ─────────────────────────────────────────────────
  
  - tache: appelerServiceExterne
    options:
      client: nom_client_http             # Référence à http_client[nom]
      modeBoutonTesterTransmission: simuler  # ignorer | simuler | (absent = exécuter)

  # ── Expiration (workflows seulement) ──────────────────────────────────
  
  - tache: expirerFormulaire
    options:
      gabarit: formExpire                 # Gabarit courriel à envoyer à l'expiration
      delaiExpirationHeures: 48           # Délai avant expiration
      langue: fr
      conditionsEt:                       # Optionnel
        - condition: '=='
          champFormulaire: 'donneesFormulaire.form.champ'
          valeur: 'valeur'
```

---

## 3. Gabarits de courriel (`gabaritsCourriels`)

```yaml
gabaritsCourriels:
  - id: confirmation                      # Référencé dans envoyerCourriel.options.gabarit
    
    a:                                    # Destinataires
      tous:
        - 'nom@ministere.gouv.qc.ca'
        - '{{donneesFormulaire.form.champCourriel}}'
      unitaire:                           # Seulement en environnement unitaire
        - 'test@essais.mess.gouv.qc.ca'
      acceptation:
        - 'test-acc@essais.mess.gouv.qc.ca'
      production:
        - 'prod@ministere.gouv.qc.ca'
      techno:
        - 'dev@ministere.gouv.qc.ca'
    
    cc:                                   # Copies conformes
      tous:
        - 'cc@ministere.gouv.qc.ca'
    
    cci:                                  # Copies conformes invisibles
      tous:
        - 'cci@ministere.gouv.qc.ca'
        - '{{envoyerCourriel.partiesVariables.partie1}}'
    
    nomExpediteur: Mon Ministère          # Défaut : "Formulaires en ligne"
    retourA: '{{donneesFormulaire.form.champCourriel}}'
    
    objet: 'Confirmation - {{envoyerCourriel.partiesVariables.refDemande}}'
    
    corps: |
      <p>Votre demande a bien été reçue.</p>
      <p>Numéro de référence : {{noConfirmation}}</p>
      
      {{! Liste des pièces jointes téléchargeables }}
      <ul>
        {{#listePJ}}
        <li><a href="{{url}}">{{nomOriginal}}</a></li>
        {{/listePJ}}
      </ul>
      
      {{! Reçu Moneris (si paiement) }}
      {{#with donneesFormulaire.form.paiement}}
        <p>Montant payé : {{receipt.TransAmount}} $</p>
      {{/with}}
```

---

## 4. Client HTTP (`http_client`)

```yaml
http_client:
  mon_api:
    method: POST              # POST | PUT | PATCH | GET
    url: https://api.ministere.gouv.qc.ca/endpoint
    headers:
      Accept: application/json
      Content-Type: application/json
      Authorization: 'Bearer {{token}}'
    content:
      json_content: |
        {{{Json .}}}           # Dump complet de toutes les variables disponibles
        
        # OU structure personnalisée :
        {
          "noConfirmation": "{{noConfirmation}}",
          "langue": "{{langue}}",
          "formulaire": {{{Json donneesFormulaire.form}}},
          "documents": {{{Json documentsProduits}}}
        }
      
      check_response:
        throw_exception_if_body_not_contains_all:
          - success             # Valide que le retour contient ce mot
        throw_exception_if_body_contains_any:
          - error               # Lève une exception si le retour contient ce mot
    
    # Test de chaos (dev uniquement)
    chaos:
      enabled: false
      injection_rate_percentage: 100
      delay_milliseconds: 1500
      simulate_status_code: 500
```

---

## 5. Données externes (`http_client_set`)

Permet d'alimenter des listes déroulantes depuis des APIs externes.

```yaml
http_client_set:
  regions:                          # Nom de la source (référencé dans form.yml: sourceExterne: regions)
    sequence:
      - http_client: regions_api    # Référence à un http_client défini plus bas
    data_adapter:
      template: |
        {{> GenererDomaine items=regions_api.body.result.records value="{{{NO_REG_ADM}}}" label_fr="{{{DESCR}}}" label_en="{{{DESCR_EN}}}"}}

  municipalites:
    sequence:
      - http_client: municipalites_api
    data_adapter:
      template: |
        {{> GenererDomaine items=municipalites_api.body.result.records value="{{{mcode}}}" label_fr="{{{munnom}}}"}}

http_client:
  regions_api:
    method: GET
    url: 'https://www.donneesquebec.ca/recherche/api/3/action/datastore_search?resource_id=XXX'
    headers:
      Accept: application/json

  municipalites_api:
    method: GET
    # Utiliser input.donneesFormulaire.form.NomChamp pour filtrer par valeur d'un champ
    url: 'https://api.example.com/municipalites?region={{{input.donneesFormulaire.form.regionSelectionnee}}}'
    headers:
      Accept: application/json
```

**Note :** Pour les champs dans des groupes répétables, utiliser `input.donneesFormulaire.groupeCourant.NomChamp`.

---

## 6. Variables disponibles dans `http_client`

Syntaxe Mustache (`{{variable}}` ou `{{{variable}}}` pour non encodé).

| Variable | Type | Description |
|---|---|---|
| `langue` | `fr` / `en` | Langue du formulaire |
| `noFormulaire` | numérique | ID unique séquentiel du formulaire |
| `typeFormulaire` | string | Code du formulaire (ex: `FORM1234`) |
| `noConfirmation` | numérique | Numéro de confirmation (se termine par `311`) |
| `dateTransmission` | date | Moment de la transmission |
| `modeSimulation` | bool | `true` si bouton "Tester transmission" |
| `donneesFormulaire.form.*` | objet | Toutes les données saisies dans le formulaire |
| `donneesFormulaire.config.*` | objet | Configuration transmise |
| `documentsProduits` | liste | Documents PDF/Word générés (nom + base64) |
| `documentsSoumis` | dict | Pièces jointes de l'utilisateur (url, name, métadonnées) |
| `questionsFormulaire` | dict | Toutes les questions du formulaire (bilingue) |
| `IdUtilisateur` | string | Identifiant de l'utilisateur authentifié |
| `InformationsSupplementaires` | objet | Infos du pré-remplissage |

**Format date :** `{{FormatterDate DateTransmission "yyyy-MM-dd HH:mm:ss"}}`
**Dump JSON :** `{{{Json .}}}` ou `{{{Json monObjet}}}`

---

## 7. Workflows multi-étapes

Le workflow permet d'impliquer plusieurs participants.

```yaml
workflows:
  - id: monWorkflow               # Référencé dans form.yml: config.aiguillage.choix[].workflow
    roles:
      - id: initiateur            # Premier rôle = initiateur du formulaire
        label:
          fr: Demandeur
          en: Applicant
      - id: validateur
        label:
          fr: Validateur
          en: Validator
    
    etapes:
      # ── Étape initiale (toujours "initial") ──────────────────────────
      - id: initial
        evenements:
          quandQuelqunTransmet:   # Déclenché quand l'initiateur soumet
            
            - tache: interventionParticipant
              options:
                role: validateur
                vers: validation              # Étape destination du participant
                chargerCourrielsWorkflow: true  # Charge les courriels depuis courrielWorkflow
                modeBoutonTesterTransmission: simuler
            
            - tache: interventionParticipant
              options:
                role: initiateur
                chargerCourrielsWorkflow: true
                modeBoutonTesterTransmission: simuler
            
            - tache: envoyerCourrielParticipant
              options:
                role: validateur
                gabarit: demandeValidation
            
            - tache: expirerFormulaire
              options:
                gabarit: formExpire
                delaiExpirationHeures: 48
                langue: fr

      # ── Étapes intermédiaires ─────────────────────────────────────────
      - id: validation
        evenements:
          quandLeDernierTransmet:   # Quand TOUS les participants de cette étape ont transmis
            - tache: interventionParticipant
              options:
                role: initiateur
                vers: transmission
                chargerCourrielsWorkflow: true
                modeBoutonTesterTransmission: simuler
            - tache: envoyerCourrielParticipant
              options:
                role: initiateur
                gabarit: retourInitiateur
          
          # quandQuelqunTransmet:   # Quand N'IMPORTE QUEL participant transmet
          # quandQuelqunSoumets:    # Alternative selon version FRW

      # ── Étape finale (toujours "transmission") ────────────────────────
      - id: transmission
        evenements:
          quandQuelqunTransmet:
            - tache: genererWord
            - tache: traiterDocumentsSoumis
            - tache: ajouterEstampille
            - tache: appelerServiceExterne
              options:
                client: api_depot
                modeBoutonTesterTransmission: simuler
            - tache: envoyerCourrielParticipant
              options:
                role: initiateur
                gabarit: confirmationFinale
                filtresDocuments:
                  - typeFiltre: tacheSource
                    valeurs: genererWord

# Gabarits de courriel workflow
gabaritsCourriels:
  - id: demandeValidation
    a:
      tous:
        - '{{wf.participant.courriel}}'   # Courriel du participant courant
    objet: 'Votre validation est requise'
    corps: |
      <p>Bonjour,</p>
      <p>Veuillez <a href="{{wf.lien}}">cliquer ici</a> pour compléter votre section.</p>
  
  - id: formExpire
    a:
      tous:
        - '{{wf.participant.courriel}}'
    objet: 'Le formulaire a expiré'
    corps: <p>Le délai de réponse est dépassé.</p>
```

**Variables spéciales dans les gabarits workflow :**
- `{{wf.participant.courriel}}` — Courriel du participant destinataire
- `{{wf.lien}}` — Lien personnalisé vers le formulaire pour ce participant

---

## 8. Conditions dans envoyerCourriel

```yaml
- tache: envoyerCourriel
  options:
    gabarit: monGabarit
    conditionsEt:               # Toutes les conditions doivent être vraies
      - condition: '=='
        champFormulaire: 'donneesFormulaire.form.champChoix'
        valeur: 'valeurAttendue'
      - condition: '!='
        champFormulaire: 'donneesFormulaire.form.autreChamp'
        valeur: ''
      - condition: '=='
        champCalcule: "{{#ifCond donneesFormulaire.form.langue '==' 'fr'}}true{{/ifCond}}"
        valeur: true
    
    conditionsOu:               # Au moins une condition doit être vraie
      - condition: '=='
        champFormulaire: 'donneesFormulaire.form.sexe'
        valeur: 'Masculin'
      - condition: '=='
        champFormulaire: 'donneesFormulaire.form.sexe'
        valeur: 'Féminin'
```

**Opérateurs disponibles :** `==`, `!=`, `>`, `<`, `>=`, `<=`

---

## 9. Exemple complet

```yaml
# MON_FORM.v0.transmission.yml

etapes:
  - tache: genererPdf
  - tache: traiterDocumentsSoumis
  - tache: extraireQuestions
  - tache: ajouterEstampille
  - tache: envoyerCourriel
    options:
      gabarit: confirmation
      filtresDocuments:
        - typeFiltre: tacheSource
          valeurs: genererPDF
        - typeFiltre: tacheSource
          valeurs: traiterDocumentsSoumis
  - tache: conserverFichier
  - tache: appelerServiceExterne
    options:
      client: api_reception
      modeBoutonTesterTransmission: simuler

gabaritsCourriels:
  - id: confirmation
    a:
      tous:
        - '{{donneesFormulaire.form.courrielDemandeur}}'
    objet: 'Confirmation de votre demande no {{noConfirmation}}'
    corps: |
      <p>Votre demande a été transmise avec succès.</p>
      <p>Numéro de confirmation : <strong>{{noConfirmation}}</strong></p>
      <ul>
        {{#listePJ}}
        <li><a href="{{url}}">{{nomOriginal}}</a></li>
        {{/listePJ}}
      </ul>

http_client:
  api_reception:
    method: POST
    url: https://api.monsysteme.gouv.qc.ca/receptionFormulaire
    headers:
      Accept: application/json
      Content-Type: application/json
    content:
      json_content: |
        {
          "noConfirmation": "{{noConfirmation}}",
          "dateTransmission": "{{FormatterDate dateTransmission "yyyy-MM-dd"}}",
          "langue": "{{langue}}",
          "donnees": {{{Json donneesFormulaire.form}}},
          "documents": {{{Json documentsProduits}}}
        }
      check_response:
        throw_exception_if_body_not_contains_all:
          - success
```
