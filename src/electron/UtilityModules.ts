import { ipcMain, WebContents } from "electron";

export function isDev() {
    return process.env.NODE_RUN_MODE === 'development';
}

export function ipcMainHandle<Key extends keyof EventPayloadMapping>(
    key: Key,
    handler: () => EventPayloadMapping[Key]
) {
    return ipcMain.handle(key, () => handler());
}

export function ipcWebContentSend<Key extends keyof EventPayloadMapping>(
    key: Key,
    content: any,
    webContents: WebContents
) {
    webContents.send(key, content);
}