"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button-custom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card-custom"
import { ArrowLeft, BarChart3, Calendar, Download, Eye, Filter, TrendingUp, TrendingDown } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select-custom"

export default function ViewsAnalyticsPage() {
  // Usuario de ejemplo
  const user = {
    name: "María Rodríguez",
    role: "employer",
  }

  const [timeRange, setTimeRange] = useState("30d")

  // Datos de ejemplo para las vistas
  const viewsData = {
    total: 310,
    previousPeriod: 245,
    change: 26.5,
    byJob: [
      {
        id: "1",
        title: "Desarrollador Frontend",
        views: 145,
        previousPeriod: 110,
        change: 31.8,
      },
      {
        id: "2",
        title: "Diseñador UX/UI",
        views: 98,
        previousPeriod: 85,
        change: 15.3,
      },
      {
        id: "3",
        title: "Product Manager",
        views: 67,
        previousPeriod: 50,
        change: 34.0,
      },
    ],
    byDay: [
      { date: "01/05", views: 12 },
      { date: "02/05", views: 15 },
      { date: "03/05", views: 10 },
      { date: "04/05", views: 8 },
      { date: "05/05", views: 9 },
      { date: "06/05", views: 11 },
      { date: "07/05", views: 13 },
      { date: "08/05", views: 18 },
      { date: "09/05", views: 20 },
      { date: "10/05", views: 15 },
      { date: "11/05", views: 14 },
      { date: "12/05", views: 12 },
      { date: "13/05", views: 10 },
      { date: "14/05", views: 8 },
    ],
    bySource: [
      { source: "Búsqueda directa", views: 120, percentage: 38.7 },
      { source: "Redes sociales", views: 85, percentage: 27.4 },
      { source: "Email", views: 45, percentage: 14.5 },
      { source: "Referencias", views: 35, percentage: 11.3 },
      { source: "Otros", views: 25, percentage: 8.1 },
    ],
    byDevice: [
      { device: "Móvil", views: 185, percentage: 59.7 },
      { device: "Escritorio", views: 95, percentage: 30.6 },
      { device: "Tablet", views: 30, percentage: 9.7 },
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
                <h1 className="text-3xl font-bold">Análisis de vistas</h1>
                <p className="text-muted-foreground">Estadísticas detalladas sobre las vistas de tus empleos</p>
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

          {/* Resumen de vistas */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Resumen de vistas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Total de vistas</p>
                  <div className="flex items-center">
                    <p className="text-3xl font-bold mr-2">{viewsData.total}</p>
                    <div className="flex items-center text-sm">
                      {viewsData.change > 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span className={viewsData.change > 0 ? "text-green-500" : "text-red-500"}>
                        {viewsData.change > 0 ? "+" : ""}
                        {viewsData.change}%
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">vs. {viewsData.previousPeriod} en el período anterior</p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Promedio diario</p>
                  <p className="text-3xl font-bold">{Math.round(viewsData.total / 30)}</p>
                  <p className="text-xs text-muted-foreground">en los últimos 30 días</p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Pico de vistas</p>
                  <p className="text-3xl font-bold">20</p>
                  <p className="text-xs text-muted-foreground">el 09/05/2023</p>
                </div>
              </div>

              {/* Gráfico de vistas (simulado) */}
              <div className="mt-8 h-64 bg-muted/30 rounded-md flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Gráfico de vistas por día</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vistas por empleo */}
          <Card className="mb-8">
            <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <CardTitle>Vistas por empleo</CardTitle>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filtrar
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {viewsData.byJob.map((job) => (
                  <div key={job.id} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div>
                        <h3 className="font-medium">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">ID: {job.id}</p>
                      </div>
                      <div className="flex items-center">
                        <div className="flex items-center mr-4">
                          <Eye className="h-4 w-4 text-muted-foreground mr-1" />
                          <span className="font-medium">{job.views}</span>
                        </div>
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
                    <div className="mt-2 w-full bg-muted h-2 rounded-full">
                      <div
                        className="bg-honey h-2 rounded-full"
                        style={{ width: `${(job.views / viewsData.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Fuentes de tráfico y dispositivos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Fuentes de tráfico</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {viewsData.bySource.map((source) => (
                    <div key={source.source}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">{source.source}</span>
                        <span className="text-sm font-medium">
                          {source.views} ({source.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-muted h-2 rounded-full">
                        <div className="bg-honey h-2 rounded-full" style={{ width: `${source.percentage}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dispositivos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {viewsData.byDevice.map((device) => (
                    <div key={device.device}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">{device.device}</span>
                        <span className="text-sm font-medium">
                          {device.views} ({device.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-muted h-2 rounded-full">
                        <div className="bg-honey h-2 rounded-full" style={{ width: `${device.percentage}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
