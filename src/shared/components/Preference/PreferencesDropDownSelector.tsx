'use client'
import React, { Children, cloneElement, ReactElement, useState } from 'react'
import { styled } from '@linaria/react'
import { dark, flexColumn, flexRow, light } from '../../styles/theme'
import { css } from '@linaria/core'
import {
  CSharpLogo16, DartLogo16, KotlinLogo16, MongoDBLogo16,
  MySQLLogo16, NodeLogo16, PostgreSQLLogo16, PythonLogo16,
  SQLiteLogo16, SwiftLogo16, TypeScriptLogo16
} from '../Logos'
import VSpace from '../VSpace'
import RustLogoSvg from '../RustLogo'
import Preferences, { PreferencesClient, PreferencesDatabase, preferencesIndex, PreferencesKey, PreferencesServer, preferencesValue } from '../../lib/preferences/preferences'
import usePreference from '../../lib/preferences/preferencesClient'
import {autoUpdate, flip, FloatingFocusManager, FloatingPortal, offset, shift, size, useClick, useDismiss, useFloating, useInteractions} from '@floating-ui/react'

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
  ${flexColumn('flex-start')}
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
  height: 32px;
  padding: 4px 8px;
  font-size: 14px;
  opacity: ${(props) => props.disabled ? 0.5 : 1};
`

const FastSelectorIconContainer = styled.div`
  ${flexRow('center')}
  margin-right: 8px;
`

const FastSelectorTitle = styled.div`
  cursor: default;
`

type FastSelectorProps<T extends PreferencesKey, V extends Preferences[T]> = {
  preferenceKey: T
  defaultValue: V
  children: ReactElement[]
}

export const FastSelector = <T extends PreferencesKey, V extends Preferences[T]>({
    preferenceKey,
    defaultValue,
    children,
}: FastSelectorProps<T, V>) => {
  const [value, setValue] = usePreference(preferenceKey, defaultValue)
  const [isOpen, setIsOpen] = useState(false)
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(0), 
      flip(), 
      shift(), 
      size({
        apply({ rects, elements, availableHeight }) {
          Object.assign(elements.floating.style, {
            maxHeight: `${availableHeight}px`,
            minWidth: `${rects.reference.width}px`,
            maxWidth: `${rects.reference.width}px`,
          });
        },
        padding: 10,
      }),
    ],
    whileElementsMounted: autoUpdate,
  })
  const click = useClick(context)
  const dismiss = useDismiss(context)
  const {getReferenceProps, getFloatingProps} = useInteractions([
    click,
    dismiss,
  ])
  const selectedChild = Children.toArray(children)[preferencesIndex(preferenceKey, value)]
  return <FastSelectorContainer>
    <FastSelectorDisplayItem ref={refs.setReference} {...getReferenceProps()} className={!isOpen ? css`
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
    {isOpen ? <FloatingPortal>
      <FastSelectorExpandedList ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
        {Children.map(children, (child, index) => {
          return cloneElement(child as any, { onClick: () => {
            if (!(child as any).props.disabled) {
              setValue(preferencesValue(preferenceKey, index))
              setIsOpen(false)  
            }
          }})
        })}
      </FastSelectorExpandedList>
    </FloatingPortal> : null}
    
  </FastSelectorContainer>
}

type FastServerSelectorProps = {
    defaultValue: PreferencesServer
}

export const FastServerSelector = ({ defaultValue }: FastServerSelectorProps) => {
  return <FastSelector preferenceKey='server' defaultValue={defaultValue}>
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

type FastDatabaseSelectorProps = {
    defaultValue: PreferencesDatabase
}

export const FastDatabaseSelector = ({ defaultValue }: FastDatabaseSelectorProps) => {
  return <FastSelector preferenceKey='database' defaultValue={defaultValue}>
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

type FastClientSelectorProps = {
    defaultValue: PreferencesClient
}

export const FastClientSelector = ({ defaultValue }: FastClientSelectorProps) => {
  return <FastSelector preferenceKey='client' defaultValue={defaultValue}>
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

type PreferencesDropDownSelectorProps = {
  preferences: Preferences
}

const PreferencesDropDownSelector = ({ preferences }: PreferencesDropDownSelectorProps) => {
  return <>
  <FastServerSelector defaultValue={preferences.server} />
  <VSpace height={8} />
  <FastDatabaseSelector defaultValue={preferences.database} />
  <VSpace height={8} />
  <FastClientSelector defaultValue={preferences.client} />
  <VSpace height={8} />  
  </>
}

export default PreferencesDropDownSelector