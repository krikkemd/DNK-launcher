const { app, BrowserWindow, Menu } = require('electron');

function createWindow() {
  // Create the browser window
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app
  win.loadFile('index.html');
  win.maximize();
  win.on('close', () => {
    createWindow();
    console.log('recreate window');
  });
}

app.whenReady().then(createWindow);

// disable access to the menu
// const template = [];

// const menu = Menu.buildFromTemplate(template);
// Menu.setApplicationMenu(menu);
