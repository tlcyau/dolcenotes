export const CALENDAR_VIEWS = ["day", "week", "month"] as const

export type CalendarView = (typeof CALENDAR_VIEWS)[number]

export function isCalendarView(value: unknown): value is CalendarView {
  return CALENDAR_VIEWS.includes(value as CalendarView)
}

// All helpers work on local midnight dates, so day arithmetic stays
// correct across daylight saving changes.

export function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function addDays(date: Date, days: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days)
}

/** Adds months, clamping the day so Jan 31 + 1 month is Feb 28/29. */
export function addMonths(date: Date, months: number) {
  const year = date.getFullYear()
  const month = date.getMonth() + months
  const lastDay = new Date(year, month + 1, 0).getDate()
  return new Date(year, month, Math.min(date.getDate(), lastDay))
}

/** Weeks start on Sunday. */
export function startOfWeek(date: Date) {
  return addDays(date, -date.getDay())
}

export function isSameDay(a: Date, b: Date) {
  return isSameMonth(a, b) && a.getDate() === b.getDate()
}

export function isSameMonth(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()
}

export function weekDays(date: Date) {
  const start = startOfWeek(date)
  return Array.from({ length: 7 }, (_, i) => addDays(start, i))
}

/** The whole weeks covering the month of `date`, as rows of seven days. */
export function monthWeeks(date: Date) {
  const first = new Date(date.getFullYear(), date.getMonth(), 1)
  const last = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  const weeks: Array<Array<Date>> = []
  for (let day = startOfWeek(first); day <= last; day = addDays(day, 7)) {
    weeks.push(weekDays(day))
  }
  return weeks
}

/** Moves `date` one view's worth forwards (1) or backwards (-1). */
export function stepDate(view: CalendarView, date: Date, direction: 1 | -1) {
  switch (view) {
    case "day":
      return addDays(date, direction)
    case "week":
      return addDays(date, 7 * direction)
    case "month":
      return addMonths(date, direction)
  }
}

const monthTitle = new Intl.DateTimeFormat(undefined, {
  month: "long",
  year: "numeric",
})
const weekTitle = new Intl.DateTimeFormat(undefined, {
  month: "short",
  day: "numeric",
  year: "numeric",
})
const dayTitle = new Intl.DateTimeFormat(undefined, { dateStyle: "full" })

export function formatViewTitle(view: CalendarView, date: Date) {
  switch (view) {
    case "day":
      return dayTitle.format(date)
    case "week": {
      const days = weekDays(date)
      // Hermes may not implement formatRange.
      return typeof weekTitle.formatRange === "function"
        ? weekTitle.formatRange(days[0], days[6])
        : `${weekTitle.format(days[0])} – ${weekTitle.format(days[6])}`
    }
    case "month":
      return monthTitle.format(date)
  }
}
