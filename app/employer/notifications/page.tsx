"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button-custom"
import { Card, CardContent } from "@/components/ui/card-custom"
import { Badge } from "@/components/ui/badge-custom"
import {
  ArrowLeft,
  Bell,
  CheckCircle,
  Briefcase,
  Calendar,
  MessageSquare,
  AlertCircle,
  Settings,
  Users,
  Search,
  Trash2,
} from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input-custom"

// Tipos para las notificaciones
type NotificationType = "candidate" | "job" | "interview" | "message" | "alert" | "system"

interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type: NotificationType
  relatedId?: string
  relatedType?: string
  actionLink?: string
  actionText?: string
}

export default function EmployerNotifications() {
  // Estado para las notificaciones
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Nuevo candidato",
      message: "Javier García ha aplicado para Desarrollador Frontend",
      time: "Hace 1 día",
      read: false,
      type: "candidate",
      relatedId: "1",
      relatedType: "job",
      actionLink: "/employer/candidates/1",
      actionText: "Ver candidato",
    },
    {
      id: "2",
      title: "Entrevista programada",
      message: "Entrevista con Laura Sánchez mañana a las 10:00",
      time: "Hace 2 días",
      read: true,
      type: "interview",
      relatedId: "2",
      relatedType: "candidate",
      actionLink: "/employer/interviews/2",
      actionText: "Ver detalles",
    },
    {
      id: "3",
      title: "Empleo destacado",
      message: "Tu empleo 'Diseñador UX/UI' ha sido destacado",
      time: "Hace 3 días",
      read: true,
      type: "job",
      relatedId: "2",
      relatedType: "job",
      actionLink: "/employer/jobs/2",
      actionText: "Ver empleo",
    },
    {
      id: "4",
      title: "Mensaje nuevo",
      message: "Has recibido un mensaje de Carlos Méndez",
      time: "Hace 4 días",
      read: false,
      type: "message",
      relatedId: "1",
      relatedType: "candidate",
      actionLink: "/employer/messages/1",
      actionText: "Ver mensaje",
    },
    {
      id: "5",
      title: "Alerta de suscripción",
      message: "Tu suscripción Premium expirará en 7 días",
      time: "Hace 5 días",
      read: false,
      type: "alert",
      actionLink: "/employer/settings",
      actionText: "Renovar suscripción",
    },
    {
      id: "6",
      title: "Actualización del sistema",
      message: "Nuevas funcionalidades disponibles en tu panel",
      time: "Hace 1 semana",
      read: true,
      type: "system",
      actionLink: "/employer/dashboard",
      actionText: "Explorar novedades",
    },
    {
      id: "7",
      title: "Candidato actualizado",
      message: "Ana Martínez ha actualizado su perfil",
      time: "Hace 1 semana",
      read: true,
      type: "candidate",
      relatedId: "4",
      relatedType: "candidate",
      actionLink: "/employer/candidates/4",
      actionText: "Ver perfil",
    },
    {
      id: "8",
      title: "Estadísticas semanales",
      message: "El resumen de estadísticas de tus empleos está disponible",
      time: "Hace 1 semana",
      read: true,
      type: "job",
      actionLink: "/employer/analytics",
      actionText: "Ver estadísticas",
    },
    {
      id: "9",
      title: "Recordatorio de entrevista",
      message: "Tienes una entrevista con Miguel Torres en 2 horas",
      time: "Hace 1 semana",
      read: true,
      type: "interview",
      relatedId: "5",
      relatedType: "candidate",
      actionLink: "/employer/interviews/5",
      actionText: "Ver detalles",
    },
    {
      id: "10",
      title: "Nuevo mensaje",
      message: "Has recibido un mensaje de Laura Sánchez",
      time: "Hace 2 semanas",
      read: true,
      type: "message",
      relatedId: "2",
      relatedType: "candidate",
      actionLink: "/employer/messages/2",
      actionText: "Ver mensaje",
    },
  ])

  // Estado para el filtro de búsqueda
  const [searchQuery, setSearchQuery] = useState("")

  // Estado para el filtro de tipo
  const [filter, setFilter] = useState<NotificationType | "all">("all")

  // Función para marcar una notificación como leída
  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  // Función para marcar todas las notificaciones como leídas
  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  // Función para eliminar una notificación
  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  // Filtrar notificaciones según el filtro activo y la búsqueda
  const filteredNotifications = notifications.filter((notification) => {
    // Filtro por tipo
    const typeMatch = filter === "all" || notification.type === filter

    // Filtro por búsqueda
    const searchMatch =
      !searchQuery ||
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase())

    return typeMatch && searchMatch
  })

  // Obtener el icono según el tipo de notificación
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "candidate":
        return <Users className="h-5 w-5 text-honey" />
      case "job":
        return <Briefcase className="h-5 w-5 text-honey" />
      case "interview":
        return <Calendar className="h-5 w-5 text-honey" />
      case "message":
        return <MessageSquare className="h-5 w-5 text-honey" />
      case "alert":
        return <AlertCircle className="h-5 w-5 text-honey" />
      case "system":
        return <Settings className="h-5 w-5 text-honey" />
    }
  }

  // Contar notificaciones no leídas
  const unreadCount = notifications.filter((n) => !n.read).length

  // Contar notificaciones no leídas por tipo
  const getUnreadCountByType = (type: NotificationType) => {
    return notifications.filter((n) => n.type === type && !n.read).length
  }

  return (
    <div className="py-8">
      <div className="container px-4 md:px-6">
        <div className="mb-8">
          <Link href="/employer/dashboard" className="text-sm text-muted-foreground hover:text-honey flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Volver al dashboard
          </Link>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4">
            <div>
              <h1 className="text-3xl font-bold">Notificaciones</h1>
              <p className="text-muted-foreground">
                {unreadCount > 0
                  ? `Tienes ${unreadCount} ${unreadCount === 1 ? "notificación" : "notificaciones"} sin leer`
                  : "No tienes notificaciones sin leer"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
                <CheckCircle className="h-4 w-4 mr-1" />
                Marcar todas como leídas
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/employer/settings/notifications">
                  <Settings className="h-4 w-4 mr-1" />
                  Configurar
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filtros */}
          <div className="w-full md:w-1/4">
            <Card>
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar notificaciones..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <Button
                    variant={filter === "all" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setFilter("all")}
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    Todas
                    {unreadCount > 0 && (
                      <Badge className="ml-auto" variant="default">
                        {unreadCount}
                      </Badge>
                    )}
                  </Button>
                  <Button
                    variant={filter === "candidate" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setFilter("candidate")}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Candidatos
                    {getUnreadCountByType("candidate") > 0 && (
                      <Badge className="ml-auto" variant="default">
                        {getUnreadCountByType("candidate")}
                      </Badge>
                    )}
                  </Button>
                  <Button
                    variant={filter === "job" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setFilter("job")}
                  >
                    <Briefcase className="mr-2 h-4 w-4" />
                    Empleos
                    {getUnreadCountByType("job") > 0 && (
                      <Badge className="ml-auto" variant="default">
                        {getUnreadCountByType("job")}
                      </Badge>
                    )}
                  </Button>
                  <Button
                    variant={filter === "interview" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setFilter("interview")}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Entrevistas
                    {getUnreadCountByType("interview") > 0 && (
                      <Badge className="ml-auto" variant="default">
                        {getUnreadCountByType("interview")}
                      </Badge>
                    )}
                  </Button>
                  <Button
                    variant={filter === "message" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setFilter("message")}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Mensajes
                    {getUnreadCountByType("message") > 0 && (
                      <Badge className="ml-auto" variant="default">
                        {getUnreadCountByType("message")}
                      </Badge>
                    )}
                  </Button>
                  <Button
                    variant={filter === "alert" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setFilter("alert")}
                  >
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Alertas
                    {getUnreadCountByType("alert") > 0 && (
                      <Badge className="ml-auto" variant="default">
                        {getUnreadCountByType("alert")}
                      </Badge>
                    )}
                  </Button>
                  <Button
                    variant={filter === "system" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setFilter("system")}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Sistema
                    {getUnreadCountByType("system") > 0 && (
                      <Badge className="ml-auto" variant="default">
                        {getUnreadCountByType("system")}
                      </Badge>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Listado de notificaciones */}
          <div className="w-full md:w-3/4">
            {filteredNotifications.length > 0 ? (
              <div className="space-y-4">
                {filteredNotifications.map((notification) => (
                  <Card
                    key={notification.id}
                    className={`overflow-hidden transition-colors ${
                      !notification.read ? "border-honey/50 bg-honey/5" : ""
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium">{notification.title}</h3>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">{notification.time}</span>
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  <CheckCircle className="h-4 w-4" />
                                  <span className="sr-only">Marcar como leída</span>
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                                onClick={() => deleteNotification(notification.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Eliminar</span>
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                          {notification.actionLink && (
                            <Button variant="link" className="p-0 h-auto text-honey" asChild>
                              <Link href={notification.actionLink}>{notification.actionText}</Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-muted/30">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Bell className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No hay notificaciones</h3>
                  <p className="text-muted-foreground text-center mb-6 max-w-md">
                    {searchQuery
                      ? "No se encontraron notificaciones con tu búsqueda"
                      : filter === "all"
                        ? "No tienes notificaciones en este momento."
                        : `No tienes notificaciones de ${
                            filter === "candidate"
                              ? "candidatos"
                              : filter === "job"
                                ? "empleos"
                                : filter === "interview"
                                  ? "entrevistas"
                                  : filter === "message"
                                    ? "mensajes"
                                    : filter === "alert"
                                      ? "alertas"
                                      : "sistema"
                          }.`}
                  </p>
                  {searchQuery ? (
                    <Button variant="outline" onClick={() => setSearchQuery("")}>
                      Limpiar búsqueda
                    </Button>
                  ) : (
                    <Button asChild>
                      <Link href="/employer/dashboard">Volver al dashboard</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
