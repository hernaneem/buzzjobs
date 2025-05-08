import type React from "react"

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return <main>{children}</main>
}

export default DashboardLayout
