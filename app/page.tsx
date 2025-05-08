"use client"

import { Button } from "@/components/ui/button-custom"
import { HoneycombBackground } from "@/components/honeycomb-background"
import { BeeIcon } from "@/components/bee-icon"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <HoneycombBackground />

        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 md:space-y-6 max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Zumba por el proceso de contratación con <span className="text-honey">BuzzJobs</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-[700px]">
              Conectamos talento y empleadores de forma ágil y confiable, con velocidad, claridad y confianza.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/employer/post-job">Publicar empleo</Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto">
                <Link href="/jobs">Buscar empleo</Link>
              </Button>
            </div>

            <div className="w-full max-w-md mx-auto mt-8">
              <div className="flex items-center justify-center space-x-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-muted flex items-center justify-center border-2 border-background"
                    >
                      <span className="text-xs font-medium">{i}</span>
                    </div>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">+1,000 empresas confían en nosotros</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-24 relative">
          <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
            <div className="relative rounded-xl overflow-hidden shadow-medium">
              <Image
                src="/placeholder.svg?height=600&width=1200"
                width={1200}
                height={600}
                alt="BuzzJobs Dashboard"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <div className="inline-block rounded-lg bg-honey px-3 py-1 text-sm font-medium text-jet">
              Características
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Todo lo que necesitas para encontrar el talento perfecto
            </h2>
            <p className="text-xl text-muted-foreground max-w-[700px]">
              Herramientas diseñadas para hacer el proceso de contratación más rápido, más eficiente y más efectivo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-honey"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                ),
                title: "Gestión de candidatos",
                description: "Organiza y gestiona a tus candidatos con un sistema Kanban intuitivo y eficiente.",
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-honey"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                    <line x1="3" x2="21" y1="9" y2="9"></line>
                    <line x1="9" x2="9" y1="21" y2="9"></line>
                  </svg>
                ),
                title: "Publicación simplificada",
                description: "Publica ofertas de empleo en minutos con nuestro asistente intuitivo de 4 pasos.",
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-honey"
                  >
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
                  </svg>
                ),
                title: "Perfiles personalizados",
                description: "Crea perfiles atractivos para tu empresa y destaca entre la competencia.",
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-honey"
                  >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                ),
                title: "Recursos educativos",
                description: "Accede a guías y recursos para mejorar tus procesos de contratación.",
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-honey"
                  >
                    <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                    <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                  </svg>
                ),
                title: "Análisis y métricas",
                description:
                  "Obtén insights valiosos sobre tus procesos de contratación con nuestras métricas detalladas.",
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-honey"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                ),
                title: "Seguridad avanzada",
                description: "Protege la información de tus candidatos con nuestras medidas de seguridad avanzadas.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 bg-background rounded-xl shadow-soft"
              >
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <div className="inline-block rounded-lg bg-honey px-3 py-1 text-sm font-medium text-jet">Cómo funciona</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Un proceso simple y efectivo
            </h2>
            <p className="text-xl text-muted-foreground max-w-[700px]">
              BuzzJobs hace que encontrar talento o empleo sea un proceso fluido y sin complicaciones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <div className="flex flex-col space-y-8">
              {[
                {
                  number: "01",
                  title: "Crea tu cuenta",
                  description: "Regístrate como candidato o empresa en menos de un minuto.",
                },
                {
                  number: "02",
                  title: "Completa tu perfil",
                  description: "Añade tu información, experiencia y preferencias para destacar.",
                },
                {
                  number: "03",
                  title: "Publica o aplica",
                  description: "Publica ofertas de empleo o aplica a las que te interesen.",
                },
                {
                  number: "04",
                  title: "Conecta y contrata",
                  description: "Encuentra el talento perfecto o el empleo de tus sueños.",
                },
              ].map((step, index) => (
                <div key={index} className="flex">
                  <div className="mr-4 flex-shrink-0">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-honey text-jet font-bold">
                      {step.number}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative rounded-xl overflow-hidden shadow-medium">
              <Image
                src="/placeholder.svg?height=600&width=800"
                width={800}
                height={600}
                alt="BuzzJobs Process"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <div className="inline-block rounded-lg bg-honey px-3 py-1 text-sm font-medium text-jet">Testimonios</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Lo que dicen nuestros usuarios
            </h2>
            <p className="text-xl text-muted-foreground max-w-[700px]">
              Miles de empresas y candidatos han encontrado el match perfecto con BuzzJobs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {[
              {
                quote:
                  "BuzzJobs nos ha permitido encontrar talento de calidad en tiempo récord. El proceso es intuitivo y los resultados son excelentes.",
                author: "María Rodríguez",
                role: "Directora de RRHH, TechCorp",
              },
              {
                quote:
                  "Gracias a BuzzJobs encontré mi trabajo ideal en menos de dos semanas. La plataforma es muy fácil de usar y las ofertas son de gran calidad.",
                author: "Carlos Méndez",
                role: "Desarrollador Frontend",
              },
              {
                quote:
                  "La capacidad de filtrar candidatos y gestionar todo el proceso en un solo lugar ha revolucionado nuestra forma de contratar.",
                author: "Laura Sánchez",
                role: "CEO, Innovatech",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-background p-6 rounded-xl shadow-soft">
                <div className="mb-4">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-honey"
                  >
                    <path d="M10 11L8.5 13.5L7 11V7H10V11Z" fill="currentColor" />
                    <path d="M17 11L15.5 13.5L14 11V7H17V11Z" fill="currentColor" />
                    <path
                      d="M10 7H7C6.46957 7 5.96086 6.78929 5.58579 6.41421C5.21071 6.03914 5 5.53043 5 5V4H7V5H10V7Z"
                      fill="currentColor"
                    />
                    <path
                      d="M17 7H14C13.4696 7 12.9609 6.78929 12.5858 6.41421C12.2107 6.03914 12 5.53043 12 5V4H14V5H17V7Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <p className="mb-6 text-muted-foreground">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                    <span className="text-sm font-medium">{testimonial.author.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <div className="flex items-center space-x-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? "bg-honey" : "bg-muted-foreground/30"}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="relative overflow-hidden rounded-xl bg-honey p-8 md:p-12">
            <div className="relative z-10 flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
              <BeeIcon size={48} color="#1A1A1A" />
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-jet">
                Comienza a zumbar hoy mismo
              </h2>
              <p className="text-xl text-jet/80 max-w-[700px]">
                Únete a miles de empresas y candidatos que ya están aprovechando el poder de BuzzJobs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto bg-jet text-honey hover:bg-jet/90"
                >
                  <Link href="/employer/post-job">Publicar empleo</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto bg-white text-jet border-jet hover:bg-white/90"
                >
                  <Link href="/jobs">Buscar empleo</Link>
                </Button>
              </div>
            </div>

            <div className="absolute inset-0 -z-10">
              <HoneycombBackground className="opacity-20" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
