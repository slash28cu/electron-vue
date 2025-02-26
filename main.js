const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    fullscreen: true,
    width: 800,
    height: 480,
    minWidth: 800,
    minHeight: 480,
    maxWidth: 1024,
    maxHeight: 576,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (!app.isPackaged) {
    win.loadURL(`http://localhost:9000`);
    win.webContents.openDevTools({mode: 'undocked'});
  } else {
      win.loadFile("dist/index.html");
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
