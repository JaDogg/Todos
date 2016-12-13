var electron = require('electron');
var BrowserWindow = electron.BrowserWindow;
var app = electron.app;
var ipc = electron.ipcMain;


let appWindow;
app.on('ready', function () {

    appWindow = new BrowserWindow({show: false, width: 400, height: 500, maximizable: false});
    appWindow.loadURL('file://' + __dirname + '/app.html');

    appWindow.once('ready-to-show', function () {
        appWindow.show();
    });
    appWindow.setMenu(null);
});

app.on('window-all-closed', app.quit);
app.on('before-quit', () => {
    appWindow.removeAllListeners('close');
    appWindow.close();
});
