export function removeTrailingSlash (path: string): string {
    return path.replace(/[\/\\]$/, "")
}
