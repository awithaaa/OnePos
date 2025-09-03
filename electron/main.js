const { app, BrowserWindow, ipcMain } = require("electron");
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
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
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

ipcMain.on("print-bill", (event, billId) => {
  console.log("Received print request for ID:", billId);
  const printWindow = new BrowserWindow({
    width: 600,
    height: 600,
    show: true,
    icon:
      process.platform === "win32"
        ? path.join(__dirname, "icon.ico")
        : process.platform === "darwin"
        ? path.join(__dirname, "icon.icns")
        : path.join(__dirname, "icon.png"),
    webPreferences: {
      contextIsolation: true,
    },
  });

  const printUrl = `http://localhost:5173/print-bill/${billId}`;
  printWindow.removeMenu();
  printWindow.loadURL(printUrl);

  printWindow.webContents.once("did-finish-load", () => {
    setTimeout(() => {
      printWindow.webContents.print({ silent: false }, (success, errorType) => {
        if (!success) console.log("Print failed:", errorType);
        printWindow.close();
      });
    }, 2000);
  });
});

async function waitForServer(url, timeout = 30000, interval = 500) {
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
