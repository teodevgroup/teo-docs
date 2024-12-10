import { readFileSync } from 'fs'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkMdx from 'remark-mdx'
import remarkRehype from 'remark-rehype'
import plainText from '../../../plugins/plainText'
import { buildCommit, buildInsertRecord, Record, search } from '@teocloud/teo-docs-search-engine'
import fileLocationToUrlPath from './fileLocationToUrlPath'

const pipeline = unified().use(remarkParse).use(remarkMdx).use(remarkRehype).use(plainText)

export function generateFullTextIndex(filepath: string) {
  const content = readFileSync(filepath).toString()
  const plainTextValue = pipeline.processSync(content).value as string
  const urlPath = fileLocationToUrlPath(filepath)
  buildInsertRecord(filepath, urlPath, plainTextValue)
}

export function commitFullTextIndex() {
  buildCommit()
}

export function searchFullTextIndex(text: string): Record[] {
  return search(text)
}