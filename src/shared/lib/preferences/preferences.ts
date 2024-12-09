export type PreferencesServer = 'rust' | 'node' | 'python'
export type PreferencesDatabase = 'mysql' | 'postgres' | 'sqlite' | 'mongo'
export type PreferencesClient = 'ts' | 'swift' | 'kotlin' | 'dart' | 'cs'

type Preferences = {
    server: PreferencesServer
    database: PreferencesDatabase
    client: PreferencesClient
}

export type PreferencesKey = keyof Preferences

export type PreferencesValues = { [key in PreferencesKey]: Preferences[key][]}

export const preferencesValues: PreferencesValues = {
    server: ['rust', 'node', 'python'],
    database: ['mysql', 'postgres', 'sqlite', 'mongo'],
    client: ['ts', 'swift', 'kotlin', 'cs', 'dart'],
}

export function preferencesIndex<T extends PreferencesKey, V extends Preferences[T]>(key: T, value: V): number {
    return preferencesValues[key].indexOf(value)
}

export function preferencesValue<T extends keyof PreferencesValues, V extends Preferences[T]>(key: T, index: number): V {
    return preferencesValues[key][index] as any
}

export default Preferences