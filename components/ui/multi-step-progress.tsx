import { cn } from "@/lib/utils"

interface MultiStepProgressProps {
  steps: number
  currentStep: number
  className?: string
}

export function MultiStepProgress({ steps, currentStep, className }: MultiStepProgressProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between mb-2">
        {Array.from({ length: steps }).map((_, i) => (
          <div
            key={i}
            className={cn("flex flex-col items-center", i < currentStep ? "text-honey" : "text-muted-foreground")}
          >
            <div
              className={cn(
                "w-8 h-8 flex items-center justify-center rounded-full mb-1 transition-colors duration-300",
                i < currentStep
                  ? "bg-honey text-jet"
                  : i === currentStep
                    ? "border-2 border-honey text-honey"
                    : "border-2 border-muted-foreground",
              )}
            >
              {i + 1}
            </div>
            <span className="text-xs">Paso {i + 1}</span>
          </div>
        ))}
      </div>
      <div className="relative w-full h-3 mb-4">
        <div className="honeycomb-progress w-full h-3"></div>
        <div
          className="honeycomb-progress-fill absolute top-0 left-0 h-3"
          style={{ width: `${(currentStep / steps) * 100}%` }}
        ></div>
      </div>
    </div>
  )
}
