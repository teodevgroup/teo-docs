'use server'

import { search } from '@teocloud/teo-docs-search-engine'
import { fetchToc } from '../../scripts/generateToc'
import { fetchBreadcrumb } from '../../scripts/generateBreadcrumb'
export interface SearchRecord {
    title: string
    urlPath: string
    breadcrumb: any
}

export default async function fetchSearchResult(query: string): Promise<SearchRecord[]> {
    
    const items = search(`"${query}"`)
    const result = items.map((item: any) => {
        const tocItem = fetchToc(item.urlPath)
        if (!tocItem) {
            return undefined
        }
        const breadcrumb = fetchBreadcrumb(item.urlPath)
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