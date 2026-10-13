import { cn } from "@workspace/ui/lib/utils"

import { isSameDay } from "@/lib/calendar"
import { DayNumber } from "@/components/calendar/day-number"

const weekdayName = new Intl.DateTimeFormat(undefined, { weekday: "short" })

/** Full-height columns for one day (day view) or seven (week view). */
export function DayColumns({
  days,
  today,
  onSelectDay,
}: {
  days: Array<Date>
  today: Date
  onSelectDay: (day: Date) => void
}) {
  return (
    <div className="flex min-h-full flex-col">
      <div className="flex border-b">
        {days.map((day) => (
          <div
            key={day.toISOString()}
            className="flex flex-1 flex-col items-center gap-0.5 py-1.5 not-first:border-l"
          >
            <span className="text-xs font-medium text-muted-foreground">
              {weekdayName.format(day)}
            </span>
            <DayNumber
              day={day}
              isToday={isSameDay(day, today)}
              onClick={() => onSelectDay(day)}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-1">
        {days.map((day) => (
          <div
            key={day.toISOString()}
            className={cn(
              "flex-1 not-first:border-l",
              isSameDay(day, today) && "bg-gold/[0.06]"
            )}
          />
        ))}
      </div>
    </div>
  )
}
