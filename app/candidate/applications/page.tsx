"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button-custom"
import { Card, CardContent } from "@/components/ui/card-custom"
import { Badge } from "@/components/ui/badge-custom"
import { 
  ArrowLeft, 
  Briefcase, 
  Building2, 
  Calendar, 
  Clock, 
  MapPin, 
  Search, 
  Filter, 
  MoreHorizontal,
  Loader2 
} from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PageHeader } from "@/components/page-header"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { getApplicationsByCandidate, type ApplicationWithDetails, type ApplicationStatus as DbApplicationStatus } from "@/lib/services/application-service"
import { format, formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"

// Mapeo de estados de aplicación de la base de datos a la UI
type UIApplicationStatus = "applied" | "screening" | "interview" | "offer" | "rejected" | "withdrawn"

interface UIApplication {
  id: string
  jobTitle: string
  company: string
  companyLogo?: string
  location: string
  appliedDate: string
  status: UIApplicationStatus
  lastUpdated: string
  nextStep?: string
  nextStepDate?: string
}

// Función para mapear estados de aplicación de la BD a la UI
const mapDbStatusToUIStatus = (dbStatus: DbApplicationStatus): UIApplicationStatus => {
  switch (dbStatus) {
    case "pendiente":
      return "applied"
    case "revisado":
      return "screening"
    case "entrevista":
      return "interview"
    case "oferta":
      return "offer"
    case "rechazado":
      return "rejected"
    case "contratado":
      return "withdrawn" // Usamos withdrawn para representar contratado
    default:
      return "applied"
  }
}

export default function ApplicationsPage() {
  const { user, profile } = useAuth()
  const { toast } = useToast()
  const [applications, setApplications] = useState<UIApplication[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<UIApplicationStatus | "all">("all")
  const [viewMode, setViewMode] = useState<"list" | "kanban">("kanban")

  useEffect(() => {
    async function loadApplications() {
      if (!profile?.id) return
      
      try {
        setIsLoading(true)
        
        const candidateApplications = await getApplicationsByCandidate(profile.id)
        
        // Convertir aplicaciones de la BD al formato de la UI
        const uiApplications = candidateApplications.map((app): UIApplication => {
          const jobTitle = app.job?.title || "Título desconocido"
          const company = app.job?.company?.name || "Empresa desconocida"
          const companyLogo = app.job?.company?.logo_url
          const location = app.job?.location || app.job?.company?.location || "Ubicación desconocida"
          let appliedDate = "Fecha desconocida"
          let lastUpdated = "Fecha desconocida"
          
          // Formatear fechas
          if (app.created_at) {
            appliedDate = format(new Date(app.created_at), 'dd MMMM, yyyy', { locale: es })
            lastUpdated = formatDistanceToNow(new Date(app.updated_at || app.created_at), { 
              addSuffix: true,
              locale: es 
            })
          }
          
          // Estado UI
          const status = mapDbStatusToUIStatus(app.status)
          
          // TODO: Implementar próximos pasos cuando se añadan a la BD
          // Por ahora generamos algunos datos de ejemplo basados en el estado
          let nextStep: string | undefined
          let nextStepDate: string | undefined
          
          if (status === "interview") {
            nextStep = "Entrevista técnica"
            // Fecha ejemplo una semana después
            const date = new Date()
            date.setDate(date.getDate() + 7)
            nextStepDate = format(date, 'dd MMMM, yyyy', { locale: es })
          } else if (status === "offer") {
            nextStep = "Revisión de oferta"
            // Fecha ejemplo una semana después
            const date = new Date()
            date.setDate(date.getDate() + 7)
            nextStepDate = format(date, 'dd MMMM, yyyy', { locale: es })
          }
          
          return {
            id: app.id,
            jobTitle,
            company,
            companyLogo,
            location,
            appliedDate,
            status,
            lastUpdated,
            nextStep,
            nextStepDate
          }
        })
        
        setApplications(uiApplications)
      } catch (err) {
        console.error("Error al cargar aplicaciones:", err)
        setError("No se pudieron cargar las aplicaciones")
        toast({
          title: "Error",
          description: "No se pudieron cargar tus aplicaciones",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
    
    loadApplications()
  }, [profile, toast])

  const filteredApplications = applications.filter(
    (app) =>
      (statusFilter === "all" || app.status === statusFilter) &&
      (app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.company.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const getStatusLabel = (status: UIApplicationStatus): string => {
    switch (status) {
      case "applied":
        return "Aplicado"
      case "screening":
        return "Preselección"
      case "interview":
        return "Entrevista"
      case "offer":
        return "Oferta"
      case "rejected":
        return "Rechazado"
      case "withdrawn":
        return "Contratado"
      default:
        return status
    }
  }

  const getStatusVariant = (status: UIApplicationStatus) => {
    switch (status) {
      case "applied":
        return "secondary"
      case "screening":
        return "secondary"
      case "interview":
        return "default"
      case "offer":
        return "new"
      case "rejected":
        return "outline"
      case "withdrawn":
        return "outline"
      default:
        return "outline"
    }
  }

  // Agrupar aplicaciones por estado para la vista Kanban
  const groupedApplications: Record<UIApplicationStatus, UIApplication[]> = {
    applied: [],
    screening: [],
    interview: [],
    offer: [],
    rejected: [],
    withdrawn: [],
  }

  filteredApplications.forEach((app) => {
    groupedApplications[app.status].push(app)
  })

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <PageHeader title="Mis Aplicaciones" description="Gestiona tus aplicaciones a ofertas de empleo" />
        <div className="py-8 flex justify-center items-center min-h-[50vh]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-honey" />
            <p className="text-lg">Cargando tus aplicaciones...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title="Mis Aplicaciones" description="Gestiona tus aplicaciones a ofertas de empleo" />
      <div className="py-8">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <Link
              href="/candidate/dashboard"
              className="text-sm text-muted-foreground hover:text-honey flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Volver al dashboard
            </Link>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4">
              <div>
                <h1 className="text-3xl font-bold">Mis aplicaciones</h1>
                <p className="text-muted-foreground">Seguimiento de tus procesos de selección</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Buscar aplicaciones"
                    className="pl-10 pr-4 py-2 rounded-md border border-input bg-background h-10 text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">Filtrar</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="mb-6 flex justify-between items-center">
            <div className="flex gap-2">
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                Lista
              </Button>
              <Button
                variant={viewMode === "kanban" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("kanban")}
              >
                Kanban
              </Button>
            </div>

            <div className="flex gap-2">
              <select
                className="px-3 py-1 rounded-md border border-input bg-background h-9 text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as UIApplicationStatus | "all")}
              >
                <option value="all">Todos los estados</option>
                <option value="applied">Aplicado</option>
                <option value="screening">Preselección</option>
                <option value="interview">Entrevista</option>
                <option value="offer">Oferta</option>
                <option value="rejected">Rechazado</option>
                <option value="withdrawn">Contratado</option>
              </select>
            </div>
          </div>

          {viewMode === "list" ? (
            // Vista de lista
            <div className="space-y-4">
              {filteredApplications.length > 0 ? (
                filteredApplications.map((application) => (
                  <Link key={application.id} href={`/candidate/applications/${application.id}`}>
                    <Card className="overflow-hidden transition-shadow hover:shadow-medium">
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
                              {application.companyLogo ? (
                                <img
                                  src={application.companyLogo || "/placeholder.svg"}
                                  alt={`${application.company} logo`}
                                  className="w-10 h-10 object-contain"
                                />
                              ) : (
                                <Building2 className="w-6 h-6 text-muted-foreground" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-bold">{application.jobTitle}</h3>
                              <p className="text-sm text-muted-foreground">{application.company}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <Badge variant={getStatusVariant(application.status)}>
                              {getStatusLabel(application.status)}
                            </Badge>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Acciones</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Link href={`/candidate/applications/${application.id}`}>Ver detalles</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Link href={`/jobs/${application.id}`}>Ver oferta de empleo</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>Contactar a la empresa</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">Retirar aplicación</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div className="flex items-center text-sm">
                            <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                            {application.location}
                          </div>
                          <div className="flex items-center text-sm">
                            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                            Aplicado el {application.appliedDate}
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                            Actualizado {application.lastUpdated}
                          </div>
                        </div>

                        {application.nextStep && (
                          <div className="mt-4 p-3 bg-muted/30 rounded-md">
                            <p className="text-sm font-medium">Próximo paso: {application.nextStep}</p>
                            {application.nextStepDate && (
                              <p className="text-sm text-muted-foreground">Fecha: {application.nextStepDate}</p>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                ))
              ) : (
                <Card className="bg-muted/30">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                      <Briefcase className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No hay aplicaciones</h3>
                    <p className="text-muted-foreground text-center mb-6 max-w-md">
                      {searchTerm || statusFilter !== "all"
                        ? "No se encontraron aplicaciones con los filtros seleccionados"
                        : "Comienza a aplicar a empleos para ver tu progreso aquí"}
                    </p>
                    <Button asChild>
                      <Link href="/job-feed">Explorar empleos</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            // Vista Kanban
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-6">
              {(["applied", "screening", "interview", "offer", "rejected", "withdrawn"] as UIApplicationStatus[]).map(
                (status) => (
                  <div key={status} className="min-w-[280px]">
                    <div className="bg-muted p-3 rounded-t-md">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{getStatusLabel(status)}</h3>
                        <Badge variant="outline">{groupedApplications[status].length}</Badge>
                      </div>
                    </div>
                    <div className="bg-muted/30 p-3 rounded-b-md min-h-[70vh]">
                      <div className="space-y-3">
                        {groupedApplications[status].length > 0 ? (
                          groupedApplications[status].map((app) => (
                            <Link key={app.id} href={`/candidate/applications/${app.id}`}>
                              <Card className="overflow-hidden transition-shadow hover:shadow-medium">
                                <CardContent className="p-4">
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 bg-muted rounded-md flex items-center justify-center">
                                      {app.companyLogo ? (
                                        <img
                                          src={app.companyLogo || "/placeholder.svg"}
                                          alt={`${app.company} logo`}
                                          className="w-6 h-6 object-contain"
                                        />
                                      ) : (
                                        <Building2 className="w-4 h-4 text-muted-foreground" />
                                      )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-medium text-sm truncate">{app.jobTitle}</h4>
                                      <p className="text-xs text-muted-foreground truncate">{app.company}</p>
                                    </div>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                          <MoreHorizontal className="h-3 w-3" />
                                          <span className="sr-only">Acciones</span>
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                          <Link href={`/candidate/applications/${app.id}`}>Ver detalles</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <Link href={`/jobs/${app.id}`}>Ver oferta</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-destructive">Retirar</DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>

                                  <div className="flex items-center text-xs mt-2">
                                    <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                                    <span className="truncate">{app.location}</span>
                                  </div>

                                  <div className="flex items-center text-xs mt-1">
                                    <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                                    <span>Aplicado: {app.appliedDate}</span>
                                  </div>

                                  {app.nextStep && (
                                    <div className="mt-2 p-2 bg-muted rounded-md text-xs">
                                      <p className="font-medium">Próximo: {app.nextStep}</p>
                                      {app.nextStepDate && <p>{app.nextStepDate}</p>}
                                    </div>
                                  )}
                                </CardContent>
                              </Card>
                            </Link>
                          ))
                        ) : (
                          <div className="flex flex-col items-center justify-center py-6 text-center">
                            <p className="text-sm text-muted-foreground mb-2">No hay aplicaciones</p>
                            {status === "applied" && (
                              <Button variant="outline" size="sm" asChild>
                                <Link href="/job-feed">Buscar empleos</Link>
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
