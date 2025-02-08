import { useOptionsStore } from "../../../store/options"
import { parseDate } from "../../../utils/datetime"

interface DigitalClockProps {
  hours: number
  miniutes: number
}

const DigitalClock = ({ miniutes, hours }: DigitalClockProps) => {
  const is24HoursEnabled = useOptionsStore((s) => s.format24)

  const { weekDay, day } = parseDate(new Date())

  return (
    <div className="relative flex size-56 select-none flex-col justify-end gap-3 rounded-xl font-bold font-lora font-pt-serif text-card-foreground lg:justify-start">
      <div className="relative inline-flex size-full h-[88px] items-center justify-center gap-2 rounded-xl bg-card text-5xl">
        <span>
          {!is24HoursEnabled
            ? formatPad(hours > 12 ? hours - 12 : hours)
            : formatPad(hours)}
        </span>
        <span>:</span>
        <span>{formatPad(miniutes)}</span>
        {!is24HoursEnabled && (
          <span className="absolute top-1 right-2 text-destructive text-red text-sm">
            {hours > 11 ? "PM" : "AM"}
          </span>
        )}
      </div>
      <div className="grid h-24 grid-cols-2 gap-3 text-4xl">
        <span className="flex items-center justify-center rounded-xl bg-card text-3xl">
          {weekDay.split("").splice(0, 3).join("").toUpperCase()}
        </span>
        <span className="flex items-center justify-center rounded-xl bg-destructive text-destructive-foreground">
          {day}
        </span>
      </div>
    </div>
  )
}

function formatPad(arg: number) {
  return arg.toString().padStart(2, "0")
}

export default DigitalClock
