import { Switch as ToggleSwitch } from "@headlessui/react"

interface SwitchProps {
  enabled: boolean
  onChange: (state: boolean) => void
  disabled?: boolean
}

const Switch = ({ enabled, onChange, disabled }: SwitchProps) => {
  return (
    <ToggleSwitch
      disabled={disabled}
      checked={enabled}
      onChange={onChange}
      className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-card-foreground/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[checked]:bg-card-foreground/10 data-[focus]:outline-1 data-[focus]:outline-white"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-card-foreground shadow-lg ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
      />
    </ToggleSwitch>
  )
}

export default Switch
