'use client'

import useCookie from 'react-use-cookie'
import Preferences, { PreferencesKey } from './preferences'

const usePreference = <T extends PreferencesKey, V extends Preferences[T]>(name: T, initialValue: V): [V, (value: V) => void] => {
  const [value, setValue] = useCookie(name, initialValue)
  return [value as V, setValue]
}

export default usePreference