// The web theme's tokens (packages/ui/src/styles/globals.css), converted
// from oklch to sRGB because React Native doesn't parse oklch.

export const COLORS = {
  light: {
    background: "#ffffff",
    foreground: "#0a0a0a",
    card: "#ffffff",
    cardForeground: "#0a0a0a",
    primary: "#171717",
    primaryForeground: "#fafafa",
    muted: "#f5f5f5",
    mutedForeground: "#737373",
    accent: "#f5f5f5",
    accentForeground: "#171717",
    destructive: "#e7000b",
    border: "#e5e5e5",
    input: "#e5e5e5",
    ring: "#a1a1a1",
    gold: "#c79e41",
    goldForeground: "#171717",
    /** gold at 6%, the today column's tint */
    goldTint: "rgba(199, 158, 65, 0.06)",
    sidebar: "#fafafa",
    sidebarForeground: "#0a0a0a",
    sidebarAccent: "#f5f5f5",
    sidebarBorder: "#e5e5e5",
    overlay: "rgba(0, 0, 0, 0.2)",
  },
  dark: {
    background: "#0a0a0a",
    foreground: "#fafafa",
    card: "#171717",
    cardForeground: "#fafafa",
    primary: "#e5e5e5",
    primaryForeground: "#171717",
    muted: "#262626",
    mutedForeground: "#a1a1a1",
    accent: "#262626",
    accentForeground: "#fafafa",
    destructive: "#ff6467",
    border: "rgba(255, 255, 255, 0.1)",
    input: "rgba(255, 255, 255, 0.15)",
    ring: "#737373",
    gold: "#e1b75c",
    goldForeground: "#171717",
    goldTint: "rgba(225, 183, 92, 0.06)",
    sidebar: "#171717",
    sidebarForeground: "#fafafa",
    sidebarAccent: "#262626",
    sidebarBorder: "rgba(255, 255, 255, 0.1)",
    overlay: "rgba(0, 0, 0, 0.2)",
  },
} as const

export type Colors = { [K in keyof (typeof COLORS)["light"]]: string }

/** --radius is 0.625rem; the scale matches the web's radius-sm…xl. */
export const RADIUS = { sm: 6, md: 8, lg: 10, xl: 14 } as const

export const FONTS = {
  regular: "InstrumentSans_400Regular",
  medium: "InstrumentSans_500Medium",
} as const
