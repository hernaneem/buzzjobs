"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button-custom"
import { Card, CardContent } from "@/components/ui/card-custom"
import { Badge } from "@/components/ui/badge-custom"
import { ArrowLeft, Bell, CheckCircle, Calendar, Briefcase, MessageSquare, AlertCircle, Settings } from "lucide-react"
import Link from "next/link"

type NotificationType = "application" | "interview" | "message" | "system"

interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  date: string
  read: boolean
  actionLink?: string
  actionText?: string
  relatedId?: string
}

export default function NotificationsPage() {
  // Usuario de ejemplo
  const user = {
    name: "Carlos Méndez",
    role: "candidate",
  }

  const [filter, setFilter] = useState<NotificationType | "all">("all")
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "application",
      title: "Aplicación recibida",
      message: "Tu aplicación para Desarrollador Frontend en TechCorp ha sido recibida correctamente.",
      date: "Hace 2 días",
      read: true,
      actionLink: "/candidate/applications/1",
      actionText: "Ver aplicación",
      relatedId: "1",
    },
    {
      id: "2",
      type: "interview",
      title: "Entrevista programada",
      message:
        "Tienes una entrevista programada para el puesto de Desarrollador Frontend en TechCorp el 28 de mayo a las 10:00.",
      date: "Hace 1 día",
      read: false,
      actionLink: "/candidate/interviews/1",
      actionText: "Ver detalles",
      relatedId: "1",
    },
    {
      id: "3",
      type: "application",
      title: "Estado de aplicación actualizado",
      message: "Tu aplicación para UX/UI Designer en DesignStudio ha pasado a la fase de preselección.",
      date: "Hace 3 días",
      read: false,
      actionLink: "/candidate/applications/2",
      actionText: "Ver aplicación",
      relatedId: "2",
    },
    {
      id: "4",
      type: "message",
      title: "Nuevo mensaje",
      message: "Has recibido un mensaje de Ana García (TechCorp) sobre tu aplicación.",
      date: "Hace 4 días",
      read: true,
      actionLink: "/candidate/messages/1",
      actionText: "Ver mensaje",
      relatedId: "1",
    },
    {
      id: "5",
      type: "system",
      title: "Perfil incompleto",
      message: "Completa tu perfil para aumentar tus posibilidades de ser contactado por reclutadores.",
      date: "Hace 1 semana",
      read: true,
      actionLink: "/candidate/profile",
      actionText: "Completar perfil",
    },
  ])

  const filteredNotifications = notifications.filter((notification) => filter === "all" || notification.type === filter)

  const unreadCount = notifications.filter((notification) => !notification.read).length

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "application":
        return <Briefcase className="h-5 w-5 text-honey" />
      case "interview":
        return <Calendar className="h-5 w-5 text-honey" />
      case "message":
        return <MessageSquare className="h-5 w-5 text-honey" />
      case "system":
        return <AlertCircle className="h-5 w-5 text-honey" />
    }
  }

  return (
    <div className="py-8">
      <div className="container px-4 md:px-6">
        <div className="mb-8">
          <Link
            href="/candidate/dashboard"
            className="text-sm text-muted-foreground hover:text-honey flex items-center"
          >
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
                Marcar todas como leídas
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/candidate/settings/notifications">
                  <Settings className="h-4 w-4 mr-1" />
                  Configurar notificaciones
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
                    variant={filter === "application" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setFilter("application")}
                  >
                    <Briefcase className="mr-2 h-4 w-4" />
                    Aplicaciones
                    {notifications.filter((n) => n.type === "application" && !n.read).length > 0 && (
                      <Badge className="ml-auto" variant="default">
                        {notifications.filter((n) => n.type === "application" && !n.read).length}
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
                    {notifications.filter((n) => n.type === "interview" && !n.read).length > 0 && (
                      <Badge className="ml-auto" variant="default">
                        {notifications.filter((n) => n.type === "interview" && !n.read).length}
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
                    {notifications.filter((n) => n.type === "message" && !n.read).length > 0 && (
                      <Badge className="ml-auto" variant="default">
                        {notifications.filter((n) => n.type === "message" && !n.read).length}
                      </Badge>
                    )}
                  </Button>
                  <Button
                    variant={filter === "system" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setFilter("system")}
                  >
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Sistema
                    {notifications.filter((n) => n.type === "system" && !n.read).length > 0 && (
                      <Badge className="ml-auto" variant="default">
                        {notifications.filter((n) => n.type === "system" && !n.read).length}
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
                              <span className="text-xs text-muted-foreground">{notification.date}</span>
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
                    {filter === "all"
                      ? "No tienes notificaciones en este momento."
                      : `No tienes notificaciones de ${
                          filter === "application"
                            ? "aplicaciones"
                            : filter === "interview"
                              ? "entrevistas"
                              : filter === "message"
                                ? "mensajes"
                                : "sistema"
                        }.`}
                  </p>
                  <Button asChild>
                    <Link href="/candidate/dashboard">Volver al dashboard</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
