import { ToggleGroup } from "@/components/ui/toggle-group"
import { CALENDAR_VIEWS } from "@/lib/calendar"
import type { CalendarView } from "@/lib/calendar"

const ITEMS = CALENDAR_VIEWS.map((view) => ({
  value: view,
  label: { day: "Day", week: "Week", month: "Month" }[view],
}))

export function ViewToggle({
  value,
  onValueChange,
}: {
  value: CalendarView
  onValueChange: (view: CalendarView) => void
}) {
  return (
    <ToggleGroup
      accessibilityLabel="Calendar view"
      joined
      items={ITEMS}
      value={[value]}
      // Ignore presses on the active item, which would otherwise unselect it.
      onValueChange={([next]) => {
        if (next) onValueChange(next)
      }}
    />
  )
}
