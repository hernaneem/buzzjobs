"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button-custom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card-custom"
import { Badge } from "@/components/ui/badge-custom"
import { Input } from "@/components/ui/input-custom"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select-custom"
import {
  Briefcase,
  Search,
  MapPin,
  Calendar,
  Users,
  Eye,
  TrendingUp,
  TrendingDown,
  Edit,
  MoreHorizontal,
  ChevronLeft,
  XCircle,
  CheckCircle,
  Clock,
  Download,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EmployerJobs() {
  // Usuario de ejemplo
  const user = {
    name: "María Rodríguez",
    role: "employer",
  }

  const [activeTab, setActiveTab] = useState("active")
  const [activeActionMenu, setActiveActionMenu] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  // Datos de ejemplo para empleos
  const jobs = [
    {
      id: "1",
      title: "Desarrollador Frontend",
      location: "Ciudad de México, México",
      applicants: 12,
      views: 145,
      postedAt: "2023-05-15",
      expiresAt: "2023-06-15",
      status: "active",
      isNew: true,
      isUrgent: false,
      isRemote: true,
      conversionRate: 8.3,
      trend: "up",
      salary: {
        min: 25000,
        max: 35000,
        currency: "MXN",
        period: "month",
      },
      department: "Tecnología",
      company: "TechMex Solutions",
      logo: "/abstract-tm.png",
      description:
        "Buscamos un desarrollador frontend con experiencia en React y TypeScript para unirse a nuestro equipo.",
      requirements: ["React", "TypeScript", "CSS", "HTML", "JavaScript"],
      benefits: ["Seguro médico", "Horario flexible", "Home office", "Capacitación continua"],
      applications: {
        new: 3,
        screening: 5,
        interview: 2,
        offer: 1,
        rejected: 1,
      },
    },
    {
      id: "2",
      title: "Diseñador UX/UI",
      location: "Guadalajara, México",
      applicants: 8,
      views: 98,
      postedAt: "2023-05-10",
      expiresAt: "2023-06-10",
      status: "active",
      isNew: false,
      isUrgent: true,
      isRemote: false,
      conversionRate: 8.2,
      trend: "stable",
      salary: {
        min: 20000,
        max: 30000,
        currency: "MXN",
        period: "month",
      },
      department: "Diseño",
      company: "CreativeMX",
      logo: "/abstract-geometric-cm.png",
      description: "Estamos buscando un diseñador UX/UI con experiencia en Figma y Adobe XD.",
      requirements: ["Figma", "Adobe XD", "Sketch", "UI Design", "UX Research"],
      benefits: ["Seguro médico", "Horario flexible", "Oficina en zona premium", "Eventos de equipo"],
      applications: {
        new: 2,
        screening: 3,
        interview: 2,
        offer: 0,
        rejected: 1,
      },
    },
    {
      id: "3",
      title: "Product Manager",
      location: "Monterrey, México",
      applicants: 3,
      views: 67,
      postedAt: "2023-05-12",
      expiresAt: "2023-06-12",
      status: "active",
      isNew: false,
      isUrgent: false,
      isRemote: true,
      conversionRate: 4.5,
      trend: "down",
      salary: {
        min: 35000,
        max: 50000,
        currency: "MXN",
        period: "month",
      },
      department: "Producto",
      company: "InnovaMX",
      logo: "/abstract-geometric-IM.png",
      description: "Buscamos un Product Manager con experiencia en desarrollo de productos digitales.",
      requirements: ["Agile", "Scrum", "Product Development", "Market Research", "Data Analysis"],
      benefits: ["Seguro médico", "Horario flexible", "Home office", "Bonos por desempeño"],
      applications: {
        new: 1,
        screening: 1,
        interview: 1,
        offer: 0,
        rejected: 0,
      },
    },
    {
      id: "4",
      title: "Desarrollador Backend",
      location: "Ciudad de México, México",
      applicants: 5,
      views: 78,
      postedAt: "2023-05-05",
      expiresAt: "2023-06-05",
      status: "paused",
      isNew: false,
      isUrgent: false,
      isRemote: true,
      conversionRate: 6.4,
      trend: "stable",
      salary: {
        min: 28000,
        max: 40000,
        currency: "MXN",
        period: "month",
      },
      department: "Tecnología",
      company: "TechMex Solutions",
      logo: "/abstract-tm.png",
      description: "Buscamos un desarrollador backend con experiencia en Node.js y bases de datos.",
      requirements: ["Node.js", "Express", "MongoDB", "SQL", "API Design"],
      benefits: ["Seguro médico", "Horario flexible", "Home office", "Capacitación continua"],
      applications: {
        new: 1,
        screening: 2,
        interview: 1,
        offer: 0,
        rejected: 1,
      },
    },
    {
      id: "5",
      title: "Especialista en Marketing Digital",
      location: "Querétaro, México",
      applicants: 7,
      views: 112,
      postedAt: "2023-04-28",
      expiresAt: "2023-05-28",
      status: "expired",
      isNew: false,
      isUrgent: false,
      isRemote: false,
      conversionRate: 6.2,
      trend: "up",
      salary: {
        min: 18000,
        max: 25000,
        currency: "MXN",
        period: "month",
      },
      department: "Marketing",
      company: "MarketMX",
      logo: "/abstract-mm.png",
      description: "Buscamos un especialista en marketing digital con experiencia en redes sociales y SEO.",
      requirements: ["SEO", "SEM", "Google Analytics", "Social Media", "Content Marketing"],
      benefits: ["Seguro médico", "Horario flexible", "Oficina céntrica", "Capacitación continua"],
      applications: {
        new: 0,
        screening: 3,
        interview: 2,
        offer: 1,
        rejected: 1,
      },
    },
  ]

  // Filtrar empleos según el estado seleccionado y la búsqueda
  const filteredJobs = jobs.filter((job) => {
    // Filtrar por estado
    if (filterStatus !== "all" && job.status !== filterStatus) {
      return false
    }

    // Filtrar por búsqueda
    if (
      searchQuery &&
      !job.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !job.location.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !job.department.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    return true
  })

  // Ordenar empleos
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
    } else if (sortBy === "applicants") {
      return b.applicants - a.applicants
    } else if (sortBy === "views") {
      return b.views - a.views
    } else if (sortBy === "conversion") {
      return b.conversionRate - a.conversionRate
    }
    return 0
  })

  // Formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("es-MX", { day: "numeric", month: "short", year: "numeric" }).format(date)
  }

  // Calcular días restantes
  const calculateDaysLeft = (expiresAt: string) => {
    const today = new Date()
    const expireDate = new Date(expiresAt)
    const diffTime = expireDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  // Obtener empleos según la pestaña activa
  const getTabJobs = () => {
    if (activeTab === "active") {
      return sortedJobs.filter((job) => job.status === "active")
    } else if (activeTab === "paused") {
      return sortedJobs.filter((job) => job.status === "paused")
    } else if (activeTab === "expired") {
      return sortedJobs.filter((job) => job.status === "expired")
    } else if (activeTab === "draft") {
      return sortedJobs.filter((job) => job.status === "draft")
    }
    return sortedJobs
  }

  const tabJobs = getTabJobs()

  // Estadísticas generales
  const stats = {
    active: jobs.filter((job) => job.status === "active").length,
    paused: jobs.filter((job) => job.status === "paused").length,
    expired: jobs.filter((job) => job.status === "expired").length,
    draft: jobs.filter((job) => job.status === "draft").length,
    totalApplicants: jobs.reduce((sum, job) => sum + job.applicants, 0),
    totalViews: jobs.reduce((sum, job) => sum + job.views, 0),
    avgConversion: jobs.length
      ? (jobs.reduce((sum, job) => sum + job.conversionRate, 0) / jobs.length).toFixed(1)
      : "0",
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} />

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Mis Empleos</h1>
              <p className="text-muted-foreground">Gestiona tus vacantes y analiza su rendimiento</p>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/employer/dashboard">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Dashboard
                </Link>
              </Button>
              <Button asChild>
                <Link href="/employer/post-job">
                  <Briefcase className="h-4 w-4 mr-1" />
                  Publicar empleo
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Empleos activos</p>
                    <p className="text-2xl font-bold">{stats.active}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-honey" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Total de aplicantes</p>
                    <p className="text-2xl font-bold">{stats.totalApplicants}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <Users className="h-5 w-5 text-honey" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Vistas totales</p>
                    <p className="text-2xl font-bold">{stats.totalViews}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <Eye className="h-5 w-5 text-honey" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Conversión promedio</p>
                    <p className="text-2xl font-bold">{stats.avgConversion}%</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-honey" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por título, ubicación o departamento..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="active">Activos</SelectItem>
                  <SelectItem value="paused">Pausados</SelectItem>
                  <SelectItem value="expired">Expirados</SelectItem>
                  <SelectItem value="draft">Borradores</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Más recientes</SelectItem>
                  <SelectItem value="applicants">Más aplicantes</SelectItem>
                  <SelectItem value="views">Más vistas</SelectItem>
                  <SelectItem value="conversion">Mayor conversión</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
                <span className="sr-only">Exportar datos</span>
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 md:w-auto md:inline-flex">
              <TabsTrigger value="active">
                Activos{" "}
                <Badge variant="outline" className="ml-2">
                  {stats.active}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="paused">
                Pausados{" "}
                <Badge variant="outline" className="ml-2">
                  {stats.paused}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="expired">
                Expirados{" "}
                <Badge variant="outline" className="ml-2">
                  {stats.expired}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="draft">
                Borradores{" "}
                <Badge variant="outline" className="ml-2">
                  {stats.draft}
                </Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Empleos Activos</CardTitle>
                </CardHeader>
                <CardContent>
                  {tabJobs.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                      {tabJobs.map((job) => (
                        <div key={job.id} className="border rounded-xl p-4 bg-background">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-md bg-muted overflow-hidden flex-shrink-0">
                                {job.logo ? (
                                  <img
                                    src={job.logo || "/placeholder.svg"}
                                    alt={job.company}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <Briefcase className="w-6 h-6 m-3 text-muted-foreground" />
                                )}
                              </div>
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h3 className="font-bold text-lg">{job.title}</h3>
                                  <div className="flex gap-1 flex-wrap">
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
                                      <TrendingUp className="h-4 w-4 mr-2" />
                                      Ver estadísticas
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
                              <span className="font-medium">{formatDate(job.postedAt)}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm text-muted-foreground">Expira</span>
                              <span className="font-medium">
                                {calculateDaysLeft(job.expiresAt) > 0
                                  ? `${calculateDaysLeft(job.expiresAt)} días`
                                  : "Expirado"}
                              </span>
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Progreso de candidatos:</span>
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center">
                                    <div className="w-2 h-2 rounded-full bg-honey mr-1"></div>
                                    <span className="text-xs">{job.applications.new}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <div className="w-2 h-2 rounded-full bg-amber-400 mr-1"></div>
                                    <span className="text-xs">{job.applications.screening}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <div className="w-2 h-2 rounded-full bg-amber-500 mr-1"></div>
                                    <span className="text-xs">{job.applications.interview}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                                    <span className="text-xs">{job.applications.offer}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                                    <span className="text-xs">{job.applications.rejected}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" asChild>
                                  <Link href={`/employer/jobs/${job.id}/edit`}>
                                    <Edit className="h-4 w-4 mr-1" />
                                    Editar
                                  </Link>
                                </Button>
                                <Button variant="outline" size="sm" asChild>
                                  <Link href={`/employer/jobs/${job.id}/candidates`}>
                                    <Users className="h-4 w-4 mr-1" />
                                    Ver candidatos ({job.applicants})
                                  </Link>
                                </Button>
                                <Button variant="outline" size="sm" asChild>
                                  <Link href={`/employer/jobs/${job.id}/statistics`}>
                                    <TrendingUp className="h-4 w-4 mr-1" />
                                    Estadísticas
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
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

            <TabsContent value="paused" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Empleos Pausados</CardTitle>
                </CardHeader>
                <CardContent>
                  {tabJobs.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                      {tabJobs.map((job) => (
                        <div key={job.id} className="border rounded-xl p-4 bg-background">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-md bg-muted overflow-hidden flex-shrink-0">
                                {job.logo ? (
                                  <img
                                    src={job.logo || "/placeholder.svg"}
                                    alt={job.company}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <Briefcase className="w-6 h-6 m-3 text-muted-foreground" />
                                )}
                              </div>
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h3 className="font-bold text-lg">{job.title}</h3>
                                  <Badge variant="outline" className="bg-muted">
                                    Pausado
                                  </Badge>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <MapPin className="mr-1 h-4 w-4" />
                                  {job.location}
                                </div>
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
                                  <DropdownMenuItem
                                    onClick={() => {
                                      // In a real implementation, this would call an API to resume the job
                                      alert(`Empleo ${job.id} reactivado`)
                                      setActiveActionMenu(null)
                                    }}
                                  >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Reactivar empleo
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                            <div className="flex flex-col">
                              <span className="text-sm text-muted-foreground">Aplicaciones</span>
                              <span className="font-medium">{job.applicants}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm text-muted-foreground">Vistas</span>
                              <span className="font-medium">{job.views}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm text-muted-foreground">Publicado</span>
                              <span className="font-medium">{formatDate(job.postedAt)}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm text-muted-foreground">Pausado el</span>
                              <span className="font-medium">{formatDate(new Date().toISOString())}</span>
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/employer/jobs/${job.id}/edit`}>
                                  <Edit className="h-4 w-4 mr-1" />
                                  Editar
                                </Link>
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  alert(`Empleo ${job.id} reactivado`)
                                }}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Reactivar
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
                        <Clock className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">No tienes empleos pausados</h3>
                      <p className="text-muted-foreground mb-4">
                        Los empleos pausados no son visibles para los candidatos
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="expired" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Empleos Expirados</CardTitle>
                </CardHeader>
                <CardContent>
                  {tabJobs.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                      {tabJobs.map((job) => (
                        <div key={job.id} className="border rounded-xl p-4 bg-background">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-md bg-muted overflow-hidden flex-shrink-0">
                                {job.logo ? (
                                  <img
                                    src={job.logo || "/placeholder.svg"}
                                    alt={job.company}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <Briefcase className="w-6 h-6 m-3 text-muted-foreground" />
                                )}
                              </div>
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h3 className="font-bold text-lg">{job.title}</h3>
                                  <Badge variant="outline" className="bg-muted">
                                    Expirado
                                  </Badge>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <MapPin className="mr-1 h-4 w-4" />
                                  {job.location}
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  alert(`Empleo ${job.id} renovado por 30 días`)
                                }}
                              >
                                <Clock className="h-4 w-4 mr-1" />
                                Renovar
                              </Button>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                            <div className="flex flex-col">
                              <span className="text-sm text-muted-foreground">Aplicaciones</span>
                              <span className="font-medium">{job.applicants}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm text-muted-foreground">Vistas</span>
                              <span className="font-medium">{job.views}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm text-muted-foreground">Publicado</span>
                              <span className="font-medium">{formatDate(job.postedAt)}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm text-muted-foreground">Expirado el</span>
                              <span className="font-medium">{formatDate(job.expiresAt)}</span>
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t">
                            <div className="flex justify-between items-center">
                              <div className="text-sm text-muted-foreground">
                                Este empleo ya no es visible para los candidatos
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" asChild>
                                  <Link href={`/employer/jobs/${job.id}/statistics`}>
                                    <TrendingUp className="h-4 w-4 mr-1" />
                                    Estadísticas
                                  </Link>
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    alert(`Empleo ${job.id} renovado por 30 días`)
                                  }}
                                >
                                  Renovar
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
                        <Calendar className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">No tienes empleos expirados</h3>
                      <p className="text-muted-foreground mb-4">
                        Los empleos expirados ya no son visibles para los candidatos
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="draft" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Borradores</CardTitle>
                </CardHeader>
                <CardContent>
                  {tabJobs.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                      {tabJobs.map((job) => (
                        <div key={job.id} className="border rounded-xl p-4 bg-background">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-md bg-muted overflow-hidden flex-shrink-0">
                                <Briefcase className="w-6 h-6 m-3 text-muted-foreground" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h3 className="font-bold text-lg">{job.title || "Empleo sin título"}</h3>
                                  <Badge variant="outline" className="bg-muted">
                                    Borrador
                                  </Badge>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Calendar className="mr-1 h-4 w-4" />
                                  Última modificación: {formatDate(job.postedAt)}
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/employer/jobs/${job.id}/edit`}>
                                  <Edit className="h-4 w-4 mr-1" />
                                  Continuar editando
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
                        <Edit className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">No tienes borradores</h3>
                      <p className="text-muted-foreground mb-4">
                        Los borradores te permiten preparar empleos antes de publicarlos
                      </p>
                      <Button asChild>
                        <Link href="/employer/post-job">Crear borrador</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
