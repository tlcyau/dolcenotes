import { Pressable, StyleSheet, View } from "react-native"

import { setTheme, useTheme } from "@/lib/theme"
import type { Theme } from "@/lib/theme"

// One C–E stretch of a keyboard: white keys switch to light, black to dark.
// Only the first key of each colour is exposed to assistive tech; the rest
// are touch-only duplicates.
const WHITE_KEYS = 3
const BLACK_KEY_OFFSETS = [1, 2] // in white-key widths, centred on the gap

// A little larger than the web's 16×32 keys so they're easy to tap.
const WHITE_WIDTH = 20
const BLACK_WIDTH = 12
const HEIGHT = 36

export function ThemeKeys() {
  const theme = useTheme()

  function keyProps(keyTheme: Theme, index: number) {
    const pressed = theme === keyTheme
    return {
      onPress: () => setTheme(keyTheme),
      pressed,
      ...(index === 0
        ? {
            accessibilityRole: "button" as const,
            accessibilityLabel:
              keyTheme === "light" ? "Light mode" : "Dark mode",
            accessibilityState: { selected: pressed },
          }
        : {
            accessible: false,
            importantForAccessibility: "no-hide-descendants" as const,
          }),
    }
  }

  return (
    <View accessibilityLabel="Colour theme" style={styles.keys}>
      {Array.from({ length: WHITE_KEYS }, (_, i) => {
        const { pressed, ...props } = keyProps("light", i)
        return (
          <Pressable
            key={`white-${i}`}
            {...props}
            style={({ pressed: isPressed }) => [
              styles.white,
              theme === "dark" && styles.whiteOnDark,
              i === 0 && styles.firstWhite,
              i === WHITE_KEYS - 1 && styles.lastWhite,
              (pressed || isPressed) && styles.whitePressed,
            ]}
          />
        )
      })}
      {BLACK_KEY_OFFSETS.map((offset, i) => {
        const { pressed, ...props } = keyProps("dark", i)
        return (
          <Pressable
            key={`black-${i}`}
            {...props}
            style={({ pressed: isPressed }) => [
              styles.black,
              { left: offset * WHITE_WIDTH - BLACK_WIDTH / 2 },
              (pressed || isPressed) && styles.blackPressed,
            ]}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  keys: {
    flexDirection: "row",
    height: HEIGHT,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    overflow: "hidden",
  },
  white: {
    width: WHITE_WIDTH,
    height: "100%",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: "#d4d4d4",
    // The web's inset shadow, as a thicker bottom edge.
    borderBottomWidth: 3,
    borderBottomColor: "#e0e0e0",
  },
  whiteOnDark: { borderColor: "#0a0a0a" },
  firstWhite: { borderLeftWidth: 1, borderBottomLeftRadius: 3 },
  lastWhite: { borderBottomRightRadius: 3 },
  whitePressed: {
    backgroundColor: "#f5f5f5",
    borderBottomWidth: 1,
    borderBottomColor: "#d4d4d4",
  },
  black: {
    position: "absolute",
    top: 0,
    zIndex: 1,
    width: BLACK_WIDTH,
    height: "60%",
    backgroundColor: "#171717",
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    borderBottomWidth: 3,
    borderBottomColor: "#454545",
  },
  blackPressed: {
    backgroundColor: "#0a0a0a",
    borderBottomWidth: 1,
    borderBottomColor: "#2a2a2a",
  },
})
