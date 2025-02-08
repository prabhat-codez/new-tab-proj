import { useOptionsStore } from "../../../store/options"
import OptionsGroup from "./shared/options-group"
import TabSwitchButton from "./shared/tab-switch-button"
import ToggleOption from "./shared/toggle-option"

const MiscOptions = () => {
  const {
    isQuerySuggestions,
    toggleQuerySuggestions,
    isAIToolsEnabled,
    toggleEnableAITools,
    isMonochromeIcon,
    toggleMonochromeIcon,
  } = useOptionsStore()

  return (
    <OptionsGroup title="Misc">
      <ToggleOption
        label="Eable search suggestions"
        onChange={toggleQuerySuggestions}
        enabled={isQuerySuggestions}
      />
      <ToggleOption
        label="Enable AI tools"
        enabled={isAIToolsEnabled}
        onChange={toggleEnableAITools}
      />
      <TabSwitchButton
        title="AI Tools"
        desc="Add, edit, update, delete ai links"
        icon="mingcute:ai-line"
        tabToSwitch="ai-tools"
        disabled={!isAIToolsEnabled}
      />
      <ToggleOption
        label="Enable monochrome icon"
        desc="For newly added apps"
        enabled={isMonochromeIcon}
        onChange={toggleMonochromeIcon}
      />
    </OptionsGroup>
  )
}

export default MiscOptions
