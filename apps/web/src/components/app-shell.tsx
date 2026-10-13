import { useEffect, useState } from "react"
import { PanelLeftCloseIcon, PanelLeftOpenIcon } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"

import { Button } from "@workspace/ui/components/button"
import { Logo } from "@/components/logo"
import { StudentNav } from "@/components/student-nav"
import { ThemeKeys } from "@/components/theme-keys"

const MOBILE_QUERY = "(max-width: 767px)"

export function AppShell({
  actions,
  children,
}: {
  /** Controls shown at the right of the top bar. */
  actions?: React.ReactNode
  children: React.ReactNode
}) {
  // null until hydrated: CSS shows the nav on desktop and hides it on phones
  // (where it overlays the page), so the server render matches either screen.
  const [navOpen, setNavOpen] = useState<boolean | null>(null)

  useEffect(() => {
    setNavOpen(!window.matchMedia(MOBILE_QUERY).matches)
  }, [])

  return (
    <div className="flex h-svh flex-col">
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-3">
        <Button
          variant="ghost"
          size="icon-lg"
          aria-label={
            navOpen === false ? "Expand navigation" : "Collapse navigation"
          }
          aria-expanded={navOpen ?? undefined}
          aria-controls="app-nav"
          onClick={() => setNavOpen((open) => !open)}
        >
          <PanelLeftCloseIcon
            className={cn(
              navOpen === false && "hidden",
              navOpen === null && "max-md:hidden"
            )}
          />
          <PanelLeftOpenIcon
            className={cn(
              navOpen === true && "hidden",
              navOpen === null && "md:hidden"
            )}
          />
        </Button>
        <Logo className="text-xl" />
        <div className="ml-auto flex items-center gap-3">
          {actions}
          <ThemeKeys />
        </div>
      </header>
      <div className="relative flex min-h-0 flex-1">
        <aside
          id="app-nav"
          className={cn(
            "absolute inset-y-0 left-0 z-20 shrink-0 overflow-hidden border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width,visibility] duration-200 ease-out md:relative",
            navOpen === true && "w-60 border-r",
            navOpen === false && "invisible w-0",
            navOpen === null &&
              "max-md:invisible max-md:w-0 md:w-60 md:border-r"
          )}
        >
          <nav aria-label="Main" className="h-full w-60 overflow-y-auto p-2">
            <StudentNav />
          </nav>
        </aside>
        {navOpen && (
          <div
            aria-hidden
            className="absolute inset-0 z-10 bg-black/20 md:hidden"
            onClick={() => setNavOpen(false)}
          />
        )}
        <main className="min-w-0 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
