"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button-custom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card-custom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { JobCard } from "@/components/ui/job-card"
import { ApplicationStatusCard } from "@/components/ui/application-status-card"
import { Search, Bell, Briefcase, BookmarkCheck, Clock, ChevronRight, Loader2 } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { 
  getCandidateApplications, 
  getSavedJobs, 
  getRecommendedJobs 
} from "@/lib/services/relations-service"
import type { Job, JobWithCompany } from "@/lib/services/job-service"

// Interfaz para el job guardado
interface SavedJob {
  id: string
  candidate_id: string
  job_id: string
  created_at?: string
  job?: JobWithCompany
}

// Definimos una interfaz para la aplicación que incluye el job
interface ApplicationWithJob {
  id: string
  job_id: string
  candidate_id: string
  cover_letter?: string
  resume_url?: string
  status: string
  notes?: string
  created_at?: string
  updated_at?: string
  job?: JobWithCompany
}

// Definimos un tipo para status que coincida con el componente ApplicationStatusCard
type AppStatus = "new" | "screening" | "interview" | "offer" | "hired" | "rejected"

// Función para mapear los status de la base de datos a los que espera el componente
function mapStatus(status: string): AppStatus {
  const statusMap: Record<string, AppStatus> = {
    "pendiente": "new",
    "revisado": "screening",
    "entrevista": "interview",
    "oferta": "offer",
    "contratado": "hired",
    "rechazado": "rejected"
  }
  return statusMap[status] || "new"
}

