export default function fixWindowsPath(path) {
    return path.replace(/\\/g, '/');
}