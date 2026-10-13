import { StyleSheet, View } from "react-native"

import { Text } from "@/components/ui/text"
import { DayNumber } from "@/components/calendar/day-number"
import { isSameDay, isSameMonth, monthWeeks, weekDays } from "@/lib/calendar"
import { useColors } from "@/lib/theme"

const weekdayName = new Intl.DateTimeFormat(undefined, { weekday: "short" })

export function MonthView({
  date,
  today,
  onSelectDay,
}: {
  date: Date
  today: Date
  onSelectDay: (day: Date) => void
}) {
  const colors = useColors()
  const weeks = monthWeeks(date)
  const border = { borderColor: colors.border }

  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.header, border]}>
        {weekDays(today).map((day) => (
          <Text key={day.getDay()} muted weight="medium" style={styles.weekday}>
            {weekdayName.format(day)}
          </Text>
        ))}
      </View>
      {weeks.map((week) => (
        <View key={week[0].toISOString()} style={[styles.row, styles.week]}>
          {week.map((day, i) => (
            <View
              key={day.toISOString()}
              style={[styles.cell, border, i < 6 && styles.cellDivider]}
            >
              <DayNumber
                day={day}
                isToday={isSameDay(day, today)}
                muted={!isSameMonth(day, date)}
                onPress={() => onSelectDay(day)}
              />
            </View>
          ))}
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  row: { flexDirection: "row" },
  header: { borderBottomWidth: StyleSheet.hairlineWidth },
  weekday: {
    flex: 1,
    paddingHorizontal: 6,
    paddingVertical: 6,
    fontSize: 12,
    lineHeight: 16,
  },
  // Weeks share the height, but never get shorter than 80pt.
  week: { flex: 1, minHeight: 80 },
  cell: {
    flex: 1,
    padding: 2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  cellDivider: { borderRightWidth: StyleSheet.hairlineWidth },
})
