"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button-custom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card-custom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input-custom"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select-custom"
import { ArrowLeft, Settings, Mail, Bell, Shield, Database, Save, RefreshCw, HelpCircle } from "lucide-react"
import Link from "next/link"

export default function AdminSettings() {
  // Usuario de ejemplo (admin)
  const user = {
    name: "Admin BuzzJobs",
    role: "admin",
  }

  const [activeTab, setActiveTab] = useState("general")

  // Estados para los formularios
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "BuzzJobs",
    siteDescription: "Plataforma de empleo especializada en conectar talento con empresas innovadoras",
    contactEmail: "info@buzzjobs.com",
    supportEmail: "soporte@buzzjobs.com",
    defaultLanguage: "es",
    timezone: "Europe/Madrid",
    maintenanceMode: false,
  })

  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "smtp.example.com",
    smtpPort: "587",
    smtpUsername: "notifications@buzzjobs.com",
    smtpPassword: "••••••••••••",
    senderName: "BuzzJobs",
    senderEmail: "notifications@buzzjobs.com",
    enableEmailVerification: true,
    welcomeEmailTemplate: "Bienvenido a BuzzJobs, {{name}}. Gracias por registrarte...",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    enableEmailNotifications: true,
    enablePushNotifications: false,
    enableSmsNotifications: false,
    newApplicationNotification: true,
    newMessageNotification: true,
    jobStatusChangeNotification: true,
    marketingNotifications: false,
    digestFrequency: "daily",
  })

  const [securitySettings, setSecuritySettings] = useState({
    passwordMinLength: "8",
    requireSpecialChars: true,
    requireNumbers: true,
    requireUppercase: true,
    maxLoginAttempts: "5",
    lockoutDuration: "30",
    twoFactorAuth: false,
    sessionTimeout: "60",
  })

  const [backupSettings, setBackupSettings] = useState({
    automaticBackups: true,
    backupFrequency: "daily",
    backupTime: "02:00",
    retentionDays: "30",
    backupLocation: "cloud",
    includeUploads: true,
    includeUserData: true,
    encryptBackups: true,
  })

  // Manejadores de cambios
  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setGeneralSettings({
      ...generalSettings,
      [name]: value,
    })
  }

  const handleGeneralSwitchChange = (name: string, checked: boolean) => {
    setGeneralSettings({
      ...generalSettings,
      [name]: checked,
    })
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setEmailSettings({
      ...emailSettings,
      [name]: value,
    })
  }

  const handleEmailSwitchChange = (name: string, checked: boolean) => {
    setEmailSettings({
      ...emailSettings,
      [name]: checked,
    })
  }

  const handleNotificationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setNotificationSettings({
      ...notificationSettings,
      [name]: value,
    })
  }

  const handleNotificationSwitchChange = (name: string, checked: boolean) => {
    setNotificationSettings({
      ...notificationSettings,
      [name]: checked,
    })
  }

  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setSecuritySettings({
      ...securitySettings,
      [name]: value,
    })
  }

  const handleSecuritySwitchChange = (name: string, checked: boolean) => {
    setSecuritySettings({
      ...securitySettings,
      [name]: checked,
    })
  }

  const handleBackupChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setBackupSettings({
      ...backupSettings,
      [name]: value,
    })
  }

  const handleBackupSwitchChange = (name: string, checked: boolean) => {
    setBackupSettings({
      ...backupSettings,
      [name]: checked,
    })
  }

  // Manejadores de formularios
  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Guardando configuración general:", generalSettings)
    // Aquí iría la lógica para guardar en la base de datos
  }

  const handleSaveEmail = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Guardando configuración de email:", emailSettings)
    // Aquí iría la lógica para guardar en la base de datos
  }

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Guardando configuración de notificaciones:", notificationSettings)
    // Aquí iría la lógica para guardar en la base de datos
  }

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Guardando configuración de seguridad:", securitySettings)
    // Aquí iría la lógica para guardar en la base de datos
  }

  const handleSaveBackup = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Guardando configuración de backup:", backupSettings)
    // Aquí iría la lógica para guardar en la base de datos
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} />

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <Link href="/admin" className="text-sm text-muted-foreground hover:text-honey flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Volver al panel de administración
            </Link>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-4">
              <div>
                <h1 className="text-3xl font-bold">Configuración del Sistema</h1>
                <p className="text-muted-foreground">Gestiona la configuración global de BuzzJobs</p>
              </div>
            </div>
          </div>

          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 md:w-auto md:inline-flex">
              <TabsTrigger value="general" className="gap-2">
                <Settings className="h-4 w-4" />
                General
              </TabsTrigger>
              <TabsTrigger value="email" className="gap-2">
                <Mail className="h-4 w-4" />
                Email
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-2">
                <Bell className="h-4 w-4" />
                Notificaciones
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-2">
                <Shield className="h-4 w-4" />
                Seguridad
              </TabsTrigger>
              <TabsTrigger value="backup" className="gap-2">
                <Database className="h-4 w-4" />
                Backup
              </TabsTrigger>
            </TabsList>

            {/* Configuración General */}
            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Configuración General
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveGeneral} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="siteName" className="text-sm font-medium">
                          Nombre del sitio
                        </label>
                        <Input
                          id="siteName"
                          name="siteName"
                          value={generalSettings.siteName}
                          onChange={handleGeneralChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="contactEmail" className="text-sm font-medium">
                          Email de contacto
                        </label>
                        <Input
                          id="contactEmail"
                          name="contactEmail"
                          type="email"
                          value={generalSettings.contactEmail}
                          onChange={handleGeneralChange}
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <label htmlFor="siteDescription" className="text-sm font-medium">
                          Descripción del sitio
                        </label>
                        <Textarea
                          id="siteDescription"
                          name="siteDescription"
                          value={generalSettings.siteDescription}
                          onChange={handleGeneralChange}
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="supportEmail" className="text-sm font-medium">
                          Email de soporte
                        </label>
                        <Input
                          id="supportEmail"
                          name="supportEmail"
                          type="email"
                          value={generalSettings.supportEmail}
                          onChange={handleGeneralChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="defaultLanguage" className="text-sm font-medium">
                          Idioma predeterminado
                        </label>
                        <Select
                          value={generalSettings.defaultLanguage}
                          onValueChange={(value) => setGeneralSettings({ ...generalSettings, defaultLanguage: value })}
                        >
                          <SelectTrigger id="defaultLanguage">
                            <SelectValue placeholder="Seleccionar idioma" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="es">Español</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="fr">Français</SelectItem>
                            <SelectItem value="de">Deutsch</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="timezone" className="text-sm font-medium">
                          Zona horaria
                        </label>
                        <Select
                          value={generalSettings.timezone}
                          onValueChange={(value) => setGeneralSettings({ ...generalSettings, timezone: value })}
                        >
                          <SelectTrigger id="timezone">
                            <SelectValue placeholder="Seleccionar zona horaria" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Europe/Madrid">Europe/Madrid (GMT+1/+2)</SelectItem>
                            <SelectItem value="Europe/London">Europe/London (GMT+0/+1)</SelectItem>
                            <SelectItem value="America/New_York">America/New_York (GMT-5/-4)</SelectItem>
                            <SelectItem value="America/Los_Angeles">America/Los_Angeles (GMT-8/-7)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label htmlFor="maintenanceMode" className="text-sm font-medium">
                            Modo mantenimiento
                          </label>
                          <Switch
                            id="maintenanceMode"
                            checked={generalSettings.maintenanceMode}
                            onCheckedChange={(checked) => handleGeneralSwitchChange("maintenanceMode", checked)}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Activa el modo mantenimiento para mostrar una página de mantenimiento a los usuarios mientras
                          realizas actualizaciones.
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t">
                      <Button type="submit" className="gap-2">
                        <Save className="h-4 w-4" />
                        Guardar cambios
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Configuración de Email */}
            <TabsContent value="email">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Configuración de Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveEmail} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="smtpServer" className="text-sm font-medium">
                          Servidor SMTP
                        </label>
                        <Input
                          id="smtpServer"
                          name="smtpServer"
                          value={emailSettings.smtpServer}
                          onChange={handleEmailChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="smtpPort" className="text-sm font-medium">
                          Puerto SMTP
                        </label>
                        <Input
                          id="smtpPort"
                          name="smtpPort"
                          value={emailSettings.smtpPort}
                          onChange={handleEmailChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="smtpUsername" className="text-sm font-medium">
                          Usuario SMTP
                        </label>
                        <Input
                          id="smtpUsername"
                          name="smtpUsername"
                          value={emailSettings.smtpUsername}
                          onChange={handleEmailChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="smtpPassword" className="text-sm font-medium">
                          Contraseña SMTP
                        </label>
                        <Input
                          id="smtpPassword"
                          name="smtpPassword"
                          type="password"
                          value={emailSettings.smtpPassword}
                          onChange={handleEmailChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="senderName" className="text-sm font-medium">
                          Nombre del remitente
                        </label>
                        <Input
                          id="senderName"
                          name="senderName"
                          value={emailSettings.senderName}
                          onChange={handleEmailChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="senderEmail" className="text-sm font-medium">
                          Email del remitente
                        </label>
                        <Input
                          id="senderEmail"
                          name="senderEmail"
                          type="email"
                          value={emailSettings.senderEmail}
                          onChange={handleEmailChange}
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <div className="flex items-center justify-between">
                          <label htmlFor="enableEmailVerification" className="text-sm font-medium">
                            Verificación de email
                          </label>
                          <Switch
                            id="enableEmailVerification"
                            checked={emailSettings.enableEmailVerification}
                            onCheckedChange={(checked) => handleEmailSwitchChange("enableEmailVerification", checked)}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Requiere que los usuarios verifiquen su dirección de email al registrarse.
                        </p>
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <label htmlFor="welcomeEmailTemplate" className="text-sm font-medium">
                          Plantilla de email de bienvenida
                        </label>
                        <Textarea
                          id="welcomeEmailTemplate"
                          name="welcomeEmailTemplate"
                          value={emailSettings.welcomeEmailTemplate}
                          onChange={handleEmailChange}
                          rows={5}
                        />
                        <p className="text-xs text-muted-foreground">
                          Usa {{ name }} para incluir el nombre del usuario y {{ verificationLink }} para el enlace de
                          verificación.
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t">
                      <Button variant="outline" type="button" className="gap-2">
                        <RefreshCw className="h-4 w-4" />
                        Probar conexión
                      </Button>
                      <Button type="submit" className="gap-2">
                        <Save className="h-4 w-4" />
                        Guardar cambios
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Configuración de Notificaciones */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Configuración de Notificaciones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveNotifications} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label htmlFor="enableEmailNotifications" className="text-sm font-medium">
                            Notificaciones por email
                          </label>
                          <Switch
                            id="enableEmailNotifications"
                            checked={notificationSettings.enableEmailNotifications}
                            onCheckedChange={(checked) =>
                              handleNotificationSwitchChange("enableEmailNotifications", checked)
                            }
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">Envía notificaciones por email a los usuarios.</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label htmlFor="enablePushNotifications" className="text-sm font-medium">
                            Notificaciones push
                          </label>
                          <Switch
                            id="enablePushNotifications"
                            checked={notificationSettings.enablePushNotifications}
                            onCheckedChange={(checked) =>
                              handleNotificationSwitchChange("enablePushNotifications", checked)
                            }
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Envía notificaciones push a los dispositivos de los usuarios.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label htmlFor="enableSmsNotifications" className="text-sm font-medium">
                            Notificaciones SMS
                          </label>
                          <Switch
                            id="enableSmsNotifications"
                            checked={notificationSettings.enableSmsNotifications}
                            onCheckedChange={(checked) =>
                              handleNotificationSwitchChange("enableSmsNotifications", checked)
                            }
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Envía notificaciones por SMS a los usuarios (requiere configuración adicional).
                        </p>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="digestFrequency" className="text-sm font-medium">
                          Frecuencia de resumen
                        </label>
                        <Select
                          value={notificationSettings.digestFrequency}
                          onValueChange={(value) =>
                            setNotificationSettings({ ...notificationSettings, digestFrequency: value })
                          }
                        >
                          <SelectTrigger id="digestFrequency">
                            <SelectValue placeholder="Seleccionar frecuencia" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Diario</SelectItem>
                            <SelectItem value="weekly">Semanal</SelectItem>
                            <SelectItem value="never">Nunca</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                          Frecuencia con la que se envían resúmenes de actividad a los usuarios.
                        </p>
                      </div>

                      <div className="space-y-4 md:col-span-2">
                        <h3 className="text-sm font-medium">Tipos de notificaciones</h3>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <label htmlFor="newApplicationNotification" className="text-sm">
                              Nuevas aplicaciones
                            </label>
                            <Switch
                              id="newApplicationNotification"
                              checked={notificationSettings.newApplicationNotification}
                              onCheckedChange={(checked) =>
                                handleNotificationSwitchChange("newApplicationNotification", checked)
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <label htmlFor="newMessageNotification" className="text-sm">
                              Nuevos mensajes
                            </label>
                            <Switch
                              id="newMessageNotification"
                              checked={notificationSettings.newMessageNotification}
                              onCheckedChange={(checked) =>
                                handleNotificationSwitchChange("newMessageNotification", checked)
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <label htmlFor="jobStatusChangeNotification" className="text-sm">
                              Cambios de estado en empleos
                            </label>
                            <Switch
                              id="jobStatusChangeNotification"
                              checked={notificationSettings.jobStatusChangeNotification}
                              onCheckedChange={(checked) =>
                                handleNotificationSwitchChange("jobStatusChangeNotification", checked)
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <label htmlFor="marketingNotifications" className="text-sm">
                              Notificaciones de marketing
                            </label>
                            <Switch
                              id="marketingNotifications"
                              checked={notificationSettings.marketingNotifications}
                              onCheckedChange={(checked) =>
                                handleNotificationSwitchChange("marketingNotifications", checked)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t">
                      <Button type="submit" className="gap-2">
                        <Save className="h-4 w-4" />
                        Guardar cambios
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Configuración de Seguridad */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Configuración de Seguridad
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveSecurity} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="passwordMinLength" className="text-sm font-medium">
                          Longitud mínima de contraseña
                        </label>
                        <Input
                          id="passwordMinLength"
                          name="passwordMinLength"
                          type="number"
                          min="6"
                          max="32"
                          value={securitySettings.passwordMinLength}
                          onChange={handleSecurityChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="maxLoginAttempts" className="text-sm font-medium">
                          Intentos máximos de inicio de sesión
                        </label>
                        <Input
                          id="maxLoginAttempts"
                          name="maxLoginAttempts"
                          type="number"
                          min="1"
                          max="10"
                          value={securitySettings.maxLoginAttempts}
                          onChange={handleSecurityChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="lockoutDuration" className="text-sm font-medium">
                          Duración del bloqueo (minutos)
                        </label>
                        <Input
                          id="lockoutDuration"
                          name="lockoutDuration"
                          type="number"
                          min="5"
                          max="1440"
                          value={securitySettings.lockoutDuration}
                          onChange={handleSecurityChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="sessionTimeout" className="text-sm font-medium">
                          Tiempo de expiración de sesión (minutos)
                        </label>
                        <Input
                          id="sessionTimeout"
                          name="sessionTimeout"
                          type="number"
                          min="5"
                          max="1440"
                          value={securitySettings.sessionTimeout}
                          onChange={handleSecurityChange}
                        />
                      </div>

                      <div className="space-y-4 md:col-span-2">
                        <h3 className="text-sm font-medium">Requisitos de contraseña</h3>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <label htmlFor="requireSpecialChars" className="text-sm">
                              Requerir caracteres especiales
                            </label>
                            <Switch
                              id="requireSpecialChars"
                              checked={securitySettings.requireSpecialChars}
                              onCheckedChange={(checked) => handleSecuritySwitchChange("requireSpecialChars", checked)}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <label htmlFor="requireNumbers" className="text-sm">
                              Requerir números
                            </label>
                            <Switch
                              id="requireNumbers"
                              checked={securitySettings.requireNumbers}
                              onCheckedChange={(checked) => handleSecuritySwitchChange("requireNumbers", checked)}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <label htmlFor="requireUppercase" className="text-sm">
                              Requerir mayúsculas
                            </label>
                            <Switch
                              id="requireUppercase"
                              checked={securitySettings.requireUppercase}
                              onCheckedChange={(checked) => handleSecuritySwitchChange("requireUppercase", checked)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <div className="flex items-center justify-between">
                          <label htmlFor="twoFactorAuth" className="text-sm font-medium">
                            Autenticación de dos factores
                          </label>
                          <Switch
                            id="twoFactorAuth"
                            checked={securitySettings.twoFactorAuth}
                            onCheckedChange={(checked) => handleSecuritySwitchChange("twoFactorAuth", checked)}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Requiere un segundo factor de autenticación (como un código enviado por SMS o una aplicación
                          de autenticación) para iniciar sesión.
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t">
                      <Button type="submit" className="gap-2">
                        <Save className="h-4 w-4" />
                        Guardar cambios
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Configuración de Backup */}
            <TabsContent value="backup">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Configuración de Backup
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveBackup} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label htmlFor="automaticBackups" className="text-sm font-medium">
                            Backups automáticos
                          </label>
                          <Switch
                            id="automaticBackups"
                            checked={backupSettings.automaticBackups}
                            onCheckedChange={(checked) => handleBackupSwitchChange("automaticBackups", checked)}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Realiza copias de seguridad automáticas según la frecuencia configurada.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="backupFrequency" className="text-sm font-medium">
                          Frecuencia de backup
                        </label>
                        <Select
                          value={backupSettings.backupFrequency}
                          onValueChange={(value) => setBackupSettings({ ...backupSettings, backupFrequency: value })}
                        >
                          <SelectTrigger id="backupFrequency">
                            <SelectValue placeholder="Seleccionar frecuencia" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Diario</SelectItem>
                            <SelectItem value="weekly">Semanal</SelectItem>
                            <SelectItem value="monthly">Mensual</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="backupTime" className="text-sm font-medium">
                          Hora de backup
                        </label>
                        <Input
                          id="backupTime"
                          name="backupTime"
                          type="time"
                          value={backupSettings.backupTime}
                          onChange={handleBackupChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="retentionDays" className="text-sm font-medium">
                          Días de retención
                        </label>
                        <Input
                          id="retentionDays"
                          name="retentionDays"
                          type="number"
                          min="1"
                          max="365"
                          value={backupSettings.retentionDays}
                          onChange={handleBackupChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="backupLocation" className="text-sm font-medium">
                          Ubicación de backup
                        </label>
                        <Select
                          value={backupSettings.backupLocation}
                          onValueChange={(value) => setBackupSettings({ ...backupSettings, backupLocation: value })}
                        >
                          <SelectTrigger id="backupLocation">
                            <SelectValue placeholder="Seleccionar ubicación" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="local">Servidor local</SelectItem>
                            <SelectItem value="cloud">Nube (AWS S3)</SelectItem>
                            <SelectItem value="both">Ambos</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-4 md:col-span-2">
                        <h3 className="text-sm font-medium">Opciones adicionales</h3>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <label htmlFor="includeUploads" className="text-sm">
                              Incluir archivos subidos
                            </label>
                            <Switch
                              id="includeUploads"
                              checked={backupSettings.includeUploads}
                              onCheckedChange={(checked) => handleBackupSwitchChange("includeUploads", checked)}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <label htmlFor="includeUserData" className="text-sm">
                              Incluir datos de usuarios
                            </label>
                            <Switch
                              id="includeUserData"
                              checked={backupSettings.includeUserData}
                              onCheckedChange={(checked) => handleBackupSwitchChange("includeUserData", checked)}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <label htmlFor="encryptBackups" className="text-sm">
                              Encriptar backups
                            </label>
                            <Switch
                              id="encryptBackups"
                              checked={backupSettings.encryptBackups}
                              onCheckedChange={(checked) => handleBackupSwitchChange("encryptBackups", checked)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t">
                      <Button variant="outline" type="button" className="gap-2">
                        <Database className="h-4 w-4" />
                        Realizar backup ahora
                      </Button>
                      <Button type="submit" className="gap-2">
                        <Save className="h-4 w-4" />
                        Guardar cambios
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Sección de ayuda */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Ayuda y soporte
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 border rounded-md bg-muted/30">
                  <div className="flex items-start">
                    <HelpCircle className="h-5 w-5 text-muted-foreground mt-0.5 mr-3" />
                    <div>
                      <h4 className="font-medium">¿Necesitas ayuda con la configuración?</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Si tienes dudas sobre alguna configuración o necesitas asistencia técnica, contacta con nuestro
                        equipo de soporte en{" "}
                        <a href="mailto:soporte@buzzjobs.com" className="text-honey hover:underline">
                          soporte@buzzjobs.com
                        </a>{" "}
                        o consulta nuestra{" "}
                        <a href="/docs/admin" className="text-honey hover:underline">
                          documentación para administradores
                        </a>
                        .
                      </p>
                    </div>
                  </div>
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
