"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button-custom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card-custom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge-custom"
import { Input } from "@/components/ui/input-custom"
import { Switch } from "@/components/ui/switch"
import {
  Users,
  CreditCard,
  Flag,
  Search,
  Filter,
  MoreHorizontal,
  UserPlus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Lock,
  Shield,
  Eye,
  EyeOff,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AdminDashboard() {
  // Usuario de ejemplo (admin)
  const user = {
    name: "Admin BuzzJobs",
    role: "admin",
  }

  const [activeTab, setActiveTab] = useState("users")
  const [searchTerm, setSearchTerm] = useState("")

  // Datos de ejemplo para usuarios
  const users = [
    {
      id: "1",
      name: "María Rodríguez",
      email: "maria@example.com",
      role: "employer",
      status: "active",
      createdAt: "15/04/2023",
      company: "TechCorp",
      plan: "Premium",
    },
    {
      id: "2",
      name: "Carlos Méndez",
      email: "carlos@example.com",
      role: "candidate",
      status: "active",
      createdAt: "20/04/2023",
      company: null,
      plan: "Free",
    },
    {
      id: "3",
      name: "Laura Sánchez",
      email: "laura@example.com",
      role: "candidate",
      status: "active",
      createdAt: "25/04/2023",
      company: null,
      plan: "Free",
    },
    {
      id: "4",
      name: "Javier García",
      email: "javier@example.com",
      role: "employer",
      status: "inactive",
      createdAt: "10/05/2023",
      company: "DesignStudio",
      plan: "Basic",
    },
    {
      id: "5",
      name: "Ana Martínez",
      email: "ana@example.com",
      role: "admin",
      status: "active",
      createdAt: "05/03/2023",
      company: "BuzzJobs",
      plan: "Admin",
    },
  ]

  // Datos de ejemplo para roles
  const roles = [
    {
      id: "1",
      name: "Admin",
      description: "Acceso completo a todas las funcionalidades",
      permissions: ["all"],
      userCount: 2,
    },
    {
      id: "2",
      name: "Employer",
      description: "Acceso a funcionalidades de empleador",
      permissions: ["post_jobs", "manage_candidates", "view_analytics", "company_profile"],
      userCount: 15,
    },
    {
      id: "3",
      name: "Candidate",
      description: "Acceso a funcionalidades de candidato",
      permissions: ["apply_jobs", "manage_profile", "save_jobs"],
      userCount: 120,
    },
    {
      id: "4",
      name: "Guest",
      description: "Acceso limitado a visualización",
      permissions: ["view_jobs", "view_companies"],
      userCount: 0,
    },
  ]

  // Datos de ejemplo para pagos
  const payments = [
    {
      id: "1",
      user: "María Rodríguez",
      email: "maria@example.com",
      amount: "99.99€",
      plan: "Premium",
      status: "completed",
      date: "15/05/2023",
      method: "Tarjeta de crédito",
    },
    {
      id: "2",
      user: "Javier García",
      email: "javier@example.com",
      amount: "49.99€",
      plan: "Basic",
      status: "completed",
      date: "10/05/2023",
      method: "PayPal",
    },
    {
      id: "3",
      user: "Elena Gómez",
      email: "elena@example.com",
      amount: "99.99€",
      plan: "Premium",
      status: "failed",
      date: "05/05/2023",
      method: "Tarjeta de crédito",
    },
    {
      id: "4",
      user: "Miguel Torres",
      email: "miguel@example.com",
      amount: "49.99€",
      plan: "Basic",
      status: "pending",
      date: "01/05/2023",
      method: "Transferencia bancaria",
    },
    {
      id: "5",
      user: "María Rodríguez",
      email: "maria@example.com",
      amount: "99.99€",
      plan: "Premium",
      status: "refunded",
      date: "15/04/2023",
      method: "Tarjeta de crédito",
    },
  ]

  // Datos de ejemplo para feature flags
  const featureFlags = [
    {
      id: "1",
      name: "advanced_search",
      description: "Búsqueda avanzada con filtros adicionales",
      status: true,
      environment: "production",
      createdAt: "10/04/2023",
      updatedAt: "15/05/2023",
    },
    {
      id: "2",
      name: "messaging_system",
      description: "Sistema de mensajería entre candidatos y empleadores",
      status: false,
      environment: "development",
      createdAt: "20/04/2023",
      updatedAt: "20/04/2023",
    },
    {
      id: "3",
      name: "ai_matching",
      description: "Algoritmo de IA para matching de candidatos",
      status: false,
      environment: "staging",
      createdAt: "01/05/2023",
      updatedAt: "10/05/2023",
    },
    {
      id: "4",
      name: "video_interviews",
      description: "Entrevistas por video integradas",
      status: false,
      environment: "development",
      createdAt: "05/05/2023",
      updatedAt: "05/05/2023",
    },
    {
      id: "5",
      name: "premium_analytics",
      description: "Analíticas avanzadas para empleadores premium",
      status: true,
      environment: "production",
      createdAt: "15/03/2023",
      updatedAt: "01/05/2023",
    },
  ]

  // Filtrar usuarios
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.company && user.company.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // Filtrar pagos
  const filteredPayments = payments.filter(
    (payment) =>
      payment.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.plan.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Filtrar feature flags
  const filteredFeatureFlags = featureFlags.filter(
    (flag) =>
      flag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flag.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flag.environment.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Función para cambiar el estado de un feature flag
  const toggleFeatureFlag = (id: string) => {
    console.log(`Toggling feature flag ${id}`)
    // En una implementación real, esto actualizaría el estado en la base de datos
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} />

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Panel de Administración</h1>
              <p className="text-muted-foreground">Gestiona usuarios, roles, pagos y configuraciones</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar..."
                  className="pl-10 w-[200px] md:w-[300px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filtrar</span>
              </Button>
            </div>
          </div>

          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 md:w-auto md:inline-flex">
              <TabsTrigger value="users" className="gap-2">
                <Users className="h-4 w-4" />
                Usuarios
              </TabsTrigger>
              <TabsTrigger value="roles" className="gap-2">
                <Shield className="h-4 w-4" />
                Roles
              </TabsTrigger>
              <TabsTrigger value="payments" className="gap-2">
                <CreditCard className="h-4 w-4" />
                Pagos
              </TabsTrigger>
              <TabsTrigger value="features" className="gap-2">
                <Flag className="h-4 w-4" />
                Features
              </TabsTrigger>
            </TabsList>

            {/* Pestaña de Usuarios */}
            <TabsContent value="users">
              <Card>
                <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Gestión de Usuarios
                  </CardTitle>
                  <Button className="gap-2">
                    <UserPlus className="h-4 w-4" />
                    Añadir Usuario
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nombre</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Rol</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead>Plan</TableHead>
                          <TableHead>Fecha Registro</TableHead>
                          <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.length > 0 ? (
                          filteredUsers.map((user) => (
                            <TableRow key={user.id}>
                              <TableCell className="font-medium">{user.name}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    user.role === "admin"
                                      ? "default"
                                      : user.role === "employer"
                                        ? "secondary"
                                        : "outline"
                                  }
                                >
                                  {user.role === "admin"
                                    ? "Admin"
                                    : user.role === "employer"
                                      ? "Empleador"
                                      : "Candidato"}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <div
                                    className={`w-2 h-2 rounded-full mr-2 ${
                                      user.status === "active" ? "bg-green-500" : "bg-red-500"
                                    }`}
                                  ></div>
                                  <span>{user.status === "active" ? "Activo" : "Inactivo"}</span>
                                </div>
                              </TableCell>
                              <TableCell>{user.plan}</TableCell>
                              <TableCell>{user.createdAt}</TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Acciones</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                      <Edit className="h-4 w-4 mr-2" />
                                      Editar
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Lock className="h-4 w-4 mr-2" />
                                      Cambiar contraseña
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      {user.status === "active" ? (
                                        <>
                                          <XCircle className="h-4 w-4 mr-2" />
                                          Desactivar
                                        </>
                                      ) : (
                                        <>
                                          <CheckCircle className="h-4 w-4 mr-2" />
                                          Activar
                                        </>
                                      )}
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive">
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Eliminar
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-6">
                              <div className="flex flex-col items-center justify-center">
                                <Users className="h-8 w-8 text-muted-foreground mb-2" />
                                <p className="text-muted-foreground">No se encontraron usuarios</p>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pestaña de Roles */}
            <TabsContent value="roles">
              <Card>
                <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Gestión de Roles y Permisos
                  </CardTitle>
                  <Button className="gap-2">
                    <UserPlus className="h-4 w-4" />
                    Crear Rol
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {roles.map((role) => (
                      <Card key={role.id} className="overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-bold">{role.name}</h3>
                              <p className="text-sm text-muted-foreground">{role.description}</p>
                            </div>
                            <Badge variant="outline">{role.userCount} usuarios</Badge>
                          </div>

                          <div className="mt-4">
                            <h4 className="text-sm font-medium mb-2">Permisos</h4>
                            <div className="flex flex-wrap gap-1">
                              {role.permissions.map((permission) => (
                                <Badge key={permission} variant="outline" className="bg-muted">
                                  {permission === "all" ? "Todos los permisos" : permission.replace("_", " ")}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex justify-end mt-4 pt-4 border-t">
                            <Button variant="outline" size="sm" className="gap-2 mr-2">
                              <Edit className="h-4 w-4" />
                              Editar
                            </Button>
                            {role.name !== "Admin" && role.name !== "Employer" && role.name !== "Candidate" && (
                              <Button variant="outline" size="sm" className="gap-2 text-destructive">
                                <Trash2 className="h-4 w-4" />
                                Eliminar
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pestaña de Pagos */}
            <TabsContent value="payments">
              <Card>
                <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Historial de Pagos
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                      <Filter className="h-4 w-4" />
                      Filtrar
                    </Button>
                    <Button className="gap-2">
                      <CreditCard className="h-4 w-4" />
                      Exportar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Usuario</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Plan</TableHead>
                          <TableHead>Importe</TableHead>
                          <TableHead>Método</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead>Fecha</TableHead>
                          <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPayments.length > 0 ? (
                          filteredPayments.map((payment) => (
                            <TableRow key={payment.id}>
                              <TableCell className="font-medium">{payment.user}</TableCell>
                              <TableCell>{payment.email}</TableCell>
                              <TableCell>{payment.plan}</TableCell>
                              <TableCell>{payment.amount}</TableCell>
                              <TableCell>{payment.method}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    payment.status === "completed"
                                      ? "new"
                                      : payment.status === "pending"
                                        ? "secondary"
                                        : payment.status === "failed"
                                          ? "destructive"
                                          : "outline"
                                  }
                                >
                                  {payment.status === "completed"
                                    ? "Completado"
                                    : payment.status === "pending"
                                      ? "Pendiente"
                                      : payment.status === "failed"
                                        ? "Fallido"
                                        : "Reembolsado"}
                                </Badge>
                              </TableCell>
                              <TableCell>{payment.date}</TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Acciones</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                      <Eye className="h-4 w-4 mr-2" />
                                      Ver detalles
                                    </DropdownMenuItem>
                                    {payment.status === "completed" && (
                                      <DropdownMenuItem>
                                        <CreditCard className="h-4 w-4 mr-2" />
                                        Generar factura
                                      </DropdownMenuItem>
                                    )}
                                    {payment.status === "pending" && (
                                      <DropdownMenuItem>
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Marcar como completado
                                      </DropdownMenuItem>
                                    )}
                                    {payment.status === "completed" && (
                                      <DropdownMenuItem className="text-destructive">
                                        <CreditCard className="h-4 w-4 mr-2" />
                                        Reembolsar
                                      </DropdownMenuItem>
                                    )}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center py-6">
                              <div className="flex flex-col items-center justify-center">
                                <CreditCard className="h-8 w-8 text-muted-foreground mb-2" />
                                <p className="text-muted-foreground">No se encontraron pagos</p>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pestaña de Feature Flags */}
            <TabsContent value="features">
              <Card>
                <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <CardTitle className="flex items-center gap-2">
                    <Flag className="h-5 w-5" />
                    Feature Flags
                  </CardTitle>
                  <Button className="gap-2">
                    <Flag className="h-4 w-4" />
                    Nueva Feature
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nombre</TableHead>
                          <TableHead>Descripción</TableHead>
                          <TableHead>Entorno</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead>Creado</TableHead>
                          <TableHead>Actualizado</TableHead>
                          <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredFeatureFlags.length > 0 ? (
                          filteredFeatureFlags.map((flag) => (
                            <TableRow key={flag.id}>
                              <TableCell className="font-medium">{flag.name}</TableCell>
                              <TableCell>{flag.description}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    flag.environment === "production"
                                      ? "default"
                                      : flag.environment === "staging"
                                        ? "secondary"
                                        : "outline"
                                  }
                                >
                                  {flag.environment}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <Switch
                                    checked={flag.status}
                                    onCheckedChange={() => toggleFeatureFlag(flag.id)}
                                    className="mr-2"
                                  />
                                  <span>{flag.status ? "Activo" : "Inactivo"}</span>
                                </div>
                              </TableCell>
                              <TableCell>{flag.createdAt}</TableCell>
                              <TableCell>{flag.updatedAt}</TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Acciones</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                      <Edit className="h-4 w-4 mr-2" />
                                      Editar
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      {flag.status ? (
                                        <>
                                          <EyeOff className="h-4 w-4 mr-2" />
                                          Desactivar
                                        </>
                                      ) : (
                                        <>
                                          <Eye className="h-4 w-4 mr-2" />
                                          Activar
                                        </>
                                      )}
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive">
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Eliminar
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-6">
                              <div className="flex flex-col items-center justify-center">
                                <Flag className="h-8 w-8 text-muted-foreground mb-2" />
                                <p className="text-muted-foreground">No se encontraron feature flags</p>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Sección de Alertas y Notificaciones */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Alertas del Sistema
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md bg-amber-50 border-amber-200">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 mr-3" />
                      <div>
                        <h4 className="font-medium text-amber-800">Actualización programada</h4>
                        <p className="text-sm text-amber-700 mt-1">
                          El sistema estará en mantenimiento el 30 de mayo de 2023 de 02:00 a 04:00 (GMT+2).
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-md bg-red-50 border-red-200">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-3" />
                      <div>
                        <h4 className="font-medium text-red-800">Error en procesamiento de pagos</h4>
                        <p className="text-sm text-red-700 mt-1">
                          Se han detectado errores en el procesamiento de pagos con PayPal. El equipo técnico está
                          trabajando para resolverlo.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-md bg-green-50 border-green-200">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
                      <div>
                        <h4 className="font-medium text-green-800">Sistema de mensajería implementado</h4>
                        <p className="text-sm text-green-700 mt-1">
                          El nuevo sistema de mensajería ha sido implementado con éxito y está disponible para todos los
                          usuarios.
                        </p>
                      </div>
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
