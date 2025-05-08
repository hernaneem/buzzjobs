"use client"

import type React from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { BehaviorTrackingProvider } from "@/contexts/behavior-tracking-context"
import { AuthProvider } from "@/contexts/auth-context"
import { TooltipPreferencesProvider } from "@/contexts/tooltip-preferences-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <TooltipProvider>
        <AuthProvider>
          <TooltipPreferencesProvider>
            <BehaviorTrackingProvider>{children}</BehaviorTrackingProvider>
          </TooltipPreferencesProvider>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  )
}
