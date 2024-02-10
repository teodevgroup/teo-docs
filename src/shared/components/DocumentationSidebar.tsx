'use client'

import React, { ReactElement, ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'
import { styled } from '@linaria/react'
import { css } from '@linaria/core'
import { dark, darkHeadingBackgroundColor, docFontFamily, docTagBackgroundColor, docTagBackgroundColorDark, docTagColor, docTagColorDark, docTextColor, docTextColorDark, docTextSelectedColor, docTextUnselectedColor, exceptPhone, flexColumn, flexRow, light, margin, phone, spacing, tintColor } from '../styles/theme'
import { SearchInput, SearchIcon, SearchIconContainer } from './Search'
import fetchToc, { TocItem } from '../../shared/lib/fetchToc'
import BookIcon from './BookIcon'

const DocSidebarContainer = styled.div`
  ${exceptPhone} {
    display: block !important;
  }
  ${flexColumn('flex-start')};
  width: 232px;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  ${phone} {
    z-index: 1000;
    position: fixed;
    left: -1em;
    top: 0;
    padding-top: 96px;
    width: calc(100% + 2em);
    padding: 2em;
    height: 100vh;
    overflow-y: scroll;
    overflow-x: hidden;
    ${light} {
      background-color: #f8f8fa;
    }
    ${dark} {
      background-color: ${darkHeadingBackgroundColor};
    }
  }
`

const DocSidebarTitle = styled.div`
  font-family: ${docFontFamily};
  ${light} {
    color: ${docTextColor};
  }
  ${dark} {
    color: ${docTextColorDark};
  }
  font-size: 18px;
  font-weight: 600;
  margin: ${spacing * 3}px 0 ${spacing * 1.5}px 0;
`

const DocSidebarSectionTitle = styled.div`
  font-size: 12px;
  ${light} {
    color: ${docTextColor};
  }
  ${dark} {
    color: ${docTextColorDark};
  }
  text-transform: uppercase;
  margin-top: ${spacing}px;
  margin-bottom: ${spacing}px;
  font-weight: 600;
`

const DocSidebarItemTitleContainer = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: ${docTextUnselectedColor};
  ${flexColumn('flex-start')}
  justify-content: space-between;
  width: 100%;
  &:not(:last-child) {
    margin-bottom: ${spacing}px;
  }
`

const docSidebarItemTitleLinkClassName = css`
  display: flex;
  flex-grow: 1;
  align-items: stretch;
  justify-content: stretch;
  width: 100%;
`

const DocSidebarItemTitleLine = styled.div`
  position: relative;
  width: 100%;
  ${flexRow('center')}
  justify-content: space-between;
  cursor: pointer;
`

const DocSidebarItemTitleTime = styled.div`
  ${light} {
    color: ${docTagColor};
    background-color: ${docTagBackgroundColor};
  }
  ${dark} {
    color: ${docTagColorDark};
    background-color: ${docTagBackgroundColorDark};
  }
  text-transform: capitalize;
  font-size: 14px;
  font-weight: 500;
  padding: 2px 5px;
  border-radius: 5px;
`

const DocSidebarItemInner = styled.div`
  padding-left: ${spacing * 2.85}px;
  margin-left: -${spacing * 1.5}px;
  ${light} {
    border-left: 2px solid rgb(226, 232, 240);
  }
  ${dark} {
    border-left: 2px solid rgb(52, 54, 57);
  }
  margin-bottom: ${spacing * 1.5}px;
`

const DocSidebarItemIndicatorButton = styled.button`
  background: transparent;
  position: absolute;
  left: -15px;
  top: 4px;
  padding: 0px;
  border: 0px;
`

type DocSidebarItemIndicatorProps = {
  open: boolean
}

const DocSidebarItemIndicator: (props: DocSidebarItemIndicatorProps) => ReactElement = ({ open }) => {
  return <DocSidebarItemIndicatorButton>
    {!open ? <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0.724246C0 0.111374 0.681914 -0.223425 1.13107 0.168926L4.66916 3.25957C5.11028 3.6449 5.11028 4.3551 4.66916 4.74043L1.13107 7.83107C0.681913 8.22342 0 7.88863 0 7.27575V0.724246Z" fill="#A0AEC0"></path></svg> : <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="down open"><path d="M7.27575 0.5C7.88863 0.5 8.22342 1.18191 7.83107 1.63107L4.74043 5.16916C4.3551 5.61028 3.6449 5.61028 3.25957 5.16916L0.168926 1.63107C-0.223425 1.18191 0.111375 0.5 0.724247 0.5L7.27575 0.5Z" fill="#A0AEC0"></path></svg>}
  </DocSidebarItemIndicatorButton>
}

type DocSidebarItemProps = {
  children?: ReactNode,
  time?: string,
  link: string,
  title: string,
  path?: string,
}

const DocSidebarItem: (props: DocSidebarItemProps) => ReactElement = ({ link, children, time, title, path }) => {
  let open: boolean;
  if (children && path) {
    open = path.startsWith(link)
  } else {
    open = false
  }
  let selected: boolean;
  if (path) {
    selected = path === link
  } else {
    selected = false
  }
  return <>
    <DocSidebarItemTitleContainer>
      <Link href={link} className={docSidebarItemTitleLinkClassName}>
        <DocSidebarItemTitleLine className={selected ? css`
          color: ${docTextSelectedColor};
          font-weight: 600;
        ` : css`
          font-weight: 300;
        `}>
          {children ? <DocSidebarItemIndicator open={open} /> : null}
          <div>{title}</div>
          {time ? <DocSidebarItemTitleTime>{time}</DocSidebarItemTitleTime> : null}
        </DocSidebarItemTitleLine>
      </Link>
    </DocSidebarItemTitleContainer>
    {open ?
      <DocSidebarItemInner>
        {children}
      </DocSidebarItemInner>
    : null}
  </>
}

type DocumentationSidebarProps = {
  path: string
}

const renderChildren = (children: TocItem[], path: string) => {
  return children.map((child) => child.children.length ? <DocSidebarItem key={child.urlPath} path={path} link={child.urlPath} title={child.title} time={child.time}>
    {renderChildren(child.children, path)}
  </DocSidebarItem> : <DocSidebarItem key={child.urlPath} path={path} link={child.urlPath} title={child.title} time={child.time} />)
}

const SidebarWithToc: (props: { item: TocItem, path: string, phoneOpen?: boolean }) => ReactElement = (props) => {
  return <DocSidebarContainer style={{'display': props.phoneOpen ? "block" : "none"}}>
    <DocSideBarSearchInput />
    <DocSidebarTitle>{props.item.title}</DocSidebarTitle>
    {props.item.children.map((child) => {
      if (child.children.length) {
        return [
          <DocSidebarSectionTitle key="__sidebar__title">{child.title}</DocSidebarSectionTitle>,
          ...renderChildren(child.children, props.path)
        ]
      } else {
        return <DocSidebarItem key={child.urlPath} path={props.path} link={child.urlPath} title={child.title} time={child.time} />
      }
    })}
  </DocSidebarContainer>
}

const SidebarToggleButton = styled.div`
  ${exceptPhone} {
    display: none;
  }
  ${phone} {
    display: flex;
    position: fixed;
    top: 29px;
    right: calc(1em + 40px);
    z-index: 2000;
    align-items: center;
    justify-content: center;
  }
  cursor: pointer;
  ${light} {
    background-color: #f8f8fa;
  }
  ${dark} {
    background-color: ${darkHeadingBackgroundColor};
  }
  color: ${tintColor};
  width: 40px;
  height: 40px;
  border-radius: 20px;
`

export const DocumentationSidebar = (props: DocumentationSidebarProps) => {

  const [sidebarToc, setSidebarToc] = useState<undefined | TocItem>()
  const [sidebarVisible, setSidebarVisible] = useState(false)

  useEffect(() => {
    fetchToc(firstPathComponent(props.path)).then((result) => {
      setSidebarToc(result)
    })
  }, [])
  if (sidebarToc) {
    return [
      <SidebarToggleButton onClick={() => setSidebarVisible(!sidebarVisible)} key="sidebar-toggle-button">
        <BookIcon />
      </SidebarToggleButton>,
      <SidebarWithToc item={sidebarToc} path={props.path} key="sidebar" phoneOpen={sidebarVisible} />
    ]
  } else {
    return requiresSidebar(props.path) ? <DocSidebarContainer /> : <></>
  }
}

const requiresSidebar = (path: string) => {
  return path.startsWith('/guides') || path.startsWith('/getting-started') || path.startsWith('/concepts') || path.startsWith('/reference')
}

const firstPathComponent = (path: string) => {
  const components = path.split('/')
  if (components.length > 1) {
    return '/' + components[1]
  } else {
    return ''
  }
}

const DocSideBarInputContainer = styled.div`
  position: relative;
  margin-top: 44px;
`

const DocSideBarSearchInput = () => {
  return <DocSideBarInputContainer>
    <SearchInput placeholder='Search Docs...' onKeyUp={(e) => {
      if (e.key === 'Enter' || e.keyCode === 13) {
        location.href = `/search?q=${encodeURIComponent(e.currentTarget.value)}`
      }
    }} />
    <SearchIconContainer>
      <SearchIcon />
    </SearchIconContainer>
  </DocSideBarInputContainer> 
}
