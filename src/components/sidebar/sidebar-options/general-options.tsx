import { useThemeStore } from "~/store/theme"
import OptionsGroup from "./shared/options-group"
import TabSwitchButton from "./shared/tab-switch-button"
import ToggleOption from "./shared/toggle-option"

const GeneralOptions = () => {
  const { isLightMode, toggleLightMode } = useThemeStore()
  return (
    <OptionsGroup title="General">
      <ToggleOption
        label="Enable light mode"
        enabled={isLightMode}
        onChange={toggleLightMode}
      />
      <TabSwitchButton
        title="Search Engines"
        desc="Add, edit, update, delete ai links"
        icon="tdesign:internet"
        tabToSwitch="search-engines"
      />
    </OptionsGroup>
  )
}

export default GeneralOptions
