import { existsSync, readFileSync } from 'fs'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkMdx from 'remark-mdx'
import remarkRehype from 'remark-rehype'
import remarkFrontmatter from 'remark-frontmatter'
import { load } from 'js-yaml'
import fileLocationToUrlPath from './fileLocationToUrlPath'

/// The frontmatter data of a document
export type Frontmatter = {
    /// **Required** The title of the document
    title: string
    /// **Required** The author of the document
    author: string
    /// **Required** The position of the document in the list
    orderHint: number
    /// **Optional** The estimated reading time of the document
    readingTime: string | undefined
    /// **Leave it blank** URL path is installed by outline parser
    urlPath: string
}

const pipeline = unified().use(remarkParse).use(remarkMdx).use(remarkRehype).use(remarkFrontmatter)

export function extractFrontmatter(fileLocation: string): Frontmatter | undefined {
    if (!existsSync(fileLocation)) {
        return undefined
    }
    const content = readFileSync(fileLocation).toString()
    const parsed = pipeline.parse(content)
    if (!parsed.children) {
        return undefined
    }
    if (!parsed.children[0]) {
        return undefined
    }
    if (parsed.children[0].type !== 'yaml') {
        return undefined
    }
    const base: Partial<Frontmatter> = load(parsed.children[0].value)
    if (base.orderHint === undefined || base.title === undefined || base.author === undefined) {
        return undefined
    }
    base.urlPath = fileLocationToUrlPath(fileLocation)
    return base as Frontmatter
}
