'use client'

import React, { ReactElement, ReactNode, Children, cloneElement, useState, useEffect } from 'react'
import { styled } from '@linaria/react'
import { css } from '@linaria/core'
import Constraint from './Constraint'
import { contentColor, docTitleFontFamily, flexColumn, flexRow, tintFontStack, margin, spacing, tagContentColor, codeFontStack, docFontFamily, contentFontStack, phone, tabletAndDesktop, anyDesktop, tintColor } from '../styles/theme'
import Layout from './Layout'
import Footer from './Footer'
import Heading from './Heading'
import Row from './Row'
import { MDXComponents } from 'mdx/types'
import { Clipboard, File, Hash } from 'react-feather'
import Image from 'next/image'

export const DocumentationContainer = styled.div`
  color: #40404c;
  ${flexColumn('center')}
  font-family: ${tintFontStack};
  justify-content: space-between;
`

export const DocumentationTitle = styled.h1`
  margin-top: ${margin * 4}px;
  text-align: center;
  width: 100%;
`

export const DocumentationNav = styled.div`
  margin: 0;
  padding: ${spacing}px;
  width: 100%;
  line-height: 32px;
  background-color: rgb(250,250,254);
  ${phone} {
    display: none;
  }
`

export const DocumentationNavConstraint = styled(Constraint)`
  ${flexRow('center')}
  justify-content: space-between;
`

type DocumentationNavItemProps = {
  selected: boolean
  children: ReactNode
}

export const DocumentationNavItemBase = styled.li`
  list-style: none;
  padding: 4px ${spacing}px;
  font-size: 16px;
  font-weight: 500;
  color: ${tagContentColor};
  &:not(:last-child) {
    margin-right: ${spacing * 3}px;
  }
`

export const DocumentationNavItem: (props: DocumentationNavItemProps) => ReactElement = ({ selected, children }) => {
  return <DocumentationNavItemBase style={selected ? {
    borderRadius: '5px',
    color: '#0052FF',
  } : undefined}>{children}</DocumentationNavItemBase>
}

export const DocumentationNavItemA = styled.a`
  color: unset;
  text-decoration: none;
`

export const DocumentationSearch = styled.input`
  outline: none;
  height: 32px;
  width: 320px;
  border: none;
  background-color: white;
  border-radius: 16px;
  font-size: 16px;
  padding: 0 16px;
  font-weight: 300;
`

export const DocumentationConstraint = styled(Constraint)`
`

