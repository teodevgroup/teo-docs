import { buildCommit } from '@teocloud/teo-docs-search-engine'
import generateFullTextIndex from './generateFullTextIndex'
import { generateToc } from './generateToc'
import { globSync } from 'glob'
import { generateBreadcrumb } from './generateBreadcrumb'
import fixWindowsPath from './fixWindowsPath'

export default function generateCaches() {
    globSync("./src/app/**/*.mdx").forEach((fileLocation) => {
        fileLocation = fixWindowsPath(fileLocation)
        generateFullTextIndex(fileLocation)
        generateToc(fileLocation)
        generateBreadcrumb(fileLocation)
    })
    buildCommit()
}