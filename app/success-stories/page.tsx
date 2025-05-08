import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button-custom"
import { Card, CardContent } from "@/components/ui/card-custom"
import { Badge } from "@/components/ui/badge-custom"
import { HoneycombBackground } from "@/components/honeycomb-background"
import { Quote, Building2, User, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function SuccessStoriesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <HoneycombBackground />

          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 md:space-y-6 max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Historias de <span className="text-honey">éxito</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-[700px]">
                Descubre cómo BuzzJobs ha ayudado a empresas y profesionales a conectar y crecer juntos.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Success Story */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-honey rounded-full opacity-20"></div>
                <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-honey rounded-full opacity-20"></div>
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="Equipo de TechSolutions"
                  width={600}
                  height={500}
                  className="rounded-xl shadow-medium relative z-10"
                />
              </div>
              <div>
                <Badge variant="secondary" className="mb-4">
                  Historia destacada
                </Badge>
                <h2 className="text-3xl font-bold mb-4">
                  Cómo TechSolutions encontró a su equipo de desarrollo en tiempo récord
                </h2>
                <p className="text-muted-foreground mb-6">
                  "Gracias a BuzzJobs, pudimos contratar a todo nuestro equipo de desarrollo en menos de un mes. La
                  calidad de los candidatos y la facilidad de uso de la plataforma superaron nuestras expectativas."
                </p>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-muted overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=48&width=48"
                      alt="Ana Martínez"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold">Ana Martínez</p>
                    <p className="text-sm text-muted-foreground">CTO, TechSolutions</p>
                  </div>
                </div>
                <Button asChild>
                  <Link href="#" className="flex items-center gap-2">
                    Leer la historia completa
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories Grid */}
        <section className="py-16 bg-muted">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">Más historias de éxito</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "De freelancer a líder de equipo en 6 meses",
                  quote:
                    "BuzzJobs me permitió encontrar una oportunidad que realmente se alineaba con mis habilidades y ambiciones.",
                  person: "Carlos Rodríguez",
                  role: "Lead Developer, DataTech",
                  type: "candidate",
                  image: "/placeholder.svg?height=80&width=80",
                },
                {
                  title: "Cómo redujimos nuestro tiempo de contratación en un 60%",
                  quote:
                    "La plataforma nos permitió filtrar candidatos de manera eficiente y encontrar el talento adecuado rápidamente.",
                  person: "Laura Sánchez",
                  role: "HR Manager, InnovaGroup",
                  type: "employer",
                  image: "/placeholder.svg?height=80&width=80",
                },
                {
                  title: "Encontrando mi camino en una nueva industria",
                  quote:
                    "Después de 10 años en finanzas, BuzzJobs me ayudó a hacer la transición al sector tecnológico.",
                  person: "Miguel Torres",
                  role: "Product Manager, FinTech",
                  type: "candidate",
                  image: "/placeholder.svg?height=80&width=80",
                },
                {
                  title: "Construyendo un equipo diverso y talentoso",
                  quote:
                    "BuzzJobs nos ayudó a encontrar candidatos diversos y cualificados que han enriquecido nuestra cultura empresarial.",
                  person: "Elena López",
                  role: "CEO, CreativeStudio",
                  type: "employer",
                  image: "/placeholder.svg?height=80&width=80",
                },
                {
                  title: "De pasante a gerente en 3 años",
                  quote:
                    "Mi carrera comenzó con una oportunidad que encontré en BuzzJobs, y desde entonces no he dejado de crecer.",
                  person: "Javier García",
                  role: "Marketing Manager, BrandPro",
                  type: "candidate",
                  image: "/placeholder.svg?height=80&width=80",
                },
                {
                  title: "Expandiendo nuestro equipo internacional",
                  quote:
                    "Gracias a BuzzJobs, pudimos contratar talento remoto en 5 países diferentes en tiempo récord.",
                  person: "Sofía Navarro",
                  role: "COO, GlobalTech",
                  type: "employer",
                  image: "/placeholder.svg?height=80&width=80",
                },
              ].map((story, index) => (
                <Card key={index} className="overflow-hidden h-full flex flex-col">
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <Badge variant={story.type === "candidate" ? "secondary" : "default"} className="self-start mb-4">
                      {story.type === "candidate" ? "Candidato" : "Empresa"}
                    </Badge>

                    <h3 className="text-xl font-bold mb-4">{story.title}</h3>

                    <div className="bg-background rounded-lg p-4 mb-6 flex-grow">
                      <Quote className="h-6 w-6 text-honey mb-2" />
                      <p className="text-muted-foreground italic">{story.quote}</p>
                    </div>

                    <div className="flex items-center gap-3 mt-auto">
                      <div className="w-10 h-10 rounded-full bg-muted overflow-hidden flex-shrink-0">
                        {story.type === "candidate" ? (
                          <User className="w-6 h-6 m-2 text-muted-foreground" />
                        ) : (
                          <Building2 className="w-6 h-6 m-2 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{story.person}</p>
                        <p className="text-xs text-muted-foreground">{story.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Comparte tu historia</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">BuzzJobs en números</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Nuestro impacto en el mercado laboral sigue creciendo cada día
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "10,000+", label: "Empresas" },
                { value: "50,000+", label: "Candidatos" },
                { value: "25,000+", label: "Contrataciones exitosas" },
                { value: "95%", label: "Tasa de satisfacción" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-honey mb-2">{stat.value}</div>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-honey">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-jet mb-4">Escribe tu propia historia de éxito</h2>
              <p className="text-xl text-jet/80 mb-8">
                Únete a miles de empresas y profesionales que ya han encontrado lo que buscaban con BuzzJobs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="bg-jet text-honey hover:bg-jet/90" asChild>
                  <Link href="/employer/post-job">Publicar empleo</Link>
                </Button>
                <Button variant="outline" size="lg" className="bg-white text-jet border-jet hover:bg-white/90" asChild>
                  <Link href="/jobs">Buscar empleo</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
