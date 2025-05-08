"use client"

import React from "react"
import { JobCard } from "@/components/ui/job-card"
import { useBehaviorTracking } from "@/hooks/use-behavior-tracking"

interface JobCardTrackedProps {
  id: string
  title: string
  company: string
  location: string
  salary?: string
  tags?: string[]
  isNew?: boolean
  isUrgent?: boolean
  isRemote?: boolean
  postedAt?: string
  companyLogo?: string
  isSaved?: boolean
  onSave?: () => void
}

export function JobCardTracked({
  id,
  title,
  company,
  location,
  salary,
  tags,
  isNew,
  isUrgent,
  isRemote,
  postedAt,
  companyLogo,
  isSaved,
  onSave,
}: JobCardTrackedProps) {
  const { trackItemView, trackUserAction } = useBehaviorTracking()

  // Registrar vista del trabajo cuando se renderiza el componente
  React.useEffect(() => {
    trackItemView("job", id, {
      title,
      company,
      tags,
      isNew,
      isUrgent,
      isRemote,
    })
  }, [id, title, company, tags, isNew, isUrgent, isRemote, trackItemView])

  // Función para manejar el guardado con seguimiento
  const handleSave = () => {
    trackUserAction("save", "job", id, {
      title,
      company,
      action: isSaved ? "unsave" : "save",
    })

    if (onSave) {
      onSave()
    }
  }

  return (
    <JobCard
      id={id}
      title={title}
      company={company}
      location={location}
      salary={salary}
      tags={tags}
      isNew={isNew}
      isUrgent={isUrgent}
      isRemote={isRemote}
      postedAt={postedAt}
      companyLogo={companyLogo}
      isSaved={isSaved}
      onSave={handleSave}
    />
  )
}
