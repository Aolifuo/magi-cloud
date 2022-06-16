const { 
  app, 
  BrowserWindow,
  ipcMain
} = require('electron')
const isDev = require('electron-is-dev');
const path = require('path');

let mainWin;
const createWindow = () => {

  mainWin = new BrowserWindow({
    minWidth: 1110,
    minHeight: 710,
    width: 1200,
    height: 800,
    transparent: true,
    resizable: true,
    frame: false,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js'),
    }
  })

  // mainWin.webContents.openDevTools({ mode: 'right' });
  isDev
    ? mainWin.loadURL('http://localhost:3002/')
    : mainWin.loadFile(path.join(__dirname, '../renderer/out/index.html'))
}

app.whenReady().then(() => {

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on('win-event', (event, msg) => {
  switch (msg) {
    case 'close':
      mainWin.close()
      break
    case 'maximize':
      mainWin.maximize()
      break
    case 'minimize':
      mainWin.minimize()
      break
    default:
      break
  }
})