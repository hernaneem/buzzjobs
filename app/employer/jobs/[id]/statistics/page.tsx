"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button-custom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card-custom"
import { Badge } from "@/components/ui/badge-custom"
import {
  ArrowLeft,
  BarChart3,
  Download,
  Eye,
  TrendingUp,
  TrendingDown,
  Users,
  MapPin,
  Clock,
  Share2,
} from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select-custom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function JobStatisticsPage({ params }: { params: { id: string } }) {
  // Usuario de ejemplo
  const user = {
    name: "María Rodríguez",
    role: "employer",
  }

  const [timeRange, setTimeRange] = useState("30d")
  const [activeTab, setActiveTab] = useState("overview")

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

  // Datos de ejemplo para las estadísticas
  const stats = {
    views: {
      total: 145,
      previousPeriod: 110,
      change: 31.8,
      byDay: [
        { date: "01/05", views: 8 },
        { date: "02/05", views: 10 },
        { date: "03/05", views: 7 },
        { date: "04/05", views: 5 },
        { date: "05/05", views: 6 },
        { date: "06/05", views: 8 },
        { date: "07/05", views: 9 },
        { date: "08/05", views: 12 },
        { date: "09/05", views: 15 },
        { date: "10/05", views: 10 },
        { date: "11/05", views: 9 },
        { date: "12/05", views: 8 },
        { date: "13/05", views: 7 },
        { date: "14/05", views: 6 },
      ],
      bySource: [
        { source: "Búsqueda directa", views: 60, percentage: 41.4 },
        { source: "Redes sociales", views: 35, percentage: 24.1 },
        { source: "Email", views: 20, percentage: 13.8 },
        { source: "Referencias", views: 18, percentage: 12.4 },
        { source: "Otros", views: 12, percentage: 8.3 },
      ],
      byDevice: [
        { device: "Móvil", views: 85, percentage: 58.6 },
        { device: "Escritorio", views: 45, percentage: 31.0 },
        { device: "Tablet", views: 15, percentage: 10.4 },
      ],
    },
    applicants: {
      total: 12,
      previousPeriod: 8,
      change: 50.0,
      byDay: [
        { date: "01/05", applicants: 0 },
        { date: "02/05", applicants: 1 },
        { date: "03/05", applicants: 0 },
        { date: "04/05", applicants: 1 },
        { date: "05/05", applicants: 0 },
        { date: "06/05", applicants: 1 },
        { date: "07/05", applicants: 0 },
        { date: "08/05", applicants: 2 },
        { date: "09/05", applicants: 3 },
        { date: "10/05", applicants: 1 },
        { date: "11/05", applicants: 1 },
        { date: "12/05", applicants: 0 },
        { date: "13/05", applicants: 1 },
        { date: "14/05", applicants: 1 },
      ],
      byStatus: [
        { status: "new", count: 3, percentage: 25.0 },
        { status: "screening", count: 5, percentage: 41.7 },
        { status: "interview", count: 2, percentage: 16.7 },
        { status: "offer", count: 1, percentage: 8.3 },
        { status: "hired", count: 0, percentage: 0.0 },
        { status: "rejected", count: 1, percentage: 8.3 },
      ],
      byLocation: [
        { location: "Madrid", count: 5, percentage: 41.7 },
        { location: "Barcelona", count: 3, percentage: 25.0 },
        { location: "Valencia", count: 2, percentage: 16.7 },
        { location: "Sevilla", count: 1, percentage: 8.3 },
        { location: "Otras", count: 1, percentage: 8.3 },
      ],
    },
    conversion: {
      rate: 8.3,
      previousPeriod: 7.3,
      change: 13.7,
    },
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
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-3xl font-bold">{job.title}</h1>
                  <Badge variant={job.status === "active" ? "new" : "outline"}>
                    {job.status === "active" ? "Activo" : "Inactivo"}
                  </Badge>
                  {job.isRemote && <Badge variant="remote">Remoto</Badge>}
                  {job.isUrgent && <Badge variant="urgent">Urgente</Badge>}
                </div>
                <div className="flex items-center text-muted-foreground gap-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Publicado: {job.postedAt}
                  </div>
                </div>
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
                    <SelectItem value="all">Todo el período</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Exportar</span>
                </Button>
                <Button variant="outline" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Compartir</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Resumen de estadísticas */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Vistas totales</p>
                    <p className="text-2xl font-bold">{stats.views.total}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <Eye className="h-5 w-5 text-honey" />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <Link href="#views" className="text-sm text-honey flex items-center hover:underline">
                    Ver detalles
                    <ArrowLeft className="h-4 w-4 ml-1 rotate-180" />
                  </Link>
                  <div className="flex items-center text-xs">
                    {stats.views.change > 0 ? (
                      <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                    )}
                    <span className={stats.views.change > 0 ? "text-green-500" : "text-red-500"}>
                      {stats.views.change > 0 ? "+" : ""}
                      {stats.views.change}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Aplicantes</p>
                    <p className="text-2xl font-bold">{stats.applicants.total}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <Users className="h-5 w-5 text-honey" />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <Link href="#applicants" className="text-sm text-honey flex items-center hover:underline">
                    Ver detalles
                    <ArrowLeft className="h-4 w-4 ml-1 rotate-180" />
                  </Link>
                  <div className="flex items-center text-xs">
                    {stats.applicants.change > 0 ? (
                      <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                    )}
                    <span className={stats.applicants.change > 0 ? "text-green-500" : "text-red-500"}>
                      {stats.applicants.change > 0 ? "+" : ""}
                      {stats.applicants.change}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Tasa de conversión</p>
                    <p className="text-2xl font-bold">{stats.conversion.rate}%</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-honey" />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <Link href="#conversion" className="text-sm text-honey flex items-center hover:underline">
                    Ver detalles
                    <ArrowLeft className="h-4 w-4 ml-1 rotate-180" />
                  </Link>
                  <div className="flex items-center text-xs">
                    {stats.conversion.change > 0 ? (
                      <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                    )}
                    <span className={stats.conversion.change > 0 ? "text-green-500" : "text-red-500"}>
                      {stats.conversion.change > 0 ? "+" : ""}
                      {stats.conversion.change}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pestañas de estadísticas */}
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
              <TabsTrigger value="overview">Resumen</TabsTrigger>
              <TabsTrigger value="views" id="views">
                Vistas
              </TabsTrigger>
              <TabsTrigger value="applicants" id="applicants">
                Aplicantes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tendencia de vistas y aplicaciones</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Gráfico de tendencia (simulado) */}
                    <div className="h-64 bg-muted/30 rounded-md flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">Gráfico de tendencia</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Vistas</span>
                          <div className="flex items-center text-xs">
                            {stats.views.change > 0 ? (
                              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                            ) : (
                              <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                            )}
                            <span className={stats.views.change > 0 ? "text-green-500" : "text-red-500"}>
                              {stats.views.change > 0 ? "+" : ""}
                              {stats.views.change}%
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Actual</span>
                          <span className="font-medium">{stats.views.total}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Anterior</span>
                          <span className="text-muted-foreground">{stats.views.previousPeriod}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Aplicantes</span>
                          <div className="flex items-center text-xs">
                            {stats.applicants.change > 0 ? (
                              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                            ) : (
                              <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                            )}
                            <span className={stats.applicants.change > 0 ? "text-green-500" : "text-red-500"}>
                              {stats.applicants.change > 0 ? "+" : ""}
                              {stats.applicants.change}%
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Actual</span>
                          <span className="font-medium">{stats.applicants.total}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Anterior</span>
                          <span className="text-muted-foreground">{stats.applicants.previousPeriod}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Distribución de aplicantes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Por estado</h4>
                      <div className="space-y-3">
                        {stats.applicants.byStatus.map((status) => (
                          <div key={status.status}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">
                                {status.status === "new"
                                  ? "Nuevo"
                                  : status.status === "screening"
                                    ? "Preselección"
                                    : status.status === "interview"
                                      ? "Entrevista"
                                      : status.status === "offer"
                                        ? "Oferta"
                                        : status.status === "hired"
                                          ? "Contratado"
                                          : "Rechazado"}
                              </span>
                              <span className="text-sm font-medium">
                                {status.count} ({status.percentage}%)
                              </span>
                            </div>
                            <div className="w-full bg-muted h-2 rounded-full">
                              <div
                                className={`h-2 rounded-full ${
                                  status.status === "new"
                                    ? "bg-honey"
                                    : status.status === "screening"
                                      ? "bg-amber-400"
                                      : status.status === "interview"
                                        ? "bg-amber-500"
                                        : status.status === "offer"
                                          ? "bg-green-500"
                                          : status.status === "hired"
                                            ? "bg-blue-500"
                                            : "bg-red-500"
                                }`}
                                style={{ width: `${status.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <h4 className="text-sm font-medium mt-6">Por ubicación</h4>
                      <div className="space-y-3">
                        {stats.applicants.byLocation.map((location) => (
                          <div key={location.location}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">{location.location}</span>
                              <span className="text-sm font-medium">
                                {location.count} ({location.percentage}%)
                              </span>
                            </div>
                            <div className="w-full bg-muted h-2 rounded-full">
                              <div
                                className="bg-honey h-2 rounded-full"
                                style={{ width: `${location.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="views">
              <Card>
                <CardHeader>
                  <CardTitle>Análisis detallado de vistas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Gráfico de vistas por día (simulado) */}
                    <div className="h-64 bg-muted/30 rounded-md flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">Gráfico de vistas por día</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium mb-4">Fuentes de tráfico</h4>
                        <div className="space-y-3">
                          {stats.views.bySource.map((source) => (
                            <div key={source.source}>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm">{source.source}</span>
                                <span className="text-sm font-medium">
                                  {source.views} ({source.percentage}%)
                                </span>
                              </div>
                              <div className="w-full bg-muted h-2 rounded-full">
                                <div
                                  className="bg-honey h-2 rounded-full"
                                  style={{ width: `${source.percentage}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-4">Dispositivos</h4>
                        <div className="space-y-3">
                          {stats.views.byDevice.map((device) => (
                            <div key={device.device}>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm">{device.device}</span>
                                <span className="text-sm font-medium">
                                  {device.views} ({device.percentage}%)
                                </span>
                              </div>
                              <div className="w-full bg-muted h-2 rounded-full">
                                <div
                                  className="bg-honey h-2 rounded-full"
                                  style={{ width: `${device.percentage}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="applicants">
              <Card>
                <CardHeader>
                  <CardTitle>Análisis detallado de aplicantes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Gráfico de aplicantes por día (simulado) */}
                    <div className="h-64 bg-muted/30 rounded-md flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">Gráfico de aplicantes por día</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium mb-4">Estado de los aplicantes</h4>
                        <div className="space-y-3">
                          {stats.applicants.byStatus.map((status) => (
                            <div key={status.status}>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm">
                                  {status.status === "new"
                                    ? "Nuevo"
                                    : status.status === "screening"
                                      ? "Preselección"
                                      : status.status === "interview"
                                        ? "Entrevista"
                                        : status.status === "offer"
                                          ? "Oferta"
                                          : status.status === "hired"
                                            ? "Contratado"
                                            : "Rechazado"}
                                </span>
                                <span className="text-sm font-medium">
                                  {status.count} ({status.percentage}%)
                                </span>
                              </div>
                              <div className="w-full bg-muted h-2 rounded-full">
                                <div
                                  className={`h-2 rounded-full ${
                                    status.status === "new"
                                      ? "bg-honey"
                                      : status.status === "screening"
                                        ? "bg-amber-400"
                                        : status.status === "interview"
                                          ? "bg-amber-500"
                                          : status.status === "offer"
                                            ? "bg-green-500"
                                            : status.status === "hired"
                                              ? "bg-blue-500"
                                              : "bg-red-500"
                                  }`}
                                  style={{ width: `${status.percentage}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-4">Ubicación de los aplicantes</h4>
                        <div className="space-y-3">
                          {stats.applicants.byLocation.map((location) => (
                            <div key={location.location}>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm">{location.location}</span>
                                <span className="text-sm font-medium">
                                  {location.count} ({location.percentage}%)
                                </span>
                              </div>
                              <div className="w-full bg-muted h-2 rounded-full">
                                <div
                                  className="bg-honey h-2 rounded-full"
                                  style={{ width: `${location.percentage}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button asChild>
                        <Link href={`/employer/jobs/${job.id}/candidates`}>Ver todos los candidatos</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
