# 🧾 POS Desktop App

A modern desktop Point of Sale (POS) system built with:

- ⚛️ **React** (frontend)
- 🐈 **NestJS** (backend)
- 🖥 **Electron** (desktop wrapper)

> Designed for offline-friendly, fast, and modular retail use cases.

---

## 🏗 Project Structure

```
pos-desktop-app/
├── frontend/       # React app (TypeScript)
├── backend/        # NestJS app (API & DB)
├── electron/       # Electron config (main.js)
├── electron-start.js  # Helper script to launch app
├── package.json    # Combined project scripts
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/pos-desktop-app.git
cd pos-desktop-app
```

### 2. Install dependencies

#### React
```bash
cd frontend
npm install
```

#### Backend
```bash
cd ../backend
npm install
```

#### Electron
```bash
cd ../electron
npm install
```

### 3. Run in Development Mode

```bash
# From project root
npm run start:desktop
```

> This will:
> - Start the NestJS backend (`npm run start:dev`)
> - Open the Electron window with React frontend
> - Backend will run on `http://localhost:5000`
> - Frontend served from `http://localhost:3000`

---

## 🏁 Build for Production

```bash
# Build React frontend
cd frontend
npm run build

# (Optional) Compile NestJS backend (use tsconfig build)

# Then package with Electron Builder (coming soon)
```

---

## ⚙ Scripts (in root package.json)

```json
"scripts": {
  "start:desktop": "node electron-start.js"
}
```

---

## 📦 Future Features

- [ ] Offline-first storage (SQLite)
- [ ] Auth system (admin/staff)
- [ ] Inventory management
- [ ] Receipt printing
- [ ] Reports dashboard

---

## 📜 License

MIT License © 2025 Your Name