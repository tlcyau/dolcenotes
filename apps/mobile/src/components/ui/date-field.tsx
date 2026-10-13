import { Platform, Pressable, StyleSheet } from "react-native"
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker"

import { Text } from "@/components/ui/text"
import { RADIUS } from "@/lib/colors"
import { useColors, useTheme } from "@/lib/theme"

const mediumDate = new Intl.DateTimeFormat(undefined, { dateStyle: "medium" })

/**
 * A date picker: iOS's compact inline picker, or on Android a field that
 * opens the system date dialog.
 */
export function DateField({
  value,
  onChange,
  accessibilityLabel,
}: {
  value: Date
  onChange: (date: Date) => void
  accessibilityLabel?: string
}) {
  const colors = useColors()
  const theme = useTheme()

  if (Platform.OS === "ios") {
    return (
      <DateTimePicker
        mode="date"
        display="compact"
        value={value}
        onValueChange={(_, date) => onChange(date)}
        themeVariant={theme}
        accentColor={colors.gold}
        accessibilityLabel={accessibilityLabel}
      />
    )
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{ text: mediumDate.format(value) }}
      onPress={() =>
        DateTimePickerAndroid.open({
          mode: "date",
          value,
          onValueChange: (_, date) => onChange(date),
        })
      }
      style={({ pressed }) => [
        styles.field,
        { borderColor: colors.input },
        pressed && { backgroundColor: colors.muted },
      ]}
    >
      <Text style={styles.text}>{mediumDate.format(value)}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  field: {
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: RADIUS.md,
  },
  text: { fontSize: 16, lineHeight: 22 },
})
