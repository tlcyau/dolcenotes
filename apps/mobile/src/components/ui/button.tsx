import { Pressable, StyleSheet } from "react-native"
import type { PressableProps, StyleProp, ViewStyle } from "react-native"
import type { LucideIcon } from "lucide-react-native"

import { Text } from "@/components/ui/text"
import { RADIUS } from "@/lib/colors"
import { useColors } from "@/lib/theme"
import type { Colors } from "@/lib/colors"

type Variant = "default" | "outline" | "ghost"
type Size = "default" | "icon"

export type ButtonProps = Omit<PressableProps, "children" | "style"> & {
  variant?: Variant
  size?: Size
  /** Shown before the label, or alone for icon buttons. */
  icon?: LucideIcon
  children?: string
  style?: StyleProp<ViewStyle>
}

/** A touch-sized take on the shared shadcn button. */
export function Button({
  variant = "default",
  size = "default",
  icon: Icon,
  children,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const colors = useColors()
  const { background, pressed, foreground, border } = variantColors(
    variant,
    colors
  )

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      style={({ pressed: isPressed }) => [
        styles.base,
        size === "icon" ? styles.icon : styles.default,
        {
          backgroundColor: isPressed ? pressed : background,
          borderColor: border,
        },
        disabled && styles.disabled,
        style,
      ]}
      {...props}
    >
      {Icon && <Icon size={size === "icon" ? 20 : 16} color={foreground} />}
      {children !== undefined && (
        <Text weight="medium" style={{ color: foreground }}>
          {children}
        </Text>
      )}
    </Pressable>
  )
}

function variantColors(variant: Variant, colors: Colors) {
  switch (variant) {
    case "default":
      return {
        background: colors.primary,
        pressed: colors.mutedForeground,
        foreground: colors.primaryForeground,
        border: "transparent",
      }
    case "outline":
      return {
        background: "transparent",
        pressed: colors.muted,
        foreground: colors.foreground,
        border: colors.border,
      }
    case "ghost":
      return {
        background: "transparent",
        pressed: colors.muted,
        foreground: colors.foreground,
        border: "transparent",
      }
  }
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderWidth: 1,
    borderRadius: RADIUS.md,
  },
  default: { height: 40, paddingHorizontal: 14 },
  icon: { width: 40, height: 40 },
  disabled: { opacity: 0.5 },
})
