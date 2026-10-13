import { useEffect, useState } from "react"
// Per-weight imports, so only these fonts are bundled.
import { InstrumentSans_400Regular } from "@expo-google-fonts/instrument-sans/400Regular"
import { InstrumentSans_500Medium } from "@expo-google-fonts/instrument-sans/500Medium"
import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { StatusBar } from "expo-status-bar"

import { restoreTheme, useColors, useTheme } from "@/lib/theme"

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const theme = useTheme()
  const colors = useColors()
  const [fontsLoaded, fontError] = useFonts({
    InstrumentSans_400Regular,
    InstrumentSans_500Medium,
  })
  const [themeRestored, setThemeRestored] = useState(false)
  // Fall back to system fonts rather than staying on the splash screen.
  const ready = (fontsLoaded || !!fontError) && themeRestored

  useEffect(() => {
    restoreTheme().finally(() => setThemeRestored(true))
  }, [])

  useEffect(() => {
    if (ready) SplashScreen.hideAsync()
  }, [ready])

  if (!ready) return null

  return (
    <>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      />
    </>
  )
}
