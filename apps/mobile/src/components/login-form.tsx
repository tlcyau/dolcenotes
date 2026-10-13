import { useRef, useState } from "react"
import { StyleSheet, View } from "react-native"
import type { TextInput } from "react-native"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Logo } from "@/components/logo"

export function LoginForm() {
  const passwordRef = useRef<TextInput>(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [pending, setPending] = useState(false)

  async function handleSubmit() {
    if (!username || !password) return
    setPending(true)
    try {
      // TODO: call the auth endpoint once the server exposes one
      console.info("login", { username })
    } finally {
      setPending(false)
    }
  }

  return (
    <View style={styles.container}>
      <Logo size={24} style={styles.logo} />
      <Card>
        <CardHeader style={styles.header}>
          <CardTitle style={styles.centered}>Welcome back</CardTitle>
          <CardDescription style={styles.centered}>
            Log in to pick up your lesson notes on any device
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel nativeID="username">Username</FieldLabel>
              <Input
                accessibilityLabelledBy="username"
                value={username}
                onChangeText={setUsername}
                autoComplete="username"
                textContentType="username"
                autoCapitalize="none"
                autoCorrect={false}
                spellCheck={false}
                returnKeyType="next"
                submitBehavior="submit"
                onSubmitEditing={() => passwordRef.current?.focus()}
              />
            </Field>
            <Field>
              <FieldLabel nativeID="password">Password</FieldLabel>
              <Input
                ref={passwordRef}
                accessibilityLabelledBy="password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoComplete="current-password"
                textContentType="password"
                returnKeyType="go"
                onSubmitEditing={handleSubmit}
              />
            </Field>
            <Button
              disabled={pending || !username || !password}
              onPress={handleSubmit}
            >
              {pending ? "Logging in…" : "Log in"}
            </Button>
          </FieldGroup>
        </CardContent>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { gap: 24 },
  logo: { alignSelf: "center" },
  header: { alignItems: "center" },
  centered: { textAlign: "center" },
})
