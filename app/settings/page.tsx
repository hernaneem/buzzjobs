"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button-custom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card-custom"
import { Input } from "@/components/ui/input-custom"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select-custom"
import { ArrowLeft, Bell, Lock, User, Globe, Trash2 } from "lucide-react"
import Link from "next/link"

// Añadir estos imports al inicio del archivo
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function SettingsPage() {
  // Usuario de ejemplo
  const user = {
    name: "Carlos Méndez",
    role: "candidate",
  }

  // Estados para los formularios
  const [accountData, setAccountData] = useState({
    email: "carlos@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Obtener parámetros de la URL
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("account")

  // Establecer la pestaña activa basada en el parámetro de la URL
  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab && ["account", "notifications", "privacy"].includes(tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])

  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    newJobs: true,
    applicationUpdates: true,
    messages: true,
    interviews: true,
    realTimeNotifications: true,
    notificationSounds: false,
    activityNotifications: true,
    emailFrequency: "immediate",
    marketing: false,
  })

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    showEmail: false,
    showPhone: false,
    allowMessages: true,
    dataSharing: true,
  })

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAccountData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (setting: string, checked: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [setting]: checked }))
  }

  const handlePrivacyChange = (setting: string, value: any) => {
    setPrivacySettings((prev) => ({ ...prev, [setting]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implementar lógica de guardado de configuración
    console.log("Settings saved")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} />

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6 max-w-4xl">
          <div className="mb-8">
            <Link
              href={user.role === "candidate" ? "/candidate/dashboard" : "/employer/dashboard"}
              className="text-sm text-muted-foreground hover:text-honey flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Volver al dashboard
            </Link>

            <h1 className="text-3xl font-bold mt-4">Configuración</h1>
            <p className="text-muted-foreground">Gestiona tu cuenta, notificaciones y privacidad</p>
          </div>

          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 md:w-auto md:inline-flex">
              <TabsTrigger value="account">Cuenta</TabsTrigger>
              <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
              <TabsTrigger value="privacy">Privacidad</TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit}>
              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Información de cuenta
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Dirección de correo electrónico</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={accountData.email}
                        onChange={handleAccountChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Contraseña actual</Label>
                      <Input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        value={accountData.currentPassword}
                        onChange={handleAccountChange}
                        placeholder="Introduce tu contraseña actual"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">Nueva contraseña</Label>
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          value={accountData.newPassword}
                          onChange={handleAccountChange}
                          placeholder="Nueva contraseña"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirmar nueva contraseña</Label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={accountData.confirmPassword}
                          onChange={handleAccountChange}
                          placeholder="Confirmar nueva contraseña"
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="text-lg font-medium mb-4">Eliminar cuenta</h3>
                      <p className="text-muted-foreground mb-4">
                        Al eliminar tu cuenta, se eliminarán permanentemente todos tus datos y no podrás recuperarlos.
                      </p>
                      <Button variant="outline" type="button" className="text-destructive gap-2">
                        <Trash2 className="h-4 w-4" />
                        Eliminar cuenta
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Preferencias de notificaciones
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Alertas por email</h3>
                        <p className="text-sm text-muted-foreground">
                          Recibe notificaciones importantes por correo electrónico
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.emailAlerts}
                        onCheckedChange={(checked) => handleNotificationChange("emailAlerts", checked)}
                      />
                    </div>

                    <div className="space-y-4 pl-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Nuevas ofertas de empleo</h4>
                          <p className="text-sm text-muted-foreground">
                            Recibe alertas cuando se publiquen nuevas ofertas que coincidan con tu perfil
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.newJobs}
                          onCheckedChange={(checked) => handleNotificationChange("newJobs", checked)}
                          disabled={!notificationSettings.emailAlerts}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Actualizaciones de aplicaciones</h4>
                          <p className="text-sm text-muted-foreground">
                            Recibe notificaciones sobre el estado de tus aplicaciones
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.applicationUpdates}
                          onCheckedChange={(checked) => handleNotificationChange("applicationUpdates", checked)}
                          disabled={!notificationSettings.emailAlerts}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Mensajes</h4>
                          <p className="text-sm text-muted-foreground">
                            Recibe notificaciones cuando recibas un nuevo mensaje
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.messages}
                          onCheckedChange={(checked) => handleNotificationChange("messages", checked)}
                          disabled={!notificationSettings.emailAlerts}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Entrevistas</h4>
                          <p className="text-sm text-muted-foreground">
                            Recibe notificaciones sobre entrevistas programadas y recordatorios
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.interviews || false}
                          onCheckedChange={(checked) => handleNotificationChange("interviews", checked)}
                          disabled={!notificationSettings.emailAlerts}
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="font-medium mb-4">Notificaciones en la plataforma</h3>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Notificaciones en tiempo real</h4>
                            <p className="text-sm text-muted-foreground">
                              Recibe notificaciones instantáneas mientras usas la plataforma
                            </p>
                          </div>
                          <Switch
                            checked={notificationSettings.realTimeNotifications || true}
                            onCheckedChange={(checked) => handleNotificationChange("realTimeNotifications", checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Sonidos de notificación</h4>
                            <p className="text-sm text-muted-foreground">
                              Reproducir sonidos cuando recibas notificaciones importantes
                            </p>
                          </div>
                          <Switch
                            checked={notificationSettings.notificationSounds || false}
                            onCheckedChange={(checked) => handleNotificationChange("notificationSounds", checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Notificaciones de actividad</h4>
                            <p className="text-sm text-muted-foreground">
                              Recibe notificaciones sobre la actividad en tus aplicaciones y perfil
                            </p>
                          </div>
                          <Switch
                            checked={notificationSettings.activityNotifications || true}
                            onCheckedChange={(checked) => handleNotificationChange("activityNotifications", checked)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="font-medium mb-4">Frecuencia de notificaciones</h3>

                      <div className="space-y-2">
                        <Label htmlFor="emailFrequency">Frecuencia de correos electrónicos</Label>
                        <Select
                          value={notificationSettings.emailFrequency || "immediate"}
                          onValueChange={(value) => handleNotificationChange("emailFrequency", value)}
                        >
                          <SelectTrigger id="emailFrequency">
                            <SelectValue placeholder="Seleccionar frecuencia" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediate">Inmediatamente</SelectItem>
                            <SelectItem value="daily">Resumen diario</SelectItem>
                            <SelectItem value="weekly">Resumen semanal</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground mt-1">
                          Elige con qué frecuencia quieres recibir correos electrónicos de resumen
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Comunicaciones de marketing</h3>
                          <p className="text-sm text-muted-foreground">
                            Recibe noticias, actualizaciones y ofertas especiales de BuzzJobs
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.marketing}
                          onCheckedChange={(checked) => handleNotificationChange("marketing", checked)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="privacy">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="h-5 w-5" />
                      Configuración de privacidad
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="profileVisibility">Visibilidad del perfil</Label>
                      <Select
                        value={privacySettings.profileVisibility}
                        onValueChange={(value) => handlePrivacyChange("profileVisibility", value)}
                      >
                        <SelectTrigger id="profileVisibility">
                          <SelectValue placeholder="Seleccionar visibilidad" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Público - Visible para todos</SelectItem>
                          <SelectItem value="limited">Limitado - Solo para empresas registradas</SelectItem>
                          <SelectItem value="private">Privado - Solo visible cuando aplicas</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-1">
                        Controla quién puede ver tu perfil en BuzzJobs
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Mostrar dirección de correo electrónico</h3>
                        <p className="text-sm text-muted-foreground">
                          Permite que las empresas vean tu dirección de correo electrónico
                        </p>
                      </div>
                      <Switch
                        checked={privacySettings.showEmail}
                        onCheckedChange={(checked) => handlePrivacyChange("showEmail", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Mostrar número de teléfono</h3>
                        <p className="text-sm text-muted-foreground">
                          Permite que las empresas vean tu número de teléfono
                        </p>
                      </div>
                      <Switch
                        checked={privacySettings.showPhone}
                        onCheckedChange={(checked) => handlePrivacyChange("showPhone", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Permitir mensajes</h3>
                        <p className="text-sm text-muted-foreground">
                          Permite que las empresas te envíen mensajes a través de la plataforma
                        </p>
                      </div>
                      <Switch
                        checked={privacySettings.allowMessages}
                        onCheckedChange={(checked) => handlePrivacyChange("allowMessages", checked)}
                      />
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Compartir datos para mejorar el servicio</h3>
                          <p className="text-sm text-muted-foreground">
                            Permite que BuzzJobs utilice tus datos para mejorar la plataforma y personalizar tu
                            experiencia
                          </p>
                        </div>
                        <Switch
                          checked={privacySettings.dataSharing}
                          onCheckedChange={(checked) => handlePrivacyChange("dataSharing", checked)}
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="text-lg font-medium mb-4">Exportar datos</h3>
                      <p className="text-muted-foreground mb-4">
                        Descarga una copia de todos tus datos personales almacenados en BuzzJobs
                      </p>
                      <Button variant="outline" type="button" className="gap-2">
                        <Globe className="h-4 w-4" />
                        Solicitar datos
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <div className="flex justify-end mt-6">
                <Button type="submit">Guardar cambios</Button>
              </div>
            </form>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
