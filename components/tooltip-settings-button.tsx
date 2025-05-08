"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button-custom"
import { Settings } from "lucide-react"
import { TooltipPreferencesDialog } from "@/components/tooltip-preferences-dialog"

export function TooltipSettingsButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="h-8 gap-1"
        onClick={() => setOpen(true)}
        aria-label="Configurar tooltips"
      >
        <Settings className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Configurar tooltips</span>
      </Button>
      <TooltipPreferencesDialog open={open} onOpenChange={setOpen} />
    </>
  )
}
