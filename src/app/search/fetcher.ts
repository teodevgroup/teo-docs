'use server'

interface Record {
    fullpath: string
    urlPath: string
    content: string
}

export default async function fetchSearchResult(query: string): Promise<Record[]> {
    const items = global.docSearch(query)
    return items.map((item: any) => {
        return {
            fullpath: item.fullpath,
            urlPath: item.urlPath,
            content: item.content
        }
    })
}