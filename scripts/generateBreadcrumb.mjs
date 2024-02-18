import extractFrontmatter from './extractFrontmatter.mjs'

const breadcrumbCaches = {}

export function generateBreadcrumb(fileLocation) {
    const urlPath = fileLocation.replace(/^src[\/\\]app/, "").replace(/[\/\\]page.mdx$/, "")
    if (breadcrumbCaches[urlPath]) {
        return breadcrumbCaches[urlPath]
    }
    let result = []
    let fileLocationTokens = fileLocation.indexOf("\\") > -1 ? fileLocation.split('\\') : fileLocation.split('/')
    while (fileLocationTokens.length > 3) {
        fileLocationTokens.pop()
        fileLocationTokens.pop()
        fileLocationTokens.push('page.mdx')
        let prevFileLocation = fileLocationTokens.join('/')
        let prevUrlPath = prevFileLocation.replace(/^src[\/\\]app/, "").replace(/[\/\\]page.mdx$/, "")
        let data = extractFrontmatter(prevFileLocation, prevUrlPath)
        if (data) {
            result.unshift(data)
        } else {
            break
        }
    }
    if (result.length) {
        breadcrumbCaches[urlPath] = result
        return result
    } else {
        return undefined
    }
}

export function fetchBreadcrumb(urlPath) {
    return breadcrumbCaches[urlPath.replace(/[\/\\]$/, "")]
}