'use server'

export interface TocItem {
    title: string
    author: string
    urlPath: string
    orderHint: number
    children: TocItem[]
    time?: string
}

export default async function fetchToc(path: string): Promise<TocItem | undefined> {
    return global.docFetchToc(path)
}