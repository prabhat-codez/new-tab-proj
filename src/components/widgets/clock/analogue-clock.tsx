export interface AnalogueClockProps {
  seconds: number
  miniutes: number
  hours: number
}

const SecondTicker = ({
  seconds,
}: Omit<AnalogueClockProps, "miniutes" | "hours">) => {
  return (
    <div className="h-full" style={{ transform: `rotate(${seconds * 6}deg)` }}>
      <div className="mx-auto size-3 rounded-full bg-destructive" />
    </div>
  )
}

const MiniuteTicker = ({
  miniutes,
}: Omit<AnalogueClockProps, "seconds" | "hours">) => {
  return (
    <div
      className="absolute z-10 flex h-full p-6"
      style={{ transform: `rotate(${miniutes * 6}deg)` }}
    >
      <div className="h-[52%] w-2 rounded-full bg-muted" />
    </div>
  )
}

const HourTicker = ({
  hours,
  miniutes,
}: Omit<AnalogueClockProps, "seconds">) => {
  const fullHourDeg = hours * 30
  const halfHourDeg = miniutes * 0.5
  const totalDeg = fullHourDeg + halfHourDeg

  return (
    <div
      className="absolute flex h-full py-10"
      style={{ transform: `rotate(${totalDeg}deg)` }}
    >
      <div className="h-[58%] w-6 rounded-full bg-foreground" />
    </div>
  )
}

const AnalogueClock = ({ seconds, miniutes, hours }: AnalogueClockProps) => {
  return (
    <div className="relative flex size-56 items-center justify-center rounded-full bg-card p-2">
      <SecondTicker seconds={seconds} />
      <MiniuteTicker miniutes={miniutes} />
      <HourTicker hours={hours} miniutes={miniutes} />
    </div>
  )
}

export default AnalogueClock
