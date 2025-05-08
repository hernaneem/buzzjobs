import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button-custom"
import { Card, CardContent } from "@/components/ui/card-custom"
import { Badge } from "@/components/ui/badge-custom"
import { JobCard } from "@/components/ui/job-card"
import { Building2, MapPin, Users, Globe, Calendar, Briefcase } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function CompanyDetailPage({ params }: { params: { id: string } }) {
  // Datos de ejemplo para la empresa
  const company = {
    id: params.id,
    name: "TechCorp",
    logo: "/placeholder.svg?height=120&width=120",
    coverImage: "/placeholder.svg?height=400&width=1200",
    location: "Madrid, España",
    industry: "Tecnología",
    size: "50-100 empleados",
    website: "https://techcorp.example.com",
    founded: "2012",
    description:
      "TechCorp es una empresa líder en desarrollo de software con más de 10 años de experiencia en el sector. Nos especializamos en crear soluciones tecnológicas innovadoras para empresas de todos los tamaños.",
    mission:
      "Nuestra misión es transformar ideas en soluciones tecnológicas que impulsen el crecimiento y éxito de nuestros clientes.",
    benefits: [
      "Horario flexible",
      "Trabajo remoto",
      "Seguro médico privado",
      "Presupuesto para formación",
      "23 días de vacaciones",
    ],
    photos: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
  }

  // Datos de ejemplo para los trabajos de la empresa
  const jobs = [
    {
      id: "1",
      title: "Desarrollador Frontend",
      company: "TechCorp",
      location: "Madrid, España",
      salary: "40.000€ - 50.000€",
      tags: ["React", "JavaScript", "CSS"],
      isNew: true,
      isRemote: true,
      postedAt: "Hace 2 días",
    },
    {
      id: "2",
      title: "Diseñador UX/UI",
      company: "TechCorp",
      location: "Barcelona, España",
      salary: "35.000€ - 45.000€",
      tags: ["Figma", "Adobe XD", "Sketch"],
      isUrgent: true,
      postedAt: "Hace 1 semana",
    },
    {
      id: "3",
      title: "Product Manager",
      company: "TechCorp",
      location: "Valencia, España",
      salary: "50.000€ - 65.000€",
      tags: ["Agile", "Scrum", "Product Development"],
      isNew: true,
      postedAt: "Hace 3 días",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Portada */}
        <div className="relative h-48 md:h-64 lg:h-80 w-full overflow-hidden">
          <Image
            src={company.coverImage || "/placeholder.svg"}
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
              {company.logo ? (
                <Image
                  src={company.logo || "/placeholder.svg"}
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
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-4 w-4" />
                  {company.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="mr-1 h-4 w-4" />
                  {company.size}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-4 w-4" />
                  Fundada en {company.founded}
                </div>
                <Badge variant="secondary">{company.industry}</Badge>
              </div>
            </div>

            {/* Acciones */}
            <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
              <Button variant="outline" asChild>
                <a href={company.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  Sitio web
                </a>
              </Button>
              <Button asChild>
                <Link href="/jobs" className="flex items-center gap-1">
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
                  <p className="text-muted-foreground mb-6">{company.description}</p>

                  <h3 className="text-xl font-bold mb-3">Misión y valores</h3>
                  <p className="text-muted-foreground mb-6">{company.mission}</p>

                  <h3 className="text-xl font-bold mb-3">Beneficios</h3>
                  <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                    {company.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div>
                <h2 className="text-2xl font-bold mb-4">Empleos en {company.name}</h2>
                <div className="grid grid-cols-1 gap-4">
                  {jobs.map((job) => (
                    <JobCard
                      key={job.id}
                      id={job.id}
                      title={job.title}
                      company={job.company}
                      location={job.location}
                      salary={job.salary}
                      tags={job.tags}
                      isNew={job.isNew}
                      isUrgent={job.isUrgent}
                      isRemote={job.isRemote}
                      postedAt={job.postedAt}
                      companyLogo={company.logo}
                      onSave={() => {}}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Información de contacto</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-muted-foreground" />
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-honey hover:underline"
                      >
                        {company.website.replace("https://", "")}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <span>{company.location}</span>
                    </div>
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
                    {company.photos.map((photo, index) => (
                      <div key={index} className="aspect-video rounded-md overflow-hidden">
                        <Image
                          src={photo || "/placeholder.svg"}
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
