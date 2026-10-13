import { ClientOnly, createFileRoute } from "@tanstack/react-router"

import { isCalendarView } from "@/lib/calendar"
import type { CalendarView } from "@/lib/calendar"
import { AppShell } from "@/components/app-shell"
import { Calendar } from "@/components/calendar/calendar"
import { ViewToggle } from "@/components/calendar/view-toggle"

export const Route = createFileRoute("/")({
  validateSearch: (search): { view?: CalendarView } => ({
    view: isCalendarView(search.view) ? search.view : undefined,
  }),
  component: HomePage,
})

function HomePage() {
  const { view = "week" } = Route.useSearch()
  const navigate = Route.useNavigate()

  function setView(next: CalendarView) {
    // Week is the default, so keep the bare "/" URL for it.
    navigate({ search: { view: next === "week" ? undefined : next } })
  }

  return (
    <AppShell actions={<ViewToggle value={view} onValueChange={setView} />}>
      <ClientOnly>
        <Calendar view={view} onViewChange={setView} />
      </ClientOnly>
    </AppShell>
  )
}
