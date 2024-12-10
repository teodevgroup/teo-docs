import { extractFrontmatter, Frontmatter } from './frontmatter'
import { globSync } from 'fs'
import fixWindowsPath from './fixWindowsPath'
import fileLocationToUrlPath from './fileLocationToUrlPath'

export type TableOfContentNode = Frontmatter & {
    children: TableOfContentNode[]
}

export type TableOfContentMap = { [key: string]: TableOfContentNode }

const caches: TableOfContentMap = { }

export function generateTableOfContents(fileLocation: string): TableOfContentNode | undefined {
    const urlPath = fileLocationToUrlPath(fileLocation)
    if (caches[urlPath]) {
        return caches[urlPath]
    }
    const tableOfContentNode: TableOfContentNode = Object.assign({}, extractFrontmatter(fileLocation), { children: [] })
    if (tableOfContentNode) {
        tableOfContentNode.children = globSync(fileLocation.replace(/page.mdx$/, "") + "*/page.mdx").map(fixWindowsPath).map(generateTableOfContents)
        tableOfContentNode.children = tableOfContentNode.children.filter((v) => v !== undefined)
        tableOfContentNode.children.sort((a, b) => (a.orderHint - b.orderHint) >> 31 | 1)
        caches[urlPath] = tableOfContentNode
        return tableOfContentNode
    } else {
        return undefined
    }
}
