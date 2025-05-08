"use client"

import type { ReactNode } from "react"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { TooltipSettingsButton } from "@/components/tooltip-settings-button"

interface PageHeaderProps {
  title: string
  description?: string
  children?: ReactNode
  actions?: ReactNode
  showTooltipSettings?: boolean
}

export function PageHeader({ title, description, children, actions, showTooltipSettings = false }: PageHeaderProps) {
  return (
    <div className="flex flex-col space-y-4 pb-4 md:pb-6">
      <Breadcrumbs />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
          {description && <p className="text-muted-foreground mt-1">{description}</p>}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {showTooltipSettings && <TooltipSettingsButton />}
          {actions}
        </div>
      </div>

      {children}
    </div>
  )
}
