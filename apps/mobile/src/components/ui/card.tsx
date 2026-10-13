import { StyleSheet, View } from "react-native"
import type { ViewProps } from "react-native"

import { Text } from "@/components/ui/text"
import type { TextProps } from "@/components/ui/text"
import { RADIUS } from "@/lib/colors"
import { useColors, useTheme } from "@/lib/theme"

export function Card({ style, ...props }: ViewProps) {
  const colors = useColors()
  const theme = useTheme()
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          // ring-foreground/10
          borderColor:
            theme === "dark"
              ? "rgba(250, 250, 250, 0.1)"
              : "rgba(10, 10, 10, 0.1)",
        },
        style,
      ]}
      {...props}
    />
  )
}

export function CardHeader({ style, ...props }: ViewProps) {
  return <View style={[styles.header, style]} {...props} />
}

export function CardTitle({ style, ...props }: TextProps) {
  return (
    <Text
      accessibilityRole="header"
      weight="medium"
      style={[styles.title, style]}
      {...props}
    />
  )
}

export function CardDescription({ style, ...props }: TextProps) {
  return <Text muted style={[styles.description, style]} {...props} />
}

export function CardContent({ style, ...props }: ViewProps) {
  return <View style={[styles.content, style]} {...props} />
}

const styles = StyleSheet.create({
  card: {
    gap: 20,
    paddingVertical: 20,
    borderWidth: 1,
    borderRadius: RADIUS.lg,
    overflow: "hidden",
  },
  header: { gap: 4, paddingHorizontal: 20 },
  title: { fontSize: 16, lineHeight: 22 },
  description: { fontSize: 13, lineHeight: 19 },
  content: { paddingHorizontal: 20 },
})
