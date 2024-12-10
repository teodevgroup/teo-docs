import { join } from 'path'
import fileLocationToUrlPath from './fileLocationToUrlPath'
import { extractFrontmatter, Frontmatter } from './frontmatter'

export type Breadcrumbs = Frontmatter[]

export type BreadcrumbsMap = { [key: string]: Breadcrumbs }

const breadcrumbCaches: BreadcrumbsMap = { }

export function generateBreadcrumb(fileLocation: string): Breadcrumbs | undefined {
    const urlPath = fileLocationToUrlPath(fileLocation)
    if (breadcrumbCaches[urlPath]) {
        return breadcrumbCaches[urlPath]
    }
    let result = []
    let fileLocationTokens = fileLocation.indexOf("\\") > -1 ? fileLocation.split('\\') : fileLocation.split('/')
    while (fileLocationTokens.length > 3) {
        fileLocationTokens.pop()
        fileLocationTokens.pop()
        fileLocationTokens.push('page.mdx')
        let prevFileLocation = join(...fileLocationTokens)
        let data = extractFrontmatter(prevFileLocation)
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
