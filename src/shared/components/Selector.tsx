'use client'

import React, { ReactNode } from 'react'
import Preferences, { PreferencesKey } from '../lib/preferences/preferences'
import usePreference from '../lib/preferences/preferencesClient'

type OptionalDocProps<T extends PreferencesKey, V extends Preferences[T]> = {
  defaultValue: V
  children: ReactNode
}

const MakeDocBlockInner = <T extends PreferencesKey, V extends Preferences[T]>(name: string, key: T, values: V[]) => {
  const DocBlock = (props: OptionalDocProps<T, V>) => {
    const [value] = usePreference(key, props.defaultValue)
    return values.includes(value) ? props.children : null
  }
  DocBlock.displayName = name
  return DocBlock
}

const MakeDocBlock = <T extends PreferencesKey, V extends Preferences[T]>(name: string, key: T, values: V[]) => {
  const Inner = MakeDocBlockInner(name, key, values);
  const DocBlock = (props: OptionalDocProps<T, V>) => {
    return <Inner {...props} />
  }
  DocBlock.displayName = name
  return DocBlock
}

export const RustDoc = MakeDocBlock("RustDoc", 'server', ['rust'])
export const NodeJSDoc = MakeDocBlock("NodeJSDoc", 'server', ['node'])
export const PythonDoc = MakeDocBlock("PythonDoc", 'server', ['python'])

export const MySQLDoc = MakeDocBlock("MySQLDoc", 'database', ['mysql'])
export const PostgreSQLDoc = MakeDocBlock("PostgreSQLDoc", 'database', ['postgres'])
export const SQLiteDoc = MakeDocBlock("SQLiteDoc", 'database', ['sqlite'])
export const MongoDBDoc = MakeDocBlock("MongoDBDoc", 'database', ['mongo'])
export const SQLDatabaseDoc = MakeDocBlock("SQLDatabaseDoc", 'database', ['mysql', 'postgres', 'sqlite'])

export const TypeScriptDoc = MakeDocBlock("TypeScriptDoc", 'client', ['ts'])
export const SwiftDoc = MakeDocBlock("SwiftDoc", 'client', ['swift'])
export const KotlinDoc = MakeDocBlock("KotlinDoc", 'client', ['kotlin'])
export const CSharpDoc = MakeDocBlock("CSharpDoc", 'client', ['cs'])
export const DartDoc = MakeDocBlock("DartDoc", 'client', ['dart'])
