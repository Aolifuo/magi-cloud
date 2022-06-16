const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  win: {
    close: () => ipcRenderer.send('win-event', 'close'),
    minimize: () => ipcRenderer.send('win-event', 'minimize'),
    maximize: () => ipcRenderer.send('win-event', 'maximize'),
  }
})