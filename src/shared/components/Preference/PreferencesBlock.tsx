'use server'

import React, { ReactNode } from 'react'
import { RustDocClient, NodeJSDocClient, PythonDocClient, MySQLDocClient, PostgreSQLDocClient, SQLiteDocClient, MongoDBDocClient, SQLDatabaseDocClient, TypeScriptDocClient, SwiftDocClient, KotlinDocClient, CSharpDocClient, DartDocClient } from './PreferencesBlockComponents'
import defaultPreferences from '../../lib/preferences/preferencesServer'

type DocProps = {
  children: ReactNode
}

export const RustDoc = async ({ children }: DocProps) => {
  const preferences = await defaultPreferences()
  return <RustDocClient defaultValue={preferences.server}>
  {children}
  </RustDocClient>
}

export const NodeJSDoc = async ({ children }: DocProps) => {
  const preferences = await defaultPreferences()
  return <NodeJSDocClient defaultValue={preferences.server}>
  {children}
  </NodeJSDocClient>
}

export const PythonDoc = async ({ children }: DocProps) => {
  const preferences = await defaultPreferences()
  return <PythonDocClient defaultValue={preferences.server}>
  {children}
  </PythonDocClient>
}

export const MySQLDoc = async ({ children }: DocProps) => {
  const preferences = await defaultPreferences()
  return <MySQLDocClient defaultValue={preferences.database}>
  {children}
  </MySQLDocClient>
}

export const PostgreSQLDoc = async ({ children }: DocProps) => {
  const preferences = await defaultPreferences()
  return <PostgreSQLDocClient defaultValue={preferences.database}>
  {children}
  </PostgreSQLDocClient>
}

export const SQLiteDoc = async ({ children }: DocProps) => {
  const preferences = await defaultPreferences()
  return <SQLiteDocClient defaultValue={preferences.database}>
  {children}
  </SQLiteDocClient>
}

export const MongoDBDoc = async ({ children }: DocProps) => {
  const preferences = await defaultPreferences()
  return <MongoDBDocClient defaultValue={preferences.database}>
  {children}
  </MongoDBDocClient>
}

export const SQLDatabaseDoc = async ({ children }: DocProps) => {
  const preferences = await defaultPreferences()
  return <SQLDatabaseDocClient defaultValue={preferences.database}>
  {children}
  </SQLDatabaseDocClient>
}

export const TypeScriptDoc = async ({ children }: DocProps) => {
  const preferences = await defaultPreferences()
  return <TypeScriptDocClient defaultValue={preferences.client}>
  {children}
  </TypeScriptDocClient>
}

export const SwiftDoc = async ({ children }: DocProps) => {
  const preferences = await defaultPreferences()
  return <SwiftDocClient defaultValue={preferences.client}>
  {children}
  </SwiftDocClient>
}

export const KotlinDoc = async ({ children }: DocProps) => {
  const preferences = await defaultPreferences()
  return <KotlinDocClient defaultValue={preferences.client}>
  {children}
  </KotlinDocClient>
}

export const CSharpDoc = async ({ children }: DocProps) => {
  const preferences = await defaultPreferences()
  return <CSharpDocClient defaultValue={preferences.client}>
  {children}
  </CSharpDocClient>
}

export const DartDoc = async ({ children }: DocProps) => {
  const preferences = await defaultPreferences()
  return <DartDocClient defaultValue={preferences.client}>
  {children}
  </DartDocClient>
}
