"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button-custom"
import { Card, CardContent } from "@/components/ui/card-custom"
import { Badge } from "@/components/ui/badge-custom"
import { ArrowLeft, Calendar, Clock, MapPin, Building2, Video, Phone, Users } from "lucide-react"
import Link from "next/link"

export default function InterviewsPage() {
  // Usuario de ejemplo
  const user = {
    name: "Carlos Méndez",
    role: "candidate",
  }

  const [filter, setFilter] = useState<"upcoming" | "past" | "all">("upcoming")

  // Datos de ejemplo para entrevistas
  const interviews = [
    {
      id: "1",
      jobTitle: "Desarrollador Frontend",
      company: "TechCorp",
      companyLogo: "/placeholder.svg?height=40&width=40",
      date: "28 mayo, 2023",
      time: "10:00 - 11:00",
      type: "video" as const,
      status: "scheduled" as const,
      interviewers: ["Ana García (Gerente de Tecnología)", "Pedro Sánchez (Desarrollador Senior)"],
      location: "Zoom",
      notes: "Prepárate para discutir proyectos anteriores y resolver problemas técnicos en vivo.",
      applicationId: "1",
    },
    {
      id: "2",
      jobTitle: "UX/UI Designer",
      company: "DesignStudio",
      companyLogo: "/placeholder.svg?height=40&width=40",
      date: "30 mayo, 2023",
      time: "15:00 - 16:30",
      type: "in-person" as const,
      status: "scheduled" as const,
      interviewers: ["Laura Martínez (Directora de Diseño)"],
      location: "Oficinas de DesignStudio, Madrid",
      notes: "Trae tu portafolio y prepárate para presentar tus proyectos más relevantes.",
      applicationId: "2",
    },
    {
      id: "3",
      jobTitle: "Frontend Developer",
      company: "WebTech",
      companyLogo: "/placeholder.svg?height=40&width=40",
      date: "15 abril, 2023",
      time: "11:00 - 12:00",
      type: "phone" as const,
      status: "completed" as const,
      interviewers: ["Carlos Ruiz (Recursos Humanos)"],
      location: "Llamada telefónica",
      notes: "Entrevista inicial para conocer tu experiencia y expectativas.",
      applicationId: "4",
    },
  ]

  const filteredInterviews = interviews.filter((interview) => {
    const interviewDate = new Date(interview.date.split(" ").reverse().join("-"))
    const today = new Date()

    if (filter === "upcoming") {
      return interviewDate >= today && interview.status === "scheduled"
    } else if (filter === "past") {
      return interviewDate < today || interview.status === "completed"
    }

    return true
  })

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
            href="/candidate/dashboard"
            className="text-sm text-muted-foreground hover:text-honey flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Volver al dashboard
          </Link>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4">
            <div>
              <h1 className="text-3xl font-bold">Mis entrevistas</h1>
              <p className="text-muted-foreground">Gestiona tus entrevistas programadas</p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={filter === "upcoming" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("upcoming")}
              >
                Próximas
              </Button>
              <Button variant={filter === "past" ? "default" : "outline"} size="sm" onClick={() => setFilter("past")}>
                Pasadas
              </Button>
              <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
                Todas
              </Button>
            </div>
          </div>
        </div>

        {filteredInterviews.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredInterviews.map((interview) => (
              <Card key={interview.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
                        {interview.companyLogo ? (
                          <img
                            src={interview.companyLogo || "/placeholder.svg"}
                            alt={`${interview.company} logo`}
                            className="w-10 h-10 object-contain"
                          />
                        ) : (
                          <Building2 className="w-6 h-6 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold">{interview.jobTitle}</h3>
                        <p className="text-sm text-muted-foreground">{interview.company}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant={interview.status === "scheduled" ? "default" : "outline"}>
                        {interview.status === "scheduled" ? "Programada" : "Completada"}
                      </Badge>
                      <Badge variant="outline" className="bg-muted">
                        {getInterviewTypeLabel(interview.type)}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{interview.date}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{interview.time}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{interview.location}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">Entrevistadores:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {interview.interviewers.map((interviewer, index) => (
                        <li key={index}>{interviewer}</li>
                      ))}
                    </ul>
                  </div>

                  {interview.notes && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Notas:</h4>
                      <p className="text-sm text-muted-foreground">{interview.notes}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mt-4">
                    <Button asChild>
                      <Link href={`/candidate/interviews/${interview.id}`}>Ver detalles</Link>
                    </Button>
                    {interview.status === "scheduled" && (
                      <>
                        <Button variant="outline">Reprogramar</Button>
                        <Button variant="outline" className="text-destructive hover:text-destructive">
                          Cancelar
                        </Button>
                      </>
                    )}
                    <Button variant="outline" asChild>
                      <Link href={`/candidate/applications/${interview.applicationId}`}>Ver aplicación</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-muted/30">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">
                No hay entrevistas {filter === "upcoming" ? "programadas" : filter === "past" ? "pasadas" : ""}
              </h3>
              <p className="text-muted-foreground text-center mb-6 max-w-md">
                {filter === "upcoming"
                  ? "Aún no tienes entrevistas programadas. Sigue aplicando a empleos para conseguir entrevistas."
                  : filter === "past"
                    ? "No tienes entrevistas pasadas."
                    : "No tienes ninguna entrevista."}
              </p>
              <Button asChild>
                <Link href="/job-feed">Explorar empleos</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
