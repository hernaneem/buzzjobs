"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button-custom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card-custom"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select-custom"
import { Bell, ArrowLeft, Briefcase, Calendar, MessageSquare, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function CandidateNotificationSettings() {
  // Estado para las preferencias de notificaciones
  const [notificationPreferences, setNotificationPreferences] = useState({
    // Notificaciones por email
    emailNotifications: true,

    // Categorías de email
    jobAlerts: true,
    applicationUpdates: true,
    interviewReminders: true,
    messageNotifications: true,
    systemAlerts: true,

    // Notificaciones en plataforma
    platformNotifications: true,

    // Categorías de plataforma
    jobAlertsPlatform: true,
    applicationUpdatesPlatform: true,
    interviewRemindersPlatform: true,
    messageNotificationsPlatform: true,
    systemAlertsPlatform: true,

    // Configuración adicional
    notificationSounds: false,
    desktopNotifications: true,

    // Frecuencia
    emailDigestFrequency: "immediate",

    // Preferencias de búsqueda de empleo
    jobMatchNotifications: true,
    jobExpirationReminders: true,
    savedJobsUpdates: true,

    // Preferencias de aplicación
    applicationStatusChanges: true,
    applicationViewedByEmployer: true,
    applicationFeedback: true,
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
          <Link
            href="/candidate/dashboard"
            className="text-sm text-muted-foreground hover:text-honey flex items-center"
          >
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
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">Alertas de empleo</h4>
                      <p className="text-sm text-muted-foreground">
                        Notificaciones sobre nuevas ofertas que coinciden con tu perfil
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationPreferences.jobAlerts}
                    onCheckedChange={(checked) => handlePreferenceChange("jobAlerts", checked)}
                    disabled={!notificationPreferences.emailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">Actualizaciones de aplicaciones</h4>
                      <p className="text-sm text-muted-foreground">
                        Notificaciones sobre el estado de tus aplicaciones
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationPreferences.applicationUpdates}
                    onCheckedChange={(checked) => handlePreferenceChange("applicationUpdates", checked)}
                    disabled={!notificationPreferences.emailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">Recordatorios de entrevistas</h4>
                      <p className="text-sm text-muted-foreground">Recordatorios sobre entrevistas programadas</p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationPreferences.interviewReminders}
                    onCheckedChange={(checked) => handlePreferenceChange("interviewReminders", checked)}
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
                    checked={notificationPreferences.messageNotifications}
                    onCheckedChange={(checked) => handlePreferenceChange("messageNotifications", checked)}
                    disabled={!notificationPreferences.emailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">Alertas del sistema</h4>
                      <p className="text-sm text-muted-foreground">
                        Alertas importantes del sistema y actualizaciones de la cuenta
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationPreferences.systemAlerts}
                    onCheckedChange={(checked) => handlePreferenceChange("systemAlerts", checked)}
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
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">Alertas de empleo</h4>
                      <p className="text-sm text-muted-foreground">
                        Notificaciones sobre nuevas ofertas que coinciden con tu perfil
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationPreferences.jobAlertsPlatform}
                    onCheckedChange={(checked) => handlePreferenceChange("jobAlertsPlatform", checked)}
                    disabled={!notificationPreferences.platformNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">Actualizaciones de aplicaciones</h4>
                      <p className="text-sm text-muted-foreground">
                        Notificaciones sobre el estado de tus aplicaciones
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationPreferences.applicationUpdatesPlatform}
                    onCheckedChange={(checked) => handlePreferenceChange("applicationUpdatesPlatform", checked)}
                    disabled={!notificationPreferences.platformNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">Recordatorios de entrevistas</h4>
                      <p className="text-sm text-muted-foreground">Recordatorios sobre entrevistas programadas</p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationPreferences.interviewRemindersPlatform}
                    onCheckedChange={(checked) => handlePreferenceChange("interviewRemindersPlatform", checked)}
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
                    checked={notificationPreferences.messageNotificationsPlatform}
                    onCheckedChange={(checked) => handlePreferenceChange("messageNotificationsPlatform", checked)}
                    disabled={!notificationPreferences.platformNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">Alertas del sistema</h4>
                      <p className="text-sm text-muted-foreground">
                        Alertas importantes del sistema y actualizaciones de la cuenta
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationPreferences.systemAlertsPlatform}
                    onCheckedChange={(checked) => handlePreferenceChange("systemAlertsPlatform", checked)}
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

          {/* Preferencias específicas de búsqueda de empleo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Preferencias de búsqueda de empleo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Notificaciones de empleos que coinciden</h4>
                  <p className="text-sm text-muted-foreground">
                    Recibe notificaciones cuando aparezcan empleos que coincidan con tus habilidades
                  </p>
                </div>
                <Switch
                  checked={notificationPreferences.jobMatchNotifications}
                  onCheckedChange={(checked) => handlePreferenceChange("jobMatchNotifications", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Recordatorios de expiración de ofertas</h4>
                  <p className="text-sm text-muted-foreground">
                    Recibe recordatorios cuando las ofertas que te interesan estén por expirar
                  </p>
                </div>
                <Switch
                  checked={notificationPreferences.jobExpirationReminders}
                  onCheckedChange={(checked) => handlePreferenceChange("jobExpirationReminders", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Actualizaciones de empleos guardados</h4>
                  <p className="text-sm text-muted-foreground">
                    Recibe notificaciones cuando haya cambios en los empleos que has guardado
                  </p>
                </div>
                <Switch
                  checked={notificationPreferences.savedJobsUpdates}
                  onCheckedChange={(checked) => handlePreferenceChange("savedJobsUpdates", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Preferencias específicas de aplicaciones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Preferencias de aplicaciones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Cambios de estado en aplicaciones</h4>
                  <p className="text-sm text-muted-foreground">
                    Recibe notificaciones cuando cambie el estado de tus aplicaciones
                  </p>
                </div>
                <Switch
                  checked={notificationPreferences.applicationStatusChanges}
                  onCheckedChange={(checked) => handlePreferenceChange("applicationStatusChanges", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Aplicación vista por empleador</h4>
                  <p className="text-sm text-muted-foreground">
                    Recibe notificaciones cuando un empleador vea tu aplicación
                  </p>
                </div>
                <Switch
                  checked={notificationPreferences.applicationViewedByEmployer}
                  onCheckedChange={(checked) => handlePreferenceChange("applicationViewedByEmployer", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Retroalimentación de aplicaciones</h4>
                  <p className="text-sm text-muted-foreground">
                    Recibe notificaciones cuando recibas retroalimentación sobre tus aplicaciones
                  </p>
                </div>
                <Switch
                  checked={notificationPreferences.applicationFeedback}
                  onCheckedChange={(checked) => handlePreferenceChange("applicationFeedback", checked)}
                />
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
