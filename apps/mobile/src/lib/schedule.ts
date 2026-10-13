// Names match the database's DayOfWeek enum, ordered from Sunday like the calendar.
export const WEEKDAYS = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
] as const

export type Weekday = (typeof WEEKDAYS)[number]

export type ScheduleUnit = "day" | "week"

/** A recurring lesson pattern: every `interval` days, or weeks on `days`. */
export type Schedule = {
  unit: ScheduleUnit
  interval: number
  /** Lesson days for weekly schedules; ignored for daily ones. */
  days: Array<Weekday>
  /** First lesson date, as yyyy-mm-dd. */
  startDate: string
}

export function weekdayOf(date: Date): Weekday {
  return WEEKDAYS[date.getDay()]
}

/** A local date as yyyy-mm-dd, the format the web's date input uses. */
export function toDateInputValue(date: Date) {
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

/** The local date for a yyyy-mm-dd string. */
export function fromDateInputValue(value: string) {
  const [year, month, day] = value.split("-").map(Number)
  return new Date(year, month - 1, day)
}

// Jan 2023 started on a Sunday, so day i of it is WEEKDAYS[i].
const weekdayFormat = new Intl.DateTimeFormat(undefined, { weekday: "short" })
const WEEKDAY_SHORT = WEEKDAYS.map((_, i) =>
  weekdayFormat.format(new Date(2023, 0, i + 1))
)
// Hermes has no Intl.ListFormat, so fall back to "A, B and C".
const list: Pick<Intl.ListFormat, "format"> =
  typeof Intl.ListFormat === "function"
    ? new Intl.ListFormat(undefined, { type: "conjunction" })
    : {
        format: (items) => {
          const all = [...items]
          return all.length < 2
            ? all.join("")
            : `${all.slice(0, -1).join(", ")} and ${all[all.length - 1]}`
        },
      }
const startFormat = new Intl.DateTimeFormat(undefined, { dateStyle: "medium" })

/** e.g. "Every other week on Mon and Thu, starting Oct 12, 2026". */
export function formatSchedule(schedule: Schedule) {
  const { unit, interval } = schedule
  let text =
    interval === 1
      ? `Every ${unit}`
      : interval === 2
        ? `Every other ${unit}`
        : `Every ${interval} ${unit}s`

  if (unit === "week" && schedule.days.length > 0) {
    const days = WEEKDAYS.flatMap((day, i) =>
      schedule.days.includes(day) ? [WEEKDAY_SHORT[i]] : []
    )
    text += ` on ${list.format(days)}`
  }

  if (schedule.startDate) {
    text += `, starting ${startFormat.format(fromDateInputValue(schedule.startDate))}`
  }
  return text
}
