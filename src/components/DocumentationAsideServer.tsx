import defaultPreferences from "../lib/preferences/preferencesServer"
import { Aside } from "./DocumentationAside"

const DocumentationAsideServer = async ({ children }) => {
    const preferences = await defaultPreferences()
    return <Aside preferences={preferences}>{children}</Aside>
}

export default DocumentationAsideServer