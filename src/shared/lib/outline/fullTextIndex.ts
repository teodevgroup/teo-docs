import { readFileSync } from 'fs'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkMdx from 'remark-mdx'
import remarkRehype from 'remark-rehype'
import plainText from '../../../plugins/plainText'
import { Record, SearchIndex } from '@teodevgroup/teo-docs-search-engine'
import fileLocationToUrlPath from './fileLocationToUrlPath'

const pipeline = unified().use(remarkParse).use(remarkMdx).use(remarkRehype).use(plainText)

const records: Record[] = []

const searchIndex = new SearchIndex()

export function generateFullTextIndex(fileLocation: string) {
  const content = readFileSync(fileLocation).toString()
  const plainTextValue = pipeline.processSync(content).value as string
  const urlPath = fileLocationToUrlPath(fileLocation)
  records.push({ urlPath, content: plainTextValue, fileLocation })
}

export function commitFullTextIndex() {
  searchIndex.clear()
  searchIndex.insert(records)
}

export function searchFullTextIndex(text: string): Record[] {
  return searchIndex.search(text)
}