'use client'

import useCookie from 'react-use-cookie'
import Preferences, { PreferencesKey } from './preferences'
import { useEffect } from 'react'

const callbacks = {
  'server': [],
  'database': [],
  'client': [],
}

const usePreference = <T extends PreferencesKey, V extends Preferences[T]>(name: T, initialValue: V): [V, (value: V) => void] => {
  const [value, setValue] = useCookie(name, initialValue)
  useEffect(() => {
    callbacks[name].push(setValue)
    return () => {
      const index = callbacks[name].indexOf(setValue)
      callbacks[name].splice(index, 1);
    }
  }, [name])
  const wrappedSetValue = (newValue: string) => {
    setValue(newValue)
    for (const key in callbacks[name]) {
      const setState = callbacks[name][key]
      setState(newValue)
    }
  }
  return [value as V, wrappedSetValue]
}

export default usePreference