import clsx from "clsx"
import Switch from "../../../switch"

interface ToggleOptionProps {
  label: string
  desc?: string
  enabled: boolean
  onChange: (state: boolean) => void
  disabled?: boolean
}

const ToggleOption = ({
  label,
  desc,
  enabled,
  onChange,
  disabled = false,
}: ToggleOptionProps) => {
  return (
    <div className="flex flex-col gap-0">
      <div
        className={clsx(
          "inline-flex w-full justify-between",
          disabled && "text-card-foreground/40",
        )}
      >
        <span>{label}</span>
        <Switch {...{ enabled, onChange, disabled }} />
      </div>
      <span className="text-foreground/60 text-sm">{desc}</span>
    </div>
  )
}

export default ToggleOption
