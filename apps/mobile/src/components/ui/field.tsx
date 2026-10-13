import { StyleSheet, View } from "react-native"
import type { ViewProps } from "react-native"

import { Text } from "@/components/ui/text"
import type { TextProps } from "@/components/ui/text"
import { useColors } from "@/lib/theme"

// Native versions of the shared Field primitives, for laying out forms.

export function FieldGroup({ style, ...props }: ViewProps) {
  return <View style={[styles.group, style]} {...props} />
}

export function Field({
  horizontal,
  style,
  ...props
}: ViewProps & { horizontal?: boolean }) {
  return (
    <View
      style={[horizontal ? styles.horizontal : styles.field, style]}
      {...props}
    />
  )
}

export function FieldLabel(props: TextProps) {
  return <Text weight="medium" {...props} />
}

export function FieldDescription({ style, ...props }: TextProps) {
  return <Text muted style={[styles.small, style]} {...props} />
}

export function FieldError({ style, ...props }: TextProps) {
  const colors = useColors()
  return (
    <Text
      accessibilityRole="alert"
      style={[styles.small, { color: colors.destructive }, style]}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  group: { gap: 20 },
  field: { gap: 8 },
  horizontal: { flexDirection: "row", alignItems: "center", gap: 10 },
  small: { fontSize: 13, lineHeight: 18 },
})
