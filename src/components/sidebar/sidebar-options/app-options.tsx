import { useOptionsStore } from "../../../store/options"
import OptionsGroup from "./shared/options-group"
import TabSwitchButton from "./shared/tab-switch-button"
import ToggleOption from "./shared/toggle-option"

const AppOptions = () => {
  const {
    isAppDrawerEnabled,
    toggleEnableAppDrawer,
    isDockEnabled,
    toggleDock,
  } = useOptionsStore()

  return (
    <OptionsGroup title="Apps">
      <ToggleOption
        label="Enable dock"
        enabled={isDockEnabled}
        onChange={toggleDock}
      />
      <TabSwitchButton
        title="Dock Apps"
        desc="Add, edit and delete apps"
        icon="mingcute:settings-6-line"
        tabToSwitch="apps"
      />
      <ToggleOption
        label="Enable app drawer"
        enabled={isAppDrawerEnabled}
        onChange={toggleEnableAppDrawer}
      />
    </OptionsGroup>
  )
}

export default AppOptions
