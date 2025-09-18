# 🛡️ Koda - Bot Discord AntiRaid Professionnel

**Bot Discord antiraid** avancé développé en _JavaScript_ avec Discord.js v14.22.1 et QuickDB v9.1.7.

Créé par [@H1ioO](https://github.com/H1ioO) - Développeur **français** passionné par les bots Discord.

---

## ⚡ À propos de Koda

| 🔭 Ce que fait Koda           | Protection antiraid complète pour serveurs Discord        |
| ------------------------------ | ---------------------------------------------------------- |
| 🌱 Technologies utilisées     | Discord.js v14, QuickDB v9, Node.js                      |
| 👯 Parfait pour               | Admins de serveurs cherchant une protection robuste       |
| 💬 Besoin d'aide ?            | Contactez-moi sur **Discord** ou **GitHub** !            |

---

## 📂 Fonctionnalités principales

Voici les protections que **Koda** offre à votre serveur :

### 🔒 **Protection Antiraid Avancée**
* **Rôles** : Création, suppression, modification, permissions dangereuses
* **Salons** : Création, suppression, modification  
* **Serveur** : Modification des paramètres du serveur
* **Membres** : Bannissements, kicks, ajout de bots suspects
* **Messages** : Anti-spam, anti-ping (@everyone/@here), anti-pub (invitations)
* **Webhooks** : Détection et blocage de créations suspectes

### ⚙️ **Interface Moderne**
* **Menu interactif** avec boutons et sélecteurs Discord natifs
* **Configuration graphique** intuitive via `!setup`
* **Sanctions personnalisables** : Derank, Kick, Ban
* **Système de whitelist** pour contourner les protections
* **Logs détaillés** de toutes les actions antiraid

---

## 🛠 Installation & Configuration

### Prérequis
* **Node.js** v16.9.0+ 
* Bot Discord avec permissions administrateur

### Étapes d'installation

1. **Clonez le repository**
```bash
git clone https://github.com/H1ioO/koda-bot.git
cd koda-bot
```

2. **Installez les dépendances**
```bash
npm install
```

3. **Configuration des variables d'environnement**
```env
# Créez un fichier .env
TOKEN=votre_token_discord_ici
```

4. **Configurez le fichier config.js**
```javascript
module.exports = {
    token: process.env.TOKEN,
    prefix: "!",              // Votre préfixe
    color: Colors.Purple,     // Couleur des embeds
    owner: [
        "VOTRE_ID_DISCORD"    // Remplacez par votre ID
    ]
}
```

5. **Démarrez le bot**
```bash
npm start
```

---

## 🎛️ Commandes disponibles

| Commande | Alias | Description |
|----------|-------|-------------|
| `!setup` | `!antiraid` | Configuration complète de l'antiraid |
| `!whitelist` | `!wl` | Gestion de la whitelist antiraid |
| `!blacklist` | `!bl` | Gestion de la blacklist (owners) |
| `!owner` | - | Gestion des propriétaires du bot |
| `!eval` | - | Évaluation de code (owners uniquement) |
| `!help` | - | Affichage de l'aide |
| `!ping` | - | Latence du bot |

---

## 📁 Architecture du projet

```
koda-bot/
├── cmd/                   # 🎮 Commandes
│   ├── Antiraid/         #   • Configuration antiraid
│   ├── Misc/             #   • Commandes diverses
│   └── Owner/            #   • Commandes propriétaire
├── events/               # 🎯 Gestionnaires d'événements
│   ├── Anti-Raid/        #   • Événements de protection
│   └── Client/           #   • Événements du client
├── util/                 # 🔧 Utilitaires
├── config.js             # ⚙️ Configuration
├── index.js              # 🚀 Point d'entrée
└── package.json          # 📦 Dépendances
```

---

## 🌟 Pourquoi choisir Koda ?

* ✅ **15+ événements antiraid** protégés en temps réel
* ✅ **Interface utilisateur moderne** avec composants Discord v14
* ✅ **Base de données persistante** avec QuickDB
* ✅ **Code optimisé** et maintenu à jour
* ✅ **Protection du token** intégrée
* ✅ **Support français** par le développeur

---

## 🤝 Contribution & Support

N'hésitez pas à **contribuer** au projet :
1. ⭐ **Star** le repo si vous le trouvez utile !
2. 🍴 **Fork**, clone, proposez des améliorations
3. 🐛 **Signalez** les bugs via les Issues
4. 💡 **Partagez** vos idées d'amélioration

### 📫 Me contacter
* **GitHub** : [@H1ioO](https://github.com/H1ioO)
* **Profil** : [Configuration GitHub](https://github.com/H1ioO/H1ioO)
* Envoyez-moi un message pour discuter d'idées ou de collaborations !

---

## 🔗 Ressources utiles

* [Documentation Discord.js v14](https://discord.js.org/#/docs)
* [Documentation QuickDB](https://www.npmjs.com/package/quick.db)
* [Créer un bot Discord](https://discord.com/developers/applications)
* [Guide des permissions Discord](https://discord.com/developers/docs/topics/permissions)

---

**Développé avec ❤️ par [@H1ioO](https://github.com/H1ioO) pour la communauté Discord française**