export const DocumentationContent = styled.div`
  ${flexRow()}
  justify-content: flex-start;
  align-items: flex-start;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: row;
  font-family: ${tintFontStack};
  line-height: 24px;
  font-size: 16px;
  font-weight: 400;
  flex-grow: 0;
  flex-shrink: 4;
  justify-content: stretch;
  flex-grow: 1;
  padding-top: 28px;
  padding-bottom: 48px;

  aside {
    ${phone} {
      display: none;
    }
    width: 180px;
    overflow-y: auto;
    max-height: 100vh;
    position: sticky;
    right: 0;
    top: 0;
    flex-grow: 0;
    flex-shrink: 0;
    .title {
      margin-top: 20px;
      font-size: 0.875rem;
      text-transform: uppercase;
      font-weight: 600;
    }
    ul {
      list-style: none;
      padding: 0;
      text-decoration: none;
      color: rgb(113, 128, 150);
      font-size: 14px;
      font-weight: 300;
      li {
        padding: 0;
        margin-top: 4px;
        &.h3 {
          margin-left: 20px;
        }
        a {
          transition: background-size 0.7s ease 0s;
          background-size: 0% 2px;
          code {
            transition: background-color 0.7s ease 0s;
          }
        }
        &.selected {
          a {
            background-image: linear-gradient(#0c344b,#0c344b);
            background-position: 0% 100%;
            background-repeat: no-repeat;
            background-size: 100% 2px;
            code {
              background-color: #0c344b;
              color: #f7fafc;
              text-decoration: none;
            }
          }
        }
        code {
          font-feature-settings: "clig" 0,"calt" 0;
          display: inline;
          vertical-align: baseline;
          padding: 0.05em 0.3em 0.2em;
          background: rgb(237, 242, 247);
          font-size: 14px;
          border-radius: 5px;
          font-family: ${codeFontStack};
        }
      }
    }
  }

  article {
    overflow-x: hidden;
    overflow-y: auto;
    flex: 100 100 600px;
    ${tabletAndDesktop} {
      padding: 0 40px;
    }
    ${anyDesktop} {
      padding: 0 40px;
    }
    ${phone} {
      padding: 0;
    }
    table {
      ${tabletAndDesktop} {
        width: 100%;
        max-width: 580px;
      }
      ${anyDesktop} {
        width: 100%;
        max-width: 580px;
      }
      ${phone} {
        display: block;
        width: 100%;
      }
      overflow-x: scroll;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      border-spacing: 0;
      margin: 0 0 20px;
      white-space: inherit;
      word-break: normal;
      line-height: 1.2;
      font-weight: 400;
      * {
        font-size: 13px;
      }
      tr {
        th {
          font-size: 14px;
          font-weight: 600;
          padding: 12px;
          text-align: left;
        }
        td {
          border-top: 1px solid #e2e8f0;
          padding: 12px;
          vertical-align: top;
        }
      }
    }
    span.concept {
      display: inline-block;
      color: #3182ce;
      background-color: #bee3f8;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
      padding: 0 4px;
    }
    .breadcrumbs {
      display: block;
      color: rgb(113, 128, 150) !important;
      font-size: 16px;
      font-weight: 300;
      font-family: ${docFontFamily};
      .breadcrumb {
        display: inline;
        a {
          color: rgb(113, 128, 150);
          text-decoration: none;
          &:hover {
            color: #4A5568;
            text-decoration: underline;
          }
        }
      }
    }
    blockquote {
      margin: 0;
      padding-left: 20px;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        width: 8px;
        height: 100%;
        left: 0px;
        top: 0;
        border-radius: 5px;
        background: rgb(251, 211, 141) !important;
      }
      color: rgb(113, 128, 150);
      font-weight: 400;
    }
    h1 {
      font-size: 40px;
      margin: 0 0 30px 0;
      display: block;
      font-weight: bold;
      font-family: ${docTitleFontFamily};
      line-height: 1.2;
      &:first-child {
        margin-top: 8px;
      }
    }
    h2 {
      display: block;
      overflow: visible;
      position: relative;
      font-size: 24px;
      margin-top: 24px;
      font-weight: 600;
      font-family: ${docTitleFontFamily};
      &:hover {
        button {
          display: flex;
        }
      }
    }
    h3 {
      display: block;
      overflow: visible;
      position: relative;
      font-size: 18px;
      font-weight: 600;
      font-family: ${docTitleFontFamily};
      &:hover {
        button {
          display: flex;
        }
      }
    }
    h4 {
      display: block;
      overflow: visible;
      position: relative;
      font-family: ${docTitleFontFamily};
      font-weight: 600;
      &:hover {
        button {
          display: flex;
        }
      }
    }
    h5 {
      display: block;
      overflow: visible;
      position: relative;
      font-family: ${docTitleFontFamily};
      font-weight: 600;
      &:hover {
        button {
          display: flex;
        }
      }
    }
    h6 {
      display: block;
      overflow: visible;
      position: relative;
      &:hover {
        button {
          display: flex;
        }
      }
    }
    p {
      font-weight: 400;
      code {
        font-size: 14px;
      }
    }
    ul {
      list-style: none;
      padding: 0;
      margin-left: 24px;
      font-weight: 400;
      > li::before {
        content: " ";
        display: block;
        width: 6px;
        height: 6px;
        border-radius: 3px;
        background: rgb(160,174,192);
        position: absolute;
        left: -6px;
        top: 9px;
      }
    }
    li {
      margin-top: 10px;
      padding-left: 8px;
      position: relative;
      line-height: 1.5;
      code {
        font-size: 14px;
      }
    }
    a {
      color: #3182ce;
      text-decoration: underline;
    }
    code {
      display: inline;
      vertical-align: baseline;
      padding: 0.05em 0.3em 0.2em;
      background: rgb(237, 242, 247);
      border-radius: 5px;
    }
    [data-rehype-pretty-code-figure] {
      margin: 16px 0;
    }
    div[data-rehype-pretty-code-title] {
      font-size: 0.875rem;
      color: rgb(113, 128, 150);
      font-family: ${contentFontStack};
      font-weight: 600;
      margin-bottom: 4px;
    }
    [data-use-dark] {
      pre {
        background-color: rgb(26, 32, 44) !important;
        --shiki-color-text: #edf2f7;
        button {
          background-color: #2d3748;
        }
        code {
          --shiki-color-text: #edf2f7;
          [data-line]::before {
            color: #4a5568 !important;
          }
        }
      }
    }
    pre {
      margin: 0;
      font-family: ${codeFontStack};
      font-weight: 300;
      font-variant-ligatures: none;
      position: relative;
      background-color: #f6f8fa;
      border-radius: 8px;
      max-width: 580px;
      overflow: hidden;
      button {
        background-color: rgb(237, 242, 247);
      }
      &[data-language="sh"] {
        background-color: rgb(26, 32, 44) !important;
        --shiki-color-text: #edf2f7;
        button {
          background-color: #2d3748;
        }
      }
      code {
        font-size: 14px;
        font-family: ${codeFontStack};
        font-variant-ligatures: none;
        display: grid;
        background-color: transparent;
        border-radius: 0;
        color: rgb(237, 242, 247);
        padding: 16px 0;
        overflow-x: scroll;
        overflow-y: hidden;
        [data-language="sh"] {
          --shiki-color-text: #edf2f7;
        }
        [data-line] {
          padding: 0 48px 0 16px;
        }
        .highlighted {
          background: rgba(200,200,255,.1);
          border-left: 2px solid #60a5fa;
          padding-left: 14px;
        }
        .word {
          background: rgba(200,200,255,.15);
          padding: 0.25rem;
          border-radius: 0.25rem;
        }
      }
    }
    strong {
      font-weight: 600;
    }

    em {
      font-style: italic;
    }

    code {
      counter-reset: line;
      font-family: ${codeFontStack};
      font-variant-ligatures: none;
    }

    code[data-line-numbers] > [data-line]::before {
      counter-increment: line;
      content: counter(line);

      /* Other styling */
      display: inline-block;
      width: 1rem;
      margin-right: 1rem;
      text-align: right;
      color: rgb(203, 213, 224);
    }

    code[data-language="sh"] > [data-line]::before {
      content: "$ ";
      color: #4a5568;
    }

    div.prevNext {
      display: flex;
      align-items: stretch;
      flex-direction: row;
      margin-top: 64px;

      .label {
        margin: 0;
        font-size: 12px;
        font-weight: 600;
        color: rgb(113,128,150) !important;
        line-height: 1.4 !important;
      }
      .title {
        text-decoration: none;
        margin: 0;
        font-size: 14px;
        font-weight: 600;
        line-height: 1.4 !important;
        text-decoration: none !important;
      }
    }
    a.prev {
      display: flex;
      flex-grow: 1;
      flex-direction: column;
      margin-right: 12px;
      border: 1px solid #dadde1;
      border-radius: 0.4em;
      transition: all 0.2s ease-in-out 0s;
      &:hover {
        border-color: ${tintColor};
      }
      .label::before {
        margin-right: 4px;
        display: inline-block;
        content: ' ';
        width: 0; 
        height: 0;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent; 
        border-right: 6px solid #dadde1; 
      }
      padding: 16px;
      text-decoration: none !important;
    }
    a.next {
      display: flex;
      flex-grow: 1;
      flex-direction: column;
      align-items: flex-end;
      border: 1px solid #dadde1;
      border-radius: 0.4em;
      transition: all 0.2s ease-in-out 0s;
      .label::after {
        margin-left: 4px;
        display: inline-block;
        content: ' ';
        width: 0; 
        height: 0;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent; 
        border-left: 6px solid #dadde1; 
      }
      &:hover {
        border-color: ${tintColor};
      }
      padding: 16px;
      text-decoration: none !important;
    }
  }
`

