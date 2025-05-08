"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button-custom"
import { Card, CardContent } from "@/components/ui/card-custom"
import { Badge } from "@/components/ui/badge-custom"
import { Input } from "@/components/ui/input-custom"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  Search,
  Filter,
  Users,
  Calendar,
  Clock,
  MoreHorizontal,
  Mail,
  Phone,
  FileText,
  Star,
  Loader2,
  MapPin,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select-custom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type CandidateStatus = "new" | "screening" | "interview" | "offer" | "hired" | "rejected"

interface Candidate {
  id: string
  name: string
  position: string
  status: CandidateStatus
  appliedAt: string
  lastUpdated: string
  skills: string[]
  avatar?: string
  email: string
  phone: string
  location: string
  experience: string
  education: string
  resumeUrl?: string
  coverLetter?: string
  rating?: number
  notes?: string
}

export default function JobCandidatesPage({ params }: { params: { id: string } }) {
  // Usuario de ejemplo
  const user = {
    name: "María Rodríguez",
    role: "employer",
  }

  // Estado para la búsqueda y filtros
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<CandidateStatus | "all">("all")
  const [viewMode, setViewMode] = useState<"list" | "kanban">("kanban")
  const [isLoading, setIsLoading] = useState(true)

  // Estado para el candidato seleccionado
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)

  // Estado para las notas
  const [notes, setNotes] = useState<Record<string, string>>({})

  // Estado para los ratings
  const [ratings, setRatings] = useState<Record<string, number>>({})

  // Estado para el drag and drop
  const [draggedCandidate, setDraggedCandidate] = useState<string | null>(null)
  const [dragOverColumn, setDragOverColumn] = useState<CandidateStatus | null>(null)

  // Datos de ejemplo para el trabajo
  const [job, setJob] = useState({
    id: params.id,
    title: "Desarrollador Frontend",
    company: "TechCorp",
    location: "Madrid, España",
    postedAt: "15 mayo, 2023",
    applicants: 12,
    views: 145,
  })

  // Datos de ejemplo para candidatos
  const [candidates, setCandidates] = useState<Candidate[]>([])

  // Simular carga de datos
  useEffect(() => {
    setTimeout(() => {
      setCandidates([
        {
          id: "1",
          name: "Carlos Méndez",
          position: "Desarrollador Frontend",
          status: "screening",
          appliedAt: "Hace 2 días",
          lastUpdated: "Ayer",
          skills: ["React", "JavaScript", "TypeScript", "CSS", "HTML"],
          avatar: "/placeholder.svg?height=40&width=40",
          email: "carlos@example.com",
          phone: "+34 612 345 678",
          location: "Madrid, España",
          experience: "3 años",
          education: "Grado en Ingeniería Informática",
          resumeUrl: "#",
          coverLetter:
            "Me interesa mucho la posición de Desarrollador Frontend en TechCorp. Tengo experiencia trabajando con React y TypeScript en proyectos de comercio electrónico y aplicaciones web.",
          rating: 4,
          notes: "Buena experiencia técnica. Programar segunda entrevista.",
        },
        {
          id: "2",
          name: "Laura Sánchez",
          position: "Desarrollador Frontend",
          status: "interview",
          appliedAt: "Hace 5 días",
          lastUpdated: "Hace 1 día",
          skills: ["React", "JavaScript", "CSS", "Tailwind", "Next.js"],
          avatar: "/placeholder.svg?height=40&width=40",
          email: "laura@example.com",
          phone: "+34 623 456 789",
          location: "Barcelona, España",
          experience: "4 años",
          education: "Bootcamp de Desarrollo Web",
          resumeUrl: "#",
          coverLetter:
            "Estoy muy interesada en unirme a TechCorp como Desarrolladora Frontend. Tengo experiencia en React y Next.js, y me encantaría aplicar mis habilidades en su empresa.",
          rating: 5,
          notes: "Excelente candidata. Experiencia relevante y buena comunicación.",
        },
        {
          id: "3",
          name: "Javier García",
          position: "Desarrollador Frontend",
          status: "new",
          appliedAt: "Hace 1 día",
          lastUpdated: "Hace 1 día",
          skills: ["React", "TypeScript", "Tailwind CSS", "Redux"],
          avatar: "/placeholder.svg?height=40&width=40",
          email: "javier@example.com",
          phone: "+34 634 567 890",
          location: "Valencia, España",
          experience: "2 años",
          education: "Grado en Ingeniería del Software",
          resumeUrl: "#",
          coverLetter:
            "Me gustaría aplicar para la posición de Desarrollador Frontend. Tengo experiencia con React y TypeScript, y estoy buscando nuevos desafíos profesionales.",
        },
        {
          id: "4",
          name: "Ana Martínez",
          position: "Desarrollador Frontend",
          status: "offer",
          appliedAt: "Hace 1 semana",
          lastUpdated: "Hace 2 días",
          skills: ["React", "JavaScript", "CSS", "HTML", "UI/UX"],
          avatar: "/placeholder.svg?height=40&width=40",
          email: "ana@example.com",
          phone: "+34 645 678 901",
          location: "Madrid, España",
          experience: "5 años",
          education: "Máster en Desarrollo Web",
          resumeUrl: "#",
          coverLetter:
            "Con 5 años de experiencia en desarrollo frontend, estoy interesada en unirme a TechCorp para contribuir con mis habilidades en React y diseño UI/UX.",
          rating: 5,
          notes: "Candidata excepcional. Preparar oferta competitiva.",
        },
        {
          id: "5",
          name: "Miguel Torres",
          position: "Desarrollador Frontend",
          status: "rejected",
          appliedAt: "Hace 2 semanas",
          lastUpdated: "Hace 3 días",
          skills: ["Angular", "JavaScript", "CSS"],
          avatar: "/placeholder.svg?height=40&width=40",
          email: "miguel@example.com",
          phone: "+34 656 789 012",
          location: "Sevilla, España",
          experience: "3 años",
          education: "Grado en Informática",
          resumeUrl: "#",
          rating: 2,
          notes: "No tiene experiencia con React. Perfil más orientado a Angular.",
        },
        {
          id: "6",
          name: "Elena Gómez",
          position: "Desarrollador Frontend",
          status: "hired",
          appliedAt: "Hace 3 semanas",
          lastUpdated: "Hace 1 semana",
          skills: ["React", "TypeScript", "Next.js", "Node.js"],
          avatar: "/placeholder.svg?height=40&width=40",
          email: "elena@example.com",
          phone: "+34 667 890 123",
          location: "Madrid, España",
          experience: "4 años",
          education: "Grado en Ingeniería Informática",
          resumeUrl: "#",
          rating: 5,
          notes: "Contratada. Fecha de inicio: 1 de junio.",
        },
      ])
      setIsLoading(false)
    }, 1000)
  }, [params.id])

  // Filtrar candidatos
  const filteredCandidates = candidates.filter((candidate) => {
    // Filtro por término de búsqueda
    if (
      searchTerm &&
      !candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !candidate.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    ) {
      return false
    }

    // Filtro por estado
    if (statusFilter !== "all" && candidate.status !== statusFilter) {
      return false
    }

    return true
  })

  // Agrupar candidatos por estado para la vista Kanban
  const groupedCandidates: Record<CandidateStatus, Candidate[]> = {
    new: [],
    screening: [],
    interview: [],
    offer: [],
    hired: [],
    rejected: [],
  }

  filteredCandidates.forEach((candidate) => {
    groupedCandidates[candidate.status].push(candidate)
  })

  const getStatusLabel = (status: CandidateStatus): string => {
    switch (status) {
      case "new":
        return "Nuevo"
      case "screening":
        return "Preselección"
      case "interview":
        return "Entrevista"
      case "offer":
        return "Oferta"
      case "hired":
        return "Contratado"
      case "rejected":
        return "Rechazado"
      default:
        return status
    }
  }

  const getStatusVariant = (status: CandidateStatus) => {
    switch (status) {
      case "new":
        return "secondary"
      case "screening":
        return "secondary"
      case "interview":
        return "default"
      case "offer":
        return "default"
      case "hired":
        return "new"
      case "rejected":
        return "outline"
      default:
        return "outline"
    }
  }

  const handleUpdateStatus = (candidateId: string, newStatus: CandidateStatus) => {
    // Actualizar el estado del candidato
    setCandidates(
      candidates.map((candidate) => (candidate.id === candidateId ? { ...candidate, status: newStatus } : candidate)),
    )
  }

  const handleSaveNotes = (candidateId: string) => {
    // Guardar las notas del candidato
    console.log(`Saving notes for candidate ${candidateId}: ${notes[candidateId]}`)
  }

  const handleUpdateRating = (candidateId: string, rating: number) => {
    setRatings({
      ...ratings,
      [candidateId]: rating,
    })
  }

  // Funciones para drag and drop
  const handleDragStart = (candidateId: string) => {
    setDraggedCandidate(candidateId)
  }

  const handleDragOver = (e: React.DragEvent, status: CandidateStatus) => {
    e.preventDefault()
    setDragOverColumn(status)
  }

  const handleDragLeave = () => {
    setDragOverColumn(null)
  }

  const handleDrop = (e: React.DragEvent, status: CandidateStatus) => {
    e.preventDefault()

    if (draggedCandidate) {
      handleUpdateStatus(draggedCandidate, status)
      setDraggedCandidate(null)
      setDragOverColumn(null)
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar user={user} />
        <main className="flex-1 py-8">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center h-[60vh]">
              <Loader2 className="h-12 w-12 animate-spin text-honey" />
              <p className="mt-4 text-muted-foreground">Cargando candidatos...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} />

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <Link
              href="/employer/dashboard"
              className="text-sm text-muted-foreground hover:text-honey flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Volver al dashboard
            </Link>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4">
              <div>
                <h1 className="text-3xl font-bold">Candidatos para {job.title}</h1>
                <p className="text-muted-foreground">
                  {job.applicants} candidatos • Publicado el {job.postedAt}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Buscar candidatos"
                    className="pl-10 w-[200px] md:w-[300px]"
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
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as CandidateStatus | "all")}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="new">Nuevos</SelectItem>
                  <SelectItem value="screening">Preselección</SelectItem>
                  <SelectItem value="interview">Entrevista</SelectItem>
                  <SelectItem value="offer">Oferta</SelectItem>
                  <SelectItem value="hired">Contratados</SelectItem>
                  <SelectItem value="rejected">Rechazados</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {viewMode === "list" ? (
            // Vista de lista
            <div className="space-y-4">
              {filteredCandidates.map((candidate) => (
                <Card key={candidate.id} className="overflow-hidden transition-shadow hover:shadow-medium">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col gap-4">
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
                            <h3 className="font-bold">{candidate.name}</h3>
                            <p className="text-sm text-muted-foreground">{candidate.position}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
                          <Badge variant={getStatusVariant(candidate.status)}>{getStatusLabel(candidate.status)}</Badge>

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
                              <DropdownMenuItem onClick={() => setSelectedCandidate(candidate)}>
                                Ver perfil
                              </DropdownMenuItem>
                              <DropdownMenuItem>Enviar mensaje</DropdownMenuItem>
                              <DropdownMenuItem>Programar entrevista</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuLabel>Cambiar estado</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleUpdateStatus(candidate.id, "screening")}>
                                Mover a Preselección
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUpdateStatus(candidate.id, "interview")}>
                                Mover a Entrevista
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUpdateStatus(candidate.id, "offer")}>
                                Mover a Oferta
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUpdateStatus(candidate.id, "hired")}>
                                Mover a Contratado
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => handleUpdateStatus(candidate.id, "rejected")}
                              >
                                Rechazar candidato
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <span className="truncate">Aplicó {candidate.appliedAt}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <span className="truncate">Actualizado {candidate.lastUpdated}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          {candidate.rating ? (
                            <div className="flex items-center">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 flex-shrink-0 ${
                                    i < (ratings[candidate.id] || candidate.rating || 0)
                                      ? "text-honey fill-honey"
                                      : "text-muted-foreground"
                                  }`}
                                  onClick={() => handleUpdateRating(candidate.id, i + 1)}
                                />
                              ))}
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <span className="text-muted-foreground mr-2 truncate">Sin valoración</span>
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className="h-4 w-4 flex-shrink-0 text-muted-foreground"
                                  onClick={() => handleUpdateRating(candidate.id, i + 1)}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {candidate.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="bg-muted">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex flex-wrap justify-end gap-2 mt-2 pt-4 border-t">
                        <Button variant="outline" size="sm" onClick={() => setSelectedCandidate(candidate)}>
                          Ver perfil
                        </Button>
                        <Button size="sm">Contactar</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            // Vista Kanban
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-6">
              {(["new", "screening", "interview", "offer", "hired", "rejected"] as CandidateStatus[]).map((status) => (
                <div
                  key={status}
                  className={`min-w-[280px] ${dragOverColumn === status ? "ring-2 ring-honey" : ""}`}
                  onDragOver={(e) => handleDragOver(e, status)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, status)}
                >
                  <div className="bg-muted p-3 rounded-t-md">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{getStatusLabel(status)}</h3>
                      <Badge variant="outline">{groupedCandidates[status].length}</Badge>
                    </div>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-b-md min-h-[70vh] max-h-[70vh] overflow-y-auto">
                    <div className="space-y-3">
                      {groupedCandidates[status].length > 0 ? (
                        groupedCandidates[status].map((candidate) => (
                          <Card
                            key={candidate.id}
                            className={`overflow-hidden transition-shadow hover:shadow-medium cursor-move ${
                              draggedCandidate === candidate.id ? "opacity-50" : ""
                            }`}
                            draggable
                            onDragStart={() => handleDragStart(candidate.id)}
                          >
                            <CardContent className="p-3">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-8 h-8 rounded-full bg-muted overflow-hidden flex-shrink-0">
                                  {candidate.avatar ? (
                                    <img
                                      src={candidate.avatar || "/placeholder.svg"}
                                      alt={candidate.name}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <Users className="w-4 h-4 m-2 text-muted-foreground" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-sm truncate">{candidate.name}</h4>
                                  <p className="text-xs text-muted-foreground truncate">{candidate.position}</p>
                                </div>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 flex-shrink-0">
                                      <MoreHorizontal className="h-3 w-3" />
                                      <span className="sr-only">Acciones</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => setSelectedCandidate(candidate)}>
                                      Ver perfil
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>Contactar</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuLabel>Mover a</DropdownMenuLabel>
                                    {status !== "new" && (
                                      <DropdownMenuItem onClick={() => handleUpdateStatus(candidate.id, "new")}>
                                        Nuevo
                                      </DropdownMenuItem>
                                    )}
                                    {status !== "screening" && (
                                      <DropdownMenuItem onClick={() => handleUpdateStatus(candidate.id, "screening")}>
                                        Preselección
                                      </DropdownMenuItem>
                                    )}
                                    {status !== "interview" && (
                                      <DropdownMenuItem onClick={() => handleUpdateStatus(candidate.id, "interview")}>
                                        Entrevista
                                      </DropdownMenuItem>
                                    )}
                                    {status !== "offer" && (
                                      <DropdownMenuItem onClick={() => handleUpdateStatus(candidate.id, "offer")}>
                                        Oferta
                                      </DropdownMenuItem>
                                    )}
                                    {status !== "hired" && (
                                      <DropdownMenuItem onClick={() => handleUpdateStatus(candidate.id, "hired")}>
                                        Contratado
                                      </DropdownMenuItem>
                                    )}
                                    {status !== "rejected" && (
                                      <DropdownMenuItem
                                        className="text-destructive"
                                        onClick={() => handleUpdateStatus(candidate.id, "rejected")}
                                      >
                                        Rechazar
                                      </DropdownMenuItem>
                                    )}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>

                              <div className="flex flex-wrap gap-1 mt-2">
                                {candidate.skills.slice(0, 2).map((skill) => (
                                  <Badge key={skill} variant="outline" className="bg-muted text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                                {candidate.skills.length > 2 && (
                                  <Badge variant="outline" className="bg-muted text-xs">
                                    +{candidate.skills.length - 2}
                                  </Badge>
                                )}
                              </div>

                              <div className="flex items-center justify-between text-xs mt-2">
                                <span className="text-muted-foreground truncate">{candidate.appliedAt}</span>
                                <div className="flex flex-shrink-0">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-3 w-3 ${
                                        i < (ratings[candidate.id] || candidate.rating || 0)
                                          ? "text-honey fill-honey"
                                          : "text-muted-foreground"
                                      }`}
                                      onClick={() => handleUpdateRating(candidate.id, i + 1)}
                                    />
                                  ))}
                                </div>
                              </div>

                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full mt-2 text-xs h-7"
                                onClick={() => setSelectedCandidate(candidate)}
                              >
                                Ver perfil
                              </Button>
                            </CardContent>
                          </Card>
                        ))
                      ) : (
                        <div className="flex flex-col items-center justify-center py-6 text-center">
                          <p className="text-sm text-muted-foreground mb-2">No hay candidatos</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modal de perfil de candidato */}
      {selectedCandidate && (
        <Dialog open={!!selectedCandidate} onOpenChange={(open) => !open && setSelectedCandidate(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Perfil del candidato</DialogTitle>
              <DialogDescription>Información detallada sobre {selectedCandidate.name}</DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
              {/* Columna izquierda - Información personal */}
              <div className="space-y-4">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-muted overflow-hidden mb-4">
                    {selectedCandidate.avatar ? (
                      <img
                        src={selectedCandidate.avatar || "/placeholder.svg"}
                        alt={selectedCandidate.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Users className="w-12 h-12 m-6 text-muted-foreground" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold">{selectedCandidate.name}</h3>
                  <p className="text-muted-foreground">{selectedCandidate.position}</p>

                  <div className="flex mt-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < (ratings[selectedCandidate.id] || selectedCandidate.rating || 0)
                            ? "text-honey fill-honey"
                            : "text-muted-foreground"
                        }`}
                        onClick={() => handleUpdateRating(selectedCandidate.id, i + 1)}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedCandidate.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedCandidate.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedCandidate.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Aplicó {selectedCandidate.appliedAt}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Habilidades</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedCandidate.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="bg-muted">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Experiencia</h4>
                  <p className="text-sm">{selectedCandidate.experience}</p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Educación</h4>
                  <p className="text-sm">{selectedCandidate.education}</p>
                </div>

                {selectedCandidate.resumeUrl && (
                  <div className="space-y-3">
                    <h4 className="font-medium">Currículum</h4>
                    <Button variant="outline" size="sm" className="w-full gap-2" asChild>
                      <a href={selectedCandidate.resumeUrl} target="_blank" rel="noopener noreferrer">
                        <FileText className="h-4 w-4" />
                        Ver currículum
                      </a>
                    </Button>
                  </div>
                )}
              </div>

              {/* Columnas central y derecha - mantenidas como están pero con mejor espaciado */}
              <div className="space-y-4 lg:col-span-2">
                <Tabs defaultValue="profile" className="space-y-4">
                  <TabsList className="w-full flex overflow-x-auto">
                    <TabsTrigger value="profile" className="flex-1">
                      Perfil
                    </TabsTrigger>
                    <TabsTrigger value="resume" className="flex-1">
                      Currículum
                    </TabsTrigger>
                    <TabsTrigger value="cover-letter" className="flex-1">
                      Carta de presentación
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="profile" className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Estado actual</h4>
                      <Select
                        value={selectedCandidate.status}
                        onValueChange={(value) => handleUpdateStatus(selectedCandidate.id, value as CandidateStatus)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">Nuevo</SelectItem>
                          <SelectItem value="screening">Preselección</SelectItem>
                          <SelectItem value="interview">Entrevista</SelectItem>
                          <SelectItem value="offer">Oferta</SelectItem>
                          <SelectItem value="hired">Contratado</SelectItem>
                          <SelectItem value="rejected">Rechazado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Notas</h4>
                      <Textarea
                        placeholder="Añade notas sobre este candidato..."
                        className="min-h-[150px]"
                        value={notes[selectedCandidate.id] || selectedCandidate.notes || ""}
                        onChange={(e) => setNotes({ ...notes, [selectedCandidate.id]: e.target.value })}
                      />
                      <Button size="sm" onClick={() => handleSaveNotes(selectedCandidate.id)}>
                        Guardar notas
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="resume">
                    {selectedCandidate.resumeUrl ? (
                      <iframe src={selectedCandidate.resumeUrl} className="w-full h-[60vh]" title="Currículum" />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-[60vh]">
                        <FileText className="h-12 w-12 text-muted-foreground" />
                        <p className="mt-4 text-muted-foreground">No hay currículum disponible</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="cover-letter">
                    {selectedCandidate.coverLetter ? (
                      <div className="p-4 bg-muted/30 rounded-md text-sm h-[60vh] overflow-y-auto">
                        <p>{selectedCandidate.coverLetter}</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-[60vh]">
                        <FileText className="h-12 w-12 text-muted-foreground" />
                        <p className="mt-4 text-muted-foreground">No hay carta de presentación disponible</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setSelectedCandidate(null)}>
                Cerrar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <Footer />
    </div>
  )
}
