"use client"

import { useState, useCallback } from "react"

type ToastVariant = "default" | "destructive" | "success"

type Toast = {
  id: string
  title: string
  description?: string
  variant?: ToastVariant
}

type UseToastReturn = {
  toasts: Toast[]
  toast: (toast: Omit<Toast, "id">) => void
  dismiss: (id: string) => void
  dismissAll: () => void
}

export function useToast(): UseToastReturn {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, ...toast }])

    // Auto dismiss after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 5000)
  }, [])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const dismissAll = useCallback(() => {
    setToasts([])
  }, [])

  return { toasts, toast, dismiss, dismissAll }
}
