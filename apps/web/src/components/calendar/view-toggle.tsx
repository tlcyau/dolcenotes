import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/components/toggle-group"

import { CALENDAR_VIEWS } from "@/lib/calendar"
import type { CalendarView } from "@/lib/calendar"

const LABELS: Record<CalendarView, string> = {
  day: "Day",
  week: "Week",
  month: "Month",
}

export function ViewToggle({
  value,
  onValueChange,
}: {
  value: CalendarView
  onValueChange: (view: CalendarView) => void
}) {
  return (
    <ToggleGroup
      aria-label="Calendar view"
      variant="outline"
      spacing={0}
      value={[value]}
      // Ignore presses on the active item, which would otherwise unselect it.
      onValueChange={([next]) => {
        if (next) onValueChange(next as CalendarView)
      }}
    >
      {CALENDAR_VIEWS.map((view) => (
        <ToggleGroupItem key={view} value={view} className="px-3">
          {LABELS[view]}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
