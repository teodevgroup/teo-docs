import { headers } from "next/headers"
import Preferences from './preferences'

const defaultPreferences = async () => {
    const headerList = await headers()
    return {
        server: Number(headerList.get('x-server-preferences') || '0'),
        database: Number(headerList.get('x-database-preferences') || '0'),
        client: Number(headerList.get('x-client-preferences') || '0'),
    } as Preferences
}

export default defaultPreferences