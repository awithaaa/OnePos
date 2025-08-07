const { app, BrowserWindow } = require("electron");
const path = require("path");
const { spawn } = require("child_process");

let mainWindow;
let backendProcess;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    title: "OnePos",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.removeMenu();
  // mainWindow.loadFile(path.join(__dirname, '../frontend/build/index.html'));
  mainWindow.loadURL("http://localhost:3000");

  // Start the backend
  const backendPath = path.join(__dirname, "../backend");
  backendProcess = spawn("npm", ["run", "start:dev"], {
    cwd: backendPath,
    shell: true,
    stdio: "inherit",
  });

  mainWindow.on("closed", () => {
    if (backendProcess) backendProcess.kill();
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
