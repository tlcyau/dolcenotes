import { forwardRef, useState } from "react"
import { StyleSheet, TextInput } from "react-native"
import type { TextInputProps } from "react-native"

import { FONTS, RADIUS } from "@/lib/colors"
import { useColors, useTheme } from "@/lib/theme"

/** A text field styled like the shared shadcn input (and textarea, if multiline). */
export const Input = forwardRef<TextInput, TextInputProps>(function Input(
  { style, multiline, onFocus, onBlur, ...props },
  ref
) {
  const colors = useColors()
  const theme = useTheme()
  const [focused, setFocused] = useState(false)

  return (
    <TextInput
      ref={ref}
      multiline={multiline}
      placeholderTextColor={colors.mutedForeground}
      selectionColor={colors.gold}
      keyboardAppearance={theme}
      onFocus={(event) => {
        setFocused(true)
        onFocus?.(event)
      }}
      onBlur={(event) => {
        setFocused(false)
        onBlur?.(event)
      }}
      style={[
        styles.input,
        multiline && styles.multiline,
        {
          color: colors.foreground,
          borderColor: focused ? colors.ring : colors.input,
          backgroundColor: theme === "dark" ? colors.input : "transparent",
        },
        style,
      ]}
      {...props}
    />
  )
})

const styles = StyleSheet.create({
  input: {
    minHeight: 40,
    borderWidth: 1,
    borderRadius: RADIUS.md,
    paddingHorizontal: 10,
    fontFamily: FONTS.regular,
    fontSize: 16, // 16+ stops iOS zooming and reads well on phones
  },
  multiline: {
    minHeight: 88,
    paddingTop: 10,
    paddingBottom: 10,
    textAlignVertical: "top",
  },
})
