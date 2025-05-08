import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button-custom"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card-custom"
import { Badge } from "@/components/ui/badge-custom"
import { Check, X } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Planes y precios</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Elige el plan que mejor se adapte a tus necesidades de contratación. Todos los planes incluyen acceso a
              nuestra plataforma de reclutamiento.
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center bg-muted rounded-full p-1">
              <button className="px-4 py-2 rounded-full bg-honey text-jet font-medium">Mensual</button>
              <button className="px-4 py-2 rounded-full text-muted-foreground font-medium">
                Anual (20% descuento)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Plan Básico */}
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl">Básico</CardTitle>
                <p className="text-4xl font-bold mt-4">
                  29€<span className="text-muted-foreground text-base font-normal">/mes</span>
                </p>
                <p className="text-sm text-muted-foreground mt-2">Para pequeñas empresas y startups</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-honey mr-2 mt-0.5 flex-shrink-0" />
                    <span>1 oferta de empleo activa</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-honey mr-2 mt-0.5 flex-shrink-0" />
                    <span>Hasta 50 aplicaciones por mes</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-honey mr-2 mt-0.5 flex-shrink-0" />
                    <span>Perfil de empresa básico</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-honey mr-2 mt-0.5 flex-shrink-0" />
                    <span>Gestión de candidatos</span>
                  </li>
                  <li className="flex items-start">
                    <X className="h-5 w-5 text-muted-foreground mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Ofertas destacadas</span>
                  </li>
                  <li className="flex items-start">
                    <X className="h-5 w-5 text-muted-foreground mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Búsqueda avanzada de candidatos</span>
                  </li>
                  <li className="flex items-start">
                    <X className="h-5 w-5 text-muted-foreground mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Reportes y análisis</span>
                  </li>
                  <li className="flex items-start">
                    <X className="h-5 w-5 text-muted-foreground mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Soporte prioritario</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/employer/post-job">Empezar ahora</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Plan Profesional */}
            <Card className="flex flex-col border-honey relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Badge variant="default">Más popular</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Profesional</CardTitle>
                <p className="text-4xl font-bold mt-4">
                  79€<span className="text-muted-foreground text-base font-normal">/mes</span>
                </p>
                <p className="text-sm text-muted-foreground mt-2">Para empresas en crecimiento</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-honey mr-2 mt-0.5 flex-shrink-0" />
                    <span>5 ofertas de empleo activas</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-honey mr-2 mt-0.5 flex-shrink-0" />
                    <span>Aplicaciones ilimitadas</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-honey mr-2 mt-0.5 flex-shrink-0" />
                    <span>Perfil de empresa destacado</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-honey mr-2 mt-0.5 flex-shrink-0" />
                    <span>Gestión avanzada de candidatos</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-honey mr-2 mt-0.5 flex-shrink-0" />
                    <span>1 oferta destacada por mes</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-honey mr-2 mt-0.5 flex-shrink-0" />
                    <span>Búsqueda básica de candidatos</span>
                  </li>
                  <li className="flex items-start">
                    <X className="h-5 w-5 text-muted-foreground mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Reportes y análisis avanzados</span>
                  </li>
                  <li className="flex items-start">
                    <X className="h-5 w-5 text-muted-foreground mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Soporte prioritario</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/employer/post-job">Empezar ahora</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Plan Empresarial */}
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl">Empresarial</CardTitle>
                <p className="text-4xl font-bold mt-4">
                  199€<span className="text-muted-foreground text-base font-normal">/mes</span>
                </p>
                <p className="text-sm text-muted-foreground mt-2">Para empresas medianas y grandes</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-honey mr-2 mt-0.5 flex-shrink-0" />
                    <span>15 ofertas de empleo activas</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-honey mr-2 mt-0.5 flex-shrink-0" />
                    <span>Aplicaciones ilimitadas</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-honey mr-2 mt-0.5 flex-shrink-0" />
                    <span>Perfil de empresa premium</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-honey mr-2 mt-0.5 flex-shrink-0" />
                    <span>Gestión avanzada de candidatos</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-honey mr-2 mt-0.5 flex-shrink-0" />
                    <span>3 ofertas destacadas por mes</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-honey mr-2 mt-0.5 flex-shrink-0" />
                    <span>Búsqueda avanzada de candidatos</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-honey mr-2 mt-0.5 flex-shrink-0" />
                    <span>Reportes y análisis avanzados</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-honey mr-2 mt-0.5 flex-shrink-0" />
                    <span>Soporte prioritario</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/employer/post-job">Empezar ahora</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Planes personalizados */}
          <div className="mt-16 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">¿Necesitas un plan personalizado?</h2>
            <p className="text-muted-foreground mb-6">
              Si tienes necesidades específicas o eres una empresa grande con un alto volumen de contrataciones,
              contáctanos para obtener un plan personalizado.
            </p>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Contactar con ventas</Link>
            </Button>
          </div>

          {/* FAQ */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-8">Preguntas frecuentes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div>
                <h3 className="text-xl font-bold mb-2">¿Puedo cambiar de plan en cualquier momento?</h3>
                <p className="text-muted-foreground">
                  Sí, puedes actualizar o cambiar tu plan en cualquier momento. Los cambios se aplicarán inmediatamente
                  y se ajustará el cobro de forma prorrateada.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">¿Hay un período de prueba?</h3>
                <p className="text-muted-foreground">
                  Ofrecemos una prueba gratuita de 14 días para todos nuestros planes. No se requiere tarjeta de crédito
                  para comenzar.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">¿Qué métodos de pago aceptan?</h3>
                <p className="text-muted-foreground">
                  Aceptamos todas las principales tarjetas de crédito, PayPal y transferencia bancaria para planes
                  anuales.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">¿Puedo cancelar en cualquier momento?</h3>
                <p className="text-muted-foreground">
                  Sí, puedes cancelar tu suscripción en cualquier momento. No hay contratos a largo plazo ni
                  penalizaciones por cancelación.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">¿Ofrecen descuentos para organizaciones sin fines de lucro?</h3>
                <p className="text-muted-foreground">
                  Sí, ofrecemos descuentos especiales para organizaciones sin fines de lucro e instituciones educativas.
                  Contáctanos para más información.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">¿Qué soporte ofrecen?</h3>
                <p className="text-muted-foreground">
                  Todos los planes incluyen soporte por correo electrónico. Los planes Profesional y Empresarial
                  incluyen soporte prioritario con tiempos de respuesta más rápidos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
