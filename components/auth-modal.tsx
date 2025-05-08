"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button-custom"
import { Input } from "@/components/ui/input-custom"
import { Label } from "@/components/ui/label"
import { BeeIcon } from "@/components/bee-icon"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Mail, Lock, UserIcon } from "lucide-react"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultTab?: "login" | "register"
}

export function AuthModal({ isOpen, onClose, defaultTab = "login" }: AuthModalProps) {
  const [tab, setTab] = useState<"login" | "register">(defaultTab)
  const [showRoleSelector, setShowRoleSelector] = useState(false)
  const [role, setRole] = useState<"candidate" | "employer">("candidate")
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  })
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    fullName: "",
  })

  const { signIn, signUp } = useAuth()
  const { toast } = useToast()

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      resetForm()
      setShowRoleSelector(false)
    }
  }, [isOpen])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id.replace("register-", "")]: value,
    }))

    // Limpiar errores al escribir
    if (formErrors[id.replace("register-", "") as keyof typeof formErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [id.replace("register-", "")]: "",
      }))
    }
  }

  const validateForm = () => {
    let isValid = true
    const errors = { ...formErrors }

    // Validar email
    if (!formData.email) {
      errors.email = "El correo electrónico es obligatorio"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "El correo electrónico no es válido"
      isValid = false
    }

    // Validar contraseña
    if (!formData.password) {
      errors.password = "La contraseña es obligatoria"
      isValid = false
    } else if (formData.password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres"
      isValid = false
    }

    // Validar nombre completo en registro
    if (tab === "register" && !formData.fullName) {
      errors.fullName = "El nombre completo es obligatorio"
      isValid = false
    }

    setFormErrors(errors)
    return isValid
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (tab === "register" && !showRoleSelector) {
      if (!validateForm()) return
      setShowRoleSelector(true)
      return
    }

    if (!validateForm()) return

    setIsLoading(true)
    try {
      const { error } = await signUp(formData.email, formData.password, formData.fullName, role)

      if (error) throw error

      toast({
        title: "Registro exitoso",
        description: "Tu cuenta ha sido creada correctamente.",
      })

      onClose()
    } catch (error: any) {
      toast({
        title: "Error al registrarse",
        description: error.message || "Ha ocurrido un error durante el registro.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    try {
      const { error } = await signIn(formData.email, formData.password)

      if (error) throw error

      toast({
        title: "Inicio de sesión exitoso",
        description: "Has iniciado sesión correctamente.",
      })

      onClose()
    } catch (error: any) {
      toast({
        title: "Error al iniciar sesión",
        description: error.message || "Credenciales incorrectas.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
      fullName: "",
    })
    setFormErrors({
      email: "",
      password: "",
      fullName: "",
    })
  }

  const goBack = () => {
    if (showRoleSelector) {
      setShowRoleSelector(false)
    } else {
      setTab("login")
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          resetForm()
          setShowRoleSelector(false)
        }
        onClose()
      }}
    >
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden">
        <div className="bg-honey/10 p-6">
          <DialogHeader className="flex flex-col items-center text-center">
            <BeeIcon size={40} />
            <DialogTitle className="text-2xl font-bold mt-2">
              {showRoleSelector
                ? "¿Cómo quieres usar BuzzJobs?"
                : tab === "login"
                  ? "Bienvenido de nuevo"
                  : "Únete a BuzzJobs"}
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="p-6">
          {showRoleSelector ? (
            <form onSubmit={handleRegister} className="space-y-6">
              <div className="flex items-center mb-4">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="p-0 h-auto flex items-center text-muted-foreground hover:text-foreground"
                  onClick={goBack}
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Volver
                </Button>
              </div>

              <RadioGroup
                defaultValue={role}
                onValueChange={(v) => setRole(v as "candidate" | "employer")}
                className="grid grid-cols-2 gap-4"
              >
                <div
                  className={`flex flex-col items-center justify-between rounded-xl border-2 p-4 cursor-pointer ${role === "candidate" ? "border-honey bg-pollen" : "border-input"}`}
                >
                  <RadioGroupItem value="candidate" id="candidate" className="sr-only" />
                  <Label htmlFor="candidate" className="cursor-pointer text-center">
                    <div className="mb-3 mx-auto w-12 h-12 rounded-full bg-honey flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                          fill="#1A1A1A"
                        />
                      </svg>
                    </div>
                    <div className="font-bold">Candidato</div>
                    <p className="text-xs text-muted-foreground mt-1">Busco nuevas oportunidades laborales</p>
                  </Label>
                </div>

                <div
                  className={`flex flex-col items-center justify-between rounded-xl border-2 p-4 cursor-pointer ${role === "employer" ? "border-honey bg-pollen" : "border-input"}`}
                >
                  <RadioGroupItem value="employer" id="employer" className="sr-only" />
                  <Label htmlFor="employer" className="cursor-pointer text-center">
                    <div className="mb-3 mx-auto w-12 h-12 rounded-full bg-honey flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 7V3H2V21H22V7H12ZM6 19H4V17H6V19ZM6 15H4V13H6V15ZM6 11H4V9H6V11ZM6 7H4V5H6V7ZM10 19H8V17H10V19ZM10 15H8V13H10V15ZM10 11H8V9H10V11ZM10 7H8V5H10V7ZM20 19H12V17H14V15H12V13H14V11H12V9H20V19ZM18 11H16V13H18V11ZM18 15H16V17H18V15Z"
                          fill="#1A1A1A"
                        />
                      </svg>
                    </div>
                    <div className="font-bold">Empresa</div>
                    <p className="text-xs text-muted-foreground mt-1">Busco talento para mi empresa</p>
                  </Label>
                </div>
              </RadioGroup>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Completando registro..." : "Completar registro"}
              </Button>
            </form>
          ) : (
            <Tabs
              defaultValue={tab}
              className="w-full"
              onValueChange={(v) => {
                setTab(v as "login" | "register")
                resetForm()
              }}
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Iniciar sesión</TabsTrigger>
                <TabsTrigger value="register">Registrarse</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Correo electrónico
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10"
                        placeholder="tu@email.com"
                        required
                      />
                    </div>
                    {formErrors.email && <p className="text-xs text-red-500">{formErrors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-sm font-medium">
                        Contraseña
                      </Label>
                      <Button variant="link" className="px-0 h-auto text-xs">
                        ¿Olvidaste tu contraseña?
                      </Button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="pl-10"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    {formErrors.password && <p className="text-xs text-red-500">{formErrors.password}</p>}
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
                  </Button>
                </form>

                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">O continúa con</span>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Button variant="outline" type="button" className="font-medium">
                      Google
                    </Button>
                    <Button variant="outline" type="button" className="font-medium">
                      LinkedIn
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-fullName" className="text-sm font-medium">
                      Nombre completo
                    </Label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="register-fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="pl-10"
                        placeholder="Juan Pérez"
                        required
                      />
                    </div>
                    {formErrors.fullName && <p className="text-xs text-red-500">{formErrors.fullName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="text-sm font-medium">
                      Correo electrónico
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="register-email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10"
                        placeholder="tu@email.com"
                        required
                      />
                    </div>
                    {formErrors.email && <p className="text-xs text-red-500">{formErrors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="text-sm font-medium">
                      Contraseña
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="register-password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="pl-10"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    {formErrors.password && <p className="text-xs text-red-500">{formErrors.password}</p>}
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Procesando..." : "Continuar"}
                  </Button>
                </form>

                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">O continúa con</span>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Button variant="outline" type="button" className="font-medium">
                      Google
                    </Button>
                    <Button variant="outline" type="button" className="font-medium">
                      LinkedIn
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
