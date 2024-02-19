import { buildCommit } from '@teocloud/teo-docs-search-engine'
import generateFullTextIndex from './generateFullTextIndex.mjs'
import { generateToc } from './generateToc.mjs'
import { globSync } from 'glob'
import { generateBreadcrumb } from './generateBreadcrumb.mjs'

export function normalizePath(path) {
    return path.replace(/\\/g, '/');
}

export default function generateCaches() {
    globSync("./src/app/**/*.mdx").forEach((fileLocation) => {
        fileLocation = normalizePath(fileLocation);
        generateFullTextIndex(fileLocation)
        generateToc(fileLocation)
        generateBreadcrumb(fileLocation)
    })
    buildCommit()
}