import { useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { formatViewTitle, startOfDay, stepDate, weekDays } from "@/lib/calendar"
import type { CalendarView } from "@/lib/calendar"
import { MonthView } from "@/components/calendar/month-view"
import { DayColumns } from "@/components/calendar/day-columns"

/**
 * Reads the viewer's clock and time zone, so render it client-side only
 * (e.g. inside <ClientOnly>) to avoid a server/client hydration mismatch.
 */
export function Calendar({
  view,
  onViewChange,
}: {
  view: CalendarView
  onViewChange: (view: CalendarView) => void
}) {
  const [today] = useState(() => startOfDay(new Date()))
  const [date, setDate] = useState(today)

  function openDay(day: Date) {
    setDate(day)
    onViewChange("day")
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 items-center gap-2 border-b px-4 py-2">
        <Button variant="outline" onClick={() => setDate(today)}>
          Today
        </Button>
        <div className="flex">
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Previous ${view}`}
            onClick={() => setDate(stepDate(view, date, -1))}
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Next ${view}`}
            onClick={() => setDate(stepDate(view, date, 1))}
          >
            <ChevronRightIcon />
          </Button>
        </div>
        <h1 aria-live="polite" className="truncate text-base font-medium">
          {formatViewTitle(view, date)}
        </h1>
      </div>
      <div className="min-h-0 flex-1 overflow-auto">
        {view === "month" ? (
          <MonthView date={date} today={today} onSelectDay={openDay} />
        ) : (
          <DayColumns
            days={view === "week" ? weekDays(date) : [date]}
            today={today}
            onSelectDay={openDay}
          />
        )}
      </div>
    </div>
  )
}
