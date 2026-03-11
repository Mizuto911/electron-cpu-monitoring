import electron, { ipcRenderer } from 'electron';

electron.contextBridge.exposeInMainWorld('electron', {
    getUsages: (callback: (stats: any) => void) => ipcRenderer.on('getUsages', (_, data) => {
        callback(data);
    }),
    getStaticInformation: () => ipcRenderer.invoke('getStaticInformation'),
});