import { dayNames, monthNames } from "../lib/variables"

export const parseDate = (date: Date) => {
  const month = date.getMonth()
  const weekDay = date.getDay()
  const day = date.getDate()

  return {
    month: monthNames[month],
    weekDay: dayNames[weekDay],
    day,
  }
}

export const getGreetings = (date: Date) => {
  const hours = date.getHours()

  if (hours >= 5 && hours < 12) {
    return "Good Morning!"
  }
  if (hours >= 12 && hours < 17) {
    return "Good Afternoon!"
  }
  if (hours >= 17 && hours < 21) {
    return "Good Evening!"
  }

  return "Good Night!"
}
