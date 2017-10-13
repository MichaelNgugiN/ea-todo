// Handle Squirrel events for Windows immediately on start
if(require('electron-squirrel-startup')) return;

const electron = require('electron');
const {app} = electron;
const {BrowserWindow} = electron;
const {autoUpdater} = electron;
const {ipcMain} = electron;
const os = require('os');
const logger = require('winston');
const path = require('path')


logger.level = 'debug';
global.logger = logger;

// Keep reference of main window because of GC
var mainWindow = null;


// Quit when all windows are closed
app.on('window-all-closed', function() {
	app.quit();
});

// When application is ready, create application window
app.on('ready', function() {

    logger.debug("Starting application");

    // Create main window
    // Other options available at:
    // http://electron.atom.io/docs/latest/api/browser-window/#new-browserwindow-options
    mainWindow = new BrowserWindow({
        name: "ea-todo",
        width: 780,
        height: 600,
        toolbar: false,
				icon: path.join(__dirname,"assets/img/icon.ico")
    });

    // Target HTML file which will be opened in window
    mainWindow.loadURL('file://' + __dirname + "/index.html");

    // Uncomment to use Chrome developer tools
    // mainWindow.webContents.openDevTools({detach:true});

    // Cleanup when window is closed
    mainWindow.on('closed', function() {
        mainWindow = null;
    });


});
