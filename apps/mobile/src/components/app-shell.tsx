import { useEffect, useState } from "react"
import {
  BackHandler,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native"
import { PanelLeftCloseIcon, PanelLeftOpenIcon } from "lucide-react-native"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { StudentNav } from "@/components/student-nav"
import { ThemeKeys } from "@/components/theme-keys"
import { useColors } from "@/lib/theme"

/** Screens at least this wide (tablets) dock the nav beside the page. */
export const WIDE_WIDTH = 768
const NAV_WIDTH = 240

export function AppShell({
  actions,
  children,
}: {
  /** Controls shown at the right of the top bar. */
  actions?: React.ReactNode
  children: React.ReactNode
}) {
  const colors = useColors()
  const insets = useSafeAreaInsets()
  const wide = useWindowDimensions().width >= WIDE_WIDTH
  // Open by default where it's docked; on phones it overlays the page.
  const [navOpen, setNavOpen] = useState(wide)
  const progress = useSharedValue(navOpen ? 1 : 0)

  useEffect(() => {
    progress.set(withTiming(navOpen ? 1 : 0, { duration: 200 }))
  }, [navOpen, progress])

  const dockedStyle = useAnimatedStyle(() => ({
    width: progress.get() * NAV_WIDTH,
  }))
  const backdropStyle = useAnimatedStyle(() => ({ opacity: progress.get() }))
  const overlayStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: (progress.get() - 1) * (NAV_WIDTH + 1) }],
  }))

  // Android's back gesture closes the overlay before leaving the screen.
  useEffect(() => {
    if (wide || !navOpen) return
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        setNavOpen(false)
        return true
      }
    )
    return () => subscription.remove()
  }, [wide, navOpen])

  const nav = (
    <ScrollView
      accessibilityLabel="Main"
      style={{ width: NAV_WIDTH }}
      contentContainerStyle={[
        styles.navContent,
        { paddingBottom: 8 + insets.bottom, paddingLeft: 8 + insets.left },
      ]}
    >
      <StudentNav />
    </ScrollView>
  )

  return (
    <View style={[styles.shell, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.header,
          {
            borderColor: colors.border,
            paddingTop: insets.top,
            height: 56 + insets.top,
            paddingLeft: 8 + insets.left,
            paddingRight: 12 + insets.right,
          },
        ]}
      >
        <Button
          variant="ghost"
          size="icon"
          icon={navOpen ? PanelLeftCloseIcon : PanelLeftOpenIcon}
          accessibilityLabel={
            navOpen ? "Collapse navigation" : "Expand navigation"
          }
          accessibilityState={{ expanded: navOpen }}
          onPress={() => setNavOpen((open) => !open)}
        />
        <Logo size={20} />
        <View style={styles.actions}>
          {actions}
          <ThemeKeys />
        </View>
      </View>
      <View style={styles.body}>
        {wide ? (
          <Animated.View
            style={[
              styles.dockedNav,
              {
                backgroundColor: colors.sidebar,
                borderColor: colors.sidebarBorder,
                borderRightWidth: navOpen ? StyleSheet.hairlineWidth : 0,
              },
              dockedStyle,
            ]}
          >
            {nav}
          </Animated.View>
        ) : (
          <>
            <Animated.View
              pointerEvents={navOpen ? "auto" : "none"}
              style={[
                StyleSheet.absoluteFill,
                styles.backdrop,
                { backgroundColor: colors.overlay },
                backdropStyle,
              ]}
            >
              <Pressable
                accessibilityElementsHidden
                importantForAccessibility="no-hide-descendants"
                style={StyleSheet.absoluteFill}
                onPress={() => setNavOpen(false)}
              />
            </Animated.View>
            <Animated.View
              accessibilityElementsHidden={!navOpen}
              importantForAccessibility={
                navOpen ? "auto" : "no-hide-descendants"
              }
              style={[
                styles.overlayNav,
                {
                  backgroundColor: colors.sidebar,
                  borderColor: colors.sidebarBorder,
                },
                overlayStyle,
              ]}
            >
              {nav}
            </Animated.View>
          </>
        )}
        <View
          style={[
            styles.main,
            {
              // Keep the page clear of a landscape notch the nav isn't covering.
              paddingLeft: wide && navOpen ? 0 : insets.left,
              paddingRight: insets.right,
            },
          ]}
        >
          {children}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  shell: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginLeft: "auto",
  },
  body: { flex: 1, flexDirection: "row" },
  navContent: { padding: 8 },
  dockedNav: { overflow: "hidden" },
  backdrop: { zIndex: 10 },
  overlayNav: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    zIndex: 20,
    borderRightWidth: StyleSheet.hairlineWidth,
  },
  main: { flex: 1, minWidth: 0 },
})
