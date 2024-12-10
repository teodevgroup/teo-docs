export default function fixWindowsPath(path: string) {
    return path.replace(/\\/g, '/')
}