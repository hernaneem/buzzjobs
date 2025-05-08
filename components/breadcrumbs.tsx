"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"
import { DynamicBreadcrumbItem } from "@/components/dynamic-breadcrumb-item"

interface BreadcrumbsProps {
  className?: string
  homeElement?: React.ReactNode
  separator?: React.ReactNode
  containerClassName?: string
  listClassName?: string
  activeItemClassName?: string
  capitalizeLinks?: boolean
}

// Mapeo de rutas a nombres más amigables
const routeNameMapping: Record<string, string> = {
  employer: "Portal Empresarial",
  candidate: "Portal del Candidato",
  jobs: "Empleos",
  dashboard: "Dashboard",
  profile: "Perfil",
  candidates: "Candidatos",
  applications: "Aplicaciones",
  "saved-jobs": "Empleos Guardados",
  notifications: "Notificaciones",
  settings: "Configuración",
  "post-job": "Publicar Empleo",
  analytics: "Analíticas",
  interviews: "Entrevistas",
  companies: "Empresas",
  admin: "Administración",
  blog: "Blog",
  resources: "Recursos",
  pricing: "Precios",
  contact: "Contacto",
  about: "Acerca de",
  terms: "Términos",
  privacy: "Privacidad",
  "success-stories": "Casos de Éxito",
  "job-feed": "Feed de Empleos",
  "schedule-demo": "Agendar Demo",
  edit: "Editar",
  statistics: "Estadísticas",
  promote: "Promocionar",
  views: "Vistas",
  conversion: "Conversión",
}

// Configuración para determinar qué segmentos deben usar información dinámica
const dynamicSegmentConfig: Record<string, { parentSegment: string; type: string }[]> = {
  // Formato: 'segmento': [{ parentSegment: 'segmento padre requerido', type: 'tipo de dato' }]
  // Para IDs de trabajos
  "[id]": [
    { parentSegment: "jobs", type: "job" },
    { parentSegment: "companies", type: "company" },
    { parentSegment: "applications", type: "application" },
    { parentSegment: "interviews", type: "interview" },
    { parentSegment: "candidates", type: "candidate" },
  ],
}

export function Breadcrumbs({
  className,
  homeElement = <Home className="h-4 w-4" />,
  separator = <ChevronRight className="h-4 w-4 text-muted-foreground" />,
  containerClassName,
  listClassName,
  activeItemClassName,
  capitalizeLinks = true,
}: BreadcrumbsProps) {
  const pathname = usePathname()

  // No mostrar breadcrumbs en la página principal
  if (pathname === "/") {
    return null
  }

  // Dividir la ruta en segmentos
  const segments = pathname.split("/").filter(Boolean)

  // Si no hay segmentos, no mostrar breadcrumbs
  if (segments.length === 0) {
    return null
  }

  // Función para obtener el nombre amigable de una ruta
  const getRouteName = (segment: string) => {
    return (
      routeNameMapping[segment] ||
      (capitalizeLinks ? segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ") : segment)
    )
  }

  // Función para determinar si un segmento parece ser un ID
  const isIdSegment = (segment: string) => {
    // Verificar si el segmento parece un ID (UUID, número, etc.)
    return /^[0-9a-f]{8,}$|^\d+$/.test(segment)
  }

  // Función para determinar si un segmento debe usar información dinámica
  const shouldUseDynamicInfo = (segment: string, index: number) => {
    if (isIdSegment(segment)) {
      // Si es un ID, verificar si tiene una configuración dinámica
      return true
    }

    // Para segmentos específicos como [id]
    if (dynamicSegmentConfig[segment]) {
      // Verificar si el segmento padre coincide con alguna configuración
      const parentSegment = index > 0 ? segments[index - 1] : null
      return dynamicSegmentConfig[segment].some((config) => config.parentSegment === parentSegment)
    }

    return false
  }

  // Función para determinar el tipo de dato dinámico
  const getDynamicType = (segment: string, index: number) => {
    if (isIdSegment(segment)) {
      // Si es un ID, determinar el tipo basado en el segmento padre
      const parentSegment = index > 0 ? segments[index - 1] : null

      if (parentSegment === "jobs" || parentSegment === "job") return "job"
      if (parentSegment === "companies") return "company"
      if (parentSegment === "applications") return "application"
      if (parentSegment === "interviews") return "interview"
      if (parentSegment === "candidates") return "candidate"

      // Si estamos en una subruta de jobs
      if (index >= 2 && segments[index - 2] === "jobs") return "job"
    }

    return null
  }

  // Construir los elementos de migas de pan
  const breadcrumbItems = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`
    const isLast = index === segments.length - 1
    const isDynamic = shouldUseDynamicInfo(segment, index)
    const dynamicType = getDynamicType(segment, index)
    const label = isDynamic ? segment : getRouteName(segment)

    return {
      href,
      segment,
      label,
      isLast,
      isDynamic,
      dynamicType,
    }
  })

  return (
    <nav aria-label="Breadcrumbs" className={cn("py-2", containerClassName)}>
      <ol className={cn("flex items-center space-x-1 text-sm", listClassName)}>
        <li className="flex items-center">
          <Link
            href="/"
            aria-label="Inicio"
            className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            {homeElement}
          </Link>
        </li>
        {breadcrumbItems.map((item, index) => (
          <li key={item.href} className="flex items-center">
            <span className="mx-1 text-muted-foreground">{separator}</span>
            {item.isDynamic && item.dynamicType ? (
              <DynamicBreadcrumbItem
                segment={item.segment}
                href={item.href}
                isLast={item.isLast}
                segmentType={item.dynamicType as "job" | "company" | "application" | "interview" | "candidate"}
                activeClassName={activeItemClassName}
              />
            ) : item.isLast ? (
              <span className={cn("text-foreground font-medium", activeItemClassName)} aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="text-muted-foreground hover:text-foreground transition-colors">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
