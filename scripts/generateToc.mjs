import extractFrontmatter from './extractFrontmatter.mjs'
import { globSync } from 'glob'

const tocCaches = {}

export function generateToc(fileLocation) {
    const urlPath = fileLocation.replace(/^src\/app/, "").replace(/\/page.mdx$/, "")
    if (tocCaches[urlPath]) {
        return tocCaches[urlPath]
    }
    const frontmatterData = extractFrontmatter(fileLocation, urlPath)
    if (frontmatterData) {
        frontmatterData.children = globSync(fileLocation.replace(/page.mdx$/, "") + "*/page.mdx").map(generateToc)
        frontmatterData.children = frontmatterData.children.filter((v) => v !== undefined)
        frontmatterData.children.sort((a, b) => (a.orderHint - b.orderHint) >> 31 | 1)
        tocCaches[urlPath] = frontmatterData
        return frontmatterData
    } else {
        return undefined
    }
}

export function fetchToc(urlPath) {
    return tocCaches[urlPath.replace(/\/$/, "")]
}