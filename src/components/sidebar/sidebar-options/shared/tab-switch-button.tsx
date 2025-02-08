import { Icon } from "@iconify/react"
import clsx from "clsx"
import { type Tab, useSidebarOptions } from "../../sidebar-store"

interface TabSwitchProps {
  title: string
  desc: string
  icon: string
  tabToSwitch: Tab
  disabled?: boolean
}

const TabSwitchButton = ({
  title,
  desc,
  icon,
  tabToSwitch,
  disabled,
}: TabSwitchProps) => {
  const setTab = useSidebarOptions((s) => s.setTab)

  return (
    <button
      type="button"
      className={clsx([
        "inline-flex items-center justify-between p-0",
        !disabled && " transition-transform duration-150 active:scale-95",
      ])}
      onClick={() => setTab(tabToSwitch)}
      disabled={disabled}
    >
      <span
        className={clsx([
          "flex flex-col",
          disabled && "text-card-foreground/40",
        ])}
      >
        <span className="w-full text-start">{title}</span>
        <span
          className={`text-sm ${!disabled ? "text-foreground/60" : "text-foreground/40"}`}
        >
          {desc}
        </span>
      </span>
      <span>
        <Icon
          icon={icon}
          fontSize={20}
          className={disabled ? "text-foreground/40" : ""}
        />
      </span>
    </button>
  )
}

export default TabSwitchButton
