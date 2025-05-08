import type React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button-custom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card-custom"
import { Badge } from "@/components/ui/badge-custom"
import { Input } from "@/components/ui/input-custom"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select-custom"
import { Search, Filter, Users, MapPin, Briefcase } from "lucide-react"
import Link from "next/link"

export default function CandidatesPage() {
  // Usuario de ejemplo
  const user = {
    name: "María Rodríguez",
    role: "employer",
  }

  // Datos de ejemplo para candidatos
  const candidates = [
    {
      id: "1",
      name: "Carlos Méndez",
      title: "Desarrollador Frontend",
      location: "Madrid, España",
      skills: ["React", "JavaScript", "TypeScript", "HTML", "CSS"],
      experience: "3 años",
      education: "Grado en Ingeniería Informática",
      appliedFor: "Desarrollador Frontend",
      status: "interview",
      appliedAt: "Hace 2 días",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "Laura Sánchez",
      title: "Diseñador UX/UI",
      location: "Barcelona, España",
      skills: ["Figma", "Adobe XD", "UI Design", "UX Research", "Prototyping"],
      experience: "4 años",
      education: "Grado en Diseño",
      appliedFor: "Diseñador UX/UI",
      status: "screening",
      appliedAt: "Hace 5 días",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      name: "Javier García",
      title: "Desarrollador Frontend",
      location: "Valencia, España",
      skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Redux"],
      experience: "2 años",
      education: "Bootcamp de Desarrollo Web",
      appliedFor: "Desarrollador Frontend",
      status: "new",
      appliedAt: "Hace 1 día",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "4",
      name: "Ana Martínez",
      title: "Product Manager",
      location: "Madrid, España",
      skills: ["Agile", "Scrum", "Product Development", "User Stories", "Roadmapping"],
      experience: "5 años",
      education: "MBA en Gestión de Productos Digitales",
      appliedFor: "Product Manager",
      status: "offer",
      appliedAt: "Hace 1 semana",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "5",
      name: "Miguel Torres",
      title: "Desarrollador Backend",
      location: "Sevilla, España",
      skills: ["Node.js", "Python", "MongoDB", "Express", "API Design"],
      experience: "3 años",
      education: "Grado en Ingeniería del Software",
      appliedFor: "Desarrollador Backend",
      status: "rejected",
      appliedAt: "Hace 2 semanas",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} />

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Candidatos</h1>
              <p className="text-muted-foreground">Gestiona y evalúa a los candidatos para tus ofertas de empleo</p>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filtros</span>
              </Button>
              <Button asChild className="gap-2">
                <Link href="/employer/post-job">
                  <Briefcase className="h-4 w-4" />
                  <span className="hidden sm:inline">Publicar empleo</span>
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Filtros - ahora con posición sticky en pantallas medianas y grandes */}
            <Card className="md:col-span-1 h-fit md:sticky md:top-4">
              <CardHeader>
                <CardTitle>Filtros</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Buscar</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input placeholder="Nombre o habilidad" className="pl-10" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Oferta de empleo</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas las ofertas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las ofertas</SelectItem>
                      <SelectItem value="frontend">Desarrollador Frontend</SelectItem>
                      <SelectItem value="ux-ui">Diseñador UX/UI</SelectItem>
                      <SelectItem value="product">Product Manager</SelectItem>
                      <SelectItem value="backend">Desarrollador Backend</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Estado</Label>
                  <div className="space-y-2">
                    {[
                      { id: "new", label: "Nuevo" },
                      { id: "screening", label: "Preselección" },
                      { id: "interview", label: "Entrevista" },
                      { id: "offer", label: "Oferta" },
                      { id: "hired", label: "Contratado" },
                      { id: "rejected", label: "Rechazado" },
                    ].map((status) => (
                      <div key={status.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`status-${status.id}`}
                          className="h-4 w-4 rounded border-gray-300 text-honey focus:ring-honey"
                        />
                        <label htmlFor={`status-${status.id}`} className="ml-2 text-sm">
                          {status.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Ubicación</Label>
                  <Select>
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
                  <Label>Experiencia</Label>
                  <div className="space-y-2">
                    {[
                      { id: "entry", label: "Sin experiencia" },
                      { id: "junior", label: "1-2 años" },
                      { id: "mid", label: "3-5 años" },
                      { id: "senior", label: "5-7 años" },
                      { id: "expert", label: "8+ años" },
                    ].map((exp) => (
                      <div key={exp.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`exp-${exp.id}`}
                          className="h-4 w-4 rounded border-gray-300 text-honey focus:ring-honey"
                        />
                        <label htmlFor={`exp-${exp.id}`} className="ml-2 text-sm">
                          {exp.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button variant="outline" className="w-full">
                    Limpiar filtros
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Lista de candidatos */}
            <div className="md:col-span-3 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold">Todos los candidatos</h2>
                  <p className="text-sm text-muted-foreground">Mostrando {candidates.length} resultados</p>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-sm">Ordenar por:</label>
                  <Select defaultValue="recent">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Más recientes</SelectItem>
                      <SelectItem value="name">Nombre</SelectItem>
                      <SelectItem value="experience-high">Mayor experiencia</SelectItem>
                      <SelectItem value="experience-low">Menor experiencia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {candidates.map((candidate) => (
                  <Card key={candidate.id} className="overflow-hidden transition-shadow hover:shadow-medium">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col gap-4">
                        {/* Encabezado de la tarjeta - información principal */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-muted overflow-hidden flex-shrink-0">
                              {candidate.avatar ? (
                                <img
                                  src={candidate.avatar || "/placeholder.svg"}
                                  alt={candidate.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <Users className="w-6 h-6 m-3 text-muted-foreground" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-bold text-lg">{candidate.name}</h3>
                              <p className="text-muted-foreground">{candidate.title}</p>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
                            <Badge
                              variant={
                                candidate.status === "new"
                                  ? "secondary"
                                  : candidate.status === "screening"
                                    ? "secondary"
                                    : candidate.status === "interview"
                                      ? "default"
                                      : candidate.status === "offer"
                                        ? "default"
                                        : candidate.status === "hired"
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
                                      : candidate.status === "hired"
                                        ? "Contratado"
                                        : "Rechazado"}
                            </Badge>

                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/employer/candidates/${candidate.id}`}>Ver perfil</Link>
                            </Button>
                          </div>
                        </div>

                        {/* Información adicional - diseño en grid responsivo */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
                          <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground flex items-center">
                              <MapPin className="mr-1 h-4 w-4 flex-shrink-0" />
                              Ubicación
                            </span>
                            <span className="text-sm truncate">{candidate.location}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground flex items-center">
                              <Briefcase className="mr-1 h-4 w-4 flex-shrink-0" />
                              Experiencia
                            </span>
                            <span className="text-sm truncate">{candidate.experience}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground">Aplicó para</span>
                            <span className="text-sm truncate">{candidate.appliedFor}</span>
                          </div>
                        </div>

                        {/* Habilidades - diseño flexible con wrapping */}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {candidate.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="bg-muted">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex justify-center mt-8">
                <nav className="flex items-center gap-1">
                  <Button variant="outline" size="icon" disabled>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-chevron-left"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                    <span className="sr-only">Página anterior</span>
                  </Button>
                  <Button variant="outline" size="sm" className="bg-honey text-jet">
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-chevron-right"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                    <span className="sr-only">Página siguiente</span>
                  </Button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium">
      {children}
    </label>
  )
}
