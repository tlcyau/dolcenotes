import AsyncStorage from "@react-native-async-storage/async-storage"
import { Appearance, useColorScheme } from "react-native"

import { COLORS } from "@/lib/colors"

export type Theme = "light" | "dark"

const STORAGE_KEY = "theme"

// The chosen theme is applied as the app's colour-scheme override, so native
// UI (status bar, date picker, sheets) follows it too. Without a saved
// choice the app follows the system setting, like the web app.

/** Applies the saved theme; await it before hiding the splash screen. */
export async function restoreTheme() {
  try {
    const saved = await AsyncStorage.getItem(STORAGE_KEY)
    if (saved === "light" || saved === "dark") Appearance.setColorScheme(saved)
  } catch {
    // Unreadable storage just means the system theme is used.
  }
}

export function setTheme(theme: Theme) {
  Appearance.setColorScheme(theme)
  AsyncStorage.setItem(STORAGE_KEY, theme).catch(() => {
    // The theme still applies for this session.
  })
}

export function useTheme(): Theme {
  return useColorScheme() === "dark" ? "dark" : "light"
}

export function useColors() {
  return COLORS[useTheme()]
}
