"use client"

import { Button } from "@/components/ui/button-custom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card-custom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { JobCard } from "@/components/ui/job-card"
import { ApplicationStatusCard } from "@/components/ui/application-status-card"
import { Search, Bell, Briefcase, BookmarkCheck, Clock, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function CandidateDashboard() {
  // Usuario de ejemplo
  const user = {
    name: "Carlos Méndez",
    role: "candidate",
  }

  // Datos de ejemplo para aplicaciones
  const applications = [
    {
      id: "1",
      jobTitle: "Desarrollador Frontend",
      company: "TechCorp",
      appliedDate: "15 mayo, 2023",
      status: "interview" as const,
      lastUpdated: "Hace 2 días",
    },
    {
      id: "2",
      jobTitle: "UX/UI Designer",
      company: "DesignStudio",
      appliedDate: "10 mayo, 2023",
      status: "screening" as const,
      lastUpdated: "Hace 1 semana",
    },
    {
      id: "3",
      jobTitle: "Product Manager",
      company: "Innovatech",
      appliedDate: "5 mayo, 2023",
      status: "rejected" as const,
      lastUpdated: "Hace 3 días",
    },
  ]

  // Datos de ejemplo para empleos guardados
  const savedJobs = [
    {
      id: "1",
      title: "Desarrollador Frontend",
      company: "TechCorp",
      location: "Madrid, España",
      salary: "40.000€ - 50.000€",
      tags: ["React", "JavaScript", "CSS"],
      isNew: true,
      isRemote: true,
      postedAt: "Hace 2 días",
      isSaved: true,
    },
    {
      id: "2",
      title: "Diseñador UX/UI",
      company: "DesignStudio",
      location: "Barcelona, España",
      salary: "35.000€ - 45.000€",
      tags: ["Figma", "Adobe XD", "Sketch"],
      isUrgent: true,
      postedAt: "Hace 1 semana",
      isSaved: true,
    },
  ]

  // Datos de ejemplo para empleos recomendados
  const recommendedJobs = [
    {
      id: "3",
      title: "Frontend Developer",
      company: "WebTech",
      location: "Remoto",
      salary: "45.000€ - 55.000€",
      tags: ["React", "TypeScript", "Next.js"],
      isNew: true,
      postedAt: "Hace 1 día",
    },
    {
      id: "4",
      title: "UI Developer",
      company: "CreativeAgency",
      location: "Madrid, España",
      salary: "40.000€ - 50.000€",
      tags: ["Figma", "HTML", "CSS"],
      isRemote: true,
      postedAt: "Hace 3 días",
    },
  ]

  // Función para manejar guardar trabajos
  const handleSaveJob = (jobId: string) => {
    console.log(`Toggling save for job ${jobId}`);
    // Aquí iría la lógica para guardar/remover un trabajo
  };

  return (
    <div className="py-8">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Hola, {user.name}</h1>
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
              value: "3",
              icon: <Briefcase className="h-5 w-5 text-honey" />,
              link: "/candidate/applications",
            },
            {
              title: "Guardados",
              value: "2",
              icon: <BookmarkCheck className="h-5 w-5 text-honey" />,
              link: "/candidate/saved-jobs",
            },
            {
              title: "Entrevistas",
              value: "1",
              icon: <Clock className="h-5 w-5 text-honey" />,
              link: "/candidate/interviews",
            },
            {
              title: "Perfil",
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
                  {applications.map((application, index) => (
                    <Link key={index} href={`/candidate/applications/${application.id}`}>
                      <ApplicationStatusCard
                        jobTitle={application.jobTitle}
                        company={application.company}
                        appliedDate={application.appliedDate}
                        status={application.status}
                        lastUpdated={application.lastUpdated}
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
                  {savedJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      id={job.id}
                      title={job.title}
                      company={job.company}
                      location={job.location}
                      salary={job.salary}
                      tags={job.tags}
                      isNew={job.isNew}
                      isRemote={job.isRemote}
                      postedAt={job.postedAt}
                      isSaved={job.isSaved}
                      onSave={() => handleSaveJob(job.id)}
                    />
                  ))}
                </div>

                {savedJobs.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
                      <BookmarkCheck className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No tienes empleos guardados</h3>
                    <p className="text-muted-foreground mb-4">
                      Guarda los empleos que te interesen para verlos más tarde
                    </p>
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
                  {recommendedJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      id={job.id}
                      title={job.title}
                      company={job.company}
                      location={job.location}
                      salary={job.salary}
                      tags={job.tags}
                      isNew={job.isNew}
                      isRemote={job.isRemote}
                      postedAt={job.postedAt}
                      onSave={() => handleSaveJob(job.id)}
                    />
                  ))}
                </div>

                {recommendedJobs.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
                      <Briefcase className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No hay recomendaciones aún</h3>
                    <p className="text-muted-foreground mb-4">
                      Completa tu perfil para recibir recomendaciones personalizadas
                    </p>
                    <Button asChild>
                      <Link href="/candidate/profile">Completar perfil</Link>
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
