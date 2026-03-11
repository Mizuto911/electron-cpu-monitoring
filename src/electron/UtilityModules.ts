export function isDev() {
    return process.env.NODE_RUN_MODE === 'development';
}