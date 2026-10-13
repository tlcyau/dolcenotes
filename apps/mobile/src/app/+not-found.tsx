import { StyleSheet } from "react-native"
import { Link } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"

import { Text } from "@/components/ui/text"

export default function NotFoundScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <Text accessibilityRole="header" weight="medium" style={styles.title}>
        404
      </Text>
      <Text>The requested page could not be found.</Text>
      <Link href="/" style={styles.link}>
        <Text weight="medium">Go to your calendar</Text>
      </Link>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, gap: 8, padding: 16, paddingTop: 64 },
  title: { fontSize: 24, lineHeight: 32 },
  link: { marginTop: 8, textDecorationLine: "underline" },
})
