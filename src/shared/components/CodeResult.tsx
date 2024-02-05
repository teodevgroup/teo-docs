'use client'

import React, { ReactNode, Children, useState, cloneElement } from 'react'
import { styled } from '@linaria/react'
import { docFontFamily } from '../styles/theme'

type CodeResultProps = {
  name: string
  defaultOpen: boolean
  children: ReactNode
}

const CodeResultContainer = styled.div`
  border-radius: 8px;
  overflow: hidden;
  max-width: 580px;
  pre {
    border-radius: 0 !important;
  }
  div[data-rehype-pretty-code-fragment] {
    margin: 0 !important;
  }
`

const CodeResultButton = styled.div`
  cursor: pointer;
  width: 100%;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0.01em;
  padding-left: 24px;
  color: #718096;
  height: 24px;
  line-height: 24px;
  font-family: ${docFontFamily};
  background-color: ${props => props['data-use-dark'] ? "rgb(26,32,44)" : "#f6f8fa"};
  user-select: none;
`

const CodeResult = (props: CodeResultProps) => {
  const [show, setShow] = useState(props.defaultOpen)
  const children = Children.toArray(props.children)
  let lang = (Children.toArray((Children.toArray((Children.toArray((children[0] as any))[0] as any)) as any)[0].props.children)[0] as any).props['data-language']
  const dark = lang !== 'sh'
  return <CodeResultContainer>
    {children[0]}
    <CodeResultButton data-use-dark={dark} onClick={() => setShow(!show)}>{show ? "Hide" : "Show"} {props.name}</CodeResultButton>
    {show ? (dark ? cloneElement(children[1] as any, { "data-use-dark": "" }) : children[1]) : null}
  </CodeResultContainer>
}

export default CodeResult
