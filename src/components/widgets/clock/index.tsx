import { useEffect, useState } from "react"
import AnalogueClock from "./analogue-clock"
import DigitalClock from "./digital-clock"

interface ClockProps {
  clockType: "analogue" | "digital"
}

const Clock = ({ clockType }: ClockProps) => {
  const date = new Date()
  const [seconds, setSeconds] = useState(date.getSeconds())
  const [miniutes, setMiniutes] = useState(date.getMinutes())
  const [hours, setHours] = useState(date.getHours())

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newDate = new Date()
      setSeconds(newDate.getSeconds())
      setMiniutes(newDate.getMinutes())
      setHours(newDate.getHours())
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  if (clockType === "analogue") {
    return <AnalogueClock {...{ seconds, miniutes, hours }} />
  }

  return <DigitalClock {...{ seconds, miniutes, hours }} />
}

export default Clock
