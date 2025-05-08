import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button-custom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card-custom"
import { Badge } from "@/components/ui/badge-custom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  User,
  MapPin,
  Mail,
  Phone,
  Globe,
  FileText,
  Briefcase,
  GraduationCap,
  Calendar,
  Clock,
  Download,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"

export default function CandidateDetailPage({ params }: { params: { id: string } }) {
  // Usuario de ejemplo
  const user = {
    name: "María Rodríguez",
    role: "employer",
  }

  // Datos de ejemplo para el candidato
  const candidate = {
    id: params.id,
    name: "Carlos Méndez",
    title: "Desarrollador Frontend",
    location: "Madrid, España",
    email: "carlos@example.com",
    phone: "+34 612 345 678",
    website: "https://carlosmendez.example.com",
    about:
      "Desarrollador Frontend con 3 años de experiencia en React y TypeScript. Apasionado por crear interfaces de usuario intuitivas y accesibles. Busco oportunidades para crecer profesionalmente en un equipo colaborativo.",
    skills: ["React", "JavaScript", "TypeScript", "HTML", "CSS", "Tailwind CSS", "Next.js", "Redux"],
    experience: [
      {
        title: "Desarrollador Frontend",
        company: "TechCorp",
        location: "Madrid, España",
        startDate: "Junio 2021",
        endDate: "Presente",
        description:
          "Desarrollo de aplicaciones web utilizando React y TypeScript. Implementación de diseños UI/UX y optimización de rendimiento.",
      },
      {
        title: "Desarrollador Web Junior",
        company: "WebStudio",
        location: "Barcelona, España",
        startDate: "Enero 2020",
        endDate: "Mayo 2021",
        description: "Desarrollo de sitios web responsivos utilizando HTML, CSS y JavaScript.",
      },
    ],
    education: [
      {
        degree: "Grado en Ingeniería Informática",
        institution: "Universidad Politécnica de Madrid",
        location: "Madrid, España",
        startDate: "Septiembre 2016",
        endDate: "Junio 2020",
        description: "Especialización en desarrollo de software.",
      },
    ],
    application: {
      jobTitle: "Desarrollador Frontend",
      appliedAt: "15 mayo, 2023",
      status: "interview",
      coverLetter:
        "Estimado equipo de TechCorp, Me dirijo a ustedes con gran interés en la posición de Desarrollador Frontend. Con más de 3 años de experiencia en el desarrollo de aplicaciones web modernas utilizando React y TypeScript, creo que puedo aportar valor a su equipo...",
    },
    avatar: "/placeholder.svg?height=200&width=200",
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} />

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <Link
              href="/employer/candidates"
              className="text-sm text-muted-foreground hover:text-honey flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Volver a candidatos
            </Link>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-muted overflow-hidden">
                  {candidate.avatar ? (
                    <img
                      src={candidate.avatar || "/placeholder.svg"}
                      alt={candidate.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-8 h-8 m-4 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{candidate.name}</h1>
                  <p className="text-muted-foreground">{candidate.title}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={
                    candidate.application.status === "new"
                      ? "secondary"
                      : candidate.application.status === "screening"
                        ? "secondary"
                        : candidate.application.status === "interview"
                          ? "default"
                          : candidate.application.status === "offer"
                            ? "default"
                            : candidate.application.status === "hired"
                              ? "new"
                              : "outline"
                  }
                >
                  {candidate.application.status === "new"
                    ? "Nuevo"
                    : candidate.application.status === "screening"
                      ? "Preselección"
                      : candidate.application.status === "interview"
                        ? "Entrevista"
                        : candidate.application.status === "offer"
                          ? "Oferta"
                          : candidate.application.status === "hired"
                            ? "Contratado"
                            : "Rechazado"}
                </Badge>
                <Button variant="outline" size="sm" className="gap-1">
                  <Download className="h-4 w-4" />
                  CV
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <MessageSquare className="h-4 w-4" />
                  Contactar
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Información de contacto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-honey mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <h4 className="font-medium">Ubicación</h4>
                      <p className="text-sm text-muted-foreground truncate">{candidate.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-honey mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <h4 className="font-medium">Email</h4>
                      <p className="text-sm text-muted-foreground break-all">{candidate.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-honey mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <h4 className="font-medium">Teléfono</h4>
                      <p className="text-sm text-muted-foreground">{candidate.phone}</p>
                    </div>
                  </div>

                  {candidate.website && (
                    <div className="flex items-start gap-3">
                      <Globe className="h-5 w-5 text-honey mt-0.5 flex-shrink-0" />
                      <div className="min-w-0">
                        <h4 className="font-medium">Sitio web</h4>
                        <a
                          href={candidate.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-honey hover:underline truncate block"
                        >
                          {candidate.website.replace(/^https?:\/\//, "")}
                        </a>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Aplicación</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Briefcase className="h-5 w-5 text-honey mt-0.5" />
                    <div>
                      <h4 className="font-medium">Puesto</h4>
                      <p className="text-sm text-muted-foreground">{candidate.application.jobTitle}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-honey mt-0.5" />
                    <div>
                      <h4 className="font-medium">Fecha de aplicación</h4>
                      <p className="text-sm text-muted-foreground">{candidate.application.appliedAt}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t space-y-2">
                    <h4 className="font-medium">Cambiar estado</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm" className="w-full">
                        Preselección
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        Entrevista
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        Oferta
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        Contratar
                      </Button>
                    </div>
                    <Button variant="outline" size="sm" className="w-full text-destructive">
                      Rechazar
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Evaluación</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Habilidades técnicas</h4>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <ThumbsUp className="h-4 w-4 text-green-500" />
                        <span className="sr-only">Bueno</span>
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        <ThumbsDown className="h-4 w-4 text-red-500" />
                        <span className="sr-only">Malo</span>
                      </Button>
                      <span className="text-sm text-muted-foreground">Sin evaluar</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Comunicación</h4>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <ThumbsUp className="h-4 w-4 text-green-500" />
                        <span className="sr-only">Bueno</span>
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        <ThumbsDown className="h-4 w-4 text-red-500" />
                        <span className="sr-only">Malo</span>
                      </Button>
                      <span className="text-sm text-muted-foreground">Sin evaluar</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Experiencia relevante</h4>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <ThumbsUp className="h-4 w-4 text-green-500" />
                        <span className="sr-only">Bueno</span>
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        <ThumbsDown className="h-4 w-4 text-red-500" />
                        <span className="sr-only">Malo</span>
                      </Button>
                      <span className="text-sm text-muted-foreground">Sin evaluar</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <textarea
                      placeholder="Añadir notas sobre el candidato..."
                      className="w-full min-h-[100px] p-2 text-sm border rounded-md"
                    ></textarea>
                    <Button size="sm" className="mt-2 w-full">
                      Guardar notas
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main content */}
            <div className="md:col-span-2 space-y-6">
              <Tabs defaultValue="profile" className="space-y-6">
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

                <TabsContent value="profile" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Sobre mí</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{candidate.about}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Habilidades</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {candidate.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Experiencia</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {candidate.experience.map((exp, index) => (
                        <div key={index} className="border-b pb-6 last:border-b-0 last:pb-0">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                              <Briefcase className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div className="min-w-0">
                              <h3 className="font-bold text-lg">{exp.title}</h3>
                              <p className="text-muted-foreground">{exp.company}</p>
                              <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <MapPin className="mr-1 h-4 w-4 flex-shrink-0" />
                                <span className="truncate">{exp.location}</span>
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <Clock className="mr-1 h-4 w-4 flex-shrink-0" />
                                <span>
                                  {exp.startDate} - {exp.endDate}
                                </span>
                              </div>
                              <p className="mt-2">{exp.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Educación</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {candidate.education.map((edu, index) => (
                        <div key={index} className="border-b pb-6 last:border-b-0 last:pb-0">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                              <GraduationCap className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div>
                              <h3 className="font-bold text-lg">{edu.degree}</h3>
                              <p className="text-muted-foreground">{edu.institution}</p>
                              <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <MapPin className="mr-1 h-4 w-4" />
                                {edu.location}
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <Clock className="mr-1 h-4 w-4" />
                                {edu.startDate} - {edu.endDate}
                              </div>
                              <p className="mt-2">{edu.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="resume">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>Currículum</CardTitle>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Download className="h-4 w-4" />
                        Descargar CV
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-center p-12 border rounded-md bg-muted/30">
                        <div className="flex flex-col items-center gap-2">
                          <FileText className="h-12 w-12 text-muted-foreground" />
                          <p className="text-muted-foreground">Vista previa del CV no disponible</p>
                          <Button variant="outline" size="sm">
                            Descargar para ver
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="cover-letter">
                  <Card>
                    <CardHeader>
                      <CardTitle>Carta de presentación</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="p-6 border rounded-md bg-muted/30">
                        <p className="whitespace-pre-line">{candidate.application.coverLetter}</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
