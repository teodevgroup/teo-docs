import { globSync, readFileSync } from 'fs'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkMdx from 'remark-mdx'
import remarkRehype from 'remark-rehype'
import plainText from '../../plugins/plainText'
import { Record, SearchIndex } from '@teodevgroup/teo-docs-search-engine'
import fileLocationToUrlPath from './outline/fileLocationToUrlPath'
import fixWindowsPath from './outline/fixWindowsPath'

const pipeline = unified().use(remarkParse).use(remarkMdx).use(remarkRehype).use(plainText)

const records: Record[] = []

const searchIndex = new SearchIndex(".fulltextcache")

let isFullTextIndexGenerated = false

function generateFullTextIndex() {
  globSync("./src/app/**/*.mdx").forEach((fileLocation) => {
    fileLocation = fixWindowsPath(fileLocation)
    generateFullTextIndexForFile(fileLocation)
  })
  commitFullTextIndex()
  isFullTextIndexGenerated = true
}

function generateFullTextIndexForFile(fileLocation: string) {
  const fileContent = readFileSync(fileLocation).toString()
  const content = pipeline.processSync(fileContent).value as string
  const urlPath = fileLocationToUrlPath(fileLocation)
  records.push({ urlPath, content, fileLocation })
}

function commitFullTextIndex() {
  searchIndex.clear()
  searchIndex.insert(records)
}

export function searchFullTextIndex(text: string): Record[] {
  if (!isFullTextIndexGenerated) {
    generateFullTextIndex()
  }
  return searchIndex.search(text)
}