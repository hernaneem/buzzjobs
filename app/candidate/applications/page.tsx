"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button-custom"
import { Card, CardContent } from "@/components/ui/card-custom"
import { Badge } from "@/components/ui/badge-custom"
import { ArrowLeft, Briefcase, Building2, Calendar, Clock, MapPin, Search, Filter, MoreHorizontal } from "lucide-react"
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

type ApplicationStatus = "applied" | "screening" | "interview" | "offer" | "rejected" | "withdrawn"

interface Application {
  id: string
  jobTitle: string
  company: string
  companyLogo?: string
  location: string
  appliedDate: string
  status: ApplicationStatus
  lastUpdated: string
  nextStep?: string
  nextStepDate?: string
}

export default function ApplicationsPage() {
  // Usuario de ejemplo
  const user = {
    name: "Carlos Méndez",
    role: "candidate",
  }

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "all">("all")

  // Datos de ejemplo para aplicaciones
  const applications: Application[] = [
    {
      id: "1",
      jobTitle: "Desarrollador Frontend",
      company: "TechCorp",
      companyLogo: "/placeholder.svg?height=40&width=40",
      location: "Madrid, España",
      appliedDate: "15 mayo, 2023",
      status: "interview",
      lastUpdated: "Hace 2 días",
      nextStep: "Entrevista técnica",
      nextStepDate: "28 mayo, 2023",
    },
    {
      id: "2",
      jobTitle: "UX/UI Designer",
      company: "DesignStudio",
      companyLogo: "/placeholder.svg?height=40&width=40",
      location: "Barcelona, España",
      appliedDate: "10 mayo, 2023",
      status: "screening",
      lastUpdated: "Hace 1 semana",
    },
    {
      id: "3",
      jobTitle: "Product Manager",
      company: "Innovatech",
      companyLogo: "/placeholder.svg?height=40&width=40",
      location: "Valencia, España",
      appliedDate: "5 mayo, 2023",
      status: "rejected",
      lastUpdated: "Hace 3 días",
    },
    {
      id: "4",
      jobTitle: "Frontend Developer",
      company: "WebTech",
      companyLogo: "/placeholder.svg?height=40&width=40",
      location: "Remoto",
      appliedDate: "20 mayo, 2023",
      status: "applied",
      lastUpdated: "Hace 1 día",
    },
    {
      id: "5",
      jobTitle: "UI Developer",
      company: "CreativeAgency",
      companyLogo: "/placeholder.svg?height=40&width=40",
      location: "Madrid, España",
      appliedDate: "18 mayo, 2023",
      status: "offer",
      lastUpdated: "Hoy",
      nextStep: "Revisión de oferta",
      nextStepDate: "25 mayo, 2023",
    },
    {
      id: "6",
      jobTitle: "React Developer",
      company: "AppStudio",
      companyLogo: "/placeholder.svg?height=40&width=40",
      location: "Sevilla, España",
      appliedDate: "12 mayo, 2023",
      status: "withdrawn",
      lastUpdated: "Hace 4 días",
    },
  ]

  const filteredApplications = applications.filter(
    (app) =>
      (statusFilter === "all" || app.status === statusFilter) &&
      (app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.company.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const getStatusLabel = (status: ApplicationStatus): string => {
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
        return "Retirado"
      default:
        return status
    }
  }

  const getStatusVariant = (status: ApplicationStatus) => {
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
  const groupedApplications: Record<ApplicationStatus, Application[]> = {
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

  // Estados para la vista (lista o kanban)
  const [viewMode, setViewMode] = useState<"list" | "kanban">("kanban")

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
                onChange={(e) => setStatusFilter(e.target.value as ApplicationStatus | "all")}
              >
                <option value="all">Todos los estados</option>
                <option value="applied">Aplicado</option>
                <option value="screening">Preselección</option>
                <option value="interview">Entrevista</option>
                <option value="offer">Oferta</option>
                <option value="rejected">Rechazado</option>
                <option value="withdrawn">Retirado</option>
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
              {(["applied", "screening", "interview", "offer", "rejected", "withdrawn"] as ApplicationStatus[]).map(
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
