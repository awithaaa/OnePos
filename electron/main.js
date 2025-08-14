const { app, BrowserWindow } = require("electron");
const path = require("path");
const { spawn } = require("child_process");
const fetch = require("node-fetch");

let mainWindow;
let splashWindow;
let backendProcess;

function createSplash() {
  splashWindow = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,
    transparent: false,
    alwaysOnTop: true,
    center: true,
    icon:
      process.platform === "win32"
        ? path.join(__dirname, "icon.ico")
        : process.platform === "darwin"
        ? path.join(__dirname, "icon.icns")
        : path.join(__dirname, "icon.png"),
  });

  splashWindow.loadFile(path.join(__dirname, "splash.html"));
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    icon:
      process.platform === "win32"
        ? path.join(__dirname, "icon.ico")
        : process.platform === "darwin"
        ? path.join(__dirname, "icon.icns")
        : path.join(__dirname, "icon.png"),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.removeMenu();
  mainWindow.loadURL("http://localhost:5173");

  mainWindow.once("ready-to-show", () => {
    if (splashWindow) {
      splashWindow.destroy();
    }
    mainWindow.show();
  });

  mainWindow.on("closed", () => {
    if (backendProcess) backendProcess.kill();
  });
}

async function waitForServer(url, timeout = 15000, interval = 500) {
  const start = Date.now();

  while (Date.now() - start < timeout) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        return true;
      }
    } catch (e) {
      console.log(e);
    }
    await new Promise((r) => setTimeout(r, interval));
  }
  return false;
}

app.whenReady().then(async () => {
  createSplash();

  // Start backend
  const backendPath = path.join(__dirname, "../backend");
  backendProcess = spawn("npm", ["run", "start:dev"], {
    cwd: backendPath,
    shell: true,
    stdio: "inherit",
  });

  const backendReady = await waitForServer("http://localhost:8000/api");
  const frontendReady = await waitForServer("http://localhost:5173");

  if (backendReady && frontendReady) {
    createMainWindow();
  } else {
    console.error("Failed to connect to backend or frontend in time");
    app.quit();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
});
