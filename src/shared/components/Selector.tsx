'use client'

import React, { Children, ReactElement, ReactNode, cloneElement, useEffect, useState } from 'react'
import { styled } from '@linaria/react'
import { dark, docTitleFontFamily, flexColumn, flexRow, light } from '../../shared/styles/theme'
import { cx, css } from '@linaria/core'
import {
  CSharpLogo16, DartLogo16, KotlinLogo16, MongoDBLogo16,
  MySQLLogo16, NodeLogo16, PostgreSQLLogo16, PythonLogo16, RustLogo16,
  SQLiteLogo16, SwiftLogo16, TypeScriptLogo16
} from './Logos'
import VSpace from './VSpace'
import NoSSRWrapper from './NoSSRWrapper'
import RustLogoSvg from './RustLogo'

const selectorBorderColor = "#eaecef"
const selectorBorderColorDark = "#2a2c2f"

const serverKey = "serverSelector"
const databaseKey = "databaseSelector"
const clientKey = "clientSelector"
const savedSetStateCallbacks: any = {
  [serverKey]: [],
  [databaseKey]: [],
  [clientKey]: []
}

const usePreference = (name: string): [number, (value: number) => void] => {
  let saved = typeof localStorage !== 'undefined' ? localStorage.getItem(name) : '0'
  if (!saved) {
    saved = '0'
  }
  let index = parseInt(saved)
  const [state, setState] = useState(index)
  useEffect(() => {
    savedSetStateCallbacks[name].push(setState)
    return () => {
      const index = savedSetStateCallbacks[name].indexOf(setState)
      savedSetStateCallbacks[name].splice(index, 1);
    };
}, [name]);
  const wrappedSetState = (newValue: number) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(name, newValue.toString())
    }
    for (const key in savedSetStateCallbacks[name]) {
      const setState = savedSetStateCallbacks[name][key]
      setState(newValue)
    }
  }
  return [state, wrappedSetState]
}

const SelectorContainer = styled.div`
  ${flexRow('stretch')}
  ${light} {
    color: rgb(51, 51, 51);
    border: 1px solid ${selectorBorderColor};
  }
  ${dark} {
    color: rgb(201, 201, 201);
    border: 1px solid ${selectorBorderColorDark};
  }
  border-radius: 4px;
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
    &:hover {
      ${light} {
        background-color: #fafafc;
      }
      ${dark} {
        background-color: #1f1f21;
      }
    }
    &:not(:last-child) {
      ${light} {
        border-right: 1px solid ${selectorBorderColor};
      }
      ${dark} {
        border-right: 1px solid ${selectorBorderColorDark};
      }
    }
  `, props.selected ? css`
    ${light} {
      background-color: ${selectorBorderColor};
    }
    ${dark} {
      background-color: ${selectorBorderColorDark};
    }
    &:hover {
      ${light} {
        background-color: ${selectorBorderColor};
      }
      ${dark} {
        background-color: ${selectorBorderColorDark};
      }
    }
  ` : css`
    background-color: transparent;
  `, props.disabled ? css`
    opacity: 0.5;
    pointer-events: none;
    cursor: default;
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
  const [index, setIndex] = usePreference(serverKey)

  return <SelectorContainer>
    <SelectItem onClick={() => setIndex(0)} selected={index === 0}>
      <SelectItemIcon>
        <RustLogoSvg />
      </SelectItemIcon>
      <SelectItemTitle>Rust</SelectItemTitle>
    </SelectItem>
    <SelectItem onClick={() => setIndex(1)} selected={index === 1}>
      <SelectItemIcon>
        <NodeLogo16 />
      </SelectItemIcon>
      <SelectItemTitle>Node.js</SelectItemTitle>
    </SelectItem>
    <SelectItem onClick={() => setIndex(2)} selected={index === 2}>
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

const FastSelectorContainer = styled.div`
  position: relative;
  cursor: pointer;
  user-select: none;
`

const FastSelectorDisplayItem = styled.div`
  overflow: hidden;
  ${dark} {
    background-color: #242424;
  }
  ${light} {
    background-color: #FBFBFD;
  }
`

const FastSelectorExpandedList = styled.div`
  top: 100%;
  left: 0;
  right: 0;
  overflow: hidden;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  z-index: 1000;
  ${dark} {
    background-color: #242424;
    border-left: 0.5px solid #171717;
    border-right: 0.5px solid #171717;
    border-bottom: 0.5px solid #171717;

  }
  ${light} {
    background-color: #FBFBFD;
    border-left: 0.5px solid #F7F7F9;
    border-right: 0.5px solid #F7F7F9;
    border-bottom: 0.5px solid #F7F7F9;
  }
`

type FastSelectorItemProps = {
  disabled?: boolean
}

const FastSelectorItem = styled.div<FastSelectorItemProps>`
  ${flexRow('center')}
  &:hover {
    ${dark} {
      background-color: #3d3d3d;
    }
    ${light} {
      background-color: #F3F3F5;
    }
  }
  width: 100%;
  padding: 4px 8px;
  font-size: 14px;
  opacity: ${(props) => props.disabled ? 0.5 : 1};
`

const FastSelectorIconContainer = styled.div`
  ${flexRow('center')}
  margin-right: 8px;
