import fixWindowsPath from "./fixWindowsPath"

const fileLocationToUrlPath = (fileLocation: string): string => {
    return fixWindowsPath(fileLocation.replace(/^src[\/\\]app/, "").replace(/[\/\\]page.mdx$/, ""))
}

export default fileLocationToUrlPath