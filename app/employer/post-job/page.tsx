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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select-custom"
import { TagChooser } from "@/components/ui/tag-chooser"
import { MultiStepProgress } from "@/components/ui/multi-step-progress"
import { BeeConfetti } from "@/components/bee-confetti"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ArrowRight, Check, Save } from "lucide-react"
import Link from "next/link"

export default function PostJobPage() {
  // Usuario de ejemplo
  const user = {
    name: "María Rodríguez",
    role: "employer",
  }

  const [currentStep, setCurrentStep] = useState(1)
  const [showConfetti, setShowConfetti] = useState(false)

  // Estado para el formulario
  const [jobData, setJobData] = useState({
    title: "",
    department: "",
    location: "",
    isRemote: false,
    type: "",
    experience: "",
    salary: {
      min: "",
      max: "",
      currency: "EUR",
      isVisible: true,
    },
    description: "",
    requirements: "",
    benefits: "",
    skills: [] as string[],
    applicationEmail: "",
    applicationUrl: "",
    isUrgent: false,
    isDraft: false,
  })

  const handleNext = () => {
    if (currentStep < 4) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Mostrar confeti al publicar
    if (currentStep === 4 && !jobData.isDraft) {
      setShowConfetti(true)
    }

    // TODO: conectar a Supabase más adelante
    console.log("Job data submitted:", jobData)

    // Redirigir después de un breve retraso
    setTimeout(() => {
      // window.location.href = "/employer/dashboard";
    }, 2000)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} />

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6 max-w-4xl">
          <div className="mb-8">
            <Link
              href="/employer/dashboard"
              className="text-sm text-muted-foreground hover:text-honey flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Volver al dashboard
            </Link>

            <h1 className="text-3xl font-bold mt-4">Publicar nuevo empleo</h1>
            <p className="text-muted-foreground">Completa la información para publicar tu oferta de empleo</p>
          </div>

          <MultiStepProgress steps={4} currentStep={currentStep} className="mb-8" />

          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Información básica</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título del puesto *</Label>
                    <Input
                      id="title"
                      placeholder="Ej. Desarrollador Frontend Senior"
                      value={jobData.title}
                      onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Departamento</Label>
                    <Input
                      id="department"
                      placeholder="Ej. Ingeniería, Marketing, Ventas"
                      value={jobData.department}
                      onChange={(e) => setJobData({ ...jobData, department: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Ubicación *</Label>
                      <Input
                        id="location"
                        placeholder="Ej. Madrid, España"
                        value={jobData.location}
                        onChange={(e) => setJobData({ ...jobData, location: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="block mb-2">Tipo de trabajo *</Label>
                      <Select
                        value={jobData.type}
                        onValueChange={(value) => setJobData({ ...jobData, type: value })}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">Tiempo completo</SelectItem>
                          <SelectItem value="part-time">Tiempo parcial</SelectItem>
                          <SelectItem value="contract">Contrato</SelectItem>
                          <SelectItem value="internship">Prácticas</SelectItem>
                          <SelectItem value="temporary">Temporal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="remote"
                      checked={jobData.isRemote}
                      onCheckedChange={(checked) => setJobData({ ...jobData, isRemote: checked })}
                    />
                    <Label htmlFor="remote">Este puesto permite trabajo remoto</Label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="block mb-2">Experiencia requerida *</Label>
                      <Select
                        value={jobData.experience}
                        onValueChange={(value) => setJobData({ ...jobData, experience: value })}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar experiencia" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="entry">Sin experiencia</SelectItem>
                          <SelectItem value="junior">1-2 años</SelectItem>
                          <SelectItem value="mid">3-5 años</SelectItem>
                          <SelectItem value="senior">5-7 años</SelectItem>
                          <SelectItem value="expert">8+ años</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Detalles del puesto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="description">Descripción del puesto *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe las responsabilidades y el día a día del puesto"
                      className="min-h-[150px]"
                      value={jobData.description}
                      onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="requirements">Requisitos *</Label>
                    <Textarea
                      id="requirements"
                      placeholder="Detalla los requisitos necesarios para el puesto"
                      className="min-h-[150px]"
                      value={jobData.requirements}
                      onChange={(e) => setJobData({ ...jobData, requirements: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="benefits">Beneficios</Label>
                    <Textarea
                      id="benefits"
                      placeholder="Describe los beneficios que ofrece tu empresa"
                      className="min-h-[150px]"
                      value={jobData.benefits}
                      onChange={(e) => setJobData({ ...jobData, benefits: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skills">Habilidades requeridas *</Label>
                    <TagChooser
                      tags={jobData.skills}
                      onChange={(tags) => setJobData({ ...jobData, skills: tags })}
                      placeholder="Añadir habilidad..."
                      suggestions={["JavaScript", "React", "Python", "UX/UI", "Marketing", "SEO", "Node.js"]}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Compensación y aplicación</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="salary-visible"
                        checked={jobData.salary.isVisible}
                        onCheckedChange={(checked) =>
                          setJobData({
                            ...jobData,
                            salary: { ...jobData.salary, isVisible: checked },
                          })
                        }
                      />
                      <Label htmlFor="salary-visible">Mostrar información de salario</Label>
                    </div>

                    {jobData.salary.isVisible && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="salary-min">Salario mínimo *</Label>
                          <Input
                            id="salary-min"
                            type="number"
                            placeholder="Ej. 30000"
                            value={jobData.salary.min}
                            onChange={(e) =>
                              setJobData({
                                ...jobData,
                                salary: { ...jobData.salary, min: e.target.value },
                              })
                            }
                            required={jobData.salary.isVisible}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="salary-max">Salario máximo *</Label>
                          <Input
                            id="salary-max"
                            type="number"
                            placeholder="Ej. 45000"
                            value={jobData.salary.max}
                            onChange={(e) =>
                              setJobData({
                                ...jobData,
                                salary: { ...jobData.salary, max: e.target.value },
                              })
                            }
                            required={jobData.salary.isVisible}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="block mb-2">Moneda *</Label>
                          <Select
                            value={jobData.salary.currency}
                            onValueChange={(value) =>
                              setJobData({
                                ...jobData,
                                salary: { ...jobData.salary, currency: value },
                              })
                            }
                            required={jobData.salary.isVisible}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar moneda" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="MXN">MXN - Peso mexicano</SelectItem>
                              <SelectItem value="USD">USD - Dólar estadounidense</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="application-email">Email para recibir aplicaciones *</Label>
                    <Input
                      id="application-email"
                      type="email"
                      placeholder="Ej. rrhh@tuempresa.com"
                      value={jobData.applicationEmail}
                      onChange={(e) => setJobData({ ...jobData, applicationEmail: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="application-url">URL de aplicación externa (opcional)</Label>
                    <Input
                      id="application-url"
                      type="url"
                      placeholder="Ej. https://tuempresa.com/careers/apply"
                      value={jobData.applicationUrl}
                      onChange={(e) => setJobData({ ...jobData, applicationUrl: e.target.value })}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="urgent"
                      checked={jobData.isUrgent}
                      onCheckedChange={(checked) =>
                        setJobData({
                          ...jobData,
                          isUrgent: checked as boolean,
                        })
                      }
                    />
                    <Label htmlFor="urgent">Marcar como contratación urgente</Label>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle>Revisar y publicar</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 bg-muted/30">
                      <h3 className="font-bold text-lg">{jobData.title || "Título del puesto"}</h3>
                      <p className="text-muted-foreground">{jobData.department || "Departamento"}</p>

                      <div className="flex flex-wrap gap-2 mt-2">
                        <div className="text-sm bg-muted px-2 py-1 rounded-md">{jobData.location || "Ubicación"}</div>
                        <div className="text-sm bg-muted px-2 py-1 rounded-md">
                          {jobData.type === "full-time"
                            ? "Tiempo completo"
                            : jobData.type === "part-time"
                              ? "Tiempo parcial"
                              : jobData.type === "contract"
                                ? "Contrato"
                                : jobData.type === "internship"
                                  ? "Prácticas"
                                  : jobData.type === "temporary"
                                    ? "Temporal"
                                    : "Tipo de trabajo"}
                        </div>
                        {jobData.isRemote && (
                          <div className="text-sm bg-honey text-jet px-2 py-1 rounded-md">Remoto</div>
                        )}
                        {jobData.isUrgent && (
                          <div className="text-sm bg-destructive text-destructive-foreground px-2 py-1 rounded-md">
                            Urgente
                          </div>
                        )}
                      </div>

                      {jobData.salary.isVisible && (
                        <div className="mt-2 text-sm">
                          <span className="font-medium">Salario: </span>
                          {jobData.salary.min && jobData.salary.max
                            ? `${jobData.salary.min} - ${jobData.salary.max} ${jobData.salary.currency}`
                            : "No especificado"}
                        </div>
                      )}

                      <div className="mt-4">
                        <h4 className="font-medium">Descripción</h4>
                        <p className="text-sm mt-1">{jobData.description || "No hay descripción disponible"}</p>
                      </div>

                      <div className="mt-4">
                        <h4 className="font-medium">Requisitos</h4>
                        <p className="text-sm mt-1">{jobData.requirements || "No hay requisitos disponibles"}</p>
                      </div>

                      {jobData.benefits && (
                        <div className="mt-4">
                          <h4 className="font-medium">Beneficios</h4>
                          <p className="text-sm mt-1">{jobData.benefits}</p>
                        </div>
                      )}

                      <div className="mt-4">
                        <h4 className="font-medium">Habilidades</h4>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {jobData.skills.length > 0 ? (
                            jobData.skills.map((skill) => (
                              <span key={skill} className="text-xs bg-muted px-2 py-1 rounded-md">
                                {skill}
                              </span>
                            ))
                          ) : (
                            <span className="text-sm text-muted-foreground">No hay habilidades especificadas</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="draft"
                      checked={jobData.isDraft}
                      onCheckedChange={(checked) =>
                        setJobData({
                          ...jobData,
                          isDraft: checked as boolean,
                        })
                      }
                    />
                    <Label htmlFor="draft">Guardar como borrador</Label>
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
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setJobData({ ...jobData, isDraft: true })
                    handleSubmit(new Event("submit") as any)
                  }}
                  className="gap-2"
                >
                  <Save className="h-4 w-4" />
                  Guardar borrador
                </Button>
              )}

              {currentStep < 4 ? (
                <Button type="button" onClick={handleNext} className="gap-2">
                  Siguiente
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" className="gap-2">
                  <Check className="h-4 w-4" />
                  {jobData.isDraft ? "Guardar borrador" : "Publicar empleo"}
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
