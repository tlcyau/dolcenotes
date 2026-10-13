import { useSyncExternalStore } from "react"

export type Theme = "light" | "dark"

const STORAGE_KEY = "theme"

/**
 * Runs in <head> before first paint so a saved (or system) dark theme
 * doesn't flash light while the app hydrates.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");var d=t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d)}catch(e){}})()`

export function setTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark")
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Storage can be unavailable (e.g. private mode); the theme still applies.
  }
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributeFilter: ["class"] })
  return () => observer.disconnect()
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light"
}

/** The active theme, or null during SSR and hydration. */
export function useTheme(): Theme | null {
  return useSyncExternalStore(subscribe, getSnapshot, () => null)
}
