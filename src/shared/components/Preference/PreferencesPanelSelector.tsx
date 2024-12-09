'use client'
import React, { ReactNode, } from 'react'
import { styled } from '@linaria/react'
import { dark, docTitleFontFamily, flexRow, light } from '../../styles/theme'
import { cx, css } from '@linaria/core'
import {
  CSharpLogo16, DartLogo16, KotlinLogo16, MongoDBLogo16,
  MySQLLogo16, NodeLogo16, PostgreSQLLogo16, PythonLogo16,
  SQLiteLogo16, SwiftLogo16, TypeScriptLogo16
} from '../Logos'
import VSpace from '../VSpace'
import RustLogoSvg from '../RustLogo'
import Preferences, { PreferencesClient, PreferencesDatabase, PreferencesServer } from '../../lib/preferences/preferences'
import usePreference from '../../lib/preferences/preferencesClient'

const selectorBorderColor = "#eaecef"
const selectorBorderColorDark = "#2a2c2f"

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

type ServerSelectorProps = {
  defaultValue: PreferencesServer
}

const ServerSelector = ({ defaultValue }: ServerSelectorProps) => {
  const [value, setValue] = usePreference("server", defaultValue)
  return <SelectorContainer>
    <SelectItem onClick={() => setValue('rust')} selected={value === 'rust'}>
      <SelectItemIcon>
        <RustLogoSvg />
      </SelectItemIcon>
      <SelectItemTitle>Rust</SelectItemTitle>
    </SelectItem>
    <SelectItem onClick={() => setValue('node')} selected={value === 'node'}>
      <SelectItemIcon>
        <NodeLogo16 />
      </SelectItemIcon>
      <SelectItemTitle>Node.js</SelectItemTitle>
    </SelectItem>
    <SelectItem onClick={() => setValue('python')} selected={value === 'python'}>
      <SelectItemIcon>
        <PythonLogo16 />
      </SelectItemIcon>
      <SelectItemTitle>Python</SelectItemTitle>
    </SelectItem>
  </SelectorContainer>
}

type DatabaseSelectorProps = {
  defaultValue: PreferencesDatabase
}

const DatabaseSelector = ({ defaultValue }: DatabaseSelectorProps) => {
  const [value, setValue] = usePreference('database', defaultValue);
  return <SelectorContainer>
    <SelectItem onClick={() => setValue('mysql')} selected={value === 'mysql'}>
      <SelectItemIcon>
        <MySQLLogo16 />
      </SelectItemIcon>
      <SelectItemTitle>MySQL</SelectItemTitle>
    </SelectItem>
    <SelectItem onClick={() => setValue('postgres')} selected={value === 'postgres'}>
      <SelectItemIcon>
        <PostgreSQLLogo16 />
      </SelectItemIcon>
      <SelectItemTitle>PostgreSQL</SelectItemTitle>
    </SelectItem>
    <SelectItem onClick={() => setValue('sqlite')} selected={value === 'sqlite'}>
      <SelectItemIcon>
        <SQLiteLogo16 />
      </SelectItemIcon>
      <SelectItemTitle>SQLite</SelectItemTitle>
    </SelectItem>
    <SelectItem onClick={() => setValue('mongo')} selected={value === 'mongo'}>
      <SelectItemIcon>
        <MongoDBLogo16 />
      </SelectItemIcon>
      <SelectItemTitle>MongoDB</SelectItemTitle>
    </SelectItem>
  </SelectorContainer>
}

type ClientSelectorProps = {
  defaultValue: PreferencesClient
}

const ClientSelector = ({ defaultValue }: ClientSelectorProps) => {
  const [value, setValue] = usePreference('client', defaultValue);
  return <SelectorContainer>
    <SelectItem onClick={() => setValue('ts')} selected={value === 'ts'}>
      <SelectItemIcon>
        <TypeScriptLogo16 />
      </SelectItemIcon>
      <SelectItemTitle>TypeScript</SelectItemTitle>
    </SelectItem>
    <SelectItem disabled={true} onClick={() => setValue('swift')} selected={value === 'swift'}>
      <SelectItemIcon>
        <SwiftLogo16 />
      </SelectItemIcon>
      <SelectItemTitle>Swift</SelectItemTitle>
    </SelectItem>
    <SelectItem disabled={true} onClick={() => setValue('kotlin')} selected={value === 'kotlin'}>
      <SelectItemIcon>
        <KotlinLogo16 />
      </SelectItemIcon>
      <SelectItemTitle>Kotlin</SelectItemTitle>
    </SelectItem>
    <SelectItem disabled={true} onClick={() => setValue('cs')} selected={value === 'cs'}>
      <SelectItemIcon>
        <CSharpLogo16 />
      </SelectItemIcon>
      <SelectItemTitle>C#</SelectItemTitle>
    </SelectItem>
    <SelectItem disabled={true} onClick={() => setValue('dart')} selected={value === 'dart'}>
      <SelectItemIcon>
        <DartLogo16 />
      </SelectItemIcon>
      <SelectItemTitle>Dart</SelectItemTitle>
    </SelectItem>
  </SelectorContainer>
}

const SelectorHeading = styled.div`
  margin-bottom: 8px;
  font-weight: 500;
  font-family: ${docTitleFontFamily};
`

const PreferencesPanelSelector = ({ preferences }: { preferences: Preferences }) => {
  return <>
    <VSpace height={8} />
    <SelectorHeading>Select a server language</SelectorHeading>
    <ServerSelector defaultValue={preferences.server} />
    <VSpace height={20} />
    <SelectorHeading>Select a database</SelectorHeading>
    <DatabaseSelector defaultValue={preferences.database} />
    <VSpace height={20} />
    <SelectorHeading>Select a client language</SelectorHeading>
    <ClientSelector defaultValue={preferences.client} />
    <VSpace height={20} />
  </>
}

export default PreferencesPanelSelector