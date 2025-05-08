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
import { TagChooser } from "@/components/ui/tag-chooser"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Upload, Plus, Trash2, FileText, User, Briefcase, GraduationCap } from "lucide-react"
import Link from "next/link"

export default function CandidateProfilePage() {
  // Usuario de ejemplo
  const user = {
    name: "Carlos Méndez",
    role: "candidate",
  }

  const [profileProgress, setProfileProgress] = useState(80)

  // Estado para el formulario
  const [profileData, setProfileData] = useState({
    firstName: "Carlos",
    lastName: "Méndez",
    title: "Desarrollador Frontend",
    email: "carlos@example.com",
    phone: "+34 612 345 678",
    location: "Madrid, España",
    about:
      "Desarrollador Frontend con 3 años de experiencia en React y TypeScript. Apasionado por crear interfaces de usuario intuitivas y accesibles.",
    skills: ["React", "JavaScript", "TypeScript", "HTML", "CSS", "Tailwind CSS"],
    experience: [
      {
        id: "1",
        title: "Desarrollador Frontend",
        company: "TechCorp",
        location: "Madrid, España",
        startDate: "2021-06",
        endDate: "",
        current: true,
        description:
          "Desarrollo de aplicaciones web utilizando React y TypeScript. Implementación de diseños UI/UX y optimización de rendimiento.",
      },
      {
        id: "2",
        title: "Desarrollador Web Junior",
        company: "WebStudio",
        location: "Barcelona, España",
        startDate: "2020-01",
        endDate: "2021-05",
        current: false,
        description: "Desarrollo de sitios web responsivos utilizando HTML, CSS y JavaScript.",
      },
    ],
    education: [
      {
        id: "1",
        degree: "Grado en Ingeniería Informática",
        institution: "Universidad Politécnica de Madrid",
        location: "Madrid, España",
        startDate: "2016-09",
        endDate: "2020-06",
        current: false,
        description: "Especialización en desarrollo de software.",
      },
    ],
    resume: null,
    isProfilePublic: true,
    isOpenToWork: true,
    preferredJobTypes: ["full-time", "remote"],
    preferredLocations: ["Madrid, España", "Remoto"],
  })

  const handleAddExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    }

    setProfileData({
      ...profileData,
      experience: [...profileData.experience, newExperience],
    })
  }

  const handleRemoveExperience = (id: string) => {
    setProfileData({
      ...profileData,
      experience: profileData.experience.filter((exp) => exp.id !== id),
    })
  }

  const handleAddEducation = () => {
    const newEducation = {
      id: Date.now().toString(),
      degree: "",
      institution: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    }

    setProfileData({
      ...profileData,
      education: [...profileData.education, newEducation],
    })
  }

  const handleRemoveEducation = (id: string) => {
    setProfileData({
      ...profileData,
      education: profileData.education.filter((edu) => edu.id !== id),
    })
  }

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: Implementar lógica de carga de CV
    console.log("Resume upload:", e.target.files?.[0])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: conectar a Supabase más adelante
    console.log("Profile data submitted:", profileData)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} />

      <main className="flex-1 py-8">
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
                <h1 className="text-3xl font-bold">Mi perfil</h1>
                <p className="text-muted-foreground">Gestiona tu información profesional</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Completado</span>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-honey h-2.5 rounded-full" style={{ width: `${profileProgress}%` }}></div>
                    </div>
                    <span className="text-sm font-medium">{profileProgress}%</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="public-profile"
                    checked={profileData.isProfilePublic}
                    onCheckedChange={(checked) => setProfileData({ ...profileData, isProfilePublic: checked })}
                  />
                  <Label htmlFor="public-profile">Perfil público</Label>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="personal" className="space-y-8">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 md:w-auto md:inline-flex">
              <TabsTrigger value="personal">Información personal</TabsTrigger>
              <TabsTrigger value="experience">Experiencia</TabsTrigger>
              <TabsTrigger value="education">Educación</TabsTrigger>
              <TabsTrigger value="preferences">Preferencias</TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit}>
              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>Información personal</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center relative">
                        <User className="h-12 w-12 text-muted-foreground" />
                        <label
                          htmlFor="avatar-upload"
                          className="absolute bottom-0 right-0 w-8 h-8 bg-honey rounded-full flex items-center justify-center cursor-pointer"
                        >
                          <Upload className="h-4 w-4 text-jet" />
                          <span className="sr-only">Subir avatar</span>
                        </label>
                        <input id="avatar-upload" type="file" accept="image/*" className="hidden" />
                      </div>

                      <div>
                        <h3 className="font-bold text-lg">{`${profileData.firstName} ${profileData.lastName}`}</h3>
                        <p className="text-muted-foreground">{profileData.title}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Nombre *</Label>
                        <Input
                          id="firstName"
                          value={profileData.firstName}
                          onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName">Apellidos *</Label>
                        <Input
                          id="lastName"
                          value={profileData.lastName}
                          onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="title">Título profesional *</Label>
                      <Input
                        id="title"
                        placeholder="Ej. Desarrollador Frontend Senior"
                        value={profileData.title}
                        onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Ubicación *</Label>
                      <Input
                        id="location"
                        placeholder="Ej. Madrid, España"
                        value={profileData.location}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="about">Sobre mí *</Label>
                      <Textarea
                        id="about"
                        placeholder="Escribe una breve descripción sobre ti y tu experiencia profesional"
                        className="min-h-[150px]"
                        value={profileData.about}
                        onChange={(e) => setProfileData({ ...profileData, about: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="skills">Habilidades *</Label>
                      <TagChooser
                        tags={profileData.skills}
                        onChange={(tags) => setProfileData({ ...profileData, skills: tags })}
                        placeholder="Añadir habilidad..."
                        suggestions={["JavaScript", "React", "Python", "UX/UI", "Marketing", "SEO", "Node.js"]}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="resume">Currículum</Label>
                      <div className="border rounded-md p-4 bg-muted/30">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <span className="text-sm">
                              {profileData.resume ? "curriculum.pdf" : "No hay currículum cargado"}
                            </span>
                          </div>

                          <label htmlFor="resume-upload" className="cursor-pointer text-sm text-honey hover:underline">
                            {profileData.resume ? "Cambiar" : "Subir CV"}
                          </label>
                          <input
                            id="resume-upload"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                            onChange={handleResumeUpload}
                          />
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Formatos aceptados: PDF, DOC, DOCX. Tamaño máximo: 5MB
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience">
                <Card>
                  <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <CardTitle>Experiencia laboral</CardTitle>
                    <Button type="button" variant="outline" onClick={handleAddExperience} className="gap-2">
                      <Plus className="h-4 w-4" />
                      Añadir experiencia
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {profileData.experience.map((exp, index) => (
                      <div key={exp.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="font-bold text-lg">{exp.title || "Nueva experiencia"}</h3>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveExperience(exp.id)}
                            className="text-destructive hover:text-destructive/90 hover:bg-destructive/10 -mt-1"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Eliminar</span>
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <Label htmlFor={`exp-title-${index}`}>Puesto *</Label>
                            <Input
                              id={`exp-title-${index}`}
                              value={exp.title}
                              onChange={(e) => {
                                const updatedExperience = [...profileData.experience]
                                updatedExperience[index].title = e.target.value
                                setProfileData({ ...profileData, experience: updatedExperience })
                              }}
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`exp-company-${index}`}>Empresa *</Label>
                            <Input
                              id={`exp-company-${index}`}
                              value={exp.company}
                              onChange={(e) => {
                                const updatedExperience = [...profileData.experience]
                                updatedExperience[index].company = e.target.value
                                setProfileData({ ...profileData, experience: updatedExperience })
                              }}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <Label htmlFor={`exp-location-${index}`}>Ubicación</Label>
                          <Input
                            id={`exp-location-${index}`}
                            value={exp.location}
                            onChange={(e) => {
                              const updatedExperience = [...profileData.experience]
                              updatedExperience[index].location = e.target.value
                              setProfileData({ ...profileData, experience: updatedExperience })
                            }}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <Label htmlFor={`exp-start-${index}`}>Fecha de inicio *</Label>
                            <Input
                              id={`exp-start-${index}`}
                              type="month"
                              value={exp.startDate}
                              onChange={(e) => {
                                const updatedExperience = [...profileData.experience]
                                updatedExperience[index].startDate = e.target.value
                                setProfileData({ ...profileData, experience: updatedExperience })
                              }}
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor={`exp-end-${index}`}>Fecha de fin</Label>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  id={`exp-current-${index}`}
                                  checked={exp.current}
                                  onCheckedChange={(checked) => {
                                    const updatedExperience = [...profileData.experience]
                                    updatedExperience[index].current = checked
                                    if (checked) {
                                      updatedExperience[index].endDate = ""
                                    }
                                    setProfileData({ ...profileData, experience: updatedExperience })
                                  }}
                                />
                                <Label htmlFor={`exp-current-${index}`} className="text-sm">
                                  Actual
                                </Label>
                              </div>
                            </div>
                            <Input
                              id={`exp-end-${index}`}
                              type="month"
                              value={exp.endDate}
                              onChange={(e) => {
                                const updatedExperience = [...profileData.experience]
                                updatedExperience[index].endDate = e.target.value
                                setProfileData({ ...profileData, experience: updatedExperience })
                              }}
                              disabled={exp.current}
                              required={!exp.current}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`exp-description-${index}`}>Descripción</Label>
                          <Textarea
                            id={`exp-description-${index}`}
                            placeholder="Describe tus responsabilidades y logros"
                            value={exp.description}
                            onChange={(e) => {
                              const updatedExperience = [...profileData.experience]
                              updatedExperience[index].description = e.target.value
                              setProfileData({ ...profileData, experience: updatedExperience })
                            }}
                          />
                        </div>
                      </div>
                    ))}

                    {profileData.experience.length === 0 && (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
                          <Briefcase className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">No hay experiencia añadida</h3>
                        <p className="text-muted-foreground mb-4">
                          Añade tu experiencia laboral para mejorar tu perfil
                        </p>
                        <Button type="button" onClick={handleAddExperience} className="gap-2">
                          <Plus className="h-4 w-4" />
                          Añadir experiencia
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="education">
                <Card>
                  <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <CardTitle>Educación</CardTitle>
                    <Button type="button" variant="outline" onClick={handleAddEducation} className="gap-2">
                      <Plus className="h-4 w-4" />
                      Añadir educación
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {profileData.education.map((edu, index) => (
                      <div key={edu.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="font-bold text-lg">{edu.degree || "Nueva educación"}</h3>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveEducation(edu.id)}
                            className="text-destructive hover:text-destructive/90 hover:bg-destructive/10 -mt-1"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Eliminar</span>
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <Label htmlFor={`edu-degree-${index}`}>Título/Grado *</Label>
                            <Input
                              id={`edu-degree-${index}`}
                              value={edu.degree}
                              onChange={(e) => {
                                const updatedEducation = [...profileData.education]
                                updatedEducation[index].degree = e.target.value
                                setProfileData({ ...profileData, education: updatedEducation })
                              }}
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`edu-institution-${index}`}>Institución *</Label>
                            <Input
                              id={`edu-institution-${index}`}
                              value={edu.institution}
                              onChange={(e) => {
                                const updatedEducation = [...profileData.education]
                                updatedEducation[index].institution = e.target.value
                                setProfileData({ ...profileData, education: updatedEducation })
                              }}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <Label htmlFor={`edu-location-${index}`}>Ubicación</Label>
                          <Input
                            id={`edu-location-${index}`}
                            value={edu.location}
                            onChange={(e) => {
                              const updatedEducation = [...profileData.education]
                              updatedEducation[index].location = e.target.value
                              setProfileData({ ...profileData, education: updatedEducation })
                            }}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <Label htmlFor={`edu-start-${index}`}>Fecha de inicio *</Label>
                            <Input
                              id={`edu-start-${index}`}
                              type="month"
                              value={edu.startDate}
                              onChange={(e) => {
                                const updatedEducation = [...profileData.education]
                                updatedEducation[index].startDate = e.target.value
                                setProfileData({ ...profileData, education: updatedEducation })
                              }}
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor={`edu-end-${index}`}>Fecha de fin</Label>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  id={`edu-current-${index}`}
                                  checked={edu.current}
                                  onCheckedChange={(checked) => {
                                    const updatedEducation = [...profileData.education]
                                    updatedEducation[index].current = checked
                                    if (checked) {
                                      updatedEducation[index].endDate = ""
                                    }
                                    setProfileData({ ...profileData, education: updatedEducation })
                                  }}
                                />
                                <Label htmlFor={`edu-current-${index}`} className="text-sm">
                                  En curso
                                </Label>
                              </div>
                            </div>
                            <Input
                              id={`edu-end-${index}`}
                              type="month"
                              value={edu.endDate}
                              onChange={(e) => {
                                const updatedEducation = [...profileData.education]
                                updatedEducation[index].endDate = e.target.value
                                setProfileData({ ...profileData, education: updatedEducation })
                              }}
                              disabled={edu.current}
                              required={!edu.current}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`edu-description-${index}`}>Descripción</Label>
                          <Textarea
                            id={`edu-description-${index}`}
                            placeholder="Describe tu formación, especialización, etc."
                            value={edu.description}
                            onChange={(e) => {
                              const updatedEducation = [...profileData.education]
                              updatedEducation[index].description = e.target.value
                              setProfileData({ ...profileData, education: updatedEducation })
                            }}
                          />
                        </div>
                      </div>
                    ))}

                    {profileData.education.length === 0 && (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
                          <GraduationCap className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">No hay educación añadida</h3>
                        <p className="text-muted-foreground mb-4">
                          Añade tu formación académica para mejorar tu perfil
                        </p>
                        <Button type="button" onClick={handleAddEducation} className="gap-2">
                          <Plus className="h-4 w-4" />
                          Añadir educación
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences">
                <Card>
                  <CardHeader>
                    <CardTitle>Preferencias laborales</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="open-to-work"
                        checked={profileData.isOpenToWork}
                        onCheckedChange={(checked) => setProfileData({ ...profileData, isOpenToWork: checked })}
                      />
                      <Label htmlFor="open-to-work">Disponible para nuevas oportunidades</Label>
                    </div>

                    <div className="space-y-2">
                      <Label>Tipos de trabajo preferidos</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {[
                          { id: "full-time", label: "Tiempo completo" },
                          { id: "part-time", label: "Tiempo parcial" },
                          { id: "contract", label: "Contrato" },
                          { id: "internship", label: "Prácticas" },
                          { id: "remote", label: "Remoto" },
                          { id: "hybrid", label: "Híbrido" },
                        ].map((type) => (
                          <div key={type.id} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={`job-type-${type.id}`}
                              checked={profileData.preferredJobTypes.includes(type.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setProfileData({
                                    ...profileData,
                                    preferredJobTypes: [...profileData.preferredJobTypes, type.id],
                                  })
                                } else {
                                  setProfileData({
                                    ...profileData,
                                    preferredJobTypes: profileData.preferredJobTypes.filter((t) => t !== type.id),
                                  })
                                }
                              }}
                              className="h-4 w-4 rounded border-gray-300 text-honey focus:ring-honey"
                            />
                            <Label htmlFor={`job-type-${type.id}`}>{type.label}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="preferred-locations">Ubicaciones preferidas</Label>
                      <TagChooser
                        tags={profileData.preferredLocations}
                        onChange={(locations) => setProfileData({ ...profileData, preferredLocations: locations })}
                        placeholder="Añadir ubicación..."
                        suggestions={[
                          "Madrid, España",
                          "Barcelona, España",
                          "Valencia, España",
                          "Remoto",
                          "Sevilla, España",
                        ]}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="salary-expectations">Expectativas salariales</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input id="salary-expectations" type="text" placeholder="Ej. 30.000€ - 40.000€ anuales" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Esta información es privada y solo se mostrará a los empleadores cuando apliques a un empleo.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>Disponibilidad</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {[
                          { id: "immediate", label: "Inmediata" },
                          { id: "two-weeks", label: "2 semanas" },
                          { id: "one-month", label: "1 mes" },
                          { id: "negotiable", label: "Negociable" },
                        ].map((availability) => (
                          <div key={availability.id} className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id={`availability-${availability.id}`}
                              name="availability"
                              className="h-4 w-4 border-gray-300 text-honey focus:ring-honey"
                            />
                            <Label htmlFor={`availability-${availability.id}`}>{availability.label}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <div className="flex justify-end mt-6">
                <Button type="submit">Guardar cambios</Button>
              </div>
            </form>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
