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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select-custom"
import { ArrowLeft, Upload, Building2, Globe, MapPin, Users, Phone, Mail } from "lucide-react"
import Link from "next/link"

export default function EmployerProfilePage() {
  // Usuario de ejemplo
  const user = {
    name: "María Rodríguez",
    role: "employer",
  }

  const [profileProgress, setProfileProgress] = useState(75)

  // Estado para el formulario
  const [companyData, setCompanyData] = useState({
    name: "TechCorp",
    logo: null,
    industry: "technology",
    size: "50-100",
    founded: "2012",
    website: "https://techcorp.example.com",
    location: "Madrid, España",
    about:
      "TechCorp es una empresa líder en desarrollo de software con más de 10 años de experiencia en el sector. Nos especializamos en crear soluciones tecnológicas innovadoras para empresas de todos los tamaños.",
    mission:
      "Nuestra misión es transformar ideas en soluciones tecnológicas que impulsen el crecimiento y éxito de nuestros clientes.",
    benefits:
      "- Horario flexible\n- Trabajo remoto\n- Seguro médico privado\n- Presupuesto para formación\n- 23 días de vacaciones",
    photos: [],
    contactName: "María Rodríguez",
    contactEmail: "maria@techcorp.example.com",
    contactPhone: "+34 612 345 678",
  })

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: Implementar lógica de carga de logo
    console.log("Logo upload:", e.target.files?.[0])
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: Implementar lógica de carga de fotos
    console.log("Photo upload:", e.target.files)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: conectar a Supabase más adelante
    console.log("Company data submitted:", companyData)
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
                <h1 className="text-3xl font-bold">Perfil de empresa</h1>
                <p className="text-muted-foreground">Gestiona la información de tu empresa</p>
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
              </div>
            </div>
          </div>

          <Tabs defaultValue="company" className="space-y-8">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 md:w-auto md:inline-flex">
              <TabsTrigger value="company">Información de empresa</TabsTrigger>
              <TabsTrigger value="culture">Cultura y beneficios</TabsTrigger>
              <TabsTrigger value="contact">Información de contacto</TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit}>
              <TabsContent value="company">
                <Card>
                  <CardHeader>
                    <CardTitle>Información de empresa</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-24 rounded-md bg-muted flex items-center justify-center relative">
                        <Building2 className="h-12 w-12 text-muted-foreground" />
                        <label
                          htmlFor="logo-upload"
                          className="absolute bottom-0 right-0 w-8 h-8 bg-honey rounded-full flex items-center justify-center cursor-pointer"
                        >
                          <Upload className="h-4 w-4 text-jet" />
                          <span className="sr-only">Subir logo</span>
                        </label>
                        <input
                          id="logo-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleLogoUpload}
                        />
                      </div>

                      <div>
                        <h3 className="font-bold text-lg">{companyData.name}</h3>
                        <p className="text-muted-foreground">{companyData.location}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company-name">Nombre de la empresa *</Label>
                      <Input
                        id="company-name"
                        value={companyData.name}
                        onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="industry">Industria *</Label>
                        <Select
                          value={companyData.industry}
                          onValueChange={(value) => setCompanyData({ ...companyData, industry: value })}
                          required
                        >
                          <SelectTrigger id="industry">
                            <SelectValue placeholder="Seleccionar industria" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technology">Tecnología</SelectItem>
                            <SelectItem value="healthcare">Salud</SelectItem>
                            <SelectItem value="education">Educación</SelectItem>
                            <SelectItem value="finance">Finanzas</SelectItem>
                            <SelectItem value="retail">Comercio</SelectItem>
                            <SelectItem value="manufacturing">Manufactura</SelectItem>
                            <SelectItem value="services">Servicios</SelectItem>
                            <SelectItem value="other">Otra</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="size">Tamaño de la empresa *</Label>
                        <Select
                          value={companyData.size}
                          onValueChange={(value) => setCompanyData({ ...companyData, size: value })}
                          required
                        >
                          <SelectTrigger id="size">
                            <SelectValue placeholder="Seleccionar tamaño" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-10">1-10 empleados</SelectItem>
                            <SelectItem value="11-50">11-50 empleados</SelectItem>
                            <SelectItem value="50-100">50-100 empleados</SelectItem>
                            <SelectItem value="101-500">101-500 empleados</SelectItem>
                            <SelectItem value="501-1000">501-1000 empleados</SelectItem>
                            <SelectItem value="1000+">Más de 1000 empleados</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="founded">Año de fundación</Label>
                        <Input
                          id="founded"
                          value={companyData.founded}
                          onChange={(e) => setCompanyData({ ...companyData, founded: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="website">Sitio web</Label>
                        <Input
                          id="website"
                          type="url"
                          value={companyData.website}
                          onChange={(e) => setCompanyData({ ...companyData, website: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Ubicación principal *</Label>
                      <Input
                        id="location"
                        placeholder="Ej. Madrid, España"
                        value={companyData.location}
                        onChange={(e) => setCompanyData({ ...companyData, location: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="about">Sobre la empresa *</Label>
                      <Textarea
                        id="about"
                        placeholder="Describe tu empresa, su historia y a qué se dedica"
                        className="min-h-[150px]"
                        value={companyData.about}
                        onChange={(e) => setCompanyData({ ...companyData, about: e.target.value })}
                        required
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="culture">
                <Card>
                  <CardHeader>
                    <CardTitle>Cultura y beneficios</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="mission">Misión y valores</Label>
                      <Textarea
                        id="mission"
                        placeholder="Describe la misión y valores de tu empresa"
                        className="min-h-[150px]"
                        value={companyData.mission}
                        onChange={(e) => setCompanyData({ ...companyData, mission: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="benefits">Beneficios y ventajas</Label>
                      <Textarea
                        id="benefits"
                        placeholder="Lista los beneficios que ofrece tu empresa (uno por línea)"
                        className="min-h-[150px]"
                        value={companyData.benefits}
                        onChange={(e) => setCompanyData({ ...companyData, benefits: e.target.value })}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Escribe un beneficio por línea, comenzando con un guión (-).
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="photos">Fotos de la empresa y cultura</Label>
                      <div className="border rounded-md p-4 bg-muted/30">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                          {companyData.photos.length > 0 ? (
                            companyData.photos.map((photo, index) => (
                              <div key={index} className="aspect-video bg-muted rounded-md"></div>
                            ))
                          ) : (
                            <div className="col-span-full text-center py-8 text-muted-foreground">
                              No hay fotos cargadas
                            </div>
                          )}
                        </div>

                        <label
                          htmlFor="photos-upload"
                          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 cursor-pointer"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Subir fotos
                        </label>
                        <input
                          id="photos-upload"
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={handlePhotoUpload}
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                          Puedes subir hasta 10 fotos. Tamaño máximo: 5MB por foto.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contact">
                <Card>
                  <CardHeader>
                    <CardTitle>Información de contacto</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Nombre de contacto *</Label>
                      <Input
                        id="contact-name"
                        value={companyData.contactName}
                        onChange={(e) => setCompanyData({ ...companyData, contactName: e.target.value })}
                        required
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Esta persona será el punto de contacto principal para los candidatos.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contact-email">Email de contacto *</Label>
                        <Input
                          id="contact-email"
                          type="email"
                          value={companyData.contactEmail}
                          onChange={(e) => setCompanyData({ ...companyData, contactEmail: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contact-phone">Teléfono de contacto</Label>
                        <Input
                          id="contact-phone"
                          value={companyData.contactPhone}
                          onChange={(e) => setCompanyData({ ...companyData, contactPhone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="border rounded-md p-4 bg-muted/30 mt-6">
                      <h3 className="font-medium mb-4">Vista previa de la información pública</h3>

                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-muted-foreground" />
                          </div>
                          <div>
                            <h4 className="font-bold">{companyData.name}</h4>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="mr-1 h-4 w-4" />
                              {companyData.location}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center text-muted-foreground">
                            <Globe className="mr-1 h-4 w-4" />
                            <a
                              href={companyData.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-honey"
                            >
                              {companyData.website.replace(/^https?:\/\//, "")}
                            </a>
                          </div>

                          <div className="flex items-center text-muted-foreground">
                            <Users className="mr-1 h-4 w-4" />
                            {companyData.size === "1-10"
                              ? "1-10 empleados"
                              : companyData.size === "11-50"
                                ? "11-50 empleados"
                                : companyData.size === "50-100"
                                  ? "50-100 empleados"
                                  : companyData.size === "101-500"
                                    ? "101-500 empleados"
                                    : companyData.size === "501-1000"
                                      ? "501-1000 empleados"
                                      : "Más de 1000 empleados"}
                          </div>

                          <div className="flex items-center text-muted-foreground">
                            <Mail className="mr-1 h-4 w-4" />
                            {companyData.contactEmail}
                          </div>

                          {companyData.contactPhone && (
                            <div className="flex items-center text-muted-foreground">
                              <Phone className="mr-1 h-4 w-4" />
                              {companyData.contactPhone}
                            </div>
                          )}
                        </div>

                        <div>
                          <h4 className="font-medium mb-1">Sobre la empresa</h4>
                          <p className="text-sm text-muted-foreground line-clamp-3">{companyData.about}</p>
                        </div>
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
