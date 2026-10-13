import { StyleSheet, Text as RNText } from "react-native"
import type { TextProps as RNTextProps } from "react-native"

import { FONTS } from "@/lib/colors"
import { useColors } from "@/lib/theme"

export type TextProps = RNTextProps & {
  /** Custom fonts need a family per weight, so fontWeight isn't used. */
  weight?: keyof typeof FONTS
  muted?: boolean
}

/** Themed text in Instrument Sans. */
export function Text({
  weight = "regular",
  muted,
  style,
  ...props
}: TextProps) {
  const colors = useColors()
  return (
    <RNText
      style={[
        styles.text,
        {
          fontFamily: FONTS[weight],
          color: muted ? colors.mutedForeground : colors.foreground,
        },
        style,
      ]}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  text: { fontSize: 14, lineHeight: 20 },
})
