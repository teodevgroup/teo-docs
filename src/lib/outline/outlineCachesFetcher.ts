import { readFileSync } from "fs"
import type { OutlineCaches } from "./outlineCaches"
import type { TableOfContentNode } from "./tableOfContents"
import { removeTrailingSlash } from "./removeTrailingSlash"
import type { Breadcrumbs } from "./breadcrumb"
import { PrevNext } from "./prevNext"

class OutlineCachesFetcher {
  
  private caches: OutlineCaches
  
  constructor() {
    const fileContentBuffer = readFileSync(".outlineCaches.json")
    const fileContent = fileContentBuffer.toString()
    this.caches = JSON.parse(fileContent)
  }
  
  tableOfContents(urlPath: string): TableOfContentNode | undefined {
    return this.caches.tableOfContents[removeTrailingSlash(urlPath)]
  }
  
  breadcrumbs(urlPath: string): Breadcrumbs | undefined {
    return this.caches.breadcrumbs[removeTrailingSlash(urlPath)]
  }
  
  prevNext(urlPath: string): PrevNext | undefined {
    const pureUrlPath = urlPath.replace(/[\/\\]$/, "")
    const components = pureUrlPath.indexOf("\\") > -1 ? pureUrlPath.split('\\') : pureUrlPath.split('/')
    components.pop()
    const parentUrlPath = components.join("/")
    const parentItem = this.tableOfContents[parentUrlPath]
    if (!parentItem) {
      return undefined
    }
    if (parentItem.children.length <= 1) {
      return undefined
    }
    const thisIndex = parentItem.children.findIndex((child) => child.urlPath === pureUrlPath)
    if (thisIndex === undefined) {
      return undefined
    }
    return {
      prev: thisIndex === 0 ? undefined : parentItem.children[thisIndex - 1],
      next: thisIndex === parentItem.children.length - 1 ? undefined: parentItem.children[thisIndex + 1],
    }
  }
}

export const outlineCachesFetcher = new OutlineCachesFetcher()
