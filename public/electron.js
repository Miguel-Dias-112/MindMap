const electron = require('electron');
const {ipcRenderer, ipcMain} = require('electron');
const { app } = electron;
const { BrowserWindow } = electron;
const path = require('path');
const isDev = require('electron-is-dev');

var mainWindow;


function fechar(){
  ipcRenderer.send('close-me')  
}


function createWindow() {
  mainWindow = new BrowserWindow({


    width:  800,
    height: 600,
    resizable:true,
    minWidth:800,
    minHeight:600,
    transparent:false,
    autoHideMenuBar:true,
    frame: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

 


  mainWindow.loadURL(
    isDev ? 'http://localhost:3000' : `file://${path.resolve(__dirname, '..', 'build', 'index.html')}`,
  );
 
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
 


  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
