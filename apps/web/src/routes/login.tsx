import { createFileRoute } from "@tanstack/react-router"

import { LoginForm } from "@/components/login-form"

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Log in · dolcenotes" }] }),
  component: LoginPage,
})

function LoginPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
