"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button-custom"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card-custom"
import { Badge } from "@/components/ui/badge-custom"
import { ArrowLeft, Check, Sparkles, TrendingUp, Users, Eye, Clock, MapPin, Zap } from "lucide-react"
import Link from "next/link"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export default function PromoteJobPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  // Usuario de ejemplo
  const user = {
    name: "María Rodríguez",
    role: "employer",
  }

  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  // Datos de ejemplo para el trabajo
  const job = {
    id: params.id,
    title: "Desarrollador Frontend",
    location: "Madrid, España",
    postedAt: "15 mayo, 2023",
    expiresAt: "15 junio, 2023",
    isRemote: true,
    isUrgent: false,
    status: "active",
  }

  // Planes de promoción
  const promotionPlans = [
    {
      id: "basic",
      name: "Básico",
      price: 29,
      duration: "7 días",
      features: [
        "Destacado en los resultados de búsqueda",
        "Etiqueta 'Destacado' en la lista de empleos",
        "Prioridad en las alertas de empleo",
      ],
      stats: {
        views: "+50%",
        applicants: "+30%",
      },
    },
    {
      id: "premium",
      name: "Premium",
      price: 59,
      duration: "15 días",
      features: [
        "Destacado en los resultados de búsqueda",
        "Etiqueta 'Destacado' en la lista de empleos",
        "Prioridad en las alertas de empleo",
        "Destacado en la página principal",
        "Compartido en redes sociales",
      ],
      stats: {
        views: "+120%",
        applicants: "+75%",
      },
      recommended: true,
    },
    {
      id: "ultimate",
      name: "Ultimate",
      price: 99,
      duration: "30 días",
      features: [
        "Destacado en los resultados de búsqueda",
        "Etiqueta 'Destacado' en la lista de empleos",
        "Prioridad en las alertas de empleo",
        "Destacado en la página principal",
        "Compartido en redes sociales",
        "Envío directo a candidatos relevantes",
        "Análisis detallado de rendimiento",
      ],
      stats: {
        views: "+200%",
        applicants: "+150%",
      },
    },
  ]

  const handlePromote = () => {
    if (!selectedPlan) return

    setIsProcessing(true)

    // Simular procesamiento
    setTimeout(() => {
      setIsProcessing(false)
      router.push(`/employer/jobs/${job.id}/statistics`)
    }, 2000)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} />

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6 max-w-5xl">
          <div className="mb-8">
            <Link
              href={`/employer/jobs/${job.id}/statistics`}
              className="text-sm text-muted-foreground hover:text-honey flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Volver a estadísticas
            </Link>

            <div className="mt-4">
              <h1 className="text-3xl font-bold">Promocionar empleo</h1>
              <p className="text-muted-foreground">
                Aumenta la visibilidad de tu oferta y recibe más aplicaciones de candidatos cualificados
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Detalles del empleo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-lg">{job.title}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      <Badge variant={job.status === "active" ? "new" : "outline"}>
                        {job.status === "active" ? "Activo" : "Inactivo"}
                      </Badge>
                      {job.isRemote && <Badge variant="remote">Remoto</Badge>}
                      {job.isUrgent && <Badge variant="urgent">Urgente</Badge>}
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Publicado</span>
                        <span className="text-sm">{job.postedAt}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Expira</span>
                        <span className="text-sm">{job.expiresAt}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="text-sm font-medium mb-2">¿Por qué promocionar?</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Aumenta la visibilidad de tu oferta</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Recibe más aplicaciones de candidatos cualificados</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Reduce el tiempo de contratación</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Destaca frente a la competencia</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Selecciona un plan de promoción</CardTitle>
                  <CardDescription>Elige el plan que mejor se adapte a tus necesidades de contratación</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={selectedPlan || ""} onValueChange={setSelectedPlan} className="space-y-4">
                    {promotionPlans.map((plan) => (
                      <div
                        key={plan.id}
                        className={`border rounded-lg p-4 transition-all ${
                          selectedPlan === plan.id ? "border-honey bg-honey/5" : "hover:border-muted-foreground/20"
                        } ${plan.recommended ? "ring-2 ring-honey" : ""}`}
                      >
                        <div className="flex items-start">
                          <RadioGroupItem value={plan.id} id={plan.id} className="mt-1" />
                          <div className="ml-3 flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <Label htmlFor={plan.id} className="text-base font-medium">
                                  {plan.name}
                                </Label>
                                {plan.recommended && (
                                  <Badge variant="new" className="ml-2">
                                    Recomendado
                                  </Badge>
                                )}
                              </div>
                              <div className="text-right">
                                <span className="text-xl font-bold">{plan.price}€</span>
                                <span className="text-sm text-muted-foreground ml-1">/ {plan.duration}</span>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                              <div>
                                <h4 className="text-sm font-medium mb-2">Características</h4>
                                <ul className="space-y-2">
                                  {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-start text-sm">
                                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                      <span>{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <h4 className="text-sm font-medium mb-2">Resultados esperados</h4>
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                      <Eye className="h-4 w-4 text-muted-foreground mr-2" />
                                      <span className="text-sm">Vistas</span>
                                    </div>
                                    <div className="flex items-center text-green-500">
                                      <TrendingUp className="h-4 w-4 mr-1" />
                                      <span className="font-medium">{plan.stats.views}</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                      <Users className="h-4 w-4 text-muted-foreground mr-2" />
                                      <span className="text-sm">Aplicantes</span>
                                    </div>
                                    <div className="flex items-center text-green-500">
                                      <TrendingUp className="h-4 w-4 mr-1" />
                                      <span className="font-medium">{plan.stats.applicants}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>

                  <div className="mt-6">
                    <Button onClick={handlePromote} disabled={!selectedPlan || isProcessing} className="w-full gap-2">
                      {isProcessing ? (
                        <>
                          <Clock className="h-4 w-4 animate-spin" />
                          Procesando...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4" />
                          Promocionar empleo
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Consejos para maximizar tu promoción</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-full bg-honey flex items-center justify-center text-jet">
                    <Zap className="h-5 w-5" />
                  </div>
                  <h3 className="font-medium">Optimiza tu descripción</h3>
                  <p className="text-sm text-muted-foreground">
                    Asegúrate de que tu descripción del puesto sea clara, concisa y contenga palabras clave relevantes
                    para mejorar la visibilidad.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-full bg-honey flex items-center justify-center text-jet">
                    <Eye className="h-5 w-5" />
                  </div>
                  <h3 className="font-medium">Destaca los beneficios</h3>
                  <p className="text-sm text-muted-foreground">
                    Resalta los beneficios y ventajas de trabajar en tu empresa para atraer a más candidatos
                    cualificados.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-full bg-honey flex items-center justify-center text-jet">
                    <Clock className="h-5 w-5" />
                  </div>
                  <h3 className="font-medium">Responde rápidamente</h3>
                  <p className="text-sm text-muted-foreground">
                    Responde a las aplicaciones lo antes posible para mantener el interés de los candidatos y mejorar tu
                    tasa de conversión.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
