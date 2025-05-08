import { BeeSpinner } from "@/components/bee-spinner"

export default function AdminDashboardLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <BeeSpinner size="xl" />
    </div>
  )
}
