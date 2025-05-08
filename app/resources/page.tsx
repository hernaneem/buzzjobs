import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button-custom"
import { Card, CardContent, CardFooter } from "@/components/ui/card-custom"
import { Badge } from "@/components/ui/badge-custom"
import { Input } from "@/components/ui/input-custom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, FileText, Video, BookOpen, Download, Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ResourcesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 md:space-y-6 max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Centro de recursos</h1>
              <p className="text-xl text-muted-foreground">
                Guías, plantillas y consejos para ayudarte en tu búsqueda de empleo o proceso de contratación
              </p>

              <div className="w-full max-w-md relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Buscar recursos..." className="pl-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="all" className="space-y-8">
              <div className="flex justify-center">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-2xl">
                  <TabsTrigger value="all">Todos</TabsTrigger>
                  <TabsTrigger value="candidates">Para candidatos</TabsTrigger>
                  <TabsTrigger value="employers">Para empresas</TabsTrigger>
                  <TabsTrigger value="templates">Plantillas</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="space-y-8">
                {/* Featured Resources */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Recursos destacados</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        title: "Guía completa para crear un CV perfecto",
                        description:
                          "Aprende a crear un currículum que destaque entre la multitud y aumente tus posibilidades de conseguir entrevistas.",
                        image: "/placeholder.svg?height=200&width=400",
                        type: "Guía",
                        time: "15 min lectura",
                        for: "candidates",
                      },
                      {
                        title: "Cómo realizar entrevistas efectivas",
                        description:
                          "Técnicas y preguntas para identificar a los mejores candidatos durante el proceso de entrevista.",
                        image: "/placeholder.svg?height=200&width=400",
                        type: "Webinar",
                        time: "45 min",
                        for: "employers",
                      },
                      {
                        title: "Tendencias de reclutamiento 2023",
                        description:
                          "Descubre las últimas tendencias en reclutamiento y cómo adaptarte para atraer al mejor talento.",
                        image: "/placeholder.svg?height=200&width=400",
                        type: "Informe",
                        time: "20 min lectura",
                        for: "employers",
                      },
                    ].map((resource, index) => (
                      <Card key={index} className="overflow-hidden">
                        <div className="aspect-video relative">
                          <Image
                            src={resource.image || "/placeholder.svg"}
                            alt={resource.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                          <Badge
                            variant={resource.for === "candidates" ? "secondary" : "default"}
                            className="absolute top-3 right-3"
                          >
                            {resource.for === "candidates" ? "Para candidatos" : "Para empresas"}
                          </Badge>
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 mb-2">
                            {resource.type === "Guía" ? (
                              <FileText className="h-4 w-4 text-muted-foreground" />
                            ) : resource.type === "Webinar" ? (
                              <Video className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <BookOpen className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span className="text-xs text-muted-foreground">{resource.type}</span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{resource.time}</span>
                          </div>
                          <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                          <p className="text-muted-foreground text-sm line-clamp-2">{resource.description}</p>
                        </CardContent>
                        <CardFooter className="p-6 pt-0">
                          <Button variant="link" className="p-0 h-auto" asChild>
                            <Link href="#" className="flex items-center gap-1">
                              Leer más <ArrowRight className="h-4 w-4 ml-1" />
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Latest Articles */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Artículos recientes</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      {
                        title: "5 errores comunes en las entrevistas y cómo evitarlos",
                        date: "15 mayo, 2023",
                        time: "8 min lectura",
                        for: "candidates",
                      },
                      {
                        title: "Cómo destacar tu perfil de LinkedIn para atraer reclutadores",
                        date: "10 mayo, 2023",
                        time: "10 min lectura",
                        for: "candidates",
                      },
                      {
                        title: "Estrategias para retener talento en tiempos de incertidumbre",
                        date: "5 mayo, 2023",
                        time: "12 min lectura",
                        for: "employers",
                      },
                      {
                        title: "Cómo negociar tu salario: guía paso a paso",
                        date: "1 mayo, 2023",
                        time: "7 min lectura",
                        for: "candidates",
                      },
                      {
                        title: "Employer branding: cómo construir una marca empleadora atractiva",
                        date: "25 abril, 2023",
                        time: "15 min lectura",
                        for: "employers",
                      },
                      {
                        title: "Habilidades blandas más demandadas en 2023",
                        date: "20 abril, 2023",
                        time: "9 min lectura",
                        for: "candidates",
                      },
                    ].map((article, index) => (
                      <Card key={index} className="overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge
                              variant={article.for === "candidates" ? "secondary" : "default"}
                              className="px-2 py-0.5 text-xs"
                            >
                              {article.for === "candidates" ? "Para candidatos" : "Para empresas"}
                            </Badge>
                            <span className="text-xs text-muted-foreground">•</span>
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{article.date}</span>
                          </div>
                          <h3 className="text-lg font-bold mb-2">{article.title}</h3>
                          <div className="flex items-center mt-4">
                            <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                            <span className="text-xs text-muted-foreground">{article.time}</span>
                            <Button variant="link" className="ml-auto p-0 h-auto" asChild>
                              <Link href="#" className="flex items-center gap-1">
                                Leer <ArrowRight className="h-3 w-3 ml-1" />
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Templates */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Plantillas descargables</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      {
                        title: "Plantilla de CV moderno",
                        format: "DOCX",
                        for: "candidates",
                      },
                      {
                        title: "Plantilla de carta de presentación",
                        format: "DOCX",
                        for: "candidates",
                      },
                      {
                        title: "Checklist para entrevistas",
                        format: "PDF",
                        for: "employers",
                      },
                      {
                        title: "Plantilla de descripción de empleo",
                        format: "DOCX",
                        for: "employers",
                      },
                    ].map((template, index) => (
                      <Card key={index} className="overflow-hidden">
                        <CardContent className="p-6 text-center">
                          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileText className="h-8 w-8 text-muted-foreground" />
                          </div>
                          <Badge
                            variant={template.for === "candidates" ? "secondary" : "default"}
                            className="mb-2 mx-auto"
                          >
                            {template.for === "candidates" ? "Para candidatos" : "Para empresas"}
                          </Badge>
                          <h3 className="font-bold mb-4">{template.title}</h3>
                          <Button className="w-full gap-2">
                            <Download className="h-4 w-4" />
                            Descargar {template.format}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="candidates">
                {/* Content for candidates tab */}
                <h2 className="text-2xl font-bold mb-6">Recursos para candidatos</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Similar structure to "all" tab but filtered for candidates */}
                </div>
              </TabsContent>

              <TabsContent value="employers">
                {/* Content for employers tab */}
                <h2 className="text-2xl font-bold mb-6">Recursos para empresas</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Similar structure to "all" tab but filtered for employers */}
                </div>
              </TabsContent>

              <TabsContent value="templates">
                {/* Content for templates tab */}
                <h2 className="text-2xl font-bold mb-6">Plantillas descargables</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Similar structure to templates section in "all" tab */}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-12 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Suscríbete a nuestro newsletter</h2>
              <p className="text-muted-foreground mb-6">
                Recibe los últimos recursos, consejos y tendencias del mercado laboral directamente en tu bandeja de
                entrada.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <Input placeholder="Tu correo electrónico" className="flex-grow" />
                <Button>Suscribirse</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Al suscribirte, aceptas nuestra{" "}
                <Link href="/privacy" className="underline hover:text-honey">
                  política de privacidad
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
