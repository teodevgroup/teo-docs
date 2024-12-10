'use server'

import { headers } from "next/headers"
import Preferences from './preferences'

const defaultPreferences = async () => {
    const headerList = await headers()
    return {
        server: headerList.get('x-server-preferences') || 'rust',
        database: headerList.get('x-database-preferences') || 'mysql',
        client: headerList.get('x-client-preferences') || 'ts',
    } as Preferences
}

export default defaultPreferences