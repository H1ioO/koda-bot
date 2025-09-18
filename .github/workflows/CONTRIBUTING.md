# 🤝 Guide de Contribution - Koda Bot

Merci de votre intérêt pour contribuer à **Koda** ! Ce guide vous explique comment participer efficacement au développement du bot.

---

## 🚀 Démarrage rapide

### 1. **Fork & Clone**
```bash
# Fork le repository sur GitHub, puis :
git clone https://github.com/votre-username/koda-bot.git
cd koda-bot
```

### 2. **Installation**
```bash
npm install
```

### 3. **Configuration**
```bash
# Créez un fichier .env
TOKEN=votre_token_de_test
```

### 4. **Test**
```bash
npm start
```

---

## 📋 Types de contributions

| Type | Description | Labels |
|------|-------------|---------|
| 🐛 **Bug Fix** | Correction de bugs existants | `bug` |
| ✨ **Feature** | Nouvelles fonctionnalités | `enhancement` |
| 📚 **Documentation** | Amélioration docs/README | `documentation` |
| 🔨 **Refactor** | Amélioration du code existant | `refactor` |
| 🧪 **Tests** | Ajout/amélioration de tests | `tests` |

---

## 🛠️ Standards de développement

### **Code Style**
- **Indentation** : 4 espaces (pas de tabs)
- **Langue** : Commentaires et variables en français
- **Conventions** : camelCase pour les variables, PascalCase pour les classes

### **Structure des fichiers**
```javascript
// En-tête de fichier
const { ... } = require('discord.js');

module.exports = {
    name: 'commandName',
    description: "Description en français",
    aliases: ["alias1", "alias2"],
    go: async (client, db, message, args, prefix, color) => {
        // Logique de la commande
    }
}
```

### **Commit Messages**
```bash
# Format recommandé
[TYPE] Description courte en français

# Exemples
[FEAT] Ajout commande de modération
[FIX] Correction bug whitelist
[DOC] Mise à jour README
[REFACTOR] Optimisation événements antiraid
```

---

## 🔄 Processus de contribution

### **1. Avant de commencer**
- [ ] Vérifiez les issues existantes
- [ ] Ouvrez une issue pour discuter des gros changements
- [ ] Assurez-vous que personne d'autre ne travaille dessus

### **2. Développement**
```bash
# Créez une branche
git checkout -b feature/nouvelle-fonctionnalite

# Développez vos changements
# Testez localement

# Commitez vos changements
git add .
git commit -m "[FEAT] Description de votre changement"

# Poussez vers votre fork
git push origin feature/nouvelle-fonctionnalite
```

### **3. Pull Request**
- [ ] Utilisez le template de PR fourni
- [ ] Décrivez clairement vos changements
- [ ] Ajoutez des captures d'écran si pertinent
- [ ] Liez l'issue correspondante si applicable

---

## 🧪 Tests

### **Tests obligatoires**
- [ ] Le bot démarre sans erreur
- [ ] Toutes les commandes existantes fonctionnent
- [ ] Les nouvelles fonctionnalités marchent comme attendu
- [ ] Pas de régression sur les fonctionnalités existantes

### **Tests recommandés**
- [ ] Test sur serveur Discord privé
- [ ] Test avec différents niveaux de permissions
- [ ] Test des cas d'erreur
- [ ] Vérification des logs d'audit

---

## 📝 Rapporter des bugs

Utilisez le template d'issue **🐛 Rapport de Bug** et incluez :
- **Étapes de reproduction** détaillées
- **Logs d'erreur** complets
- **Version** de Node.js et Discord.js
- **Capture d'écran** si pertinent

---

## 💡 Proposer des fonctionnalités

Utilisez le template d'issue **✨ Demande de Fonctionnalité** et incluez :
- **Cas d'usage** concrets
- **Bénéfice** pour les utilisateurs
- **Interface** proposée (commandes, menus)
- **Complexité** estimée

---

## 🎯 Priorités actuelles

### **High Priority**
- 🔒 Amélioration de la sécurité antiraid
- 🎨 Interface utilisateur plus intuitive
- 📊 Système de statistiques

### **Medium Priority**
- 🌐 Support multi-langues
- ⚙️ Configuration avancée
- 📱 Compatibilité mobile

### **Low Priority**
- 🎵 Fonctionnalités de divertissement
- 🏆 Système de niveaux
- 📈 Analytics avancées

---

## 🚫 Ce qui ne sera PAS accepté

- ❌ Code non documenté ou difficile à comprendre
- ❌ Fonctionnalités qui violent les ToS de Discord
- ❌ Code non compatible avec Discord.js v14
- ❌ Changements cassant la compatibilité existante
- ❌ Ajout de dépendances lourdes non justifiées

---

## 🆘 Besoin d'aide ?

- 💬 **Questions** : Ouvrez une issue avec le template **❓ Question**
- 🐛 **Bugs** : Utilisez le template **🐛 Rapport de Bug**
- 💡 **Idées** : Partagez via le template **✨ Demande de Fonctionnalité**
- 📧 **Contact direct** : [@H1ioO](https://github.com/H1ioO)

---

## 📜 Code de conduite

- 🤝 **Respectueux** : Soyez respectueux envers tous les contributeurs
- 🎯 **Constructif** : Donnez des feedbacks constructifs
- 📚 **Patient** : Aidez les nouveaux contributeurs
- 🌟 **Professionnel** : Gardez un ton professionnel

---

**Merci de contribuer à Koda et d'aider la communauté Discord ! 🚀**

*Développé avec ❤️ par [@H1ioO](https://github.com/H1ioO)*
