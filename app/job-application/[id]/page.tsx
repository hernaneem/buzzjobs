"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button-custom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card-custom"
import { Input } from "@/components/ui/input-custom"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MultiStepProgress } from "@/components/ui/multi-step-progress"
import { BeeConfetti } from "@/components/bee-confetti"
import { ArrowLeft, ArrowRight, Check, FileText } from "lucide-react"
import Link from "next/link"

export default function JobApplicationPage({ params }: { params: { id: string } }) {
  // Usuario de ejemplo
  const user = {
    name: "Carlos Méndez",
    role: "candidate",
  }

  // Datos de ejemplo para el trabajo
  const job = {
    id: params.id,
    title: "Desarrollador Frontend",
    company: "TechCorp",
    companyLogo: "/placeholder.svg?height=80&width=80",
    location: "Madrid, España",
  }

  const [currentStep, setCurrentStep] = useState(1)
  const [showConfetti, setShowConfetti] = useState(false)

  // Estado para el formulario
  const [applicationData, setApplicationData] = useState({
    name: user.name,
    email: "carlos@example.com",
    phone: "+34 612 345 678",
    resume: null,
    coverLetter: "",
    portfolioUrl: "",
    additionalInfo: "",
  })

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: Implementar lógica de carga de CV
    console.log("Resume upload:", e.target.files?.[0])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Mostrar confeti al enviar la aplicación
    setShowConfetti(true)

    // TODO: conectar a Supabase más adelante
    console.log("Application data submitted:", applicationData)

    // Redirigir después de un breve retraso
    setTimeout(() => {
      // window.location.href = "/candidate/dashboard";
    }, 2000)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} />

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6 max-w-4xl">
          <div className="mb-8">
            <Link href={`/jobs/${job.id}`} className="text-sm text-muted-foreground hover:text-honey flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Volver a la oferta
            </Link>

            <h1 className="text-3xl font-bold mt-4">Aplicar a {job.title}</h1>
            <p className="text-muted-foreground">
              en <span className="font-medium">{job.company}</span> • {job.location}
            </p>
          </div>

          <MultiStepProgress steps={3} currentStep={currentStep} className="mb-8" />

          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Información personal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo *</Label>
                    <Input
                      id="name"
                      value={applicationData.name}
                      onChange={(e) => setApplicationData({ ...applicationData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={applicationData.email}
                        onChange={(e) => setApplicationData({ ...applicationData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono *</Label>
                      <Input
                        id="phone"
                        value={applicationData.phone}
                        onChange={(e) => setApplicationData({ ...applicationData, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="resume">Currículum *</Label>
                    <div className="border rounded-md p-4 bg-muted/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <span className="text-sm">
                            {applicationData.resume ? "curriculum.pdf" : "No hay currículum cargado"}
                          </span>
                        </div>

                        <label htmlFor="resume-upload" className="cursor-pointer text-sm text-honey hover:underline">
                          {applicationData.resume ? "Cambiar" : "Subir CV"}
                        </label>
                        <input
                          id="resume-upload"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={handleResumeUpload}
                          required={!applicationData.resume}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Formatos aceptados: PDF, DOC, DOCX. Tamaño máximo: 5MB
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Carta de presentación</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="cover-letter">Carta de presentación</Label>
                    <Textarea
                      id="cover-letter"
                      placeholder="Escribe una breve carta de presentación explicando por qué eres un buen candidato para este puesto"
                      className="min-h-[200px]"
                      value={applicationData.coverLetter}
                      onChange={(e) => setApplicationData({ ...applicationData, coverLetter: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      La carta de presentación es opcional pero recomendada. Ayuda a destacar entre otros candidatos.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="portfolio-url">URL de portafolio o LinkedIn</Label>
                    <Input
                      id="portfolio-url"
                      type="url"
                      placeholder="https://..."
                      value={applicationData.portfolioUrl}
                      onChange={(e) => setApplicationData({ ...applicationData, portfolioUrl: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Información adicional y envío</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="additional-info">Información adicional</Label>
                    <Textarea
                      id="additional-info"
                      placeholder="¿Hay algo más que quieras compartir con el empleador?"
                      className="min-h-[150px]"
                      value={applicationData.additionalInfo}
                      onChange={(e) => setApplicationData({ ...applicationData, additionalInfo: e.target.value })}
                    />
                  </div>

                  <div className="border rounded-md p-4 bg-muted/30">
                    <h3 className="font-medium mb-4">Resumen de la aplicación</h3>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium">Información personal</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                          <div>
                            <p className="text-xs text-muted-foreground">Nombre</p>
                            <p className="text-sm">{applicationData.name}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Email</p>
                            <p className="text-sm">{applicationData.email}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Teléfono</p>
                            <p className="text-sm">{applicationData.phone}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Currículum</p>
                            <p className="text-sm">{applicationData.resume ? "Cargado" : "No cargado"}</p>
                          </div>
                        </div>
                      </div>

                      {applicationData.coverLetter && (
                        <div>
                          <h4 className="text-sm font-medium">Carta de presentación</h4>
                          <p className="text-sm mt-2 line-clamp-3">{applicationData.coverLetter}</p>
                        </div>
                      )}

                      {applicationData.portfolioUrl && (
                        <div>
                          <h4 className="text-sm font-medium">Portafolio/LinkedIn</h4>
                          <p className="text-sm mt-2">{applicationData.portfolioUrl}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {showConfetti && <BeeConfetti count={10} />}
                </CardContent>
              </Card>
            )}

            <div className="flex justify-between mt-6">
              {currentStep > 1 ? (
                <Button type="button" variant="outline" onClick={handlePrevious} className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Anterior
                </Button>
              ) : (
                <div></div>
              )}

              {currentStep < 3 ? (
                <Button type="button" onClick={handleNext} className="gap-2">
                  Siguiente
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" className="gap-2">
                  <Check className="h-4 w-4" />
                  Enviar aplicación
                </Button>
              )}
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}
