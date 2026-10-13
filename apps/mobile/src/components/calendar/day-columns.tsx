import { StyleSheet, View } from "react-native"

import { Text } from "@/components/ui/text"
import { DayNumber } from "@/components/calendar/day-number"
import { isSameDay } from "@/lib/calendar"
import { useColors } from "@/lib/theme"

const weekdayName = new Intl.DateTimeFormat(undefined, { weekday: "short" })

/** Full-height columns for one day (day view) or seven (week view). */
export function DayColumns({
  days,
  today,
  onSelectDay,
}: {
  days: Array<Date>
  today: Date
  onSelectDay: (day: Date) => void
}) {
  const colors = useColors()

  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.header, { borderColor: colors.border }]}>
        {days.map((day, i) => (
          <View
            key={day.toISOString()}
            style={[
              styles.headerCell,
              i > 0 && [styles.divider, { borderColor: colors.border }],
            ]}
          >
            <Text muted weight="medium" style={styles.weekday}>
              {weekdayName.format(day)}
            </Text>
            <DayNumber
              day={day}
              isToday={isSameDay(day, today)}
              onPress={() => onSelectDay(day)}
            />
          </View>
        ))}
      </View>
      <View style={[styles.row, styles.body]}>
        {days.map((day, i) => (
          <View
            key={day.toISOString()}
            style={[
              styles.column,
              i > 0 && [styles.divider, { borderColor: colors.border }],
              isSameDay(day, today) && { backgroundColor: colors.goldTint },
            ]}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  row: { flexDirection: "row" },
  header: { borderBottomWidth: StyleSheet.hairlineWidth },
  headerCell: { flex: 1, alignItems: "center", gap: 2, paddingVertical: 6 },
  weekday: { fontSize: 12, lineHeight: 16 },
  divider: { borderLeftWidth: StyleSheet.hairlineWidth },
  body: { flex: 1 },
  column: { flex: 1 },
})
