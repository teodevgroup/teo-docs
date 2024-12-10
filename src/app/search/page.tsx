'use server'
import { FullWidthSearchInput } from "../../shared/components/Search"
import fetchSearchResult from "./fetcher"
import { styled } from "@linaria/react"
import { dark, docFontFamily, docTitleFontFamily, light } from "../../shared/styles/theme"

const SearchRecordTitle = styled.a`
    font-size: 26px;
    font-weight: bold;
    font-family: ${docTitleFontFamily};
    line-height: 1.2;
    &:hover {
        text-decoration: underline;
    }
`

const SearchRecordView = styled.div`
    margin-top: 40px;
    display: block;
`

const SearchRecordBreadcrumbContainer = styled.div`
    display: flex;
    flex-direction: row;
    display: block;
    color: rgb(113, 128, 150)!important;
    font-size: 16px;
    font-weight: 300;
    font-family: ${docFontFamily};
    a {
        display: inline;
        &:hover {
            ${light} {
              color: #4A5568;
            }
            ${dark} {
              color: rgb(154, 177, 211);
            }
            text-decoration: underline;
        }
    }
`

const SearchPage = async ({ searchParams: searchParamsPromise }) => {
    const searchParams = await searchParamsPromise
    const original = searchParams["q"] as string | undefined
    const items = await fetchSearchResult(original)
    return <div style={{ width: '100%' }}>
        <FullWidthSearchInput defaultValue={original as string | undefined} />
        {items.map((item) => <SearchRecordView key={item.urlPath}>
            {item.breadcrumb ? <SearchRecordBreadcrumbContainer>
                {item.breadcrumb.map((data, index) => {
                    if (index !== item.breadcrumb.length - 1) {
                        return [
                            <a href={data.urlPath} key={data.urlPath}>{data.title}</a>,
                            <span> / </span>
                        ]
                    } else {
                        return <a href={data.urlPath}>{data.title}</a>
                    }
                })}
            </SearchRecordBreadcrumbContainer> : <></>}
            <SearchRecordTitle href={item.urlPath}>{item.title}</SearchRecordTitle>
        </SearchRecordView>)}
    </div>
}

export default SearchPage