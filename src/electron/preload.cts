import electron, { ipcRenderer } from 'electron';

electron.contextBridge.exposeInMainWorld('electron', {
    getUsages: (callback: (stats: Usages) => void) => ipcOn('getUsages', callback),
    getStaticInformation: () => ipcInvoke('getStaticInformation'),
});

function ipcOn<Key extends keyof EventPayloadMapping>(
    key: Key,
    handler: (data: EventPayloadMapping[Key]) => void
) {
    ipcRenderer.on(key, (_, data) => {
        handler(data);
    });
}

function ipcInvoke<Key extends keyof EventPayloadMapping>(
    key: Key
) {
    return ipcRenderer.invoke(key);
}