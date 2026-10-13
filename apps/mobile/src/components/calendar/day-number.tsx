import { Pressable, StyleSheet } from "react-native"

import { Text } from "@/components/ui/text"
import { useColors } from "@/lib/theme"

const fullDate = new Intl.DateTimeFormat(undefined, { dateStyle: "full" })

/** A day-of-month badge that opens that day; today is filled in. */
export function DayNumber({
  day,
  isToday,
  muted,
  onPress,
}: {
  day: Date
  isToday: boolean
  /** Dims days outside the month being shown. */
  muted?: boolean
  onPress?: () => void
}) {
  const colors = useColors()

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={fullDate.format(day)}
      accessibilityHint={isToday ? "Today" : undefined}
      onPress={onPress}
      hitSlop={4}
      style={({ pressed }) => [
        styles.badge,
        pressed && { backgroundColor: colors.muted },
        isToday && { backgroundColor: colors.gold, opacity: pressed ? 0.8 : 1 },
      ]}
    >
      <Text
        weight="medium"
        muted={muted && !isToday}
        style={[styles.number, isToday && { color: colors.goldForeground }]}
      >
        {day.getDate()}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  badge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  number: { fontSize: 13, fontVariant: ["tabular-nums"] },
})
