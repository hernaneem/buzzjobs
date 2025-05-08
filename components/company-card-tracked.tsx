"use client"

import React from "react"
import { CompanyCard } from "@/components/ui/company-card"
import { useBehaviorTracking } from "@/hooks/use-behavior-tracking"

interface CompanyCardTrackedProps {
  id: string
  name: string
  logo?: string
  location: string
  industry: string
  size: string
  jobCount: number
  description: string
}

export function CompanyCardTracked({
  id,
  name,
  logo,
  location,
  industry,
  size,
  jobCount,
  description,
}: CompanyCardTrackedProps) {
  const { trackItemView } = useBehaviorTracking()

  // Registrar vista de la empresa cuando se renderiza el componente
  React.useEffect(() => {
    trackItemView("company", id, {
      name,
      industry,
      size,
      jobCount,
    })
  }, [id, name, industry, size, jobCount, trackItemView])

  return (
    <CompanyCard
      id={id}
      name={name}
      logo={logo}
      location={location}
      industry={industry}
      size={size}
      jobCount={jobCount}
      description={description}
    />
  )
}
