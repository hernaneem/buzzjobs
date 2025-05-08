"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button-custom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card-custom"
import { ArrowLeft, BarChart3, Calendar, Download, Filter, TrendingUp, TrendingDown, Users, Eye } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select-custom"

export default function ConversionAnalyticsPage() {
  // Usuario de ejemplo
  const user = {
    name: "María Rodríguez",
    role: "employer",
  }

  const [timeRange, setTimeRange] = useState("30d")

  // Datos de ejemplo para la conversión
  const conversionData = {
    rate: 7.4,
    previousPeriod: 6.2,
    change: 19.4,
    totalViews: 310,
    totalApplicants: 23,
    byJob: [
      {
        id: "1",
        title: "Desarrollador Frontend",
        views: 145,
        applicants: 12,
        rate: 8.3,
        previousRate: 7.5,
        change: 10.7,
      },
      {
        id: "2",
        title: "Diseñador UX/UI",
        views: 98,
        applicants: 8,
        rate: 8.2,
        previousRate: 7.0,
        change: 17.1,
      },
      {
        id: "3",
        title: "Product Manager",
        views: 67,
        applicants: 3,
        rate: 4.5,
        previousRate: 3.8,
        change: 18.4,
      },
    ],
    byDay: [
      { date: "01/05", rate: 6.5 },
      { date: "02/05", rate: 7.0 },
      { date: "03/05", rate: 6.8 },
      { date: "04/05", rate: 7.2 },
      { date: "05/05", rate: 7.5 },
      { date: "06/05", rate: 7.3 },
      { date: "07/05", rate: 7.8 },
      { date: "08/05", rate: 8.0 },
      { date: "09/05", rate: 8.2 },
      { date: "10/05", rate: 7.9 },
      { date: "11/05", rate: 7.7 },
      { date: "12/05", rate: 7.5 },
      { date: "13/05", rate: 7.6 },
      { date: "14/05", rate: 7.8 },
    ],
    byLocation: [
      { location: "Madrid", rate: 8.5, applicants: 10 },
      { location: "Barcelona", rate: 7.8, applicants: 7 },
      { location: "Valencia", rate: 6.2, applicants: 3 },
      { location: "Sevilla", rate: 5.5, applicants: 2 },
      { location: "Otras", rate: 4.0, applicants: 1 },
    ],
    byExperience: [
      { level: "Sin experiencia", rate: 5.2, applicants: 3 },
      { level: "1-2 años", rate: 6.8, applicants: 5 },
      { level: "3-5 años", rate: 8.5, applicants: 9 },
      { level: "5-7 años", rate: 7.2, applicants: 4 },
      { level: "8+ años", rate: 6.0, applicants: 2 },
    ],
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} />

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <Link
              href="/employer/dashboard"
              className="text-sm text-muted-foreground hover:text-honey flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Volver al dashboard
            </Link>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4">
              <div>
                <h1 className="text-3xl font-bold">Análisis de conversión</h1>
                <p className="text-muted-foreground">
                  Estadísticas detalladas sobre la tasa de conversión de tus empleos
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Seleccionar período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Últimos 7 días</SelectItem>
                    <SelectItem value="30d">Últimos 30 días</SelectItem>
                    <SelectItem value="90d">Últimos 90 días</SelectItem>
                    <SelectItem value="year">Último año</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="hidden sm:inline">Personalizar</span>
                </Button>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Exportar</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Resumen de conversión */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Resumen de conversión</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Tasa de conversión</p>
                  <div className="flex items-center">
                    <p className="text-3xl font-bold mr-2">{conversionData.rate}%</p>
                    <div className="flex items-center text-sm">
                      {conversionData.change > 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span className={conversionData.change > 0 ? "text-green-500" : "text-red-500"}>
                        {conversionData.change > 0 ? "+" : ""}
                        {conversionData.change}%
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    vs. {conversionData.previousPeriod}% en el período anterior
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Total de vistas</p>
                  <p className="text-3xl font-bold">{conversionData.totalViews}</p>
                  <p className="text-xs text-muted-foreground">en los últimos 30 días</p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Total de aplicaciones</p>
                  <p className="text-3xl font-bold">{conversionData.totalApplicants}</p>
                  <p className="text-xs text-muted-foreground">en los últimos 30 días</p>
                </div>
              </div>

              {/* Gráfico de conversión (simulado) */}
              <div className="mt-8 h-64 bg-muted/30 rounded-md flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Gráfico de tasa de conversión por día</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Conversión por empleo */}
          <Card className="mb-8">
            <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <CardTitle>Conversión por empleo</CardTitle>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filtrar
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {conversionData.byJob.map((job) => (
                  <div key={job.id} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div>
                        <h3 className="font-medium">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">ID: {job.id}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 text-muted-foreground mr-1" />
                          <span className="text-sm">{job.views} vistas</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-muted-foreground mr-1" />
                          <span className="text-sm">{job.applicants} aplicantes</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium mr-2">{job.rate}%</span>
                          <div className="flex items-center text-sm">
                            {job.change > 0 ? (
                              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                            )}
                            <span className={job.change > 0 ? "text-green-500" : "text-red-500"}>
                              {job.change > 0 ? "+" : ""}
                              {job.change}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 w-full bg-muted h-2 rounded-full">
                      <div className="bg-honey h-2 rounded-full" style={{ width: `${(job.rate / 10) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Conversión por ubicación y experiencia */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Conversión por ubicación</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conversionData.byLocation.map((location) => (
                    <div key={location.location}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">{location.location}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{location.applicants} aplicantes</span>
                          <span className="text-sm font-medium">{location.rate}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-muted h-2 rounded-full">
                        <div
                          className="bg-honey h-2 rounded-full"
                          style={{ width: `${(location.rate / 10) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conversión por experiencia</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conversionData.byExperience.map((experience) => (
                    <div key={experience.level}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">{experience.level}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{experience.applicants} aplicantes</span>
                          <span className="text-sm font-medium">{experience.rate}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-muted h-2 rounded-full">
                        <div
                          className="bg-honey h-2 rounded-full"
                          style={{ width: `${(experience.rate / 10) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recomendaciones */}
          <Card>
            <CardHeader>
              <CardTitle>Recomendaciones para mejorar la conversión</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-honey flex items-center justify-center text-jet font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium">Mejora la descripción del puesto</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Las descripciones detalladas y claras aumentan la tasa de conversión. Asegúrate de incluir
                      información sobre responsabilidades, requisitos y beneficios.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-honey flex items-center justify-center text-jet font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium">Optimiza el proceso de aplicación</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Un proceso de aplicación sencillo y rápido puede aumentar significativamente la tasa de
                      conversión. Reduce el número de pasos y campos requeridos.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-honey flex items-center justify-center text-jet font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium">Incluye información salarial</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Las ofertas con información salarial reciben hasta un 30% más de aplicaciones. Considera incluir
                      un rango salarial en tus ofertas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-honey flex items-center justify-center text-jet font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-medium">Destaca los beneficios</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Resalta los beneficios y ventajas de trabajar en tu empresa. Esto puede marcar la diferencia para
                      que un candidato decida aplicar.
                    </p>
                  </div>
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
