import { cn } from "@workspace/ui/lib/utils"

import { isSameDay, isSameMonth, monthWeeks, weekDays } from "@/lib/calendar"
import { DayNumber } from "@/components/calendar/day-number"

const weekdayName = new Intl.DateTimeFormat(undefined, { weekday: "short" })

export function MonthView({
  date,
  today,
  onSelectDay,
}: {
  date: Date
  today: Date
  onSelectDay: (day: Date) => void
}) {
  const weeks = monthWeeks(date)

  return (
    <div className="flex min-h-full flex-col">
      <div className="grid grid-cols-7 border-b">
        {weekDays(today).map((day) => (
          <div
            key={day.getDay()}
            className="px-2 py-1.5 text-xs font-medium text-muted-foreground"
          >
            {weekdayName.format(day)}
          </div>
        ))}
      </div>
      <div className="grid flex-1 auto-rows-fr grid-cols-7">
        {weeks.flat().map((day) => (
          <div
            key={day.toISOString()}
            className="min-h-20 border-b p-1 not-nth-[7n]:border-r"
          >
            <DayNumber
              day={day}
              isToday={isSameDay(day, today)}
              className={cn(!isSameMonth(day, date) && "text-muted-foreground")}
              onClick={() => onSelectDay(day)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
