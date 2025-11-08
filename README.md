# MailWizard 🧙‍♂️

**Générez des réponses magiques à vos emails avec l'IA (100% gratuit)**

Une extension Chrome qui vous aide à rédiger des réponses intelligentes à vos emails Gmail en utilisant Google Gemini - totalement gratuit, aucune carte bancaire requise !

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Gemini](https://img.shields.io/badge/AI-Google%20Gemini-orange.svg)

---

## ✨ Fonctionnalités

- 🎯 **Intégration Gmail directe** - Bouton flottant + popup accessible
- ⚡ **Génération automatique** - Cliquez et votre réponse est générée
- 🎨 **5 tons disponibles** - Normal, Professionnel, Amical, Formel, Académique
- 🔄 **Régénération facile** - Changez le ton et régénérez instantanément
- 📋 **Copier en un clic** - Copiez la réponse dans votre presse-papier
- ✅ **Insertion automatique** - Collez directement dans Gmail
- 📚 **Historique** - Retrouvez vos réponses précédentes
- 🆓 **100% Gratuit** - Utilise Google Gemini (pas de carte bancaire)
- 🔒 **Sécurisé** - Votre clé API reste sur votre machine

---

## 🚀 Installation

### Étape 1 : Installer l'extension

1. **Téléchargez** le dossier `MailWizardAI`

2. **Ouvrez Chrome** et allez sur :
   ```
   chrome://extensions/
   ```

3. **Activez le "Mode développeur"** (coin supérieur droit)

4. **Cliquez sur "Charger l'extension non empaquetée"**

5. **Sélectionnez le dossier** `MailWizardAI`

6. ✅ L'extension est installée ! L'icône apparaît dans Chrome.

### Étape 2 : Obtenir votre clé API Gemini (gratuit)

1. Allez sur **[Google AI Studio](https://makersuite.google.com/app/apikey)**

2. Connectez-vous avec votre compte Google

3. Cliquez sur **"Create API Key"** (ou "Get API Key")

4. **Copiez la clé** générée

5. **Dans l'extension** :
   - Cliquez sur l'icône MailWizard
   - Allez dans l'onglet "Réglages"
   - Collez votre clé API
   - Cliquez sur "Sauvegarder la clé"

🎉 **C'est tout ! Vous êtes prêt !**

---

## 💡 Utilisation

### Méthode 1 : Via le bouton flottant (le plus rapide)

1. **Ouvrez un email** dans Gmail
2. **Cliquez sur le bouton flottant** "Répondre avec MailWizard" (en bas à droite)
3. **La popup s'ouvre** - cliquez sur "Générer une réponse magique"
4. **Choisissez une action** :
   - 🔄 **Régénérer** - Changez le ton ou ajoutez des instructions
   - 📋 **Copier** - Copie dans le presse-papier
   - ✅ **Coller dans Gmail** - Insère automatiquement la réponse

### Méthode 2 : Via l'icône de l'extension

1. **Ouvrez un email** dans Gmail
2. **Cliquez sur l'icône MailWizard** dans Chrome
3. Dans la popup, cliquez sur **"Générer une réponse magique"**
4. Utilisez les boutons **Régénérer / Copier / Coller**

### Personnaliser la réponse

#### Changer le ton
- **Normal** - Ton neutre et poli (par défaut)
- **Professionnel** - Formel et business
- **Amical** - Chaleureux et décontracté
- **Formel** - Très respectueux et officiel
- **Académique** - Précis et universitaire

#### Ajouter des instructions
Dans le champ "Instructions", vous pouvez ajouter :
- "Mentionner ma disponibilité mardi"
- "Rester bref, max 3 phrases"
- "Proposer un rendez-vous téléphonique"
- etc.

---

## 📚 Onglets de la popup

### 🎨 Générer (principal)
- Sélecteur de ton
- Champ instructions optionnel
- Bouton de génération
- Résultat avec actions (Régénérer/Copier/Coller)

### 🕐 Historique
- Liste des 50 dernières réponses générées
- Affichage minimaliste (2 premières lignes)
- Clic pour voir la réponse complète
- Filtre par ton et date

### ⚙️ Réglages
- Configuration de la clé API Gemini
- Guide d'obtention de la clé
- Effacer l'historique
- Informations sur la version

---

## 🎯 Cas d'usage

### 📧 Email professionnel
```
Email reçu: "Bonjour, j'aimerais discuter du projet..."
Ton: Professionnel
Résultat: Réponse formelle et structurée
```

### 🤝 Email amical
```
Email reçu: "Salut ! Ça te dit un café ?"
Ton: Amical
Résultat: Réponse chaleureuse et décontractée
```

### 🎓 Email académique
```
Email reçu: "Professeur, concernant le mémoire..."
Ton: Académique
Résultat: Réponse précise et respectueuse
```

---

## 🔧 Structure du projet

```
MailWizardAI/
├── manifest.json           # Configuration de l'extension
├── background/
│   └── background.js       # Service worker (API Gemini)
├── content/
│   └── content.js          # Injection dans Gmail
├── styles/
│   └── content.css         # Styles des éléments injectés
├── popup/
│   ├── popup.html          # Interface de la popup
│   ├── popup.css           # Styles de la popup
│   └── popup.js            # Logique de la popup
├── icons/                  # Icônes (16, 32, 48, 128px)
└── README.md               # Ce fichier
```

---

## 💰 Coûts et limites

### Google Gemini (gratuit)
- ✅ **100% gratuit**
- ✅ **Pas de carte bancaire**
- ✅ **60 requêtes par minute**
- ✅ **Qualité excellente**

Pour un usage normal (10-20 emails/jour), vous êtes largement dans les limites gratuites !

---

## 🛠️ Développement

### Technologies utilisées
- **Manifest V3** (dernière version Chrome)
- **Google Gemini Pro API** (IA gratuite)
- **Vanilla JavaScript** (pas de framework)
- **CSS moderne** (gradients, animations)

### Modifier l'extension

1. **Changer les tons** : Modifier `background/background.js` dans la fonction `buildPrompt()`
2. **Personnaliser le style** : Modifier `popup/popup.css` ou `styles/content.css`
3. **Ajouter des fonctionnalités** : Modifier `popup/popup.js` ou `content/content.js`

### Rechargement après modifications

1. Allez sur `chrome://extensions/`
2. Cliquez sur l'icône de rechargement (🔄)
3. Rechargez Gmail pour voir les changements

---

## ❓ FAQ

### L'extension ne fonctionne pas
- ✅ Vérifiez que vous êtes sur `mail.google.com`
- ✅ Vérifiez que vous avez configuré la clé API
- ✅ Rechargez la page Gmail
- ✅ Ouvrez un email avant de cliquer sur MailWizard

### Comment obtenir la clé API ?
Suivez le guide dans l'onglet "Réglages" de la popup ou allez sur [Google AI Studio](https://makersuite.google.com/app/apikey)

### La réponse ne correspond pas
- Changez le ton
- Ajoutez des instructions spécifiques
- Régénérez

### Le bouton flottant n'apparaît pas
- Assurez-vous d'avoir ouvert un email
- Attendez quelques secondes
- Rechargez la page

### C'est vraiment gratuit ?
OUI ! Google Gemini a un tier totalement gratuit sans carte bancaire requise.

---

## 🔮 Roadmap

### Version 1.1 (à venir)
- [ ] Support Outlook
- [ ] Templates personnalisables
- [ ] Raccourcis clavier
- [ ] Export de l'historique

### Version 1.2 (à venir)
- [ ] Mode sombre
- [ ] Support multi-langues
- [ ] Suggestions intelligentes
- [ ] Statistiques d'utilisation

---

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Signaler des bugs
- Proposer des améliorations
- Contribuer au code

---

## 📄 Licence

Ce projet est sous licence MIT - Libre d'utilisation et de modification.

---

## 💌 Support

Pour toute question ou problème :
- Ouvrez une issue sur GitHub
- Consultez la FAQ ci-dessus
- Vérifiez que votre clé API est bien configurée

---

**Créé avec ✨ et un peu de magie**

Profitez de MailWizard pour gagner du temps sur vos emails ! 🧙‍♂️📧