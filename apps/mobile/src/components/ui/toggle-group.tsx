import { Pressable, StyleSheet, View } from "react-native"
import type { StyleProp, ViewStyle } from "react-native"

import { Text } from "@/components/ui/text"
import { RADIUS } from "@/lib/colors"
import { useColors } from "@/lib/theme"

export type ToggleItem<T extends string> = {
  value: T
  label: string
  accessibilityLabel?: string
}

/**
 * A row of outline toggles, like the shared ToggleGroup. `joined` butts the
 * items together into one segmented control; otherwise they're spaced apart.
 * Pressed items are muted, or filled with the primary colour if `filled`.
 */
export function ToggleGroup<T extends string>({
  items,
  value,
  onValueChange,
  multiple,
  joined,
  filled,
  accessibilityLabel,
  itemStyle,
}: {
  items: ReadonlyArray<ToggleItem<T>>
  value: ReadonlyArray<T>
  onValueChange: (value: Array<T>) => void
  multiple?: boolean
  joined?: boolean
  filled?: boolean
  accessibilityLabel?: string
  itemStyle?: StyleProp<ViewStyle>
}) {
  const colors = useColors()

  function toggle(item: T) {
    const pressed = value.includes(item)
    if (multiple) {
      onValueChange(
        pressed ? value.filter((v) => v !== item) : [...value, item]
      )
    } else {
      onValueChange(pressed ? [] : [item])
    }
  }

  return (
    <View
      accessibilityRole={multiple ? undefined : "radiogroup"}
      accessibilityLabel={accessibilityLabel}
      style={[styles.group, !joined && styles.spaced]}
    >
      {items.map((item, index) => {
        const pressed = value.includes(item.value)
        return (
          <Pressable
            key={item.value}
            accessibilityRole={multiple ? "checkbox" : "radio"}
            accessibilityLabel={item.accessibilityLabel}
            accessibilityState={
              multiple ? { checked: pressed } : { selected: pressed }
            }
            onPress={() => toggle(item.value)}
            style={({ pressed: isPressed }) => [
              styles.item,
              { borderColor: colors.input },
              joined && [
                styles.joined,
                index === 0 && styles.first,
                index === items.length - 1 && styles.last,
                index > 0 && styles.notFirst,
              ],
              (pressed || isPressed) && { backgroundColor: colors.muted },
              pressed &&
                filled && {
                  backgroundColor: colors.primary,
                  borderColor: colors.primary,
                },
              itemStyle,
            ]}
          >
            <Text
              weight="medium"
              style={
                pressed && filled ? { color: colors.primaryForeground } : null
              }
            >
              {item.label}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  group: { flexDirection: "row" },
  spaced: { gap: 6 },
  item: {
    minWidth: 40,
    height: 40,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: RADIUS.md,
  },
  joined: { borderRadius: 0 },
  first: {
    borderTopLeftRadius: RADIUS.md,
    borderBottomLeftRadius: RADIUS.md,
  },
  last: {
    borderTopRightRadius: RADIUS.md,
    borderBottomRightRadius: RADIUS.md,
  },
  notFirst: { borderLeftWidth: 0 },
})
