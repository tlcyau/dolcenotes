import type { DayOfWeek, StudentSchedule } from "./generated/prisma/client";

const DAYS: DayOfWeek[] = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

const MS_PER_DAY = 86_400_000;

/** Day of week for a date, using its UTC calendar day (matches `@db.Date` columns). */
export function dayOfWeek(date: Date): DayOfWeek {
  return DAYS[date.getUTCDay()]!;
}

/** Whole UTC days since the epoch for a date's calendar day. */
function dayNumber(date: Date): number {
  return Math.floor(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) / MS_PER_DAY,
  );
}

/** Whether a schedule has a lesson on the given calendar day. */
export function isScheduledOn(
  schedule: Pick<
    StudentSchedule,
    "frequency" | "day" | "interval" | "startDate" | "endDate"
  >,
  date: Date,
): boolean {
  const day = dayNumber(date);
  const start = dayNumber(schedule.startDate);
  if (day < start) return false;
  if (schedule.endDate && day > dayNumber(schedule.endDate)) return false;

  if (schedule.frequency === "DAILY") {
    return (day - start) % schedule.interval === 0;
  }

  if (dayOfWeek(date) !== schedule.day) return false;
  // Count Sunday-to-Saturday weeks, so every day of a multi-day schedule
  // shares the same "on" weeks whichever weekday it starts on.
  const weekStart = (n: number) => n - new Date(n * MS_PER_DAY).getUTCDay();
  const weeksSinceStart = (weekStart(day) - weekStart(start)) / 7;
  return weeksSinceStart % schedule.interval === 0;
}
