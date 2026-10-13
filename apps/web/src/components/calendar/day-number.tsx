import { cn } from "@workspace/ui/lib/utils"

const fullDate = new Intl.DateTimeFormat(undefined, { dateStyle: "full" })

/** A day-of-month badge that opens that day; today is filled in. */
export function DayNumber({
  day,
  isToday,
  className,
  onClick,
}: {
  day: Date
  isToday: boolean
  className?: string
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      aria-label={fullDate.format(day)}
      aria-current={isToday ? "date" : undefined}
      onClick={onClick}
      className={cn(
        "inline-flex size-7 items-center justify-center rounded-full text-xs font-medium tabular-nums outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/30",
        isToday && "bg-gold text-gold-foreground hover:bg-gold/80",
        className
      )}
    >
      {day.getDate()}
    </button>
  )
}
