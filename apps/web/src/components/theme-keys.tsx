import { cn } from "@workspace/ui/lib/utils"

import { setTheme, useTheme } from "@/lib/theme"
import type { Theme } from "@/lib/theme"

// One C–E stretch of a keyboard: white keys switch to light, black to dark.
// Only the first key of each colour is exposed to assistive tech and the
// tab order; the rest are mouse/touch-only duplicates.
const WHITE_KEYS = 3
const BLACK_KEY_OFFSETS = [1, 2] // in white-key widths, centred on the gap

const KEY_FOCUS =
  "outline-none focus-visible:z-20 focus-visible:ring-2 focus-visible:ring-ring"

export function ThemeKeys() {
  const theme = useTheme()

  function keyProps(keyTheme: Theme, index: number) {
    const label = keyTheme === "light" ? "Light mode" : "Dark mode"
    return {
      type: "button" as const,
      onClick: () => setTheme(keyTheme),
      "data-pressed": theme === keyTheme || undefined,
      ...(index === 0
        ? { "aria-label": label, "aria-pressed": theme === keyTheme }
        : { "aria-hidden": true, tabIndex: -1 }),
    }
  }

  return (
    <div
      role="group"
      aria-label="Colour theme"
      className="relative flex h-8 overflow-hidden rounded-b-sm"
    >
      {Array.from({ length: WHITE_KEYS }, (_, i) => (
        <button
          key={`white-${i}`}
          {...keyProps("light", i)}
          className={cn(
            KEY_FOCUS,
            "h-full w-4 border border-l-0 border-neutral-300 bg-white shadow-[inset_0_-3px_0_rgb(0_0_0/0.1)] transition-[background-color,box-shadow] first:rounded-bl-sm first:border-l last:rounded-br-sm hover:bg-neutral-50 dark:border-neutral-950",
            "data-pressed:bg-neutral-100 data-pressed:shadow-[inset_0_-1px_0_rgb(0_0_0/0.1),inset_0_2px_3px_rgb(0_0_0/0.12)]"
          )}
        />
      ))}
      {BLACK_KEY_OFFSETS.map((offset, i) => (
        <button
          key={`black-${i}`}
          {...keyProps("dark", i)}
          style={{ left: `calc(${offset} * 1rem - 0.3125rem)` }}
          className={cn(
            KEY_FOCUS,
            "absolute top-0 z-10 h-[60%] w-2.5 rounded-b-[2px] bg-neutral-900 shadow-[inset_0_-3px_0_rgb(255_255_255/0.18)] transition-[background-color,box-shadow] hover:bg-neutral-800",
            "data-pressed:bg-neutral-950 data-pressed:shadow-[inset_0_-1px_0_rgb(255_255_255/0.12)]"
          )}
        />
      ))}
    </div>
  )
}
