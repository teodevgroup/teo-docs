'use client'

import { ReactNode } from 'react'
import { PreferencesDatabase, PreferencesServer, PreferencesClient } from '../../lib/preferences/preferences'
import usePreference from '../../lib/preferences/preferencesClient'

type ServerDocProps = {
  defaultValue: PreferencesServer
  children: ReactNode
}

export const RustDocClient = ({ defaultValue, children }: ServerDocProps) => {
  const [value] = usePreference('server', defaultValue)
  return value === 'rust' ? children : null
}

export const NodeJSDocClient = ({ defaultValue, children }: ServerDocProps) => {
  const [value] = usePreference('server', defaultValue)
  return value === 'node' ? children : null
}

export const PythonDocClient = ({ defaultValue, children }: ServerDocProps) => {
  const [value] = usePreference('server', defaultValue)
  return value === 'python' ? children : null
}

type DatabaseDocProps = {
  defaultValue: PreferencesDatabase
  children: ReactNode
}

export const MySQLDocClient = ({ defaultValue, children }: DatabaseDocProps) => {
  const [value] = usePreference('database', defaultValue)
  return value === 'mysql' ? children : null
}

export const PostgreSQLDocClient = ({ defaultValue, children }: DatabaseDocProps) => {
  const [value] = usePreference('database', defaultValue)
  return value === 'postgres' ? children : null
}

export const SQLiteDocClient = ({ defaultValue, children }: DatabaseDocProps) => {
  const [value] = usePreference('database', defaultValue)
  return value === 'sqlite' ? children : null
}

export const MongoDBDocClient = ({ defaultValue, children }: DatabaseDocProps) => {
  const [value] = usePreference('database', defaultValue)
  return value === 'mongo' ? children : null
}

export const SQLDatabaseDocClient = ({ defaultValue, children }: DatabaseDocProps) => {
  const [value] = usePreference('database', defaultValue)
  return ['mysql', 'postgres', 'sqlite'].includes(value) ? children : null
}

type ClientDocProps = {
  defaultValue: PreferencesClient
  children: ReactNode
}

export const TypeScriptDocClient = ({ defaultValue, children }: ClientDocProps) => {
  const [value] = usePreference('client', defaultValue)
  return value === 'ts' ? children : null
}

export const SwiftDocClient = ({ defaultValue, children }: ClientDocProps) => {
  const [value] = usePreference('client', defaultValue)
  return value === 'swift' ? children : null
}

export const KotlinDocClient = ({ defaultValue, children }: ClientDocProps) => {
  const [value] = usePreference('client', defaultValue)
  return value === 'kotlin' ? children : null
}

export const CSharpDocClient = ({ defaultValue, children }: ClientDocProps) => {
  const [value] = usePreference('client', defaultValue)
  return value === 'cs' ? children : null
}

export const DartDocClient = ({ defaultValue, children }: ClientDocProps) => {
  const [value] = usePreference('client', defaultValue)
  return value === 'dart' ? children : null
}
