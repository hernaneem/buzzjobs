import { Button } from "@/components/ui/button-custom"
import { Card, CardContent } from "@/components/ui/card-custom"
import { BeeIcon } from "@/components/bee-icon"
import { HoneycombBackground } from "@/components/honeycomb-background"
import { Users, Briefcase, Award, Target, Heart, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <HoneycombBackground />

          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 md:space-y-6 max-w-3xl mx-auto">
              <div className="inline-block rounded-lg bg-honey px-3 py-1 text-sm font-medium text-jet">
                Sobre nosotros
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Conectando talento y empleadores con <span className="text-honey">BuzzJobs</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-[700px]">
                Nuestra misión es transformar el proceso de contratación, haciéndolo más ágil, transparente y efectivo
                para todos.
              </p>
            </div>
          </div>
        </section>

        {/* Nuestra historia */}
        <section className="py-16 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Nuestra historia</h2>
                <p className="text-muted-foreground mb-4">
                  BuzzJobs nació en 2022 con una visión clara: revolucionar el proceso de contratación en España. Tras
                  años de experiencia en el sector de recursos humanos, nuestros fundadores identificaron los
                  principales problemas que enfrentan tanto candidatos como empleadores.
                </p>
                <p className="text-muted-foreground mb-4">
                  Los candidatos se sentían frustrados por procesos largos y poco transparentes, mientras que las
                  empresas luchaban por encontrar el talento adecuado entre miles de aplicaciones.
                </p>
                <p className="text-muted-foreground">
                  Así surgió BuzzJobs, una plataforma que utiliza tecnología avanzada para conectar de forma eficiente a
                  candidatos cualificados con las empresas que necesitan su talento, todo ello con la velocidad y
                  precisión de una abeja trabajadora.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-honey rounded-full opacity-20"></div>
                <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-honey rounded-full opacity-20"></div>
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="Equipo de BuzzJobs"
                  width={600}
                  height={500}
                  className="rounded-xl shadow-medium relative z-10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nuestros valores</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                En BuzzJobs, nos guiamos por valores fundamentales que definen nuestra cultura y la forma en que
                trabajamos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Target className="h-10 w-10 text-honey" />,
                  title: "Transparencia",
                  description:
                    "Creemos en procesos claros y honestos. Tanto candidatos como empresas merecen saber exactamente dónde están en cada momento.",
                },
                {
                  icon: <Zap className="h-10 w-10 text-honey" />,
                  title: "Eficiencia",
                  description:
                    "Optimizamos cada paso del proceso de contratación para ahorrar tiempo y recursos a todos los involucrados.",
                },
                {
                  icon: <Heart className="h-10 w-10 text-honey" />,
                  title: "Empatía",
                  description:
                    "Entendemos que buscar trabajo o el candidato ideal puede ser estresante. Diseñamos nuestra plataforma pensando en las personas.",
                },
                {
                  icon: <Award className="h-10 w-10 text-honey" />,
                  title: "Calidad",
                  description:
                    "Nos comprometemos a ofrecer la mejor experiencia posible, con herramientas y servicios de primera clase.",
                },
                {
                  icon: <Users className="h-10 w-10 text-honey" />,
                  title: "Comunidad",
                  description:
                    "Fomentamos conexiones significativas entre profesionales y empresas, construyendo una comunidad laboral sólida.",
                },
                {
                  icon: <Briefcase className="h-10 w-10 text-honey" />,
                  title: "Innovación",
                  description:
                    "Constantemente buscamos nuevas formas de mejorar el proceso de contratación mediante tecnología y creatividad.",
                },
              ].map((value, index) => (
                <Card key={index} className="overflow-hidden transition-shadow hover:shadow-medium">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Equipo */}
        <section className="py-16 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nuestro equipo</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Conoce a las personas apasionadas que hacen posible BuzzJobs.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Ana Martínez",
                  role: "CEO & Co-fundadora",
                  image: "/placeholder.svg?height=300&width=300",
                },
                {
                  name: "Carlos Rodríguez",
                  role: "CTO & Co-fundador",
                  image: "/placeholder.svg?height=300&width=300",
                },
                {
                  name: "Laura Sánchez",
                  role: "Directora de Producto",
                  image: "/placeholder.svg?height=300&width=300",
                },
                {
                  name: "Javier García",
                  role: "Director de Operaciones",
                  image: "/placeholder.svg?height=300&width=300",
                },
                {
                  name: "Elena López",
                  role: "Directora de Marketing",
                  image: "/placeholder.svg?height=300&width=300",
                },
                {
                  name: "Miguel Torres",
                  role: "Lead Developer",
                  image: "/placeholder.svg?height=300&width=300",
                },
                {
                  name: "Sofía Navarro",
                  role: "UX/UI Designer",
                  image: "/placeholder.svg?height=300&width=300",
                },
                {
                  name: "Pablo Ruiz",
                  role: "Customer Success",
                  image: "/placeholder.svg?height=300&width=300",
                },
              ].map((member, index) => (
                <div key={index} className="bg-background rounded-xl overflow-hidden shadow-soft">
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-bold text-lg">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="relative overflow-hidden rounded-xl bg-honey p-8 md:p-12">
              <div className="relative z-10 flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
                <BeeIcon size={48} color="#1A1A1A" />
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-jet">
                  Únete a nuestra colmena
                </h2>
                <p className="text-xl text-jet/80 max-w-[700px]">
                  Estamos en constante crecimiento y siempre buscamos talento apasionado para unirse a nuestro equipo.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <Button
                    asChild
                    size="lg"
                    variant="secondary"
                    className="w-full sm:w-auto bg-jet text-honey hover:bg-jet/90"
                  >
                    <Link href="/contact">Contáctanos</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto bg-white text-jet border-jet hover:bg-white/90"
                  >
                    <Link href="/jobs">Ver ofertas</Link>
                  </Button>
                </div>
              </div>

              <div className="absolute inset-0 -z-10">
                <HoneycombBackground className="opacity-20" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
