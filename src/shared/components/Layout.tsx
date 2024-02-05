import React, { ReactElement, ReactNode } from 'react'
import Head from 'next/head'
import { styled } from '@linaria/react'
import {
  contentFontStack,
  dark, darkBackground, darkContent, light, lightBackground, lightContent
} from '../styles/theme'

const LayoutContainer = styled.div`
:global {
  :root {
    --shiki-color-text: #1a202c;
    --shiki-color-background: #f6f8fa;
    --shiki-token-constant: #dd6b21;
    --shiki-token-string: #690;
    --shiki-token-comment: #718096;
    --shiki-token-keyword: #d5408c;
    --shiki-token-parameter: #9a6e3a;
    --shiki-token-function: #805ad5;
    --shiki-token-string-expression: #690;
    --shiki-token-punctuation: #319795;
    --shiki-token-link: #EE0000;
  }
  @font-face {
    font-family: Mont Trial;
    src: url(/fonts/Mont-Trial-Heavy.ttf);
    font-weight: bold;
  }
  @font-face {
    font-family: Mont Trial;
    src: url(/fonts/Mont-Trial-Regular.ttf);
    font-weight: normal;
  }
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    scroll-behavior: smooth;
    ${light} {
      background-color: ${lightBackground};
      color: ${lightContent};
    }
    /* ${dark} {
      background-color: ${darkBackground};
      color: ${darkContent};
    } */
    font-family: ${contentFontStack};
  }
  a {
    color: inherit;
    text-decoration: inherit;
  }
}
`

type LayoutProps = {
  children?: ReactNode
}

const Layout: (props: LayoutProps) => ReactElement = ({ children }) => {
  return <LayoutContainer>
    {children}
  </LayoutContainer>
}

export default Layout
