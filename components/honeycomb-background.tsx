interface HoneycombBackgroundProps {
  className?: string
}

export function HoneycombBackground({ className }: HoneycombBackgroundProps) {
  return <div className={`honeycomb-bg absolute inset-0 -z-10 opacity-30 ${className}`} />
}