type DocumentationLayoutProps = {
  path: string
  children: ReactNode
}

type AsideProps = {
  children: ReactNode
}

type PreProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLPreElement>, HTMLPreElement> & { 'data-copy': string }

type CopyButtonProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & { 'data-copy': string }

type DivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const CopyButton = (props: CopyButtonProps) => {
  return <button {...props} className={css`
    position: absolute;
    top: 16px;
    right: 16px;
    border: none;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    cursor: pointer;
    padding: 0;
  `} onClick={() => {
    navigator.clipboard.writeText(props['data-copy'])
  }}>
    <Clipboard className={css`color: rgb(160, 174, 192); width: 16px; height: 16px;`} />
  </button>
}

export const Pre = (props: PreProps) => {
  return <pre {...props}>
    {props.children}
    <CopyButton data-copy={props['data-copy']} />
  </pre>
}

export const Aside = (props: AsideProps) => {
  const [hash, setHash] = useState('')
  useEffect(() => {
    const headings = Array.prototype.slice.call(document.querySelectorAll('h2[id],h3[id]'))
    const handler = (e: Event) => {
      let cachedHash = ''
      for (let heading of headings) {
        const rect = heading.getBoundingClientRect()
        if (rect.top >= 1) {
          break
        } else {
          cachedHash = `#${heading.id}`
        }
      }
      setHash(cachedHash)
    }
    document.addEventListener('scroll', handler)
    return () => {
      document.removeEventListener('scroll', handler)
    }
  }, [])
  const children = Children.map(props.children, (c) => {
    if ((c as any).type && (c as any).type === 'ul') {
      return cloneElement(c as any, { children: Children.map((c as any).props.children, (c) => {
        if (c.props.children.props.href) {
          if (hash === c.props.children.props.href) {
            return cloneElement(c, {className: `${c.props.className} selected`})
          } else {
            return c
          }
        } else {
          return c
        }
      })})
    } else {
      return c
    }
  })
  return <aside>
    {children}
  </aside>
}

