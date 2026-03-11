import { BrowserWindow, app, ipcMain } from 'electron';
import path from 'path';
import { isDev } from './UtilityModules.js';
import { getUsages, getStaticInformation } from './ResourceMonitoring.js';
import { getPreloadPath } from './PathResolver.js';
app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: getPreloadPath()
        }
    });
    if (isDev())
        mainWindow.loadURL('http://localhost:5123');
    else
        mainWindow.loadFile(path.join(app.getAppPath(), 'dist-react/index.html'));
    getUsages(mainWindow.webContents);
    ipcMain.handle('getStaticInformation', getStaticInformation);
});
