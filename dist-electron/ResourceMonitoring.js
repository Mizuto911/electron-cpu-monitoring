import osUtils from 'os-utils';
import fs from 'fs';
import os from 'os';
const DATA_INTERVAL = 500;
export function getUsages(webContents) {
    setInterval(async () => {
        const cpuUsage = await getCPUUsage();
        const ramUsage = getRAMUsage();
        const storageUsage = getStorageUsage().usage;
        webContents.send('getUsages', { cpuUsage, ramUsage, storageUsage });
    }, DATA_INTERVAL);
}
export function getStaticInformation() {
    const cpuModel = os.cpus()[0].model;
    const totalStorage = getStorageUsage().total;
    const totalRAM = Math.round(osUtils.totalmem() / 1024);
    return ({
        cpuModel, totalRAM, totalStorage
    });
}
function getCPUUsage() {
    return new Promise(resolve => {
        osUtils.cpuUsage(resolve);
    });
}
function getRAMUsage() {
    return 1 - osUtils.freememPercentage();
}
function getStorageUsage() {
    const stats = fs.statfsSync(process.platform === 'win32' ? 'C://' : '/');
    const total = stats.bsize * stats.blocks;
    const free = stats.bfree * stats.bsize;
    return ({
        total: Math.floor(total / 1_000_000_000),
        usage: 1 - free / total,
    });
}
