import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Employer Dashboard",
  description: "Employer dashboard for managing jobs and applications",
}

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
