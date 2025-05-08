"use client"

import { useEffect, useState } from "react"
import { BeeIcon } from "@/components/bee-icon"

interface BeeConfettiProps {
  count?: number
}

export function BeeConfetti({ count = 5 }: BeeConfettiProps) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  return (
    <div className="relative">
      {Array.from({ length: count }).map((_, i) => (
        <BeeIcon key={i} className="bee-confetti" size={24} />
      ))}
    </div>
  )
}
