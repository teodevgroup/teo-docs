import { globSync, writeFileSync } from 'fs'
import fixWindowsPath from './fixWindowsPath'
import fileLocationToUrlPath from './fileLocationToUrlPath'
import { generateTableOfContents } from './tableOfContents'
import { generateBreadcrumb } from './breadcrumb'
import type { OutlineCaches } from './outlineCaches'

class OutlineCachesBuilder {

  private caches: OutlineCaches

  constructor() {
    this.caches = {
      tableOfContents: { },
      breadcrumbs: { }
    }
  }
  
  build() {
    globSync("./src/app/**/*.mdx").forEach((fileLocation) => {
      fileLocation = fixWindowsPath(fileLocation)
      const urlPath = fileLocationToUrlPath(fileLocation)
      this.caches.tableOfContents[urlPath] = generateTableOfContents(fileLocation)
      this.caches.breadcrumbs[urlPath] = generateBreadcrumb(fileLocation)
    })
  }

  saveToDisk() {
    JSON.stringify(this.caches)
    writeFileSync(".outlineCaches.json", JSON.stringify(this.caches))
  }
}

export const outlineCachesBuilder = new OutlineCachesBuilder()
