'use server'

import { headers } from "next/headers"
import Preferences from './preferences'

const defaultPreferences = async () => {
    const headerList = await headers()
    return {
        server: headerList.get('x-server-preferences') || '0',
        database: headerList.get('x-database-preferences') || '0',
        client: headerList.get('x-client-preferences') || '0',
    } as Preferences
}

export default defaultPreferences