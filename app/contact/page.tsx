"use client"

import Link from "next/link"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button-custom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card-custom"
import { Input } from "@/components/ui/input-custom"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select-custom"
import { BeeConfetti } from "@/components/bee-confetti"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implementar lógica de envío de formulario
    console.log("Form submitted:", formData)
    setIsSubmitted(true)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Contacta con nosotros</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              ¿Tienes alguna pregunta o comentario? Estamos aquí para ayudarte. Completa el formulario y nos pondremos
              en contacto contigo lo antes posible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Información de contacto */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-honey flex items-center justify-center flex-shrink-0">
                        <Mail className="h-5 w-5 text-jet" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Email</h3>
                        <p className="text-muted-foreground">info@buzzjobs.example.com</p>
                        <p className="text-muted-foreground">soporte@buzzjobs.example.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-honey flex items-center justify-center flex-shrink-0">
                        <Phone className="h-5 w-5 text-jet" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Teléfono</h3>
                        <p className="text-muted-foreground">+34 912 345 678</p>
                        <p className="text-muted-foreground">Lun-Vie: 9:00 - 18:00</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-honey flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-5 w-5 text-jet" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Dirección</h3>
                        <p className="text-muted-foreground">Calle Gran Vía, 28</p>
                        <p className="text-muted-foreground">28013 Madrid, España</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Horario de atención</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Lunes - Viernes</span>
                      <span>9:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sábado</span>
                      <span>10:00 - 14:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Domingo</span>
                      <span>Cerrado</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Formulario de contacto */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Envíanos un mensaje</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 rounded-full bg-honey mx-auto flex items-center justify-center mb-4">
                        <Send className="h-8 w-8 text-jet" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">¡Mensaje enviado!</h3>
                      <p className="text-muted-foreground mb-6">
                        Gracias por contactarnos. Nos pondremos en contacto contigo lo antes posible.
                      </p>
                      <Button onClick={() => setIsSubmitted(false)}>Enviar otro mensaje</Button>
                      <BeeConfetti count={5} />
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nombre completo *</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Tu nombre"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="tu@email.com"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Asunto *</Label>
                        <Select value={formData.subject} onValueChange={handleSelectChange} required>
                          <SelectTrigger id="subject">
                            <SelectValue placeholder="Selecciona un asunto" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">Consulta general</SelectItem>
                            <SelectItem value="support">Soporte técnico</SelectItem>
                            <SelectItem value="sales">Ventas y precios</SelectItem>
                            <SelectItem value="partnership">Colaboraciones</SelectItem>
                            <SelectItem value="other">Otro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Mensaje *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          placeholder="¿En qué podemos ayudarte?"
                          className="min-h-[150px]"
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="privacy"
                          className="h-4 w-4 rounded border-gray-300 text-honey focus:ring-honey"
                          required
                        />
                        <label htmlFor="privacy" className="text-sm text-muted-foreground">
                          Acepto la{" "}
                          <Link href="/privacy" className="text-honey hover:underline">
                            política de privacidad
                          </Link>
                        </label>
                      </div>

                      <Button type="submit" className="w-full">
                        Enviar mensaje
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Mapa */}
          <div className="mt-12">
            <div className="rounded-xl overflow-hidden shadow-medium h-[400px] bg-muted flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Mapa de ubicación</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
