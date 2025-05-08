"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button-custom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card-custom"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select-custom"
import { Bell, ArrowLeft, Users, Briefcase, Calendar, MessageSquare, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function EmployerNotificationSettings() {
  // Estado para las preferencias de notificaciones
  const [notificationPreferences, setNotificationPreferences] = useState({
    // Notificaciones por email
    emailNotifications: true,

    // Categorías de email
    candidateEmails: true,
    jobEmails: true,
    interviewEmails: true,
    messageEmails: true,
    systemEmails: true,

    // Notificaciones en plataforma
    platformNotifications: true,

    // Categorías de plataforma
    candidatePlatform: true,
    jobPlatform: true,
    interviewPlatform: true,
    messagePlatform: true,
    systemPlatform: true,

    // Configuración adicional
    notificationSounds: false,
    desktopNotifications: true,

    // Frecuencia
    emailDigestFrequency: "immediate",
  })

  // Manejar cambios en las preferencias
  const handlePreferenceChange = (key: string, value: boolean | string) => {
    setNotificationPreferences((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  // Manejar guardado de preferencias
  const handleSave = () => {
    // Aquí se implementaría la lógica para guardar las preferencias en la base de datos
    console.log("Guardando preferencias:", notificationPreferences)
    // Mostrar mensaje de éxito
    alert("Preferencias guardadas correctamente")
  }

  return (
    <div className="py-8">
      <div className="container px-4 md:px-6 max-w-4xl">
        <div className="mb-8">
          <Link href="/employer/dashboard" className="text-sm text-muted-foreground hover:text-honey flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Volver al dashboard
          </Link>

          <h1 className="text-3xl font-bold mt-4">Configuración de notificaciones</h1>
          <p className="text-muted-foreground">Personaliza qué notificaciones recibes y cómo las recibes</p>
        </div>

        <div className="space-y-6">
          {/* Notificaciones por email */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notificaciones por email
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Recibir notificaciones por email</h3>
                  <p className="text-sm text-muted-foreground">
                    Recibe notificaciones importantes por correo electrónico
                  </p>
                </div>
                <Switch
                  checked={notificationPreferences.emailNotifications}
                  onCheckedChange={(checked) => handlePreferenceChange("emailNotifications", checked)}
                />
              </div>

              <div className="space-y-4 pl-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">Candidatos</h4>
                      <p className="text-sm text-muted-foreground">
                        Notificaciones sobre nuevos candidatos y actualizaciones
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationPreferences.candidateEmails}
                    onCheckedChange={(checked) => handlePreferenceChange("candidateEmails", checked)}
                    disabled={!notificationPreferences.emailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">Empleos</h4>
                      <p className="text-sm text-muted-foreground">Notificaciones sobre tus publicaciones de empleo</p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationPreferences.jobEmails}
                    onCheckedChange={(checked) => handlePreferenceChange("jobEmails", checked)}
                    disabled={!notificationPreferences.emailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">Entrevistas</h4>
                      <p className="text-sm text-muted-foreground">Recordatorios y actualizaciones de entrevistas</p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationPreferences.interviewEmails}
                    onCheckedChange={(checked) => handlePreferenceChange("interviewEmails", checked)}
                    disabled={!notificationPreferences.emailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">Mensajes</h4>
                      <p className="text-sm text-muted-foreground">Notificaciones sobre nuevos mensajes</p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationPreferences.messageEmails}
                    onCheckedChange={(checked) => handlePreferenceChange("messageEmails", checked)}
                    disabled={!notificationPreferences.emailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">Sistema</h4>
                      <p className="text-sm text-muted-foreground">
                        Alertas importantes del sistema y actualizaciones de la cuenta
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationPreferences.systemEmails}
                    onCheckedChange={(checked) => handlePreferenceChange("systemEmails", checked)}
                    disabled={!notificationPreferences.emailNotifications}
                  />
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="space-y-2">
                  <Label htmlFor="emailDigestFrequency">Frecuencia de resúmenes por email</Label>
                  <Select
                    value={notificationPreferences.emailDigestFrequency}
                    onValueChange={(value) => handlePreferenceChange("emailDigestFrequency", value)}
                    disabled={!notificationPreferences.emailNotifications}
                  >
                    <SelectTrigger id="emailDigestFrequency">
                      <SelectValue placeholder="Seleccionar frecuencia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Inmediatamente</SelectItem>
                      <SelectItem value="daily">Resumen diario</SelectItem>
                      <SelectItem value="weekly">Resumen semanal</SelectItem>
                      <SelectItem value="never">Nunca (solo notificaciones individuales)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    Elige con qué frecuencia quieres recibir resúmenes de actividad por email
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notificaciones en la plataforma */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notificaciones en la plataforma
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Recibir notificaciones en la plataforma</h3>
                  <p className="text-sm text-muted-foreground">Recibe notificaciones mientras usas BuzzJobs</p>
                </div>
                <Switch
                  checked={notificationPreferences.platformNotifications}
                  onCheckedChange={(checked) => handlePreferenceChange("platformNotifications", checked)}
                />
              </div>

              <div className="space-y-4 pl-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">Candidatos</h4>
                      <p className="text-sm text-muted-foreground">
                        Notificaciones sobre nuevos candidatos y actualizaciones
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationPreferences.candidatePlatform}
                    onCheckedChange={(checked) => handlePreferenceChange("candidatePlatform", checked)}
                    disabled={!notificationPreferences.platformNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">Empleos</h4>
                      <p className="text-sm text-muted-foreground">Notificaciones sobre tus publicaciones de empleo</p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationPreferences.jobPlatform}
                    onCheckedChange={(checked) => handlePreferenceChange("jobPlatform", checked)}
                    disabled={!notificationPreferences.platformNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">Entrevistas</h4>
                      <p className="text-sm text-muted-foreground">Recordatorios y actualizaciones de entrevistas</p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationPreferences.interviewPlatform}
                    onCheckedChange={(checked) => handlePreferenceChange("interviewPlatform", checked)}
                    disabled={!notificationPreferences.platformNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">Mensajes</h4>
                      <p className="text-sm text-muted-foreground">Notificaciones sobre nuevos mensajes</p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationPreferences.messagePlatform}
                    onCheckedChange={(checked) => handlePreferenceChange("messagePlatform", checked)}
                    disabled={!notificationPreferences.platformNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">Sistema</h4>
                      <p className="text-sm text-muted-foreground">
                        Alertas importantes del sistema y actualizaciones de la cuenta
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationPreferences.systemPlatform}
                    onCheckedChange={(checked) => handlePreferenceChange("systemPlatform", checked)}
                    disabled={!notificationPreferences.platformNotifications}
                  />
                </div>
              </div>

              <div className="pt-4 border-t space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Sonidos de notificación</h4>
                    <p className="text-sm text-muted-foreground">
                      Reproducir sonidos cuando recibas notificaciones importantes
                    </p>
                  </div>
                  <Switch
                    checked={notificationPreferences.notificationSounds}
                    onCheckedChange={(checked) => handlePreferenceChange("notificationSounds", checked)}
                    disabled={!notificationPreferences.platformNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Notificaciones de escritorio</h4>
                    <p className="text-sm text-muted-foreground">
                      Recibe notificaciones en tu escritorio cuando no estés en la página
                    </p>
                  </div>
                  <Switch
                    checked={notificationPreferences.desktopNotifications}
                    onCheckedChange={(checked) => handlePreferenceChange("desktopNotifications", checked)}
                    disabled={!notificationPreferences.platformNotifications}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSave}>Guardar preferencias</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