`

const FastSelectorTitle = styled.div``


type FastSelectorProps = {
  preferenceKey: string
  children: ReactElement[]
}

export const FastSelector = (props: FastSelectorProps) => {
  const [index, setIndex] = usePreference(props.preferenceKey)
  const [expanded, setExpanded] = useState(false)
  const selectedChild = Children.toArray(props.children)[index]
  return <FastSelectorContainer onMouseLeave={() => setExpanded(false)}>
    <FastSelectorDisplayItem onClick={() => setExpanded(!expanded)} className={!expanded ? css`
      ${dark} {
        border: 0.5px solid #171717;
      }
      ${light} {
        border: 0.5px solid #F7F7F9;
      }
      border-radius: 6px;
      &::after {
        position: absolute;
        display: block;
        right: 8px;
        transform: translateY(-50%);
        top: 50%;
        content: ' ';
        width: 0; 
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent; 
        border-top: 7px solid #dadde1;
        ${light} {
          border-top: 7px solid #dadde1;
        }
        ${dark} {
          border-top: 7px solid rgb(12, 13, 15);
        }
      }
    ` : css`
      ${dark} {
        border-top: 0.5px solid #171717;
        border-left: 0.5px solid #171717;
        border-right: 0.5px solid #171717;
      }
      ${light} {
        border-top: 0.5px solid #F7F7F9;
        border-left: 0.5px solid #F7F7F9;
        border-right: 0.5px solid #F7F7F9;
      }
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      &::after {
        position: absolute;
        display: block;
        right: 8px;
        transform: translateY(-50%);
        top: 50%;
        content: ' ';
        width: 0; 
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent; 
        border-bottom: 7px solid #dadde1;
        ${light} {
          border-bottom: 7px solid #dadde1;
        }
        ${dark} {
          border-bottom: 7px solid rgb(12, 13, 15);
        }
      }      
    `}>
      {selectedChild}
    </FastSelectorDisplayItem>
    <FastSelectorExpandedList className={!expanded ? css`display: none;` : css`
      ${flexColumn('flex-start')}
      position: absolute;
    `}>
      {Children.map(props.children, (child, index) => {
        return cloneElement(child, { onClick: () => {
          if (!child.props.disabled) {
            setIndex(index)
            setExpanded(false)  
          }
        }})
      })}
    </FastSelectorExpandedList>
  </FastSelectorContainer>
}

export const FastServerSelector = () => {
  return <FastSelector preferenceKey={serverKey}>
    <FastSelectorItem>
      <FastSelectorIconContainer>
        <RustLogoSvg />
      </FastSelectorIconContainer>
      <FastSelectorTitle>Rust</FastSelectorTitle>
    </FastSelectorItem>
    <FastSelectorItem>
      <FastSelectorIconContainer>
        <NodeLogo16 />
      </FastSelectorIconContainer>
      <FastSelectorTitle>Node.js</FastSelectorTitle>
    </FastSelectorItem>
    <FastSelectorItem>
      <FastSelectorIconContainer>
        <PythonLogo16 />
      </FastSelectorIconContainer>
      <FastSelectorTitle>Python</FastSelectorTitle>
    </FastSelectorItem>
  </FastSelector>
}

export const FastDatabaseSelector = () => {
  return <FastSelector preferenceKey={databaseKey}>
    <FastSelectorItem>
      <FastSelectorIconContainer>
        <MySQLLogo16 />
      </FastSelectorIconContainer>
      <FastSelectorTitle>MySQL</FastSelectorTitle>
    </FastSelectorItem>
    <FastSelectorItem>
      <FastSelectorIconContainer>
        <PostgreSQLLogo16 />
      </FastSelectorIconContainer>
      <FastSelectorTitle>PostgreSQL</FastSelectorTitle>
    </FastSelectorItem>
    <FastSelectorItem>
      <FastSelectorIconContainer>
        <SQLiteLogo16 />
      </FastSelectorIconContainer>
      <FastSelectorTitle>SQLite</FastSelectorTitle>
    </FastSelectorItem>
    <FastSelectorItem>
      <FastSelectorIconContainer>
        <MongoDBLogo16 />
      </FastSelectorIconContainer>
      <FastSelectorTitle>MongoDB</FastSelectorTitle>
    </FastSelectorItem>
  </FastSelector>
}

export const FastClientSelector = () => {
  return <FastSelector preferenceKey={clientKey}>
    <FastSelectorItem>
      <FastSelectorIconContainer>
        <TypeScriptLogo16 />
      </FastSelectorIconContainer>
      <FastSelectorTitle>TypeScript</FastSelectorTitle>
    </FastSelectorItem>
    <FastSelectorItem disabled={true}>
      <FastSelectorIconContainer>
        <SwiftLogo16 />
      </FastSelectorIconContainer>
      <FastSelectorTitle>Swift</FastSelectorTitle>
    </FastSelectorItem>
    <FastSelectorItem disabled={true}>
      <FastSelectorIconContainer>
        <KotlinLogo16 />
      </FastSelectorIconContainer>
      <FastSelectorTitle>Kotlin</FastSelectorTitle>
    </FastSelectorItem>
    <FastSelectorItem disabled={true}>
      <FastSelectorIconContainer>
        <CSharpLogo16 />
      </FastSelectorIconContainer>
      <FastSelectorTitle>C#</FastSelectorTitle>
    </FastSelectorItem>
    <FastSelectorItem disabled={true}>
      <FastSelectorIconContainer>
        <DartLogo16 />
      </FastSelectorIconContainer>
      <FastSelectorTitle>Dart</FastSelectorTitle>
    </FastSelectorItem>
  </FastSelector>
}

export const FastTripleSelector = () => {
  return <>
    <FastServerSelector />
    <VSpace height={8} />
    <FastDatabaseSelector />
    <VSpace height={8} />
    <FastClientSelector />
    <VSpace height={8} />  
  </>
}