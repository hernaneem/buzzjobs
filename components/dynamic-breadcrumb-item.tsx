"use client"

import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useTooltipPreferences } from "@/contexts/tooltip-preferences-context"
import {
  Briefcase,
  Building2,
  Calendar,
  Clock,
  Code,
  DollarSign,
  FileText,
  GraduationCap,
  Info,
  MapPin,
  RefreshCw,
  Star,
  User,
  Users,
  Video,
} from "lucide-react"

interface DynamicBreadcrumbItemProps {
  type: "job" | "company" | "application" | "interview" | "candidate"
  id: string
  label: string
  isLoading?: boolean
}

export function DynamicBreadcrumbItem({ type, id, label, isLoading = false }: DynamicBreadcrumbItemProps) {
  const [data, setData] = useState<Record<string, any> | null>(null)
  const [loading, setLoading] = useState(true)
  const { isTooltipEnabled, isFieldEnabled } = useTooltipPreferences()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // Simulación de carga de datos
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Datos de ejemplo según el tipo
        let mockData: Record<string, any> = {}

        switch (type) {
          case "job":
            mockData = {
              title: "Desarrollador Frontend",
              company: "TechSolutions",
              location: "Ciudad de México",
              salary: "$25,000 - $35,000 MXN",
              type: "Tiempo completo",
              posted: "Hace 3 días",
              applicants: 24,
            }
            break
          case "company":
            mockData = {
              name: "TechSolutions",
              industry: "Tecnología",
              size: "50-100 empleados",
              location: "Ciudad de México",
              founded: 2015,
              jobs: 8,
              rating: 4.5,
            }
            break
          case "application":
            mockData = {
              job: "Desarrollador Frontend",
              company: "TechSolutions",
              status: "En revisión",
              applied: "15/04/2023",
              updated: "18/04/2023",
            }
            break
          case "interview":
            mockData = {
              job: "Desarrollador Frontend",
              company: "TechSolutions",
              date: "25/04/2023",
              time: "14:30",
              type: "Video llamada",
            }
            break
          case "candidate":
            mockData = {
              name: "Carlos Méndez",
              position: "Desarrollador Frontend",
              experience: "3 años",
              education: "Ingeniería en Sistemas",
              skills: "React, TypeScript, Node.js",
            }
            break
        }

        setData(mockData)
      } catch (error) {
        console.error(`Error al cargar datos para ${type} con ID ${id}:`, error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [type, id])

  // Función para obtener el icono correcto
  const getIcon = (iconName: string) => {
    const iconProps = { className: "h-4 w-4 mr-1" }
    switch (iconName) {
      case "Briefcase":
        return <Briefcase {...iconProps} />
      case "Building2":
        return <Building2 {...iconProps} />
      case "Calendar":
        return <Calendar {...iconProps} />
      case "Clock":
        return <Clock {...iconProps} />
      case "Code":
        return <Code {...iconProps} />
      case "DollarSign":
        return <DollarSign {...iconProps} />
      case "FileText":
        return <FileText {...iconProps} />
      case "GraduationCap":
        return <GraduationCap {...iconProps} />
      case "MapPin":
        return <MapPin {...iconProps} />
      case "RefreshCw":
        return <RefreshCw {...iconProps} />
      case "Star":
        return <Star {...iconProps} />
      case "User":
        return <User {...iconProps} />
      case "Users":
        return <Users {...iconProps} />
      case "Video":
        return <Video {...iconProps} />
      default:
        return <Info {...iconProps} />
    }
  }

  // Mapeo de campos a iconos
  const fieldIcons: Record<string, string> = {
    // Job
    title: "Briefcase",
    company: "Building2",
    location: "MapPin",
    salary: "DollarSign",
    type: "Clock",
    posted: "Calendar",
    applicants: "Users",

    // Company
    name: "Building2",
    industry: "Briefcase",
    size: "Users",
    founded: "Calendar",
    jobs: "FileText",
    rating: "Star",

    // Application
    status: "FileText",
    applied: "Calendar",
    updated: "RefreshCw",

    // Interview
    date: "Calendar",
    time: "Clock",

    // Candidate
    position: "Briefcase",
    experience: "Clock",
    education: "GraduationCap",
    skills: "Code",
  }

  if (isLoading || loading) {
    return <Skeleton className="h-6 w-24" />
  }

  // Si los tooltips están desactivados para este tipo, mostrar solo el label
  if (!isTooltipEnabled(type) || !data) {
    return <span>{label}</span>
  }

  // Filtrar los campos según las preferencias del usuario
  const enabledFields = Object.keys(data).filter((field) => isFieldEnabled(type, field))

  // Si no hay campos habilitados, mostrar solo el label
  if (enabledFields.length === 0) {
    return <span>{label}</span>
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="cursor-help border-b border-dotted border-muted-foreground/50">{label}</span>
        </TooltipTrigger>
        <TooltipContent className="max-w-sm">
          <div className="space-y-2">
            {enabledFields.map((field) => (
              <div key={field} className="flex items-center text-sm">
                {getIcon(fieldIcons[field] || "Info")}
                <span className="font-medium mr-1">{field.charAt(0).toUpperCase() + field.slice(1)}:</span>
                <span>{data[field]}</span>
              </div>
            ))}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
