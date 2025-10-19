"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SettingsProvider } from "@/contexts/settingsContext"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}> <SettingsProvider>
    {children}
  </SettingsProvider></NextThemesProvider>
}