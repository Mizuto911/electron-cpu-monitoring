type Usages = {
    cpuUsage: number, 
    ramUsage: number, 
    storageUsage:number,
}

type StaticInformation = {
    cpuModel: string,
    totalRAM: number,
    totalStorage: number
}

type EventPayloadMapping = {
    getUsages: Usages,
    getStaticInformation: StaticInformation
}

interface Window {
    electron: {
        getUsages: (callback: (stats: Usages) => void) => void,
        getStaticInformation: () => void,
    }
}