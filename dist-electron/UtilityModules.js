import { ipcMain } from "electron";
export function isDev() {
    return process.env.NODE_RUN_MODE === 'development';
}
export function ipcMainHandle(key, handler) {
    return ipcMain.handle(key, () => handler());
}
export function ipcWebContentSend(key, content, webContents) {
    webContents.send(key, content);
}
