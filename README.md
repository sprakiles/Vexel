# Vexel ✨

A sleek, powerful, and open-source visual builder for Discord embed messages. Craft beautiful and complex embeds with a live preview, and send them directly to your server via webhooks.

---

### Features

*   🎨 **Visual Builder:** An intuitive interface to build embeds piece by piece.
*   ⚡ **Live Preview:** See exactly how your message will look in Discord as you type.
*   🔗 **Webhook Integration:** Securely send your masterpiece to any Discord channel.
*   🔒 **Discord Authentication:** Sign in with your Discord account to track your stats.
*   📊 **User Stats:** See how many embeds and test messages you've sent.
*   😎 **Sleek UI:** A modern, dark-themed interface for Discord users.

### Tech Stack

-   **Frontend:** Vue.js with Vite & Tailwind CSS
-   **Backend:** Node.js with Express
-   **Database:** SQLite
-   **Authentication:** Discord OAuth2

---

### 🚀 Getting Started

#### 1. Prerequisites
-   Node.js (LTS)
-   A Discord account

#### 2. Discord Application Setup
1.  Go to the [Discord Developer Portal](https://discord.com/developers/applications) and create a **New Application**.
2.  Navigate to the **OAuth2** tab.
3.  Under **Redirects**, add this URL: `http://localhost:3000/api/auth/callback`
4.  Copy your **CLIENT ID** and **CLIENT SECRET**.

#### 3. Backend Setup
```bash
cd vexel-backend
npm install
cp .env.example .env
# Open .env and add your credentials
node server.js
```

#### 4. Frontend Setup
```bash
# In a new terminal
cd vexel-app
npm install
npm run dev
```

---

### 🤝 Contributing

Contributions are welcome. Please fork the repository and open a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/NewFeature`)
3.  Commit your Changes (`git commit -m 'Add some NewFeature'`)
4.  Push to the Branch (`git push origin feature/NewFeature`)
5.  Open a Pull Request

---

Built with ❤️ by [Mahmoud Eid Hosni](https://github.com/sprakiles)