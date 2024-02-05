'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import { styled } from '@linaria/react'
import { docTitleFontFamily, flexRow } from '../../shared/styles/theme'
import { cx, css } from '@linaria/core'
import {
  CSharpLogo16, DartLogo16, KotlinLogo16, MongoDBLogo16,
  MySQLLogo16, NodeLogo16, PostgreSQLLogo16, PythonLogo16, RustLogo16,
  SQLiteLogo16, SwiftLogo16, TypeScriptLogo16
} from './Logos'
import VSpace from './VSpace'
import NoSSRWrapper from './NoSSRWrapper'

const serverKey = "serverSelector"
const databaseKey = "databaseSelector"
const clientKey = "clientSelector"
const savedSetStateCallbacks: any = {
  [serverKey]: [],
  [databaseKey]: [],
  [clientKey]: []
}

const usePreference = (name: string): [number, (value: number) => void] => {
  let saved = localStorage.getItem(name)
  if (!saved) {
    saved = '0'
  }
  let index = parseInt(saved)
  const [state, setState] = useState(index)
  useEffect(() => {
    savedSetStateCallbacks[name].push(setState);
    console.log(name, savedSetStateCallbacks[name].length)
    return () => {
      const index = savedSetStateCallbacks[name].indexOf(setState);
      savedSetStateCallbacks[name].splice(index, 1);
    };
}, [name]);
  const wrappedSetState = (newValue: number) => {
    localStorage.setItem(name, newValue.toString())
    for (const key in savedSetStateCallbacks[name]) {
      const setState = savedSetStateCallbacks[name][key];
      setState(newValue)
    }
  }
  return [state, wrappedSetState]
}

const SelectorContainer = styled.div`
  ${flexRow('stretch')}
  color: rgb(51, 51, 51);
  border-radius: 4px;
  border: 1px solid #eaecef;
  justify-content: stretch;
  align-items: stretch;
  height: 44px;
  overflow: hidden;
`

type SelectItemProps = {
  selected: boolean
  onClick: () => void
  children: ReactNode
  disabled?: boolean
}

const SelectItem = (props: SelectItemProps) => {
  return <div onClick={() => {
    if (!props.disabled) {
      props.onClick()
    }
  }} className={cx(css`
    ${flexRow('center')}
    justify-content: center;
    align-items: center;
    cursor: pointer;
    flex: 1 1 0px;
    transition: 0.2s all ease-in-out 0s;
    :hover {
      background-color: #fafafc;
    }
    :not(:last-child) {
      border-right: 1px solid #eaecef;
    }
  `, props.selected ? css`
    background-color: #eaecef;
    :hover {
      background-color: #eaecef;
    }
  ` : css`
    background-color: transparent;
  `, props.disabled ? css`
    opacity: 0.5;
  ` : css``)}>{props.children}</div>
}

const SelectItemIcon = styled.div`
  ${flexRow('center')}
  margin-right: 8px;
`

const SelectItemTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
`

export const ServerSelectorComponent = () => {
  const [index, setIndex] = usePreference(serverKey);

  return <SelectorContainer>
    <SelectItem onClick={() => setIndex(0)} selected={index === 0}>
      <SelectItemIcon>
        <RustLogo16 />
      </SelectItemIcon>
      <SelectItemTitle>Rust</SelectItemTitle>
    </SelectItem>
    <SelectItem disabled={true} onClick={() => setIndex(1)} selected={index === 1}>
      <SelectItemIcon>
        <NodeLogo16 />
      </SelectItemIcon>
      <SelectItemTitle>Node.js</SelectItemTitle>
    </SelectItem>
    <SelectItem disabled={true} onClick={() => setIndex(2)} selected={index === 2}>
      <SelectItemIcon>
        <PythonLogo16 />
      </SelectItemIcon>
      <SelectItemTitle>Python</SelectItemTitle>
    </SelectItem>
  </SelectorContainer>
}

export const ServerSelector = () => {
  return <NoSSRWrapper>
    <ServerSelectorComponent />
  </NoSSRWrapper>
}

const DatabaseSelectorComponent = () => {
  const [index, setIndex] = usePreference(databaseKey);
  return <SelectorContainer>
    <SelectItem onClick={() => setIndex(0)} selected={index === 0}>
      <SelectItemIcon>
        <MySQLLogo16 />
      </SelectItemIcon>
      <SelectItemTitle>MySQL</SelectItemTitle>
    </SelectItem>
    <SelectItem onClick={() => setIndex(1)} selected={index === 1}>
      <SelectItemIcon>
        <PostgreSQLLogo16 />
      </SelectItemIcon>
      <SelectItemTitle>PostgreSQL</SelectItemTitle>
    </SelectItem>
    <SelectItem onClick={() => setIndex(2)} selected={index === 2}>
      <SelectItemIcon>
        <SQLiteLogo16 />
      </SelectItemIcon>
      <SelectItemTitle>SQLite</SelectItemTitle>
    </SelectItem>
    <SelectItem onClick={() => setIndex(3)} selected={index === 3}>
      <SelectItemIcon>
        <MongoDBLogo16 />
      </SelectItemIcon>
      <SelectItemTitle>MongoDB</SelectItemTitle>
    </SelectItem>
  </SelectorContainer>
}

export const DatabaseSelector = () => {
  return <NoSSRWrapper>
    <DatabaseSelectorComponent />
  </NoSSRWrapper>
}

const ClientSelectorComponent = () => {
  const [index, setIndex] = usePreference(clientKey);
  return <SelectorContainer>
    <SelectItem onClick={() => setIndex(0)} selected={index === 0}>
      <SelectItemIcon>
        <TypeScriptLogo16 />
      </SelectItemIcon>
      <SelectItemTitle>TypeScript</SelectItemTitle>
    </SelectItem>
    <SelectItem disabled={true} onClick={() => setIndex(1)} selected={index === 1}>
      <SelectItemIcon>
        <SwiftLogo16 />
      </SelectItemIcon>
      <SelectItemTitle>Swift</SelectItemTitle>
    </SelectItem>
    <SelectItem disabled={true} onClick={() => setIndex(2)} selected={index === 2}>
      <SelectItemIcon>
        <KotlinLogo16 />
      </SelectItemIcon>
      <SelectItemTitle>Kotlin</SelectItemTitle>
    </SelectItem>
    <SelectItem disabled={true} onClick={() => setIndex(3)} selected={index === 3}>
      <SelectItemIcon>
        <CSharpLogo16 />
      </SelectItemIcon>
      <SelectItemTitle>C#</SelectItemTitle>
    </SelectItem>
    <SelectItem disabled={true} onClick={() => setIndex(4)} selected={index === 4}>
      <SelectItemIcon>
        <DartLogo16 />
      </SelectItemIcon>
      <SelectItemTitle>Dart</SelectItemTitle>
    </SelectItem>
  </SelectorContainer>
}

export const ClientSelector = () => {
  return <NoSSRWrapper>
    <ClientSelectorComponent />
  </NoSSRWrapper>
}

const SelectorHeading = styled.div`
  margin-bottom: 8px;
  font-weight: 500;
  font-family: ${docTitleFontFamily};
`

export const TripleSelector = () => {
  return <>
    <VSpace height={8} />
    <SelectorHeading>Select a server language</SelectorHeading>
    <ServerSelector />
    <VSpace height={20} />
    <SelectorHeading>Select a database</SelectorHeading>
    <DatabaseSelector />
    <VSpace height={20} />
    <SelectorHeading>Select a client language</SelectorHeading>
    <ClientSelector />
    <VSpace height={20} />
  </>
}

type OptionalDocProps = {
  children: ReactNode
}

const show = css`display: block;`
const hide = css`display: none;`

const MakeDocBlockInner = (name: string, key: string, indexes: number[]) => {
  const DocBlock = (props: OptionalDocProps) => {
    const [index] = usePreference(key)
    return <div className={indexes.includes(index) ? show : hide}>{props.children}</div>
  }
  DocBlock.displayName = name
  return DocBlock
}

const MakeDocBlock = (name: string, key: string, indexes: number[]) => {
  const Inner = MakeDocBlockInner(name, key, indexes);
  const DocBlock = (props: OptionalDocProps) => {
    return <NoSSRWrapper>
      <Inner {...props} />
    </NoSSRWrapper>
  }
  DocBlock.displayName = name
  return DocBlock
}

export const RustDoc = MakeDocBlock("RustDoc", serverKey, [0])
export const NodeJSDoc = MakeDocBlock("NodeJSDoc", serverKey, [1])
export const PythonDoc = MakeDocBlock("PythonDoc", serverKey, [2])
export const GoDoc = MakeDocBlock("GoDoc", serverKey, [3])
export const JavaDoc = MakeDocBlock("JavaDoc", serverKey, [4])

export const MySQLDoc = MakeDocBlock("MySQLDoc", databaseKey, [0])
export const PostgreSQLDoc = MakeDocBlock("PostgreSQLDoc", databaseKey, [1])
export const SQLiteDoc = MakeDocBlock("SQLiteDoc", databaseKey, [2])
export const MongoDBDoc = MakeDocBlock("MongoDBDoc", databaseKey, [3])
export const SQLDatabaseDoc = MakeDocBlock("SQLDatabaseDoc", databaseKey, [0, 1, 2])

export const TypeScriptDoc = MakeDocBlock("TypeScriptDoc", clientKey, [0])
export const SwiftDoc = MakeDocBlock("SwiftDoc", clientKey, [1])
export const KotlinDoc = MakeDocBlock("KotlinDoc", clientKey, [2])
export const CSharpDoc = MakeDocBlock("CSharpDoc", clientKey, [3])
export const DartDoc = MakeDocBlock("DartDoc", clientKey, [4])
