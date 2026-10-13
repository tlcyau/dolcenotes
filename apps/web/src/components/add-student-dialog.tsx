import { useState } from "react"
import { PlusIcon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { Textarea } from "@workspace/ui/components/textarea"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/components/toggle-group"

import {
  WEEKDAYS,
  formatSchedule,
  toDateInputValue,
  weekdayOf,
} from "@/lib/schedule"
import type { Schedule, ScheduleUnit, Weekday } from "@/lib/schedule"

export type NewStudent = {
  name: string
  schedule: Schedule
  /** The tutor's free-form notes about the student. */
  about: string
}

const MAX_INTERVAL = 52

/** The sidebar's "Add Student" button and the form it opens. */
export function AddStudentDialog({
  onAdd,
}: {
  onAdd: (student: NewStudent) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button className="w-full" />}>
        <PlusIcon data-icon="inline-start" />
        Add Student
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add student</DialogTitle>
          <DialogDescription>
            Their lessons will show on your calendar.
          </DialogDescription>
        </DialogHeader>
        {/* The popup unmounts when closed, so each open starts a fresh form. */}
        <AddStudentForm
          onSubmit={(student) => {
            onAdd(student)
            setOpen(false)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}

function AddStudentForm({
  onSubmit,
}: {
  onSubmit: (student: NewStudent) => void
}) {
  const [today] = useState(() => new Date())
  const [unit, setUnit] = useState<ScheduleUnit>("week")
  // Kept as text so the field can be cleared while typing a new number.
  const [intervalText, setIntervalText] = useState("1")
  const [days, setDays] = useState<Array<Weekday>>(() => [weekdayOf(today)])
  const [startDate, setStartDate] = useState(() => toDateInputValue(today))
  const [missingDays, setMissingDays] = useState(false)

  const interval = Math.min(
    Math.max(Math.trunc(Number(intervalText)) || 1, 1),
    MAX_INTERVAL
  )
  const schedule: Schedule = { unit, interval, days, startDate }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (unit === "week" && days.length === 0) {
      setMissingDays(true)
      return
    }
    const data = new FormData(event.currentTarget)
    const name = String(data.get("name")).trim()
    if (!name) return
    onSubmit({
      name,
      schedule: { ...schedule, days: unit === "week" ? days : [] },
      about: String(data.get("about")).trim(),
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="student-name">Student name</FieldLabel>
          <Input
            id="student-name"
            name="name"
            autoComplete="off"
            autoFocus
            required
          />
        </Field>

        <FieldSet>
          <FieldLegend variant="label">Schedule</FieldLegend>
          <Field orientation="horizontal">
            <FieldLabel htmlFor="schedule-interval" className="flex-none!">
              Repeats every
            </FieldLabel>
            <Input
              id="schedule-interval"
              type="number"
              inputMode="numeric"
              min={1}
              max={MAX_INTERVAL}
              value={intervalText}
              onChange={(event) => setIntervalText(event.target.value)}
              onBlur={() => setIntervalText(String(interval))}
              className="w-16"
            />
            <Select
              value={unit}
              onValueChange={(value) => value && setUnit(value)}
              items={[
                { value: "day", label: interval === 1 ? "day" : "days" },
                { value: "week", label: interval === 1 ? "week" : "weeks" },
              ]}
            >
              <SelectTrigger aria-label="Repeat unit" className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">
                  {interval === 1 ? "day" : "days"}
                </SelectItem>
                <SelectItem value="week">
                  {interval === 1 ? "week" : "weeks"}
                </SelectItem>
              </SelectContent>
            </Select>
          </Field>

          {unit === "week" && (
            <Field data-invalid={missingDays || undefined}>
              <FieldLabel id="schedule-days-label">On</FieldLabel>
              <ToggleGroup
                aria-labelledby="schedule-days-label"
                multiple
                variant="outline"
                spacing={1}
                value={days}
                onValueChange={(next) => {
                  setDays(next as Array<Weekday>)
                  setMissingDays(false)
                }}
              >
                {WEEKDAYS.map((day) => (
                  <ToggleGroupItem
                    key={day}
                    value={day}
                    aria-label={day.charAt(0) + day.slice(1).toLowerCase()}
                    className="size-8 aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground"
                  >
                    {day.charAt(0)}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
              {missingDays && <FieldError>Pick at least one day.</FieldError>}
            </Field>
          )}

          <Field orientation="horizontal">
            <FieldLabel htmlFor="schedule-start" className="flex-none!">
              Starting
            </FieldLabel>
            <Input
              id="schedule-start"
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              required
              className="w-auto"
            />
          </Field>
          <FieldDescription aria-live="polite">
            {formatSchedule(schedule)}
          </FieldDescription>
        </FieldSet>

        <Field>
          <FieldLabel htmlFor="student-about">Notes</FieldLabel>
          <Textarea
            id="student-about"
            name="about"
            placeholder="Level, goals, repertoire, parent contact…"
            className="min-h-20"
          />
        </Field>

        <DialogFooter>
          <DialogClose render={<Button type="button" variant="outline" />}>
            Cancel
          </DialogClose>
          <Button type="submit">Add student</Button>
        </DialogFooter>
      </FieldGroup>
    </form>
  )
}
