import { buildCommit } from '@teocloud/teo-docs-search-engine'
import generateFullTextIndex from './generateFullTextIndex.mjs'
import { generateToc } from './generateToc.mjs'
import { globSync } from 'glob'

export default function generateCaches() {
    globSync("./src/app/**/*.mdx").forEach((fileLocation) => {
        generateFullTextIndex(fileLocation)
        generateToc(fileLocation)
    })
    buildCommit()
}