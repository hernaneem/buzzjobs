"use client"

import { Button } from "@/components/ui/button-custom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card-custom"
import { Badge } from "@/components/ui/badge-custom"
import { ArrowLeft, Building2, Calendar, Clock, MapPin, FileText, Download } from "lucide-react"
import Link from "next/link"

export default function ApplicationDetailPage({ params }: { params: { id: string } }) {
  // Datos de ejemplo para la aplicación
  const application = {
    id: params.id,
    jobTitle: "Desarrollador Frontend",
    company: "TechCorp",
    companyLogo: "/placeholder.svg?height=80&width=80",
    location: "Madrid, España",
    salary: "40.000€ - 50.000€",
    appliedDate: "15 mayo, 2023",
    status: "interview" as const,
    lastUpdated: "Hace 2 días",
    jobId: "1",
    resume: "curriculum_carlos_mendez.pdf",
    coverLetter:
      "Estimado equipo de TechCorp, me dirijo a ustedes para expresar mi interés en la posición de Desarrollador Frontend...",
    answers: [
      {
        question: "¿Cuántos años de experiencia tienes con React?",
        answer: "Tengo 3 años de experiencia trabajando con React en proyectos profesionales.",
      },
      {
        question: "¿Has trabajado con TypeScript?",
        answer:
          "Sí, he utilizado TypeScript en mis últimos 2 proyectos y estoy familiarizado con sus características principales.",
      },
      {
        question: "¿Estás disponible para trabajar presencialmente en Madrid?",
        answer: "Sí, actualmente resido en Madrid y estoy disponible para trabajar presencialmente.",
      },
    ],
    timeline: [
      {
        date: "15 mayo, 2023",
        status: "applied",
        description: "Aplicación enviada",
      },
      {
        date: "18 mayo, 2023",
        status: "screening",
        description: "Aplicación en revisión",
      },
      {
        date: "20 mayo, 2023",
        status: "interview",
        description: "Entrevista programada para el 28 de mayo",
      },
    ],
    interviews: [
      {
        id: "1",
        date: "28 mayo, 2023",
        time: "10:00 - 11:00",
        type: "video",
        status: "scheduled",
      },
    ],
    notes: "Preparar ejemplos de proyectos anteriores para la entrevista.",
  }

  const getStatusLabel = (status: string): string => {
    switch (status) {
      case "applied":
        return "Aplicado"
      case "screening":
        return "Preselección"
      case "interview":
        return "Entrevista"
      case "offer":
        return "Oferta"
      case "rejected":
        return "Rechazado"
      case "withdrawn":
        return "Retirado"
      default:
        return status
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "applied":
        return "secondary"
      case "screening":
        return "secondary"
      case "interview":
        return "default"
      case "offer":
        return "new"
      case "rejected":
        return "outline"
      case "withdrawn":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="py-8">
      <div className="container px-4 md:px-6">
        <div className="mb-8">
          <Link
            href="/candidate/applications"
            className="text-sm text-muted-foreground hover:text-honey flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Volver a aplicaciones
          </Link>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
                {application.companyLogo ? (
                  <img
                    src={application.companyLogo || "/placeholder.svg"}
                    alt={`${application.company} logo`}
                    className="w-12 h-12 object-contain"
                  />
                ) : (
                  <Building2 className="w-8 h-8 text-muted-foreground" />
                )}
              </div>
              <div>
                <div className="flex flex-wrap gap-2 mb-1">
                  <Badge variant={getStatusVariant(application.status)}>{getStatusLabel(application.status)}</Badge>
                </div>
                <h1 className="text-2xl font-bold">{application.jobTitle}</h1>
                <p className="text-muted-foreground">{application.company}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" asChild>
                <Link href={`/jobs/${application.jobId}`}>Ver oferta</Link>
              </Button>
              {application.status !== "withdrawn" && application.status !== "rejected" && (
                <Button variant="outline" className="text-destructive hover:text-destructive">
                  Retirar aplicación
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Columna principal */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detalles de la aplicación</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-honey" />
                    <div>
                      <p className="font-medium">Fecha de aplicación</p>
                      <p className="text-sm text-muted-foreground">{application.appliedDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-honey" />
                    <div>
                      <p className="font-medium">Última actualización</p>
                      <p className="text-sm text-muted-foreground">{application.lastUpdated}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-honey" />
                  <div>
                    <p className="font-medium">Ubicación</p>
                    <p className="text-sm text-muted-foreground">{application.location}</p>
                  </div>
                </div>

                {application.resume && (
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-honey" />
                      <span>{application.resume}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Descargar CV</span>
                    </Button>
                  </div>
                )}

                {application.coverLetter && (
                  <div>
                    <h3 className="font-medium mb-2">Carta de presentación</h3>
                    <div className="p-3 bg-muted/30 rounded-md text-sm">
                      <p>{application.coverLetter}</p>
                    </div>
                  </div>
                )}

                {application.answers.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-2">Preguntas adicionales</h3>
                    <div className="space-y-3">
                      {application.answers.map((qa, index) => (
                        <div key={index} className="p-3 bg-muted/30 rounded-md">
                          <p className="font-medium text-sm">{qa.question}</p>
                          <p className="text-sm mt-1">{qa.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {application.notes && (
                  <div>
                    <h3 className="font-medium mb-2">Mis notas</h3>
                    <div className="p-3 bg-muted/30 rounded-md text-sm">
                      <p>{application.notes}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {application.interviews.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Entrevistas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {application.interviews.map((interview, index) => (
                      <div key={index} className="p-4 border rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">
                            {interview.type === "video"
                              ? "Entrevista por video"
                              : interview.type === "phone"
                                ? "Entrevista telefónica"
                                : "Entrevista presencial"}
                          </h3>
                          <Badge variant={interview.status === "scheduled" ? "default" : "outline"}>
                            {interview.status === "scheduled" ? "Programada" : "Completada"}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{interview.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{interview.time}</span>
                          </div>
                        </div>
                        <div className="mt-3">
                          <Button asChild>
                            <Link href={`/candidate/interviews/${interview.id}`}>Ver detalles</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Columna lateral */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Estado de la aplicación</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {application.timeline.map((event, index) => (
                    <div key={index} className="relative pl-6">
                      {index < application.timeline.length - 1 && (
                        <div className="absolute left-[0.6rem] top-2 h-full w-0.5 bg-muted-foreground/20"></div>
                      )}
                      <div className="flex items-start gap-2">
                        <div
                          className={`w-3 h-3 rounded-full mt-1 ${
                            index === application.timeline.length - 1 ? "bg-honey" : "bg-muted-foreground/50"
                          }`}
                        ></div>
                        <div>
                          <p className="font-medium">{getStatusLabel(event.status)}</p>
                          <p className="text-sm text-muted-foreground">{event.date}</p>
                          <p className="text-sm">{event.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Acciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" asChild>
                  <Link href={`/jobs/${application.jobId}`}>Ver oferta de empleo</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/companies/${application.company.toLowerCase()}`}>Ver perfil de la empresa</Link>
                </Button>
                {application.status === "interview" && (
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/candidate/interviews/${application.interviews[0].id}`}>
                      Ver detalles de entrevista
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
