import { useWindowDimensions } from "react-native"
import { router, useLocalSearchParams } from "expo-router"

import { AppShell, WIDE_WIDTH } from "@/components/app-shell"
import { Calendar } from "@/components/calendar/calendar"
import { ViewToggle } from "@/components/calendar/view-toggle"
import { isCalendarView } from "@/lib/calendar"
import type { CalendarView } from "@/lib/calendar"

export default function HomeScreen() {
  const params = useLocalSearchParams<{ view?: string }>()
  const view: CalendarView = isCalendarView(params.view) ? params.view : "week"
  // Phones lack room in the top bar, so the toggle joins the calendar toolbar.
  const wide = useWindowDimensions().width >= WIDE_WIDTH

  function setView(next: CalendarView) {
    // Week is the default, so keep the bare "/" URL for it.
    router.setParams({ view: next === "week" ? undefined : next })
  }

  const toggle = <ViewToggle value={view} onValueChange={setView} />

  return (
    <AppShell actions={wide ? toggle : undefined}>
      <Calendar
        view={view}
        onViewChange={setView}
        accessory={wide ? undefined : toggle}
      />
    </AppShell>
  )
}