export default function CandidateDashboard() {
  const { user, profile, isLoading: isAuthLoading } = useAuth()
  
  const [applications, setApplications] = useState<ApplicationWithJob[]>([])
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([])
  const [recommendedJobs, setRecommendedJobs] = useState<JobWithCompany[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      if (user) {
        setIsLoading(true)
        try {
          const [applicationsData, savedJobsData, recommendedJobsData] = await Promise.all([
            getCandidateApplications(user.id),
            getSavedJobs(user.id),
            getRecommendedJobs(user.id)
          ])
          
          setApplications(applicationsData || [])
          setSavedJobs(savedJobsData || [])
          setRecommendedJobs(recommendedJobsData || [])
        } catch (error) {
          console.error("Error loading dashboard data:", error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    if (user && !isAuthLoading) {
      loadData()
    }
  }, [user, isAuthLoading])

  // Función para manejar guardar trabajos
  const handleSaveJob = (jobId: string) => {
    // Aquí implementarías la lógica para guardar/remover un trabajo
    console.log(`Toggling save for job ${jobId}`)
  }

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

  return (
    <div className="py-8">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Hola, {profile?.full_name || user?.email}</h1>
            <p className="text-muted-foreground">Bienvenido a tu dashboard de candidato</p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2" asChild>
              <Link href="/candidate/notifications">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notificaciones</span>
              </Link>
            </Button>
            <Button className="gap-2" asChild>
              <Link href="/job-feed">
                <Search className="h-4 w-4" />
                <span className="hidden sm:inline">Buscar empleos</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              title: "Aplicaciones",
              value: applications.length.toString(),
              icon: <Briefcase className="h-5 w-5 text-honey" />,
              link: "/candidate/applications",
            },
            {
              title: "Guardados",
              value: savedJobs.length.toString(),
              icon: <BookmarkCheck className="h-5 w-5 text-honey" />,
              link: "/candidate/saved-jobs",
            },
            {
              title: "Entrevistas",
              value: applications.filter(app => app.status === "entrevista").length.toString(),
              icon: <Clock className="h-5 w-5 text-honey" />,
              link: "/candidate/interviews",
            },
            {
              title: "Perfil",
              // Calcular el porcentaje de completitud del perfil sería algo más complejo
              value: "80%",
              icon: (
                <div className="w-5 h-5 rounded-full bg-honey text-jet flex items-center justify-center text-xs font-bold">
                  %
                </div>
              ),
              link: "/candidate/profile",
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

        <Tabs defaultValue="applications" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
            <TabsTrigger value="applications">Mis aplicaciones</TabsTrigger>
            <TabsTrigger value="saved">Empleos guardados</TabsTrigger>
            <TabsTrigger value="recommended">Recomendados</TabsTrigger>
          </TabsList>

          <TabsContent value="applications" id="applications">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  Mis aplicaciones
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/candidate/applications">Ver todas</Link>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {applications.slice(0, 3).map((application, index) => (
                    <Link key={index} href={`/candidate/applications/${application.id}`}>
                      <ApplicationStatusCard
                        jobTitle={application.job?.title || "Puesto no disponible"}
                        company={application.job?.company?.name || "Empresa no disponible"}
                        appliedDate={new Date(application.created_at || "").toLocaleDateString('es-ES', {day: 'numeric', month: 'long', year: 'numeric'})}
                        status={mapStatus(application.status)}
                        lastUpdated={new Date(application.updated_at || "").toLocaleDateString('es-ES', {day: 'numeric', month: 'long', year: 'numeric'})}
                      />
                    </Link>
                  ))}
                </div>

                {applications.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
                      <Briefcase className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No tienes aplicaciones</h3>
                    <p className="text-muted-foreground mb-4">Comienza a aplicar a empleos para ver tu progreso aquí</p>
                    <Button asChild>
                      <Link href="/job-feed">Explorar empleos</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="saved" id="saved">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  Empleos guardados
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/candidate/saved-jobs">Ver todos</Link>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {savedJobs.slice(0, 4).map((savedJob) => (
                    <JobCard
                      key={savedJob.id}
                      id={savedJob.job?.id || ""}
                      title={savedJob.job?.title || "Puesto no disponible"}
                      company={savedJob.job?.company?.name || "Empresa no disponible"}
                      location={savedJob.job?.location || "Ubicación no disponible"}
                      salary={savedJob.job?.salary_min && savedJob.job?.salary_max ? 
                        `${savedJob.job.salary_min}€ - ${savedJob.job.salary_max}€` : 
                        "Salario no especificado"}
                      tags={savedJob.job?.requirements ? 
                        savedJob.job.requirements.split(',').map(req => req.trim()).slice(0, 3) : 
                        []}
                      isNew={
                        savedJob.job?.created_at ? 
                        (new Date().getTime() - new Date(savedJob.job.created_at).getTime()) < (7 * 24 * 60 * 60 * 1000) : 
                        false
                      }
                      isRemote={savedJob.job?.is_remote || false}
                      postedAt={savedJob.job?.created_at ? 
                        `Hace ${Math.floor((new Date().getTime() - new Date(savedJob.job.created_at).getTime()) / (24 * 60 * 60 * 1000))} días` : 
                        "Fecha desconocida"}
                      isSaved={true}
                      onSave={() => handleSaveJob(savedJob.job?.id || "")}
                    />
                  ))}
                </div>

                {savedJobs.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
                      <BookmarkCheck className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No tienes empleos guardados</h3>
                    <p className="text-muted-foreground mb-4">Guarda empleos que te interesen para aplicar más tarde</p>
                    <Button asChild>
                      <Link href="/job-feed">Explorar empleos</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommended" id="recommended">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  Empleos recomendados
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/job-feed">Ver más</Link>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendedJobs.slice(0, 4).map((job) => (
                    <JobCard
                      key={job.id}
                      id={job.id}
                      title={job.title || "Puesto no disponible"}
                      company={job.company?.name || "Empresa no disponible"}
                      location={job.location || "Ubicación no disponible"}
                      salary={job.salary_min && job.salary_max ? 
                        `${job.salary_min}€ - ${job.salary_max}€` : 
                        "Salario no especificado"}
                      tags={job.requirements ? 
                        job.requirements.split(',').map(req => req.trim()).slice(0, 3) : 
                        []}
                      isNew={
                        job.created_at ? 
                        (new Date().getTime() - new Date(job.created_at).getTime()) < (7 * 24 * 60 * 60 * 1000) : 
                        false
                      }
                      isRemote={job.is_remote || false}
                      postedAt={job.created_at ? 
                        `Hace ${Math.floor((new Date().getTime() - new Date(job.created_at).getTime()) / (24 * 60 * 60 * 1000))} días` : 
                        "Fecha desconocida"}
                      isSaved={savedJobs.some(saved => saved.job?.id === job.id)}
                      onSave={() => handleSaveJob(job.id)}
                    />
                  ))}
                </div>

                {recommendedJobs.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
                      <Briefcase className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No hay recomendaciones todavía</h3>
                    <p className="text-muted-foreground mb-4">
                      Completa tu perfil y explora empleos para recibir recomendaciones personalizadas
                    </p>
                    <Button asChild>
                      <Link href="/job-feed">Explorar empleos</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
