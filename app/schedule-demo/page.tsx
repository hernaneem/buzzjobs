import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button-custom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input-custom"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { BeeIcon } from "@/components/bee-icon"
import { HoneycombBackground } from "@/components/honeycomb-background"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select-custom"
import { CalendarDays  SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select-custom"
import { CalendarDays, Clock, Building, Users, Check } from 'lucide-react'

export const metadata: Metadata = {
  title: "Agendar una Demo | BuzzJobs",
  description: "Agenda una demostración personalizada de BuzzJobs para conocer todas las funcionalidades que ofrecemos para tu empresa.",
}

export default function ScheduleDemo() {
  return (
    <div className="relative min-h-screen">
      <HoneycombBackground className="fixed inset-0 z-0 opacity-5" />
      
      <div className="container relative z-10 py-12 md:py-20">
        <div className="flex flex-col items-center text-center mb-12">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <BeeIcon size={40} />
            <span className="font-bold text-2xl">BuzzJobs</span>
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Descubre cómo <span className="text-honey">BuzzJobs</span> puede transformar tu proceso de contratación
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Agenda una demostración personalizada con uno de nuestros expertos y conoce todas las funcionalidades que tenemos para tu empresa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="border-2 border-honey/20">
            <CardHeader>
              <CardTitle className="text-2xl">Agenda tu demo</CardTitle>
              <CardDescription>
                Completa el formulario y nos pondremos en contacto contigo para coordinar la demostración.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input id="name" placeholder="Tu nombre" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input id="email" type="email" placeholder="tu@empresa.com" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Empresa</Label>
                    <Input id="company" placeholder="Nombre de tu empresa" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" placeholder="+52 123 456 7890" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-size">Tamaño de la empresa</Label>
                    <Select>
                      <SelectTrigger id="company-size">
                        <SelectValue placeholder="Selecciona una opción" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 empleados</SelectItem>
                        <SelectItem value="11-50">11-50 empleados</SelectItem>
                        <SelectItem value="51-200">51-200 empleados</SelectItem>
                        <SelectItem value="201-500">201-500 empleados</SelectItem>
                        <SelectItem value="501+">501+ empleados</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hiring-needs">Necesidades de contratación</Label>
                    <Select>
                      <SelectTrigger id="hiring-needs">
                        <SelectValue placeholder="Selecciona una opción" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-5">1-5 posiciones al mes</SelectItem>
                        <SelectItem value="6-10">6-10 posiciones al mes</SelectItem>
                        <SelectItem value="11-20">11-20 posiciones al mes</SelectItem>
                        <SelectItem value="21+">21+ posiciones al mes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">¿Qué te gustaría conocer de BuzzJobs?</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Cuéntanos sobre tus necesidades específicas y qué te gustaría ver en la demo..."
                    rows={4}
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Solicitar demo</Button>
            </CardFooter>
          </Card>
          
          <div className="space-y-6">
            <div className="bg-honey/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">¿Por qué elegir BuzzJobs?</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-honey rounded-full p-2 mt-1">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium">Acceso a talento de calidad</h4>
                    <p className="text-muted-foreground">Conecta con los mejores candidatos para tus vacantes.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-honey rounded-full p-2 mt-1">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium">Ahorra tiempo en el proceso</h4>
                    <p className="text-muted-foreground">Automatiza tareas repetitivas y enfócate en lo importante.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-honey rounded-full p-2 mt-1">
                    <Building className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium">Mejora tu marca empleadora</h4>
                    <p className="text-muted-foreground">Destaca tu empresa y atrae a los mejores talentos.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-honey rounded-full p-2 mt-1">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium">Decisiones basadas en datos</h4>
                    <p className="text-muted-foreground">Analíticas detalladas para optimizar tu estrategia de contratación.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Horarios disponibles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-md border hover:bg-muted cursor-pointer">
                    <CalendarDays className="h-5 w-5 text-honey" />
                    <div>
                      <p className="font-medium">Lunes a Viernes</p>
                      <p className="text-sm text-muted-foreground">9:00 AM - 6:00 PM (CST)</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Las demos tienen una duración aproximada de 30 minutos y son completamente personalizadas según tus necesidades.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
