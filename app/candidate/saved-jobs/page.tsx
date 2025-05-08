"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button-custom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card-custom"
import { Input } from "@/components/ui/input-custom"
import { JobCard } from "@/components/ui/job-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select-custom"
import { ArrowLeft, Search, Bookmark, Filter } from "lucide-react"
import Link from "next/link"

export default function SavedJobsPage() {
  // Usuario de ejemplo
  const user = {
    name: "Carlos Méndez",
    role: "candidate",
  }

  const [searchTerm, setSearchTerm] = useState("")

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
      companyLogo: "/placeholder.svg?height=40&width=40",
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
      companyLogo: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      title: "Product Manager",
      company: "Innovatech",
      location: "Valencia, España",
      salary: "50.000€ - 65.000€",
      tags: ["Agile", "Scrum", "Product Development"],
      isNew: true,
      postedAt: "Hace 3 días",
      isSaved: true,
      companyLogo: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "4",
      title: "Desarrollador Backend",
      company: "ServerPro",
      location: "Sevilla, España",
      salary: "45.000€ - 55.000€",
      tags: ["Node.js", "Python", "MongoDB"],
      isRemote: true,
      postedAt: "Hace 5 días",
      isSaved: true,
      companyLogo: "/placeholder.svg?height=40&width=40",
    },
  ]

  const filteredJobs = savedJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleRemoveSaved = (id: string) => {
    // En una implementación real, esto eliminaría el trabajo de los guardados
    console.log(`Removing job ${id} from saved`)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} />

      <main className="flex-1 py-8">
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
                <h1 className="text-3xl font-bold">Empleos guardados</h1>
                <p className="text-muted-foreground">Gestiona tus empleos favoritos</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Buscar en guardados"
                    className="pl-10 w-[200px] md:w-[300px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Filtros */}
            <div className="w-full md:w-1/4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Filter className="h-5 w-5 mr-2" />
                    Filtros
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Ubicación</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Todas las ubicaciones" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas las ubicaciones</SelectItem>
                        <SelectItem value="madrid">Madrid</SelectItem>
                        <SelectItem value="barcelona">Barcelona</SelectItem>
                        <SelectItem value="valencia">Valencia</SelectItem>
                        <SelectItem value="sevilla">Sevilla</SelectItem>
                        <SelectItem value="remote">Remoto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tipo de empleo</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Todos los tipos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos los tipos</SelectItem>
                        <SelectItem value="full-time">Tiempo completo</SelectItem>
                        <SelectItem value="part-time">Tiempo parcial</SelectItem>
                        <SelectItem value="contract">Contrato</SelectItem>
                        <SelectItem value="internship">Prácticas</SelectItem>
                        <SelectItem value="remote">Remoto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Fecha guardado</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Cualquier fecha" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Cualquier fecha</SelectItem>
                        <SelectItem value="today">Hoy</SelectItem>
                        <SelectItem value="week">Esta semana</SelectItem>
                        <SelectItem value="month">Este mes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-4 border-t">
                    <Button variant="outline" className="w-full">
                      Limpiar filtros
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Listado de empleos guardados */}
            <div className="w-full md:w-3/4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {filteredJobs.length} {filteredJobs.length === 1 ? "empleo guardado" : "empleos guardados"}
                </h2>
                <Select defaultValue="recent">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Más recientes</SelectItem>
                    <SelectItem value="title">Título</SelectItem>
                    <SelectItem value="company">Empresa</SelectItem>
                    <SelectItem value="salary-high">Mayor salario</SelectItem>
                    <SelectItem value="salary-low">Menor salario</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {filteredJobs.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {filteredJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      id={job.id}
                      title={job.title}
                      company={job.company}
                      location={job.location}
                      salary={job.salary}
                      tags={job.tags}
                      isNew={job.isNew}
                      isUrgent={job.isUrgent}
                      isRemote={job.isRemote}
                      postedAt={job.postedAt}
                      isSaved={job.isSaved}
                      companyLogo={job.companyLogo}
                      onSave={() => handleRemoveSaved(job.id)}
                    />
                  ))}
                </div>
              ) : (
                <Card className="bg-muted/30">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                      <Bookmark className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No hay empleos guardados</h3>
                    <p className="text-muted-foreground text-center mb-6 max-w-md">
                      {searchTerm
                        ? `No se encontraron empleos guardados que coincidan con "${searchTerm}"`
                        : "Guarda empleos para verlos más tarde y no perder oportunidades"}
                    </p>
                    <Button asChild>
                      <Link href="/jobs">Explorar empleos</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
