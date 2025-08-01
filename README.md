# 📊 Custom View Counter For Profil Readme.md

# Deployed Software: 
## https://client-gold-psi.vercel.app/

## This Repository got Total Views : [![Profile Views](https://readme-view-counter.onrender.com/api/counters/7a09f175/badge)](https://github.com/your-username)

<p align="center">
  <a href="https://client-gold-psi.vercel.app/">
    <img src="https://raw.githubusercontent.com/AbhishekRDJ/readme-view-counter-/client/main/public/logo.png" alt="BlogSphere Logo" width="150"/>
  </a>
</p>

![BlogSpher Preview](https://raw.githubusercontent.com/AbhishekRDJ/readme-view-counter-/client/main/public/image.png)

> **Add real-time view counters to your GitHub profile with your own analytics dashboard!**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Render](https://img.shields.io/badge/Render-46E3B7?style=flat-square&logo=render&logoColor=white)](https://render.com)

**README View Counter** is a full-stack web application that generates dynamic SVG badges showing real-time view counts for your GitHub profile or any README file. Unlike static badges, these counters increment automatically every time someone views your profile!

![Demo GIF Placeholder](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=Demo+GIF+Coming+Soon)

## ✨ Features

🎯 **Dynamic View Tracking** - Real-time counter that increments on every badge view  
🎨 **Custom SVG Badges** - Clean, professional badges that match GitHub's aesthetic  
📊 **Your Own Analytics** - Full control over your view data (no third-party tracking)  
⚡ **Instant Setup** - Get your badge markdown in seconds  
🔧 **Flexible Integration** - Works with GitHub profiles, project READMEs, websites, and more  
🌐 **Open Source** - Fully transparent, customizable, and community-driven  

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- MongoDB Atlas account (free tier works)
- Render account for deployment (optional)

### Local Development

1. **Clone the repository**
   ```bash
   git clone git@github.com:AbhishekRDJ/readme-view-counter-.git
   cd readme-view-counter-
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd server
   npm install
   
   # Install frontend dependencies  
   cd ../client
   pnpm install
   or
   npm install
   or npm i
   ```

3. **Environment Setup**
   
   Create `.env` file in the `backend` directory:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/readme-counters
   BASE_URL=http://localhost:5000
   PORT=5000
   ```

4. **Run the application**
   ```bash
   # Terminal 1: Start backend server
   cd server
   npm run dev
   or node index.js
   
   # Terminal 2: Start frontend development server
   cd client
   pnpm run dev
   or
   npm run dev
   
   ```

5. **Open your browser**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

## 🌍 Deployment

### Deploy to Render (Recommended)

**Backend Deployment:**

1. Push your code to GitHub
2. Connect your GitHub repo to [Render](https://render.com)
3. Create a new **Web Service** with these settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment Variables:**
     ```
     MONGODB_URI=your_mongodb_atlas_connection_string
     BASE_URL=https://your-backend-url.onrender.com
     ```

**Frontend Deployment:**

1. Create another **Static Site** on Render:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`

### Alternative: Vercel

```bash
# Deploy frontend to Vercel
npm i -g vercel
cd client
vercel --prod
```

For backend, use Render or Railway as Vercel Serverless has limitations with persistent connections.

## 💡 Usage Example

### Step 1: Generate Your Badge

Visit the app and enter:
- **URL:** `https://github.com/yourusername`
- **Initial Count:** `0` (or your current view count)

### Step 2: Copy Your Badge Markdown

You'll receive something like:
```markdown
[![Profile Views](https://your-app.onrender.com/api/counters/abc12345/badge)](https://github.com/yourusername)
```

### Step 3: Add to Your README

Paste it anywhere in your GitHub profile README:

```markdown
# Hi there! 👋 I'm Your Name

[![Profile Views](https://your-app.onrender.com/api/counters/abc12345/badge)](https://github.com/yourusername)

Welcome to my GitHub profile...
```

### Result:
![Profile Views](https://img.shields.io/badge/views-1337-blue?style=flat-square)

*Every time someone visits your profile, the counter automatically increments!*

## 🏗️ Architecture

```
┌─────────────────┐    HTTP Requests    ┌──────────────────┐
│  GitHub Profile │ ───────────────────▶ │   Badge Endpoint │
│     README       │                     │   /api/counters  │
└─────────────────┘                     │   /:slug/badge   │
                                        └──────────────────┘
                                                 │
                                                 ▼
                                        ┌──────────────────┐
                                        │    MongoDB       │
                                        │   (View Counts)  │
                                        └──────────────────┘
                                                 ▲
                                                 │
┌─────────────────┐    Badge Creation    ┌──────────────────┐
│   React Frontend│ ───────────────────▶ │   Backend API    │
│   (User Input)  │                     │   (Badge Gen)    │
└─────────────────┘                     └──────────────────┘
```

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React + Vite | User interface for badge generation |
| **Backend** | Node.js + Express | API server and badge generation |
| **Database** | MongoDB Atlas | Store view counts and badge metadata |
| **Badge Creation** | badge-maker | Generate dynamic SVG badges |
| **Deployment** | Render | Host both frontend and backend |

## 📋 API Reference

### Create Counter
```http
POST /api/counters
Content-Type: application/json

{
  "url": "https://github.com/username",
  "initialCounter": 0
}
```

### Get Badge (Auto-increments)
```http
GET /api/counters/:slug/badge
```

### Manual Visit Count
```http
GET /api/counters/:slug/visit
```

## 🤝 Contributing

We love contributions! Here's how you can help:

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly  
4. Commit with conventional commits: `git commit -m 'feat: add amazing feature'`
5. Push to your fork: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Ideas for Contributions
- 🎨 **Custom badge styles** (different colors, shapes, themes)
- 📊 **Analytics dashboard** (view trends, geographic data)
- 🔒 **Authentication system** (user accounts, private counters)
- 🌍 **Multi-language support**
- 📱 **Mobile app** (React Native)
- 🔌 **API integrations** (Discord bots, Slack apps)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Show Your Support

If this project helped you, please consider:

- ⭐ **Starring the repository**
- 🐛 **Reporting bugs** or requesting features
- 💖 **Contributing code** or documentation
- 📢 **Sharing with fellow developers**

[![Profile Views](https://img.shields.io/badge/views-∞-brightgreen?style=flat-square&logo=github)](https://github.com/yourusername/readme-view-counter)

---

<div align="center">

**Made with ❤️ by the open-source community**

[🌐 Live Demo](https://your-app.onrender.com) • [📚 Documentation](https://github.com/yourusername/readme-view-counter/wiki) • [🐛 Report Bug](https://github.com/yourusername/readme-view-counter/issues) • [💡 Request Feature](https://github.com/yourusername/readme-view-counter/issues)

</div>
