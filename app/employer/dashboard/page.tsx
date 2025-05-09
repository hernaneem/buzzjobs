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
import { 
  getCompanyJobs, 
  getCompanyCandidates,
  getCandidateStats,
  getJobMetrics
} from "@/lib/services/relations-service"
import type { JobWithCompany } from "@/lib/services/job-service"
import type { Profile } from "@/lib/services/profile-service"

// Interfaz para las aplicaciones con candidato y trabajo
interface ApplicationWithDetails {
  id: string
  job_id: string
  candidate_id: string
  status: string
  created_at?: string
  updated_at?: string
  candidate?: {
    id: string
    full_name: string
    avatar_url?: string
    email: string
    location?: string
    skills?: string[]
  }
  job?: JobWithCompany
}

// Extendemos la interfaz Profile para agregar company_id
interface EmployerProfile extends Profile {
  company_id?: string
}

// Asumiendo que este archivo ya existe, solo mostrando cómo usar PageHeader
export default function EmployerDashboard() {
  const { user, profile: basicProfile, isLoading: isAuthLoading } = useAuth()
  // Cast profile a EmployerProfile para acceder a company_id
  const profile = basicProfile as EmployerProfile
  
  const [activeTab, setActiveTab] = useState("jobs")
  const [activeActionMenu, setActiveActionMenu] = useState<string | null>(null)
  const [showNotifications, setShowNotifications] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  // Estados para los datos reales
  const [jobs, setJobs] = useState<JobWithCompany[]>([])
  const [applications, setApplications] = useState<ApplicationWithDetails[]>([])
  const [candidateStats, setCandidateStats] = useState({
    total: 0,
    new: 0,
    screening: 0,
    interview: 0,
    offer: 0,
    hired: 0,
    rejected: 0
  })
  const [jobMetrics, setJobMetrics] = useState({
    totalViews: 0,
    totalApplicants: 0,
    conversionRate: 0
  })
  
  // Por ahora mantenemos las notificaciones hardcodeadas ya que no hay servicio para ellas todavía
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

  // Cargamos los datos reales
  useEffect(() => {
    async function loadData() {
      if (profile?.company_id) {
        setIsLoading(true)
        try {
          const [jobsData, applicationsData, statsData, metricsData] = await Promise.all([
            getCompanyJobs(profile.company_id),
            getCompanyCandidates(profile.company_id),
            getCandidateStats(profile.company_id),
            getJobMetrics(profile.company_id)
          ])
          
          setJobs(jobsData || [])
          setApplications(applicationsData || [])
          setCandidateStats(statsData || {
            total: 0,
            new: 0,
            screening: 0,
            interview: 0,
            offer: 0,
            hired: 0,
            rejected: 0
          })
          // Asegurar que metricsData siempre tiene conversionRate
          setJobMetrics(metricsData ? {
            totalViews: metricsData.totalViews || 0,
            totalApplicants: metricsData.totalApplicants || 0,
            conversionRate: metricsData.conversionRate || 0
          } : {
            totalViews: 0,
            totalApplicants: 0,
            conversionRate: 0
          })
        } catch (error) {
          console.error("Error loading employer dashboard data:", error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    if (profile && !isAuthLoading) {
      loadData()
    }
  }, [profile, isAuthLoading])

  // Generamos actividad reciente basada en las aplicaciones
  const generateRecentActivity = () => {
    const activities = []
    
    // Nuevos candidatos de las últimas 2 semanas
    const newCandidates = applications
      .filter(app => {
        const createdDate = new Date(app.created_at || "")
        const twoWeeksAgo = new Date()
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14)
        return createdDate > twoWeeksAgo
      })
      .slice(0, 3)
      .map((app, index) => ({
        id: `candidate-${index}`,
        type: "candidate",
        title: "Nuevo candidato",
        description: `${app.candidate?.full_name || "Un candidato"} aplicó para ${app.job?.title || "un puesto"}`,
        time: app.created_at ? `Hace ${Math.floor((new Date().getTime() - new Date(app.created_at).getTime()) / (24 * 60 * 60 * 1000))} días` : "Recientemente",
        icon: <Users className="h-5 w-5 text-honey" />
      }))
    
    // Empleos recientes publicados
    const recentJobs = jobs
      .filter(job => {
        const createdDate = new Date(job.created_at || "")
        const twoWeeksAgo = new Date()
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14)
        return createdDate > twoWeeksAgo
      })
      .slice(0, 2)
      .map((job, index) => ({
        id: `job-${index}`,
        type: "job",
        title: "Empleo publicado",
        description: `Has publicado un nuevo empleo: ${job.title}`,
        time: job.created_at ? `Hace ${Math.floor((new Date().getTime() - new Date(job.created_at).getTime()) / (24 * 60 * 60 * 1000))} días` : "Recientemente",
        icon: <Briefcase className="h-5 w-5 text-honey" />
      }))
    
    return [...newCandidates, ...recentJobs]
  }

  // Actividad reciente generada dinámicamente
  const recentActivity = generateRecentActivity()

  // Handler para click fuera de notificaciones
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

  // Manejador para leer notificaciones
  const markNotificationAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => {
        if (notification.id === id) {
          return { ...notification, read: true }
        }
        return notification
      }),
    )
  }

  // Mostrar pantalla de carga mientras se obtienen los datos
  if (isAuthLoading || isLoading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-honey" />
          <p className="text-muted-foreground">Cargando tu dashboard...</p>
        </div>
      </div>
    )
  }

  // Componente para las notificaciones
  const NotificationsComponent = (
    <>
      <div className="relative notifications-container">
        <Button
          variant="outline"
          className="relative"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <Bell className="h-5 w-5" />
          {notifications.some((n) => !n.read) && (
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-honey"></span>
          )}
        </Button>
        {showNotifications && (
          <div className="absolute right-0 z-10 mt-2 w-80 overflow-hidden rounded-md border bg-background shadow-md">
            <div className="p-3 border-b">
              <h3 className="font-medium">Notificaciones</h3>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex p-3 border-b hover:bg-muted ${
                      !notification.read ? "bg-muted/50" : ""
                    }`}
                    onClick={() => markNotificationAsRead(notification.id)}
                  >
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{notification.title}</h4>
                      <p className="text-xs text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                    {!notification.read && <span className="w-2 h-2 bg-honey rounded-full mt-1"></span>}
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  No tienes notificaciones
                </div>
              )}
            </div>
            <div className="p-2 border-t text-center">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/employer/notifications">Ver todas</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
      <Button className="gap-2" asChild>
        <Link href="/employer/jobs/new">
          <Briefcase className="h-4 w-4" />
          Publicar empleo
        </Link>
      </Button>
    </>
  )

  return (
    <div className="py-8">
      <div className="container px-4 md:px-6">
        <PageHeader
          title={`Hola, ${profile?.full_name || user?.email}`}
          description="Bienvenido a tu dashboard de empresa"
          actions={NotificationsComponent}
        />

        {/* Métricas Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 mt-8">
          {[
            {
              title: "Vistas totales",
              value: jobMetrics.totalViews,
              icon: <Eye className="h-5 w-5 text-honey" />,
              link: "/employer/analytics",
            },
            {
              title: "Candidatos",
              value: candidateStats.total,
              icon: <Users className="h-5 w-5 text-honey" />,
              link: "/employer/candidates",
            },
            {
              title: "Tasa de conversión",
              value: `${jobMetrics.conversionRate}%`,
              icon: <BarChart3 className="h-5 w-5 text-honey" />,
              link: "/employer/analytics",
            },
            {
              title: "Empleos activos",
              value: jobs.filter(job => job.is_active).length,
              icon: <Briefcase className="h-5 w-5 text-honey" />,
              link: "/employer/jobs",
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
                <Link href={stat.link} className="text-sm text-honey flex items-center mt-4 hover:underline">
                  Ver detalles
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="jobs" className="space-y-8" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 md:w-auto md:inline-flex">
            <TabsTrigger value="jobs">Empleos</TabsTrigger>
            <TabsTrigger value="candidates">Candidatos</TabsTrigger>
            <TabsTrigger value="activity">Actividad</TabsTrigger>
          </TabsList>

          {/* Empleos */}
          <TabsContent value="jobs" id="jobs">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  Empleos activos
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/employer/jobs">Ver todos</Link>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobs.length > 0 ? (
                    jobs.filter(job => job.is_active).slice(0, 3).map((job) => (
                      <Card key={job.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div className="flex-1">
                              <Link href={`/employer/jobs/${job.id}`}>
                                <h3 className="font-medium text-lg hover:text-honey transition-colors">{job.title}</h3>
                              </Link>
                              <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <MapPin className="mr-1 h-3 w-3" />
                                {job.location || (job.is_remote ? "Remoto" : "Ubicación no especificada")}
                              </div>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {job.created_at && new Date().getTime() - new Date(job.created_at).getTime() < 7 * 24 * 60 * 60 * 1000 && (
                                  <Badge variant="new">Nuevo</Badge>
                                )}
                                {job.is_remote && <Badge variant="remote">Remoto</Badge>}
                              </div>
                            </div>
                            <div className="flex md:flex-col justify-between md:items-end gap-2 md:min-w-36">
                              <div className="flex items-center md:flex-col md:items-end">
                                <div className="flex items-center md:mb-1">
                                  <Users className="h-4 w-4 mr-1 md:mr-2" />
                                  <span className="text-sm">{job.applications_count || 0}</span>
                                </div>
                                <div className="flex items-center ml-4 md:ml-0">
                                  <Eye className="h-4 w-4 mr-1 md:mr-2" />
                                  <span className="text-sm">{job.views_count || 0}</span>
                                </div>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {job.created_at ? 
                                  `Hace ${Math.floor((new Date().getTime() - new Date(job.created_at).getTime()) / (24 * 60 * 60 * 1000))} días` : 
                                  "Fecha desconocida"}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
                        <Briefcase className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">No tienes empleos activos</h3>
                      <p className="text-muted-foreground mb-4">Publica tu primer empleo para atraer candidatos</p>
                      <Button asChild>
                        <Link href="/employer/jobs/new">Publicar empleo</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Candidatos */}
          <TabsContent value="candidates" id="candidates">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  Candidatos recientes
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/employer/candidates">Ver todos</Link>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applications.length > 0 ? (
                    applications.slice(0, 5).map((application) => (
                      <Card key={application.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center overflow-hidden">
                                {application.candidate?.avatar_url ? (
                                  <img
                                    src={application.candidate.avatar_url}
                                    alt={`${application.candidate.full_name} avatar`}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <Users className="h-6 w-6 text-muted-foreground" />
                                )}
                              </div>
                              <div>
                                <Link href={`/employer/candidates/${application.candidate_id}`}>
                                  <h3 className="font-medium hover:text-honey transition-colors">
                                    {application.candidate?.full_name || "Candidato"}
                                  </h3>
                                </Link>
                                <p className="text-sm text-muted-foreground">{application.job?.title || "Puesto no disponible"}</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {application.candidate?.skills?.slice(0, 3).map((skill, idx) => (
                                    <Badge key={idx} variant="outline" className="bg-muted text-xs py-0">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              <Badge
                                variant={
                                  application.status === "oferta" ? "default" :
                                  application.status === "entrevista" ? "secondary" :
                                  application.status === "contratado" ? "new" :
                                  application.status === "rechazado" ? "outline" :
                                  "outline"
                                }
                              >
                                {application.status === "pendiente" ? "Nuevo" : 
                                 application.status === "revisado" ? "Revisado" :
                                 application.status === "entrevista" ? "Entrevista" :
                                 application.status === "oferta" ? "Oferta" :
                                 application.status === "contratado" ? "Contratado" :
                                 application.status === "rechazado" ? "Rechazado" : 
                                 "Desconocido"}
                              </Badge>
                              <span className="text-xs text-muted-foreground mt-2">
                                {application.created_at ? 
                                  `Hace ${Math.floor((new Date().getTime() - new Date(application.created_at).getTime()) / (24 * 60 * 60 * 1000))} días` : 
                                  "Fecha desconocida"}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
                        <Users className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">No hay candidatos todavía</h3>
                      <p className="text-muted-foreground mb-4">
                        Publica empleos para comenzar a recibir aplicaciones de candidatos
                      </p>
                      <Button asChild>
                        <Link href="/employer/jobs/new">Publicar empleo</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Actividad */}
          <TabsContent value="activity" id="activity">
            <Card>
              <CardHeader>
                <CardTitle>Actividad reciente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.length > 0 ? (
                    recentActivity.map((activity) => (
                      <div key={activity.id} className="flex gap-4 pb-4 border-b last:border-0">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          {activity.icon}
                        </div>
                        <div>
                          <h4 className="font-medium">{activity.title}</h4>
                          <p className="text-sm text-muted-foreground">{activity.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">No hay actividad reciente</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