const CodeTitleContainer = styled.div`
  ${flexRow('center')}

`

const CodeTitle = (props: DivProps) => {
  return <CodeTitleContainer {...props}>
    <File size={16} className={css`
      margin-right: 4px;
    `} />
    {props.children}
  </CodeTitleContainer>
}

export const Div = (props: DivProps) => {
  if ((props as any)['data-rehype-pretty-code-title'] === '') {
    return <CodeTitle {...props}>
      {props.children}
    </CodeTitle>
  } else {
    return <div {...props}>
      {props.children}
    </div>
  }
}

const HeadingButton = styled.button`
  background-color: transparent;
  font-size: unset;
  border: none;
  user-select: none;
  padding: none;
  color: rgb(203,213,224);
  cursor: pointer;
  position: absolute;
  transform: translateX(-1.5em);
  align-items: center;
  justify-content: center;
  display: none;
`

type HeadingProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>

export const H2 = (props: HeadingProps) => {
  return <h2 {...props}>
    <HeadingButton onClick={() => window.location.hash = `#${props.id}`}>
      <Hash size={24} />
    </HeadingButton>
    {props.children}
  </h2>
}

export const H3 = (props: HeadingProps) => {
  return <h3 {...props}>
    <HeadingButton onClick={() => window.location.hash = `#${props.id}`}>
      <Hash size={18} />
    </HeadingButton>
    {props.children}
  </h3>
}

export const H4 = (props: HeadingProps) => {
  return <h4 {...props}>
    <HeadingButton onClick={() => window.location.hash = `#${props.id}`}>
      <Hash size={16} />
    </HeadingButton>
    {props.children}
  </h4>
}

export const H5 = (props: HeadingProps) => {
  return <h5 {...props}>
    <HeadingButton onClick={() => window.location.hash = `#${props.id}`}>
      <Hash size={14} />
    </HeadingButton>
    {props.children}
  </h5>
}

export const H6 = (props: HeadingProps) => {
  return <h6 {...props}>
    <HeadingButton onClick={() => window.location.hash = `#${props.id}`}>
      <Hash size={12} />
    </HeadingButton>
    {props.children}
  </h6>
}

export const DocumentationLayout = (props: DocumentationLayoutProps) => {
  return <Layout>
    <Heading />
    <DocumentationContainer>
      <DocumentationConstraint>
        <DocumentationContent>
          {props.children}
        </DocumentationContent>
      </DocumentationConstraint>
    </DocumentationContainer>
    <Footer />
  </Layout>
}
