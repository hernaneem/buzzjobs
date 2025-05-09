"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button-custom"
import { Card, CardContent } from "@/components/ui/card-custom"
import { Badge } from "@/components/ui/badge-custom"
import { JobCard } from "@/components/ui/job-card"
import { Building2, MapPin, Users, Globe, Calendar, Briefcase, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getCompanyById, type Company } from "@/lib/services/company-service"
import { getJobsByCompany, type JobWithCompany } from "@/lib/services/job-service"
import { useToast } from "@/hooks/use-toast"

export default function CompanyDetailPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const [company, setCompany] = useState<Company | null>(null)
  const [jobs, setJobs] = useState<JobWithCompany[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  // Datos de ejemplo para fotos y beneficios (reemplazar cuando se añadan a la BD)
  const photos = [
    "/placeholder.svg?height=200&width=300",
    "/placeholder.svg?height=200&width=300",
    "/placeholder.svg?height=200&width=300",
    "/placeholder.svg?height=200&width=300",
  ]
  
  const benefits = [
    "Horario flexible",
    "Trabajo remoto",
    "Seguro médico privado",
    "Presupuesto para formación",
    "23 días de vacaciones",
  ]

  useEffect(() => {
    async function fetchCompanyData() {
      try {
        setIsLoading(true)
        
        // Obtener datos de la empresa
        const companyData = await getCompanyById(params.id)
        if (!companyData) {
          setError('No se encontró la empresa solicitada')
          return
        }
        
        setCompany(companyData)
        
        // Obtener trabajos de la empresa
        const companyJobs = await getJobsByCompany(params.id)
        // Añadir información de la empresa a cada trabajo para cumplir con el tipo JobWithCompany
        const jobsWithCompany = companyJobs.map(job => ({
          ...job,
          company: {
            id: companyData.id,
            name: companyData.name,
            logo_url: companyData.logo_url,
            location: companyData.location
          }
        })) as JobWithCompany[]
        
        setJobs(jobsWithCompany)
      } catch (err) {
        console.error('Error al cargar los datos de la empresa:', err)
        setError('Error al cargar los datos de la empresa')
        toast({
          title: "Error",
          description: "No se pudieron cargar los datos de la empresa",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchCompanyData()
  }, [params.id, toast])

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-honey" />
            <p className="text-lg">Cargando información de la empresa...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !company) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">No se pudo cargar la empresa</h1>
            <p className="text-muted-foreground mb-6">{error || 'La empresa solicitada no existe o ha sido eliminada'}</p>
            <Button asChild>
              <Link href="/companies">Ver todas las empresas</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Portada */}
        <div className="relative h-48 md:h-64 lg:h-80 w-full overflow-hidden">
          <Image
            src={"/placeholder.svg"} // TODO: Añadir campo cover_image a la tabla companies
            alt={`${company.name} cover`}
            className="w-full h-full object-cover"
            width={1200}
            height={400}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
        </div>

        <div className="container px-4 md:px-6 -mt-16 relative z-10">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Logo */}
            <div className="w-32 h-32 rounded-xl bg-background border-4 border-background shadow-medium overflow-hidden flex items-center justify-center">
              {company.logo_url ? (
                <Image
                  src={company.logo_url}
                  alt={`${company.name} logo`}
                  className="w-full h-full object-contain"
                  width={120}
                  height={120}
                />
              ) : (
                <Building2 className="w-16 h-16 text-muted-foreground" />
              )}
            </div>

            {/* Información básica */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold">{company.name}</h1>
              <div className="flex flex-wrap gap-3 mt-2">
                {company.location && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-4 w-4" />
                    {company.location}
                  </div>
                )}
                {company.size && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="mr-1 h-4 w-4" />
                    {company.size} empleados
                  </div>
                )}
                {company.founded_year && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-4 w-4" />
                    Fundada en {company.founded_year}
                  </div>
                )}
                {company.industry && <Badge variant="secondary">{company.industry}</Badge>}
              </div>
            </div>

            {/* Acciones */}
            <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
              {company.website && (
                <Button variant="outline" asChild>
                  <a href={company.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                    <Globe className="h-4 w-4" />
                    Sitio web
                  </a>
                </Button>
              )}
              <Button asChild>
                <Link href={`/jobs?company=${company.id}`} className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  Ver empleos
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {/* Información principal */}
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Sobre {company.name}</h2>
                  <p className="text-muted-foreground mb-6">{company.description || 'No hay información disponible sobre esta empresa.'}</p>

                  {company.mission && (
                    <>
                      <h3 className="text-xl font-bold mb-3">Misión y valores</h3>
                      <p className="text-muted-foreground mb-6">{company.mission}</p>
                    </>
                  )}

                  {/* Beneficios - Estos son datos de ejemplo, cuando se añadan a la BD se deberían obtener de ahí */}
                  <h3 className="text-xl font-bold mb-3">Beneficios</h3>
                  <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                    {benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div>
                <h2 className="text-2xl font-bold mb-4">Empleos en {company.name}</h2>
                {jobs.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {jobs.map((job) => (
                      <JobCard
                        key={job.id}
                        id={job.id}
                        title={job.title}
                        company={company.name}
                        location={job.location || company.location || ''}
                        salary={job.is_salary_hidden ? 'Salario no especificado' : (job.salary_min && job.salary_max) ? `${job.salary_min}${job.salary_currency || '€'} - ${job.salary_max}${job.salary_currency || '€'}` : ''}
                        tags={[]} // TODO: Implementar obtención de skills del trabajo
                        isNew={job.published_at ? new Date(job.published_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) : false}
                        isUrgent={job.application_deadline ? new Date(job.application_deadline) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) : false}
                        isRemote={job.is_remote}
                        postedAt={job.published_at ? `Publicado el ${new Date(job.published_at).toLocaleDateString('es-ES')}` : 'Fecha desconocida'}
                        companyLogo={company.logo_url}
                        onSave={() => {}}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-muted/30 rounded-lg">
                    <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No hay empleos activos</h3>
                    <p className="text-muted-foreground">
                      Esta empresa no tiene ofertas de empleo publicadas actualmente.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Información de contacto</h3>
                  <div className="space-y-3">
                    {company.website && (
                      <div className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-muted-foreground" />
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-honey hover:underline"
                        >
                          {company.website.replace(/^https?:\/\//, '')}
                        </a>
                      </div>
                    )}
                    {company.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                        <span>{company.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-muted-foreground" />
                      <span>{jobs.length} empleos activos</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Fotos de la empresa</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {photos.map((photo, index) => (
                      <div key={index} className="aspect-video rounded-md overflow-hidden">
                        <Image
                          src={photo}
                          alt={`${company.name} office`}
                          className="w-full h-full object-cover"
                          width={300}
                          height={200}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Empresas similares</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium">
                            {i === 1 ? "DesignStudio" : i === 2 ? "Innovatech" : "DataInsights"}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {i === 1 ? "Diseño" : i === 2 ? "Tecnología" : "Tecnología"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
