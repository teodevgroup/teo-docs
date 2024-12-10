import extractFrontmatter from './extractFrontmatter'
import { globSync } from 'glob'
import fixWindowsPath from './fixWindowsPath'

const tocCaches = {}

export function generateToc(fileLocation: string) {
    const urlPath = fileLocation.replace(/^src[\/\\]app/, "").replace(/[\/\\]page.mdx$/, "")
    if (tocCaches[urlPath]) {
        return tocCaches[urlPath]
    }
    const frontmatterData = extractFrontmatter(fileLocation, urlPath)
    if (frontmatterData) {
        frontmatterData.children = globSync(fileLocation.replace(/page.mdx$/, "") + "*/page.mdx").map(fixWindowsPath).map(generateToc)
        frontmatterData.children = frontmatterData.children.filter((v) => v !== undefined)
        frontmatterData.children.sort((a, b) => (a.orderHint - b.orderHint) >> 31 | 1)
        tocCaches[urlPath] = frontmatterData
        return frontmatterData
    } else {
        return undefined
    }
}

export interface TocItem {
    title: string
    author: string
    urlPath: string
    orderHint: number
    children: TocItem[]
    time?: string
}

export function fetchToc(urlPath: string): TocItem {
    return tocCaches[urlPath.replace(/[\/\\]$/, "")]
}

export function fetchPrevNext(urlPath: string) {
    const pureUrlPath = urlPath.replace(/[\/\\]$/, "")
    const components = pureUrlPath.indexOf("\\") > -1 ? pureUrlPath.split('\\') : pureUrlPath.split('/')
    components.pop()
    const parentUrlPath = components.join("/")
    const parentItem = tocCaches[parentUrlPath]
    if (!parentItem) {
        return undefined
    }
    if (parentItem.children.length <= 1) {
        return undefined
    }
    const thisIndex = parentItem.children.findIndex((child) => child.urlPath === pureUrlPath)
    if (thisIndex === undefined) {
        return undefined
    }
    return {
        prev: thisIndex === 0 ? undefined : parentItem.children[thisIndex - 1],
        next: thisIndex === parentItem.children.length - 1 ? undefined: parentItem.children[thisIndex + 1],
    }
}