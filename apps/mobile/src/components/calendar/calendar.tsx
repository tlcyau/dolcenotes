import { useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react-native"

import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { DayColumns } from "@/components/calendar/day-columns"
import { MonthView } from "@/components/calendar/month-view"
import { formatViewTitle, startOfDay, stepDate, weekDays } from "@/lib/calendar"
import type { CalendarView } from "@/lib/calendar"
import { useColors } from "@/lib/theme"

export function Calendar({
  view,
  onViewChange,
  accessory,
}: {
  view: CalendarView
  onViewChange: (view: CalendarView) => void
  /**
   * Shown at the end of the toolbar (the view toggle, on phones). The title
   * then moves to its own line to make room.
   */
  accessory?: React.ReactNode
}) {
  const colors = useColors()
  const [today] = useState(() => startOfDay(new Date()))
  const [date, setDate] = useState(today)

  function openDay(day: Date) {
    setDate(day)
    onViewChange("day")
  }

  const title = (
    <Text
      accessibilityRole="header"
      accessibilityLiveRegion="polite"
      weight="medium"
      numberOfLines={1}
      style={styles.title}
    >
      {formatViewTitle(view, date)}
    </Text>
  )

  return (
    <View style={styles.container}>
      <View style={[styles.toolbar, { borderColor: colors.border }]}>
        <View style={styles.controls}>
          <Button variant="outline" onPress={() => setDate(today)}>
            Today
          </Button>
          <View style={styles.steps}>
            <Button
              variant="ghost"
              size="icon"
              icon={ChevronLeftIcon}
              accessibilityLabel={`Previous ${view}`}
              onPress={() => setDate(stepDate(view, date, -1))}
            />
            <Button
              variant="ghost"
              size="icon"
              icon={ChevronRightIcon}
              accessibilityLabel={`Next ${view}`}
              onPress={() => setDate(stepDate(view, date, 1))}
            />
          </View>
          {accessory ? (
            <View style={styles.accessory}>{accessory}</View>
          ) : (
            title
          )}
        </View>
        {accessory && title}
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {view === "month" ? (
          <MonthView date={date} today={today} onSelectDay={openDay} />
        ) : (
          <DayColumns
            days={view === "week" ? weekDays(date) : [date]}
            today={today}
            onSelectDay={openDay}
          />
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  toolbar: {
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  controls: { flexDirection: "row", alignItems: "center", gap: 8 },
  steps: { flexDirection: "row" },
  accessory: { marginLeft: "auto" },
  title: { flexShrink: 1, fontSize: 16, lineHeight: 22 },
  content: { flexGrow: 1 },
})
