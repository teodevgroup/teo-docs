'use client'

import { useEffect, useState } from "react"
import { FullWidthSearchInput } from "../../shared/components/Search"
import fetchSearchResult from "./fetcher"

const SearchPage = ({ searchParams }: {
    searchParams: { [key: string]: string | string[] | undefined }
}) => {
    const original = searchParams["q"] as string | undefined
    const [items, setItems] = useState([])
    useEffect(() => {
        if (original) {
            fetchSearchResult(original).then((result) => setItems(result))
        }
    }, [])
    if (original) {
        return <div style={{width: '100%'}}>
            <FullWidthSearchInput defaultValue={original as string | undefined} />
            <div>
                {items.map((item) => <div key={item.urlPath}>{item.urlPath}</div>)}
            </div>
        </div>
    } else {
        return <div style={{width: '100%'}}>
            <FullWidthSearchInput defaultValue={original as string | undefined} />
            <div>
    
            </div>
        </div>
    }
}

export default SearchPage