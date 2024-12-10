import { existsSync, readFileSync } from 'fs'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkMdx from 'remark-mdx'
import remarkRehype from 'remark-rehype'
import remarkFrontmatter from 'remark-frontmatter'
import { load } from 'js-yaml'

const pipeline = unified().use(remarkParse).use(remarkMdx).use(remarkRehype).use(remarkFrontmatter)

export default function extractFrontmatter(fileLocation: string, urlPath: string) {
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
    const base = load(parsed.children[0].value)
    if (base.orderHint === undefined) {
        return undefined
    }
    base.urlPath = urlPath
    return base
}
