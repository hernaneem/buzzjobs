"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbsProps {
  className?: string
  homeElement?: React.ReactNode
  separator?: React.ReactNode
  containerClassName?: string
  listClassName?: string
  activeItemClassName?: string
  capitalizeLinks?: boolean
}

// Mapeo de nombres de rutas a nombres más amigables
const routeNameMapping: Record<string, string> = {
  jobs: "Empleos",
  job: "Empleo",
  companies: "Empresas",
  company: "Empresa",
  candidates: "Candidatos",
  settings: "Configuración",
  profile: "Perfil",
  applications: "Aplicaciones",
  interviews: "Entrevistas",
  dashboard: "Panel de control",
  admin: "Administración",
  employer: "Empleador",
  candidate: "Candidato",
  job_application: "Aplicación",
  job_feed: "Feed de Empleos",
  schedule_demo: "Programar Demo",
  success_stories: "Casos de Éxito",
  pricing: "Precios",
  about: "Acerca de",
  contact: "Contacto",
  privacy: "Privacidad",
  terms: "Términos",
  resources: "Recursos",
  blog: "Blog",
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

  // Construir los elementos de migas de pan
  const breadcrumbItems = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`
    const isLast = index === segments.length - 1
    const label = getRouteName(segment)

    return {
      href,
      segment,
      label,
      isLast,
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
            {item.isLast ? (
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
