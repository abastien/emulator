import { app, BrowserWindow, Menu } from "electron";
import getMenuTemplate from "./menu";

const ElectronSquirrelStartup = require("electron-squirrel-startup");

declare const MAIN_WINDOW_WEBPACK_ENTRY: never;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (ElectronSquirrelStartup) {
  app.quit();
}

const createWindow = async (): Promise<void> => {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  Menu.setApplicationMenu(Menu.buildFromTemplate(getMenuTemplate(mainWindow)));
  await mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", async (): Promise<void> => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    await createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
