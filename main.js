const {app, BrowserWindow} = require('electron');

let mainWindow;

const createMainWindow = () => {
    mainWindow = new BrowserWindow({
        width: 500,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })
}