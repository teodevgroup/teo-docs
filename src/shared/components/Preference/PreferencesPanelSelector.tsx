import defaultPreferences from "../../lib/preferences/preferencesServer"
import PreferencesPanelSelectorClient from "./PreferencesPanelSelectorClient"

const PreferencesPanelSelector = async () => {
    const preferences = await defaultPreferences()
    return <PreferencesPanelSelectorClient preferences={preferences} />
}

export default PreferencesPanelSelector