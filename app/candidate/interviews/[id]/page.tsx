"use client"

import { Button } from "@/components/ui/button-custom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card-custom"
import { Badge } from "@/components/ui/badge-custom"
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Building2,
  Video,
  Phone,
  Users,
  ExternalLink,
  Download,
} from "lucide-react"
import Link from "next/link"

export default function InterviewDetailPage({ params }: { params: { id: string } }) {
  // Datos de ejemplo para la entrevista
  const interview = {
    id: params.id,
    jobTitle: "Desarrollador Frontend",
    company: "TechCorp",
    companyLogo: "/placeholder.svg?height=80&width=80",
    date: "28 mayo, 2023",
    time: "10:00 - 11:00",
    type: "video" as const,
    status: "scheduled" as const,
    interviewers: [
      {
        name: "Ana García",
        position: "Gerente de Tecnología",
        photo: "/diverse-group.png",
      },
      {
        name: "Pedro Sánchez",
        position: "Desarrollador Senior",
        photo: "/diverse-group.png",
      },
    ],
    location: "Zoom",
    meetingLink: "https://zoom.us/j/123456789",
    meetingId: "123 456 789",
    meetingPassword: "123456",
    notes: "Prepárate para discutir proyectos anteriores y resolver problemas técnicos en vivo.",
    applicationId: "1",
    agenda: [
      { time: "10:00 - 10:10", activity: "Introducción y presentaciones" },
      { time: "10:10 - 10:30", activity: "Discusión sobre experiencia y proyectos anteriores" },
      { time: "10:30 - 10:50", activity: "Ejercicio técnico en vivo" },
      { time: "10:50 - 11:00", activity: "Preguntas y cierre" },
    ],
    preparationTips: [
      "Revisa los conceptos básicos de React y JavaScript",
      "Prepara ejemplos de proyectos anteriores",
      "Ten listo tu entorno de desarrollo para posibles ejercicios prácticos",
      "Prepara preguntas sobre la empresa y el puesto",
    ],
    documents: [
      { name: "Descripción del puesto.pdf", url: "#" },
      { name: "Información sobre la entrevista.pdf", url: "#" },
    ],
  }

  const getInterviewTypeIcon = (type: "video" | "phone" | "in-person") => {
    switch (type) {
      case "video":
        return <Video className="h-5 w-5 text-honey" />
      case "phone":
        return <Phone className="h-5 w-5 text-honey" />
      case "in-person":
        return <Users className="h-5 w-5 text-honey" />
    }
  }

  const getInterviewTypeLabel = (type: "video" | "phone" | "in-person") => {
    switch (type) {
      case "video":
        return "Entrevista por video"
      case "phone":
        return "Entrevista telefónica"
      case "in-person":
        return "Entrevista presencial"
    }
  }

  return (
    <div className="py-8">
      <div className="container px-4 md:px-6">
        <div className="mb-8">
          <Link
            href="/candidate/interviews"
            className="text-sm text-muted-foreground hover:text-honey flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Volver a entrevistas
          </Link>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
                {interview.companyLogo ? (
                  <img
                    src={interview.companyLogo || "/placeholder.svg"}
                    alt={`${interview.company} logo`}
                    className="w-12 h-12 object-contain"
                  />
                ) : (
                  <Building2 className="w-8 h-8 text-muted-foreground" />
                )}
              </div>
              <div>
                <div className="flex flex-wrap gap-2 mb-1">
                  <Badge variant={interview.status === "scheduled" ? "default" : "outline"}>
                    {interview.status === "scheduled" ? "Programada" : "Completada"}
                  </Badge>
                  <Badge variant="outline" className="bg-muted">
                    {getInterviewTypeLabel(interview.type)}
                  </Badge>
                </div>
                <h1 className="text-2xl font-bold">{interview.jobTitle}</h1>
                <p className="text-muted-foreground">{interview.company}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {interview.status === "scheduled" && (
                <>
                  <Button>Unirse a la entrevista</Button>
                  <Button variant="outline">Reprogramar</Button>
                  <Button variant="outline" className="text-destructive hover:text-destructive">
                    Cancelar
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Columna principal */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detalles de la entrevista</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-honey" />
                    <div>
                      <p className="font-medium">Fecha</p>
                      <p className="text-sm text-muted-foreground">{interview.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-honey" />
                    <div>
                      <p className="font-medium">Hora</p>
                      <p className="text-sm text-muted-foreground">{interview.time}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-honey" />
                  <div>
                    <p className="font-medium">Ubicación</p>
                    <p className="text-sm text-muted-foreground">{interview.location}</p>
                  </div>
                </div>

                {interview.type === "video" && interview.meetingLink && (
                  <div className="p-4 bg-muted/30 rounded-md space-y-2">
                    <h3 className="font-medium">Información de acceso</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Enlace: </span>
                        <a
                          href={interview.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-honey hover:underline flex items-center"
                        >
                          Abrir enlace <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                      {interview.meetingId && (
                        <div>
                          <span className="text-muted-foreground">ID: </span>
                          <span>{interview.meetingId}</span>
                        </div>
                      )}
                      {interview.meetingPassword && (
                        <div>
                          <span className="text-muted-foreground">Contraseña: </span>
                          <span>{interview.meetingPassword}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="font-medium mb-2">Entrevistadores</h3>
                  <div className="space-y-3">
                    {interview.interviewers.map((interviewer, index) => (
                      <div key={index} className="flex items-center gap-3">
                        {interviewer.photo ? (
                          <img
                            src={interviewer.photo || "/placeholder.svg"}
                            alt={interviewer.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                            <Users className="h-5 w-5 text-muted-foreground" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium">{interviewer.name}</p>
                          <p className="text-sm text-muted-foreground">{interviewer.position}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {interview.notes && (
                  <div>
                    <h3 className="font-medium mb-2">Notas</h3>
                    <p className="text-sm text-muted-foreground">{interview.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Agenda</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {interview.agenda.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-24 text-sm font-medium">{item.time}</div>
                      <div className="flex-1">
                        <p>{item.activity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Columna lateral */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preparación</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Consejos para la entrevista</h3>
                    <ul className="text-sm space-y-2">
                      {interview.preparationTips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-honey">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {interview.documents.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-2">Documentos</h3>
                      <div className="space-y-2">
                        {interview.documents.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                            <span className="text-sm">{doc.name}</span>
                            <Button variant="ghost" size="sm" asChild>
                              <a href={doc.url} download>
                                <Download className="h-4 w-4" />
                                <span className="sr-only">Descargar</span>
                              </a>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Acciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" asChild>
                  <Link href={`/candidate/applications/${interview.applicationId}`}>Ver aplicación</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/jobs/${interview.applicationId}`}>Ver oferta de empleo</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/companies/${interview.company.toLowerCase()}`}>Ver perfil de la empresa</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
