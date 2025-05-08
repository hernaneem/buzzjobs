"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button-custom"
import { Badge } from "@/components/ui/badge-custom"
import { Card, CardContent } from "@/components/ui/card-custom"
import {
  Bookmark,
  MapPin,
  Building2,
  DollarSign,
  Clock,
  Briefcase,
  GraduationCap,
  Users,
  Globe,
  Heart,
  Share2,
  CheckCircle,
  AlertCircle,
  Calendar,
  Eye,
} from "lucide-react"
import Link from "next/link"
import { CompanyCard } from "@/components/ui/company-card"

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const [isSaved, setIsSaved] = useState(false)
  const [isInterested, setIsInterested] = useState(false)
  const [activeTab, setActiveTab] = useState<"description" | "company" | "benefits">("description")

  // Datos de ejemplo para el trabajo
  const job = {
    id: params.id,
    title: "Desarrollador Frontend",
    company: "TechCorp",
    companyId: "techcorp",
    companyLogo: "/placeholder.svg?height=80&width=80",
    location: "Madrid, España",
    salary: "40.000€ - 50.000€",
    tags: ["React", "JavaScript", "TypeScript", "CSS", "HTML", "Tailwind"],
    isNew: true,
    isRemote: true,
    postedAt: "Hace 2 días",
    expiresAt: "30 de junio, 2023",
    applicants: 12,
    views: 145,
    description: `
      <p>TechCorp está buscando un Desarrollador Frontend con experiencia en React para unirse a nuestro equipo de producto. El candidato ideal tiene pasión por crear interfaces de usuario excepcionales y experiencia trabajando en aplicaciones web modernas.</p>
      
      <h3>Responsabilidades:</h3>
      <ul>
        <li>Desarrollar y mantener aplicaciones web utilizando React y TypeScript</li>
        <li>Colaborar con diseñadores UX/UI para implementar diseños y mejorar la experiencia del usuario</li>
        <li>Escribir código limpio, mantenible y bien documentado</li>
        <li>Participar en revisiones de código y compartir conocimientos con el equipo</li>
        <li>Optimizar aplicaciones para máximo rendimiento y escalabilidad</li>
      </ul>
      
      <h3>Requisitos:</h3>
      <ul>
        <li>Al menos 3 años de experiencia en desarrollo frontend</li>
        <li>Experiencia sólida con React, JavaScript/TypeScript y HTML/CSS</li>
        <li>Familiaridad con herramientas modernas de desarrollo web (Webpack, Babel, etc.)</li>
        <li>Conocimiento de metodologías de diseño responsive y principios de UX</li>
        <li>Experiencia con control de versiones Git</li>
        <li>Capacidad para trabajar en equipo y comunicarse efectivamente</li>
      </ul>
    `,
    benefits: [
      "Salario competitivo",
      "Horario flexible y opción de trabajo remoto",
      "Seguro médico privado",
      "Presupuesto para formación y desarrollo profesional",
      "Ambiente de trabajo colaborativo y dinámico",
      "25 días de vacaciones al año",
      "Eventos de equipo y actividades sociales",
      "Oficina moderna con snacks y bebidas gratuitas",
    ],
    companyInfo: {
      id: "techcorp",
      name: "TechCorp",
      description:
        "TechCorp es una empresa líder en desarrollo de software con más de 10 años de experiencia en el sector. Nos especializamos en crear soluciones tecnológicas innovadoras para empresas de todos los tamaños.",
      size: "50-100 empleados",
      industry: "Tecnología",
      website: "https://techcorp.example.com",
      founded: "2012",
      jobCount: 5,
      logo: "/placeholder.svg?height=80&width=80",
      location: "Madrid, España",
    },
    similarJobs: [
      {
        id: "101",
        title: "Frontend Developer",
        company: "WebTech",
        location: "Remoto",
        salary: "45.000€ - 55.000€",
        tags: ["React", "TypeScript", "Next.js"],
        isNew: true,
        postedAt: "Hace 1 día",
        companyLogo: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "102",
        title: "React Developer",
        company: "AppStudio",
        location: "Madrid, España",
        salary: "42.000€ - 52.000€",
        tags: ["React", "Redux", "JavaScript"],
        isRemote: true,
        postedAt: "Hace 3 días",
        companyLogo: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "103",
        title: "Frontend Engineer",
        company: "TechInnovate",
        location: "Barcelona, España",
        salary: "48.000€ - 58.000€",
        tags: ["React", "TypeScript", "CSS"],
        isUrgent: true,
        postedAt: "Hace 2 días",
        companyLogo: "/placeholder.svg?height=40&width=40",
      },
    ],
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
  }

  const handleInterested = () => {
    setIsInterested(!isInterested)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${job.title} en ${job.company}`,
        text: `Echa un vistazo a esta oferta de trabajo: ${job.title} en ${job.company}`,
        url: window.location.href,
      })
    } else {
      // Fallback para navegadores que no soportan Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert("Enlace copiado al portapapeles")
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/jobs" className="hover:text-honey">
              Empleos
            </Link>
            <span>/</span>
            <span>{job.title}</span>
          </div>

          {/* Header del empleo */}
          <div className="bg-background p-6 rounded-xl border shadow-soft mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
                  {job.companyLogo ? (
                    <img
                      src={job.companyLogo || "/placeholder.svg"}
                      alt={`${job.company} logo`}
                      className="w-12 h-12 object-contain"
                    />
                  ) : (
                    <Building2 className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <div className="flex flex-wrap gap-2 mb-1">
                    {job.isNew && <Badge variant="new">Nuevo</Badge>}
                    {job.isRemote && <Badge variant="remote">Remoto</Badge>}
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold">{job.title}</h1>
                  <Link href={`/companies/${job.companyId}`} className="text-muted-foreground hover:text-honey">
                    {job.company}
                  </Link>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                <Button variant={isSaved ? "default" : "outline"} size="sm" className="gap-1" onClick={handleSave}>
                  <Bookmark className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
                  {isSaved ? "Guardado" : "Guardar"}
                </Button>
                <Button
                  variant={isInterested ? "default" : "outline"}
                  size="sm"
                  className="gap-1"
                  onClick={handleInterested}
                >
                  <Heart className={`h-4 w-4 ${isInterested ? "fill-current" : ""}`} />
                  {isInterested ? "Interesado" : "Me interesa"}
                </Button>
                <Button variant="outline" size="sm" className="gap-1" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                  Compartir
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="flex items-center text-sm">
                <MapPin className="mr-2 h-4 w-4 text-honey" />
                <span>{job.location}</span>
              </div>

              <div className="flex items-center text-sm">
                <DollarSign className="mr-2 h-4 w-4 text-honey" />
                <span>{job.salary}</span>
              </div>

              <div className="flex items-center text-sm">
                <Clock className="mr-2 h-4 w-4 text-honey" />
                <span>Publicado {job.postedAt}</span>
              </div>

              <div className="flex items-center text-sm">
                <Calendar className="mr-2 h-4 w-4 text-honey" />
                <span>Expira el {job.expiresAt}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {job.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="bg-muted">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t">
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Users className="mr-1 h-4 w-4" />
                  <span>{job.applicants} aplicantes</span>
                </div>
                <div className="flex items-center">
                  <Eye className="mr-1 h-4 w-4" />
                  <span>{job.views} vistas</span>
                </div>
              </div>

              <Button size="lg" asChild>
                <Link href={`/job-application/${job.id}`}>Aplicar ahora</Link>
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Contenido principal */}
            <div className="w-full md:w-2/3 space-y-6">
              {/* Tabs de navegación */}
              <div className="border-b">
                <div className="flex space-x-6">
                  <button
                    onClick={() => setActiveTab("description")}
                    className={`py-3 border-b-2 font-medium ${
                      activeTab === "description" ? "border-honey text-honey" : "border-transparent"
                    }`}
                  >
                    Descripción
                  </button>
                  <button
                    onClick={() => setActiveTab("company")}
                    className={`py-3 border-b-2 font-medium ${
                      activeTab === "company" ? "border-honey text-honey" : "border-transparent"
                    }`}
                  >
                    Empresa
                  </button>
                  <button
                    onClick={() => setActiveTab("benefits")}
                    className={`py-3 border-b-2 font-medium ${
                      activeTab === "benefits" ? "border-honey text-honey" : "border-transparent"
                    }`}
                  >
                    Beneficios
                  </button>
                </div>
              </div>

              {/* Contenido de las tabs */}
              {activeTab === "description" && (
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: job.description }} />
              )}

              {activeTab === "company" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
                      {job.companyInfo.logo ? (
                        <img
                          src={job.companyInfo.logo || "/placeholder.svg"}
                          alt={`${job.companyInfo.name} logo`}
                          className="w-12 h-12 object-contain"
                        />
                      ) : (
                        <Building2 className="w-8 h-8 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{job.companyInfo.name}</h2>
                      <p className="text-muted-foreground">{job.companyInfo.industry}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-honey" />
                      <span>{job.companyInfo.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-honey" />
                      <span>{job.companyInfo.size}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-honey" />
                      <span>Fundada en {job.companyInfo.founded}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-honey" />
                      <a
                        href={job.companyInfo.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-honey hover:underline"
                      >
                        {job.companyInfo.website.replace("https://", "")}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-honey" />
                      <span>{job.companyInfo.jobCount} empleos activos</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-2">Sobre la empresa</h3>
                    <p>{job.companyInfo.description}</p>
                  </div>

                  <Button variant="outline" className="mt-4" asChild>
                    <Link href={`/companies/${job.companyInfo.id}`}>Ver perfil completo</Link>
                  </Button>
                </div>
              )}

              {activeTab === "benefits" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Beneficios y ventajas</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {job.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-honey mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Empleos similares */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Empleos similares</h2>
                <div className="grid grid-cols-1 gap-4">
                  {job.similarJobs.map((similarJob) => (
                    <Card key={similarJob.id} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center">
                              {similarJob.companyLogo ? (
                                <img
                                  src={similarJob.companyLogo || "/placeholder.svg"}
                                  alt={`${similarJob.company} logo`}
                                  className="w-8 h-8 object-contain"
                                />
                              ) : (
                                <Building2 className="w-5 h-5 text-muted-foreground" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-bold">{similarJob.title}</h3>
                              <p className="text-sm text-muted-foreground">{similarJob.company}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="text-muted-foreground">
                            <Bookmark className="h-4 w-4" />
                            <span className="sr-only">Guardar empleo</span>
                          </Button>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-3">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <MapPin className="mr-1 h-3 w-3" />
                            {similarJob.location}
                          </div>

                          <div className="flex items-center text-xs text-muted-foreground">
                            <DollarSign className="mr-1 h-3 w-3" />
                            {similarJob.salary}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mt-2">
                          {similarJob.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="bg-muted text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <Button variant="outline" size="sm" className="w-full mt-3" asChild>
                          <Link href={`/jobs/${similarJob.id}`}>Ver detalles</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-full md:w-1/3 space-y-6">
              <div className="sticky top-20">
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Aplicar ahora</h3>
                    <Button className="w-full mb-4" asChild>
                      <Link href={`/job-application/${job.id}`}>Aplicar a este empleo</Link>
                    </Button>
                    <p className="text-sm text-muted-foreground mb-6">
                      El proceso de aplicación toma menos de 5 minutos y tu información está segura con nosotros.
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Briefcase className="h-5 w-5 text-honey mt-0.5" />
                        <div>
                          <h4 className="font-medium">Tipo de empleo</h4>
                          <p className="text-sm text-muted-foreground">Tiempo completo</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <GraduationCap className="h-5 w-5 text-honey mt-0.5" />
                        <div>
                          <h4 className="font-medium">Experiencia</h4>
                          <p className="text-sm text-muted-foreground">3+ años</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-honey mt-0.5" />
                        <div>
                          <h4 className="font-medium">Fecha límite</h4>
                          <p className="text-sm text-muted-foreground">{job.expiresAt}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t">
                      <div className="flex items-center gap-2 text-sm">
                        <AlertCircle className="h-4 w-4 text-honey" />
                        <span>
                          ¿Problema con esta oferta?{" "}
                          <a href="#" className="text-honey hover:underline">
                            Reportar
                          </a>
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden mt-6">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Sobre la empresa</h3>
                    <CompanyCard
                      id={job.companyInfo.id}
                      name={job.companyInfo.name}
                      logo={job.companyInfo.logo}
                      location={job.companyInfo.location}
                      industry={job.companyInfo.industry}
                      size={job.companyInfo.size}
                      jobCount={job.companyInfo.jobCount}
                      description={job.companyInfo.description}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
