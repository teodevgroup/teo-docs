'use server'
import { searchFullTextIndex } from '../../lib/fullTextIndex'
import { outlineCachesFetcher } from '../../lib/outline/outlineCachesFetcher'

export interface SearchRecord {
    title: string
    urlPath: string
    breadcrumb: any
}

export default async function fetchSearchResult(query: string): Promise<SearchRecord[]> {
    const items = searchFullTextIndex(`"${query}"`)
    const result = items.map((item: any) => {
        const tocItem = outlineCachesFetcher.tableOfContents(item.urlPath)
        if (!tocItem) {
            return undefined
        }
        const breadcrumb = outlineCachesFetcher.breadcrumbs(item.urlPath)
        if (!breadcrumb || breadcrumb.length === 0) {
            return undefined
        }
        return {
            title: tocItem.title,
            urlPath: item.urlPath,
            breadcrumb,
        }
    })
    return result.filter((r) => r !== undefined)
}