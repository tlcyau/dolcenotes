import { useState } from "react"
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native"
import { PlusIcon } from "lucide-react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { Button } from "@/components/ui/button"
import { DateField } from "@/components/ui/date-field"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Text } from "@/components/ui/text"
import { ToggleGroup } from "@/components/ui/toggle-group"
import {
  WEEKDAYS,
  formatSchedule,
  fromDateInputValue,
  toDateInputValue,
  weekdayOf,
} from "@/lib/schedule"
import type { Schedule, ScheduleUnit, Weekday } from "@/lib/schedule"
import { useColors } from "@/lib/theme"

export type NewStudent = {
  name: string
  schedule: Schedule
  /** The tutor's free-form notes about the student. */
  about: string
}

const MAX_INTERVAL = 52

const WEEKDAY_ITEMS = WEEKDAYS.map((day) => ({
  value: day,
  label: day.charAt(0),
  accessibilityLabel: day.charAt(0) + day.slice(1).toLowerCase(),
}))

/** The nav's "Add Student" button and the form sheet it opens. */
export function AddStudentSheet({
  onAdd,
}: {
  onAdd: (student: NewStudent) => void
}) {
  const colors = useColors()
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button icon={PlusIcon} onPress={() => setOpen(true)}>
        Add Student
      </Button>
      <Modal
        visible={open}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setOpen(false)}
      >
        <SafeAreaView
          // iOS shows a page sheet below the status bar; Android goes full screen.
          edges={
            Platform.OS === "ios"
              ? ["bottom", "left", "right"]
              : ["top", "bottom", "left", "right"]
          }
          style={[styles.sheet, { backgroundColor: colors.background }]}
        >
          {/* The form unmounts when closed, so each open starts fresh. */}
          {open && (
            <AddStudentForm
              onCancel={() => setOpen(false)}
              onSubmit={(student) => {
                onAdd(student)
                setOpen(false)
              }}
            />
          )}
        </SafeAreaView>
      </Modal>
    </>
  )
}

function AddStudentForm({
  onCancel,
  onSubmit,
}: {
  onCancel: () => void
  onSubmit: (student: NewStudent) => void
}) {
  const [today] = useState(() => new Date())
  const [name, setName] = useState("")
  const [about, setAbout] = useState("")
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
  const trimmedName = name.trim()

  function handleSubmit() {
    if (unit === "week" && days.length === 0) {
      setMissingDays(true)
      return
    }
    if (!trimmedName) return
    onSubmit({
      name: trimmedName,
      schedule: { ...schedule, days: unit === "week" ? days : [] },
      about: about.trim(),
    })
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? undefined : "height"}
      style={styles.sheet}
    >
      <ScrollView
        contentContainerStyle={styles.form}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets
      >
        <View style={styles.header}>
          <Text accessibilityRole="header" weight="medium" style={styles.title}>
            Add student
          </Text>
          <Text muted>Their lessons will show on your calendar.</Text>
        </View>

        <FieldGroup>
          <Field>
            <FieldLabel nativeID="student-name">Student name</FieldLabel>
            <Input
              accessibilityLabelledBy="student-name"
              value={name}
              onChangeText={setName}
              autoComplete="off"
              autoCorrect={false}
              autoCapitalize="words"
              autoFocus
              returnKeyType="done"
            />
          </Field>

          <View style={styles.fieldSet}>
            <FieldLabel accessibilityRole="header">Schedule</FieldLabel>
            <Field horizontal>
              <FieldLabel nativeID="schedule-interval">
                Repeats every
              </FieldLabel>
              <Input
                accessibilityLabelledBy="schedule-interval"
                keyboardType="number-pad"
                maxLength={2}
                value={intervalText}
                onChangeText={setIntervalText}
                onBlur={() => setIntervalText(String(interval))}
                style={styles.interval}
              />
              <ToggleGroup
                accessibilityLabel="Repeat unit"
                joined
                items={[
                  { value: "day", label: interval === 1 ? "day" : "days" },
                  { value: "week", label: interval === 1 ? "week" : "weeks" },
                ]}
                value={[unit]}
                onValueChange={([next]) => next && setUnit(next)}
              />
            </Field>

            {unit === "week" && (
              <Field>
                <FieldLabel>On</FieldLabel>
                <ToggleGroup
                  accessibilityLabel="Lesson days"
                  multiple
                  filled
                  items={WEEKDAY_ITEMS}
                  value={days}
                  onValueChange={(next) => {
                    setDays(next)
                    setMissingDays(false)
                  }}
                  itemStyle={styles.weekday}
                />
                {missingDays && <FieldError>Pick at least one day.</FieldError>}
              </Field>
            )}

            <Field horizontal>
              <FieldLabel>Starting</FieldLabel>
              <DateField
                accessibilityLabel="Starting"
                value={fromDateInputValue(startDate)}
                onChange={(date) => setStartDate(toDateInputValue(date))}
              />
            </Field>
            <FieldDescription accessibilityLiveRegion="polite">
              {formatSchedule(schedule)}
            </FieldDescription>
          </View>

          <Field>
            <FieldLabel nativeID="student-about">Notes</FieldLabel>
            <Input
              accessibilityLabelledBy="student-about"
              multiline
              value={about}
              onChangeText={setAbout}
              placeholder="Level, goals, repertoire, parent contact…"
            />
          </Field>

          <View style={styles.footer}>
            <Button variant="outline" onPress={onCancel}>
              Cancel
            </Button>
            <Button disabled={!trimmedName} onPress={handleSubmit}>
              Add student
            </Button>
          </View>
        </FieldGroup>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  sheet: { flex: 1 },
  form: { gap: 20, padding: 20 },
  header: { gap: 4 },
  title: { fontSize: 18, lineHeight: 24 },
  fieldSet: { gap: 14 },
  interval: { width: 56, textAlign: "center" },
  weekday: { width: 40, paddingHorizontal: 0 },
  footer: { flexDirection: "row", justifyContent: "flex-end", gap: 8 },
})
