"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button-custom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card-custom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge-custom"
import {
  Bell,
  Briefcase,
  Users,
  Eye,
  BarChart3,
  ChevronRight,
  Clock,
  Filter,
  MapPin,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  XCircle,
  Edit,
  MoreHorizontal,
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

// Asumiendo que este archivo ya existe, solo mostrando cómo usar PageHeader
export default function EmployerDashboard() {
  // Usuario de ejemplo
  const user = {
    name: "María Rodríguez",
    role: "employer",
  }

  const [activeTab, setActiveTab] = useState("jobs")
  const [activeActionMenu, setActiveActionMenu] = useState<string | null>(null)
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "Nuevo candidato",
      message: "Javier García ha aplicado para Desarrollador Frontend",
      time: "Hace 1 día",
      read: false,
    },
    {
      id: "2",
      title: "Entrevista programada",
      message: "Entrevista con Laura Sánchez mañana a las 10:00",
      time: "Hace 2 días",
      read: true,
    },
    {
      id: "3",
      title: "Empleo destacado",
      message: "Tu empleo 'Diseñador UX/UI' ha sido destacado",
      time: "Hace 3 días",
      read: true,
    },
  ])

  // Datos de ejemplo para empleos activos
  const activeJobs = [
    {
      id: "1",
      title: "Desarrollador Frontend",
      location: "Madrid, España",
      applicants: 12,
      views: 145,
      postedAt: "Hace 2 días",
      expiresAt: "28 días restantes",
      isNew: true,
      isUrgent: false,
      isRemote: true,
      conversionRate: 8.3,
      trend: "up",
    },
    {
      id: "2",
      title: "Diseñador UX/UI",
      location: "Barcelona, España",
      applicants: 8,
      views: 98,
      postedAt: "Hace 1 semana",
      expiresAt: "23 días restantes",
      isNew: false,
      isUrgent: true,
      isRemote: false,
      conversionRate: 8.2,
      trend: "stable",
    },
    {
      id: "3",
      title: "Product Manager",
      location: "Valencia, España",
      applicants: 3,
      views: 67,
      postedAt: "Hace 3 días",
      expiresAt: "25 días restantes",
      isNew: false,
      isUrgent: false,
      isRemote: true,
      conversionRate: 4.5,
      trend: "down",
    },
  ]

  // Datos de ejemplo para candidatos
  const candidates = [
    {
      id: "1",
      name: "Carlos Méndez",
      position: "Desarrollador Frontend",
      status: "screening",
      appliedAt: "Hace 2 días",
      skills: ["React", "JavaScript", "CSS"],
      avatar: "/placeholder.svg?height=40&width=40",
      jobId: "1",
    },
    {
      id: "2",
      name: "Laura Sánchez",
      position: "Diseñador UX/UI",
      status: "interview",
      appliedAt: "Hace 5 días",
      skills: ["Figma", "Adobe XD", "UI Design"],
      avatar: "/placeholder.svg?height=40&width=40",
      jobId: "2",
    },
    {
      id: "3",
      name: "Javier García",
      position: "Desarrollador Frontend",
      status: "new",
      appliedAt: "Hace 1 día",
      skills: ["React", "TypeScript", "Tailwind"],
      avatar: "/placeholder.svg?height=40&width=40",
      jobId: "1",
    },
    {
      id: "4",
      name: "Ana Martínez",
      position: "Product Manager",
      status: "offer",
      appliedAt: "Hace 1 semana",
      skills: ["Agile", "Scrum", "Product Development"],
      avatar: "/placeholder.svg?height=40&width=40",
      jobId: "3",
    },
    {
      id: "5",
      name: "Miguel Torres",
      position: "Desarrollador Frontend",
      status: "rejected",
      appliedAt: "Hace 2 semanas",
      skills: ["React", "JavaScript", "HTML"],
      avatar: "/placeholder.svg?height=40&width=40",
      jobId: "1",
    },
  ]

  // Datos para el embudo de candidatos
  const candidateFunnel = {
    total: 23,
    new: 5,
    screening: 8,
    interview: 6,
    offer: 2,
    hired: 1,
    rejected: 1,
  }

  // Datos para las métricas
  const metrics = {
    totalViews: 310,
    viewsLastWeek: 145,
    viewsChange: 12.5,
    totalApplicants: 23,
    applicantsLastWeek: 10,
    applicantsChange: 25,
    conversionRate: 7.4,
    conversionLastWeek: 6.9,
    conversionChange: 7.2,
    averageTimeToHire: 18, // días
    timeToHireLastMonth: 21,
    timeToHireChange: -14.3,
  }

  // Actividad reciente
  const recentActivity = [
    {
      id: "1",
      type: "candidate",
      title: "Nuevo candidato",
      description: "Javier García aplicó para Desarrollador Frontend",
      time: "Hace 1 día",
      icon: <Users className="h-5 w-5 text-honey" />,
    },
    {
      id: "2",
      type: "view",
      title: "Vistas de empleo",
      description: "Tu empleo 'Diseñador UX/UI' recibió 15 nuevas vistas",
      time: "Hace 2 días",
      icon: <Eye className="h-5 w-5 text-honey" />,
    },
    {
      id: "3",
      type: "interview",
      title: "Recordatorio",
      description: "Entrevista programada con Laura Sánchez mañana a las 10:00",
      time: "Hace 3 días",
      icon: <Clock className="h-5 w-5 text-honey" />,
    },
    {
      id: "4",
      type: "status",
      title: "Cambio de estado",
      description: "Ana Martínez ha pasado a la fase de oferta",
      time: "Hace 4 días",
      icon: <CheckCircle className="h-5 w-5 text-honey" />,
    },
    {
      id: "5",
      type: "job",
      title: "Empleo publicado",
      description: "Has publicado un nuevo empleo: Product Manager",
      time: "Hace 5 días",
      icon: <Briefcase className="h-5 w-5 text-honey" />,
    },
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showNotifications && !(event.target as Element).closest(".notifications-container")) {
        setShowNotifications(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showNotifications])

  return (
    <div className="py-8">
      <div className="container px-4 md:px-6">
        <PageHeader title="Dashboard Empresarial" description="Gestiona tus ofertas de empleo y candidatos" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Hola, {user.name}</h1>
            <p className="text-muted-foreground">Bienvenido a tu dashboard empresarial</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Button variant="outline" className="gap-2" onClick={() => setShowNotifications(!showNotifications)}>
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notificaciones</span>
                {notifications.some((n) => !n.read) && (
                  <span className="absolute top-0 right-0 w-2 h-2 bg-honey rounded-full"></span>
                )}
              </Button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-background border rounded-md shadow-lg z-50 notifications-container">
                  <div className="p-3 border-b">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Notificaciones</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setNotifications(notifications.map((n) => ({ ...n, read: true })))
                        }}
                      >
                        Marcar todas como leídas
                      </Button>
                    </div>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 border-b last:border-0 hover:bg-muted/50 cursor-pointer ${!notification.read ? "bg-muted/20" : ""}`}
                          onClick={() => {
                            setNotifications(
                              notifications.map((n) => (n.id === notification.id ? { ...n, read: true } : n)),
                            )
                          }}
                        >
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-sm">{notification.title}</h4>
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-muted-foreground">No tienes notificaciones</div>
                    )}
                  </div>
                  <div className="p-2 border-t">
                    <Button variant="ghost" size="sm" className="w-full" asChild>
                      <Link href="/employer/notifications">Ver todas las notificaciones</Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <Button asChild className="gap-2">
              <Link href="/employer/post-job">
                <Briefcase className="h-4 w-4" />
                <span className="hidden sm:inline">Publicar empleo</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              title: "Empleos activos",
              value: activeJobs.length.toString(),
              icon: <Briefcase className="h-5 w-5 text-honey" />,
              link: "/employer/jobs",
              change: "+1 esta semana",
              trend: "up",
            },
            {
              title: "Candidatos",
              value: candidateFunnel.total.toString(),
              icon: <Users className="h-5 w-5 text-honey" />,
              link: "/employer/candidates",
              change: "+5 esta semana",
              trend: "up",
            },
            {
              title: "Vistas totales",
              value: metrics.totalViews.toString(),
              icon: <Eye className="h-5 w-5 text-honey" />,
              link: "/employer/analytics/views",
              change: `${metrics.viewsChange > 0 ? "+" : ""}${metrics.viewsChange}%`,
              trend: metrics.viewsChange > 0 ? "up" : "down",
            },
            {
              title: "Tasa de conversión",
              value: `${metrics.conversionRate}%`,
              icon: <BarChart3 className="h-5 w-5 text-honey" />,
              link: "/employer/analytics/conversion",
              change: `${metrics.conversionChange > 0 ? "+" : ""}${metrics.conversionChange}%`,
              trend: metrics.conversionChange > 0 ? "up" : "down",
            },
          ].map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">{stat.icon}</div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <Link href={stat.link} className="text-sm text-honey flex items-center hover:underline">
                    Ver detalles
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                  <div className="flex items-center text-xs">
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    ) : stat.trend === "down" ? (
                      <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                    ) : null}
                    <span
                      className={stat.trend === "up" ? "text-green-500" : stat.trend === "down" ? "text-red-500" : ""}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
            <TabsTrigger value="jobs">Mis empleos</TabsTrigger>
            <TabsTrigger value="candidates">Candidatos</TabsTrigger>
            <TabsTrigger value="metrics">Métricas</TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" id="jobs">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <CardTitle>Empleos activos</CardTitle>
                <Button asChild>
                  <Link href="/employer/post-job">Publicar nuevo empleo</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {activeJobs.map((job) => (
                    <div key={job.id} className="border rounded-xl p-4 bg-background">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-lg">{job.title}</h3>
                            <div className="flex gap-1">
                              {job.isNew && <Badge variant="new">Nuevo</Badge>}
                              {job.isUrgent && <Badge variant="urgent">Urgente</Badge>}
                              {job.isRemote && <Badge variant="remote">Remoto</Badge>}
                            </div>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="mr-1 h-4 w-4" />
                            {job.location}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <DropdownMenu
                            open={activeActionMenu === job.id}
                            onOpenChange={(open) => setActiveActionMenu(open ? job.id : null)}
                          >
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1"
                                onClick={() => setActiveActionMenu(activeActionMenu === job.id ? null : job.id)}
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="hidden sm:inline">Acciones</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem asChild>
                                <Link href={`/employer/jobs/${job.id}/edit`}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Editar empleo
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/employer/jobs/${job.id}/candidates`}>
                                  <Users className="h-4 w-4 mr-2" />
                                  Ver candidatos
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/jobs/${job.id}`}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Ver publicación
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/employer/jobs/${job.id}/statistics`}>
                                  <BarChart3 className="h-4 w-4 mr-2" />
                                  Ver estadísticas
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/employer/jobs/${job.id}/promote`}>
                                  <TrendingUp className="h-4 w-4 mr-2" />
                                  Promocionar
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => {
                                  // In a real implementation, this would call an API to pause the job
                                  alert(`Empleo ${job.id} pausado`)
                                  setActiveActionMenu(null)
                                }}
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Pausar empleo
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-4">
                        <div className="flex flex-col">
                          <span className="text-sm text-muted-foreground">Aplicaciones</span>
                          <div className="flex items-center">
                            <span className="font-medium">{job.applicants}</span>
                            <div className="ml-2 text-xs">
                              {job.trend === "up" ? (
                                <TrendingUp className="h-3 w-3 text-green-500" />
                              ) : job.trend === "down" ? (
                                <TrendingDown className="h-3 w-3 text-red-500" />
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm text-muted-foreground">Vistas</span>
                          <span className="font-medium">{job.views}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm text-muted-foreground">Conversión</span>
                          <span className="font-medium">{job.conversionRate}%</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm text-muted-foreground">Publicado</span>
                          <span className="font-medium">{job.postedAt}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm text-muted-foreground">Expira</span>
                          <span className="font-medium">{job.expiresAt}</span>
                        </div>
                      </div>

                      <div className="flex justify-end mt-4 pt-4 border-t">
                        <Button variant="outline" size="sm" asChild className="mr-2">
                          <Link href={`/employer/jobs/${job.id}/edit`}>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/employer/jobs/${job.id}/candidates`}>
                            <Users className="h-4 w-4 mr-2" />
                            Ver candidatos ({job.applicants})
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {activeJobs.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
                      <Briefcase className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No tienes empleos activos</h3>
                    <p className="text-muted-foreground mb-4">
                      Publica tu primer empleo para comenzar a recibir aplicaciones
                    </p>
                    <Button asChild>
                      <Link href="/employer/post-job">Publicar empleo</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="candidates" id="candidates">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Embudo de candidatos */}
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Embudo de candidatos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total de candidatos</span>
                      <span className="font-bold">{candidateFunnel.total}</span>
                    </div>

                    <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                      <div className="flex h-full">
                        <div
                          className="bg-honey h-full"
                          style={{ width: `${(candidateFunnel.new / candidateFunnel.total) * 100}%` }}
                        ></div>
                        <div
                          className="bg-amber-400 h-full"
                          style={{ width: `${(candidateFunnel.screening / candidateFunnel.total) * 100}%` }}
                        ></div>
                        <div
                          className="bg-amber-500 h-full"
                          style={{ width: `${(candidateFunnel.interview / candidateFunnel.total) * 100}%` }}
                        ></div>
                        <div
                          className="bg-green-500 h-full"
                          style={{ width: `${(candidateFunnel.offer / candidateFunnel.total) * 100}%` }}
                        ></div>
                        <div
                          className="bg-blue-500 h-full"
                          style={{ width: `${(candidateFunnel.hired / candidateFunnel.total) * 100}%` }}
                        ></div>
                        <div
                          className="bg-red-500 h-full"
                          style={{ width: `${(candidateFunnel.rejected / candidateFunnel.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-honey mr-2"></div>
                          <span className="text-sm">Nuevos</span>
                        </div>
                        <span className="text-sm font-medium">{candidateFunnel.new}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-amber-400 mr-2"></div>
                          <span className="text-sm">Preselección</span>
                        </div>
                        <span className="text-sm font-medium">{candidateFunnel.screening}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                          <span className="text-sm">Entrevista</span>
                        </div>
                        <span className="text-sm font-medium">{candidateFunnel.interview}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-sm">Oferta</span>
                        </div>
                        <span className="text-sm font-medium">{candidateFunnel.offer}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                          <span className="text-sm">Contratados</span>
                        </div>
                        <span className="text-sm font-medium">{candidateFunnel.hired}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                          <span className="text-sm">Rechazados</span>
                        </div>
                        <span className="text-sm font-medium">{candidateFunnel.rejected}</span>
                      </div>
                    </div>

                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href="/employer/candidates">Ver todos los candidatos</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Candidatos recientes */}
              <Card className="md:col-span-2">
                <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <CardTitle>Candidatos recientes</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Filter className="h-4 w-4" />
                      Filtrar
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/employer/candidates">Ver todos</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    {candidates.slice(0, 3).map((candidate) => (
                      <div key={candidate.id} className="border rounded-xl p-4 bg-background">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">
                              {candidate.avatar ? (
                                <img
                                  src={candidate.avatar || "/placeholder.svg"}
                                  alt={candidate.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <Users className="w-6 h-6 m-2 text-muted-foreground" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-bold">{candidate.name}</h3>
                              <p className="text-sm text-muted-foreground">{candidate.position}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="flex flex-col items-end">
                              <Badge
                                variant={
                                  candidate.status === "new"
                                    ? "secondary"
                                    : candidate.status === "screening"
                                      ? "secondary"
                                      : candidate.status === "interview"
                                        ? "default"
                                        : candidate.status === "offer"
                                          ? "new"
                                          : "outline"
                                }
                              >
                                {candidate.status === "new"
                                  ? "Nuevo"
                                  : candidate.status === "screening"
                                    ? "Preselección"
                                    : candidate.status === "interview"
                                      ? "Entrevista"
                                      : candidate.status === "offer"
                                        ? "Oferta"
                                        : "Rechazado"}
                              </Badge>
                              <span className="text-xs text-muted-foreground mt-1">{candidate.appliedAt}</span>
                            </div>

                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/employer/candidates/${candidate.id}`}>Ver perfil</Link>
                            </Button>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mt-3">
                          {candidate.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="bg-muted">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {candidates.length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
                        <Users className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">No tienes candidatos</h3>
                      <p className="text-muted-foreground mb-4">
                        Publica empleos para comenzar a recibir aplicaciones de candidatos
                      </p>
                      <Button asChild>
                        <Link href="/employer/post-job">Publicar empleo</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="metrics" id="metrics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rendimiento de empleos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Vistas totales</span>
                          <div className="flex items-center">
                            {metrics.viewsChange > 0 ? (
                              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                            )}
                            <span className={metrics.viewsChange > 0 ? "text-green-500" : "text-red-500"}>
                              {metrics.viewsChange > 0 ? "+" : ""}
                              {metrics.viewsChange}%
                            </span>
                          </div>
                        </div>
                        <div className="text-2xl font-bold">{metrics.totalViews}</div>
                        <p className="text-xs text-muted-foreground">vs. {metrics.viewsLastWeek} la semana pasada</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Aplicaciones totales</span>
                          <div className="flex items-center">
                            {metrics.applicantsChange > 0 ? (
                              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                            )}
                            <span className={metrics.applicantsChange > 0 ? "text-green-500" : "text-red-500"}>
                              {metrics.applicantsChange > 0 ? "+" : ""}
                              {metrics.applicantsChange}%
                            </span>
                          </div>
                        </div>
                        <div className="text-2xl font-bold">{metrics.totalApplicants}</div>
                        <p className="text-xs text-muted-foreground">
                          vs. {metrics.applicantsLastWeek} la semana pasada
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="text-sm font-medium mb-4">Rendimiento por empleo</h4>
                      <div className="space-y-4">
                        {activeJobs.map((job) => (
                          <div key={job.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-muted rounded-md flex items-center justify-center">
                                <Briefcase className="w-4 h-4 text-muted-foreground" />
                              </div>
                              <div>
                                <h5 className="text-sm font-medium">{job.title}</h5>
                                <p className="text-xs text-muted-foreground">
                                  {job.views} vistas • {job.applicants} aplicantes
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <span className="text-sm font-medium mr-2">{job.conversionRate}%</span>
                              {job.trend === "up" ? (
                                <TrendingUp className="h-4 w-4 text-green-500" />
                              ) : job.trend === "down" ? (
                                <TrendingDown className="h-4 w-4 text-red-500" />
                              ) : (
                                <div className="w-4 h-4 flex items-center justify-center">
                                  <div className="w-3 h-0.5 bg-gray-400 rounded-full"></div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Métricas de contratación</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Tasa de conversión</span>
                          <div className="flex items-center">
                            {metrics.conversionChange > 0 ? (
                              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                            )}
                            <span className={metrics.conversionChange > 0 ? "text-green-500" : "text-red-500"}>
                              {metrics.conversionChange > 0 ? "+" : ""}
                              {metrics.conversionChange}%
                            </span>
                          </div>
                        </div>
                        <div className="text-2xl font-bold">{metrics.conversionRate}%</div>
                        <p className="text-xs text-muted-foreground">
                          vs. {metrics.conversionLastWeek}% la semana pasada
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Tiempo de contratación</span>
                          <div className="flex items-center">
                            {metrics.timeToHireChange < 0 ? (
                              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                            )}
                            <span className={metrics.timeToHireChange < 0 ? "text-green-500" : "text-red-500"}>
                              {metrics.timeToHireChange < 0 ? "" : "+"}
                              {metrics.timeToHireChange}%
                            </span>
                          </div>
                        </div>
                        <div className="text-2xl font-bold">{metrics.averageTimeToHire} días</div>
                        <p className="text-xs text-muted-foreground">
                          vs. {metrics.timeToHireLastMonth} días el mes pasado
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="text-sm font-medium mb-4">Distribución de candidatos</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs">Nuevos</span>
                            <span className="text-xs font-medium">{candidateFunnel.new}</span>
                          </div>
                          <div className="w-full bg-muted h-2 rounded-full">
                            <div
                              className="bg-honey h-2 rounded-full"
                              style={{ width: `${(candidateFunnel.new / candidateFunnel.total) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs">Preselección</span>
                            <span className="text-xs font-medium">{candidateFunnel.screening}</span>
                          </div>
                          <div className="w-full bg-muted h-2 rounded-full">
                            <div
                              className="bg-amber-400 h-2 rounded-full"
                              style={{ width: `${(candidateFunnel.screening / candidateFunnel.total) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs">Entrevista</span>
                            <span className="text-xs font-medium">{candidateFunnel.interview}</span>
                          </div>
                          <div className="w-full bg-muted h-2 rounded-full">
                            <div
                              className="bg-amber-500 h-2 rounded-full"
                              style={{ width: `${(candidateFunnel.interview / candidateFunnel.total) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs">Oferta</span>
                            <span className="text-xs font-medium">{candidateFunnel.offer}</span>
                          </div>
                          <div className="w-full bg-muted h-2 rounded-full">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${(candidateFunnel.offer / candidateFunnel.total) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs">Contratados</span>
                            <span className="text-xs font-medium">{candidateFunnel.hired}</span>
                          </div>
                          <div className="w-full bg-muted h-2 rounded-full">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${(candidateFunnel.hired / candidateFunnel.total) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Activity Feed */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Actividad reciente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex">
                    <div className="mr-4 flex-shrink-0">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                        {activity.icon}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h4 className="text-base font-medium">{activity.title}</h4>
                        <span className="ml-auto text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
