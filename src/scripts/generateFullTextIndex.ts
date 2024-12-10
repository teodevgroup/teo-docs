import { globSync } from 'glob'
import { dirname } from 'path'
import { readFileSync } from 'fs'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkMdx from 'remark-mdx'
import remarkRehype from 'remark-rehype'
import plainText from '../plugins/plainText'
import { buildInsertRecord } from '@teocloud/teo-docs-search-engine'

const pipeline = unified().use(remarkParse).use(remarkMdx).use(remarkRehype).use(plainText)

export default function generateFullTextIndex(filepath: string) {
    const urlPath = dirname(filepath).replace(/^src[\/\\]app/, "")
    const content = readFileSync(filepath).toString()
    const plainTextValue = pipeline.processSync(content).value as string
    buildInsertRecord(filepath, urlPath, plainTextValue)
}
