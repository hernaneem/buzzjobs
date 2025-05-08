import { BeeIcon } from "@/components/bee-icon"

interface BeeSpinnerProps {
  size?: number
  className?: string
}

export function BeeSpinner({ size = 24, className }: BeeSpinnerProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <BeeIcon size={size} className="bee-spinner" />
    </div>
  )
}
