"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button-custom"
import { BeeIcon } from "@/components/bee-icon"
import { AuthModal } from "@/components/auth-modal"
import { Menu, X, Bell, User, LogOut, Calendar, Briefcase, BookmarkCheck, Settings } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const pathname = usePathname()
  const { user, signOut, isLoading } = useAuth()
  const { toast } = useToast()

  // Verificar si estamos en una ruta donde la barra de navegación no debería mostrarse
  // para evitar duplicación con otros layouts
  const shouldHideNavbar = () => {
    // Rutas específicas donde la barra de navegación no debería mostrarse
    const excludedRoutes = [
      // Rutas de configuración
      "/candidate/settings",
      // Otras rutas con navegación propia
      "/admin",
    ]

    // Verificar si la ruta actual está en la lista de excluidas
    if (excludedRoutes.some((route) => pathname === route)) {
      return true
    }

    // Verificar si la ruta actual es una subruta de las excluidas
    if (pathname?.startsWith("/candidate/settings/") || pathname?.startsWith("/admin/")) {
      return true
    }

    return false
  }

  // Verificar si estamos en una ruta específica de empleador
  const isInEmployerRoute = () => {
    const employerRoutes = [
      "/employer/analytics",
      "/employer/candidates",
      "/employer/dashboard",
      "/employer/jobs",
      "/employer/notifications",
      "/employer/post-job",
      "/employer/profile",
      "/employer/settings",
    ]

    // Verificar si la ruta actual comienza con alguna de las rutas de empleador
    return employerRoutes.some((route) => pathname === route || pathname?.startsWith(`${route}/`))
  }

  // Si estamos en una ruta excluida, no renderizar la barra de navegación
  if (shouldHideNavbar()) {
    return null
  }

  const isEmployerDashboard = pathname?.startsWith("/employer")
  const isCandidateDashboard = pathname?.startsWith("/candidate")
  const isDashboard = isEmployerDashboard || isCandidateDashboard
  const isCandidate = user?.user_metadata?.role === "candidate"
  const isEmployer = user?.user_metadata?.role === "employer"

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const openAuthModal = () => {
    setIsAuthModalOpen(true)
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Ha ocurrido un error al cerrar sesión.",
        variant: "destructive",
      })
    }
  }

  // Renderizar navegación específica para candidatos
  const renderCandidateNav = () => (
    <nav className="hidden md:flex items-center gap-6 ml-6">
      <Link href="/job-feed" className="text-sm font-medium transition-colors hover:text-honey">
        Buscar Empleos
      </Link>
      <Link href="/companies" className="text-sm font-medium transition-colors hover:text-honey">
        Empresas
      </Link>
      <Link href="/candidate/saved-jobs" className="text-sm font-medium transition-colors hover:text-honey">
        Empleos Guardados
      </Link>
    </nav>
  )

  // Renderizar navegación específica para empleadores
  const renderEmployerNav = () => (
    <nav className="hidden md:flex items-center gap-6 ml-6">
      <Link href="/employer/jobs" className="text-sm font-medium transition-colors hover:text-honey">
        Mis Empleos
      </Link>
      <Link href="/employer/candidates" className="text-sm font-medium transition-colors hover:text-honey">
        Candidatos
      </Link>
    </nav>
  )

  // Renderizar navegación para usuarios no autenticados
  const renderPublicNav = () => (
    <nav className="hidden md:flex items-center gap-6 ml-6">
      <Link href="/jobs" className="text-sm font-medium transition-colors hover:text-honey">
        Empleos
      </Link>
      <Link href="/companies" className="text-sm font-medium transition-colors hover:text-honey">
        Empresas
      </Link>
    </nav>
  )

  // Renderizar acciones específicas para candidatos
  const renderCandidateActions = () => (
    <div className="hidden md:flex items-center gap-2">
      <Button asChild variant="outline" className="flex items-center gap-1">
        <Link href="/candidate/applications">
          <Briefcase className="h-4 w-4 mr-1" />
          Mis Aplicaciones
        </Link>
      </Button>
      <Button asChild variant="secondary" className="flex items-center gap-1">
        <Link href="/job-feed">
          <BookmarkCheck className="h-4 w-4 mr-1" />
          Buscar Empleos
        </Link>
      </Button>
    </div>
  )

  // Renderizar acciones específicas para empleadores
  const renderEmployerActions = () => (
    <div className="hidden md:flex items-center gap-2">
      <Button asChild variant="outline" className="flex items-center gap-1">
        <Link href="/employer/jobs">
          <Briefcase className="h-4 w-4 mr-1" />
          Mis Empleos
        </Link>
      </Button>
    </div>
  )

  // Renderizar acciones para usuarios no autenticados
  const renderPublicActions = () => (
    <div className="hidden md:flex items-center gap-2">
      <Button variant="ghost" onClick={openAuthModal}>
        Sign In
      </Button>
      <Button asChild variant="secondary" className="flex items-center gap-1">
        <Link href="/schedule-demo">
          <Calendar className="h-4 w-4 mr-1" />
          Agendar Demo
        </Link>
      </Button>
    </div>
  )

  // Renderizar menú móvil para candidatos
  const renderCandidateMobileMenu = () => (
    <div className="flex flex-col gap-2">
      <Link
        href="/candidate/dashboard"
        className="text-sm font-medium py-2 transition-colors hover:text-honey"
        onClick={() => setIsMenuOpen(false)}
      >
        Dashboard
      </Link>
      <Link
        href="/job-feed"
        className="text-sm font-medium py-2 transition-colors hover:text-honey"
        onClick={() => setIsMenuOpen(false)}
      >
        Buscar Empleos
      </Link>
      <Link
        href="/candidate/applications"
        className="text-sm font-medium py-2 transition-colors hover:text-honey"
        onClick={() => setIsMenuOpen(false)}
      >
        Mis Aplicaciones
      </Link>
      <Link
        href="/candidate/saved-jobs"
        className="text-sm font-medium py-2 transition-colors hover:text-honey"
        onClick={() => setIsMenuOpen(false)}
      >
        Empleos Guardados
      </Link>
      <Link
        href="/candidate/profile"
        className="text-sm font-medium py-2 transition-colors hover:text-honey"
        onClick={() => setIsMenuOpen(false)}
      >
        Mi Perfil
      </Link>
      <Link
        href="/candidate/notifications"
        className="text-sm font-medium py-2 transition-colors hover:text-honey"
        onClick={() => setIsMenuOpen(false)}
      >
        Notificaciones
      </Link>
      <Link
        href="/settings"
        className="text-sm font-medium py-2 transition-colors hover:text-honey"
        onClick={() => setIsMenuOpen(false)}
      >
        Configuración
      </Link>

      <div className="pt-4 border-t mt-2">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => {
            handleSignOut()
            setIsMenuOpen(false)
          }}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Cerrar sesión
        </Button>
      </div>
    </div>
  )

  // Renderizar menú móvil para empleadores
  const renderEmployerMobileMenu = () => (
    <div className="flex flex-col gap-2">
      <Link
        href="/employer/dashboard"
        className="text-sm font-medium py-2 transition-colors hover:text-honey"
        onClick={() => setIsMenuOpen(false)}
      >
        Dashboard
      </Link>
      <Link
        href="/employer/jobs"
        className="text-sm font-medium py-2 transition-colors hover:text-honey"
        onClick={() => setIsMenuOpen(false)}
      >
        Mis Empleos
      </Link>
      <Link
        href="/employer/candidates"
        className="text-sm font-medium py-2 transition-colors hover:text-honey"
        onClick={() => setIsMenuOpen(false)}
      >
        Candidatos
      </Link>
      <Link
        href="/employer/profile"
        className="text-sm font-medium py-2 transition-colors hover:text-honey"
        onClick={() => setIsMenuOpen(false)}
      >
        Perfil de Empresa
      </Link>
      <Link
        href="/employer/notifications"
        className="text-sm font-medium py-2 transition-colors hover:text-honey"
        onClick={() => setIsMenuOpen(false)}
      >
        Notificaciones
      </Link>
      <Link
        href="/settings"
        className="text-sm font-medium py-2 transition-colors hover:text-honey"
        onClick={() => setIsMenuOpen(false)}
      >
        Configuración
      </Link>

      <Button onClick={() => setIsMenuOpen(false)} asChild className="mt-2">
        <Link href="/employer/post-job">Publicar empleo</Link>
      </Button>

      <div className="pt-4 border-t mt-2">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => {
            handleSignOut()
            setIsMenuOpen(false)
          }}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Cerrar sesión
        </Button>
      </div>
    </div>
  )

  // Renderizar menú móvil para usuarios no autenticados
  const renderPublicMobileMenu = () => (
    <>
      <nav className="flex flex-col space-y-4">
        <Link
          href="/jobs"
          className="text-sm font-medium transition-colors hover:text-honey"
          onClick={() => setIsMenuOpen(false)}
        >
          Empleos
        </Link>
        <Link
          href="/companies"
          className="text-sm font-medium transition-colors hover:text-honey"
          onClick={() => setIsMenuOpen(false)}
        >
          Empresas
        </Link>
      </nav>

      <div className="flex flex-col gap-2 pt-4 border-t">
        <Button
          variant="ghost"
          onClick={() => {
            openAuthModal()
            setIsMenuOpen(false)
          }}
        >
          Sign In
        </Button>
        <Button asChild variant="secondary" className="flex items-center gap-1" onClick={() => setIsMenuOpen(false)}>
          <Link href="/schedule-demo">
            <Calendar className="h-4 w-4 mr-1" />
            Agendar Demo
          </Link>
        </Button>
      </div>
    </>
  )

  // Renderizar menú de usuario para candidatos
  const renderCandidateUserMenu = () => (
    <DropdownMenuContent align="end" className="w-56">
      <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Link href="/candidate/dashboard" className="w-full flex items-center">
          <Briefcase className="h-4 w-4 mr-2" />
          Dashboard
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Link href="/candidate/profile" className="w-full flex items-center">
          <User className="h-4 w-4 mr-2" />
          Mi Perfil
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Link href="/candidate/applications" className="w-full flex items-center">
          <BookmarkCheck className="h-4 w-4 mr-2" />
          Mis Aplicaciones
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Link href="/candidate/saved-jobs" className="w-full flex items-center">
          <Briefcase className="h-4 w-4 mr-2" />
          Empleos Guardados
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Link href="/candidate/notifications" className="w-full flex items-center">
          <Bell className="h-4 w-4 mr-2" />
          Notificaciones
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Link href="/settings" className="w-full flex items-center">
          <Settings className="h-4 w-4 mr-2" />
          Configuración
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={handleSignOut}>
        <div className="flex items-center w-full">
          <LogOut className="h-4 w-4 mr-2" />
          Cerrar sesión
        </div>
      </DropdownMenuItem>
    </DropdownMenuContent>
  )

  // Renderizar menú de usuario para empleadores
  const renderEmployerUserMenu = () => (
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Link href="/employer/dashboard" className="w-full">
          Dashboard
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Link href="/employer/profile" className="w-full">
          Perfil
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Link href="/settings" className="w-full">
          Configuración
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={handleSignOut}>
        <div className="flex items-center w-full">
          <LogOut className="h-4 w-4 mr-2" />
          Cerrar sesión
        </div>
      </DropdownMenuItem>
    </DropdownMenuContent>
  )

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <BeeIcon size={32} />
              <span className="font-bold text-xl hidden sm:inline-block">BuzzJobs</span>
            </Link>

            {/* Navegación adaptada al contexto */}
            {isInEmployerRoute() && isEmployer ? (
              <nav className="hidden md:flex items-center gap-6 ml-6">
                <Link href="/employer/dashboard" className="text-sm font-medium transition-colors hover:text-honey">
                  Dashboard
                </Link>
                <Link href="/employer/jobs" className="text-sm font-medium transition-colors hover:text-honey">
                  Mis Empleos
                </Link>
                <Link href="/employer/candidates" className="text-sm font-medium transition-colors hover:text-honey">
                  Candidatos
                </Link>
                <Link href="/employer/profile" className="text-sm font-medium transition-colors hover:text-honey">
                  Perfil
                </Link>
              </nav>
            ) : (
              !isDashboard && (
                <>
                  {!isLoading && user
                    ? isCandidate
                      ? renderCandidateNav()
                      : isEmployer
                        ? renderEmployerNav()
                        : renderPublicNav()
                    : renderPublicNav()}
                </>
              )
            )}

            {isDashboard && !isInEmployerRoute() && (
              <div className="hidden md:block ml-4 px-3 py-1 bg-muted rounded-md text-sm font-medium">
                {isEmployerDashboard ? "Portal Empresarial" : "Portal del Candidato"}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Acciones adaptadas al contexto */}
            {isInEmployerRoute() && isEmployer ? (
              <>
                <Link href="/employer/notifications">
                  <Button variant="ghost" size="icon" className="relative" aria-label="Notificaciones">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-honey rounded-full"></span>
                  </Button>
                </Link>

                <Button asChild className="hidden md:inline-flex">
                  <Link href="/employer/post-job">
                    <Briefcase className="h-4 w-4 mr-1" />
                    Publicar empleo
                  </Link>
                </Button>

                <Button variant="outline" className="hidden md:inline-flex" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-1" />
                  Cerrar sesión
                </Button>

                <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </>
            ) : !isLoading && user ? (
              <>
                <Link href={isCandidate ? "/candidate/notifications" : "/employer/notifications"}>
                  <Button variant="ghost" size="icon" className="relative" aria-label="Notificaciones">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-honey rounded-full"></span>
                  </Button>
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-8 w-8 bg-muted"
                      aria-label="Menú de usuario"
                    >
                      <User className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  {isCandidate ? renderCandidateUserMenu() : renderEmployerUserMenu()}
                </DropdownMenu>

                {/* Solo mostrar el botón "Publicar empleo" en el dashboard de empleador */}
                {isEmployer && isEmployerDashboard && (
                  <Button asChild className="hidden md:inline-flex">
                    <Link href="/employer/post-job">
                      <Briefcase className="h-4 w-4 mr-1" />
                      Publicar empleo
                    </Link>
                  </Button>
                )}

                {isCandidate && !isDashboard && renderCandidateActions()}
                {isEmployer && !isDashboard && renderEmployerActions()}
              </>
            ) : (
              renderPublicActions()
            )}

            {!isInEmployerRoute() && (
              <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t">
            <div className="container py-4 space-y-4">
              {isInEmployerRoute() && isEmployer ? (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/employer/dashboard"
                    className="text-sm font-medium py-2 transition-colors hover:text-honey flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Briefcase className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                  <Link
                    href="/employer/jobs"
                    className="text-sm font-medium py-2 transition-colors hover:text-honey flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Briefcase className="h-4 w-4 mr-2" />
                    Mis Empleos
                  </Link>
                  <Link
                    href="/employer/candidates"
                    className="text-sm font-medium py-2 transition-colors hover:text-honey flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Candidatos
                  </Link>
                  <Link
                    href="/employer/profile"
                    className="text-sm font-medium py-2 transition-colors hover:text-honey flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Perfil
                  </Link>
                  <Link
                    href="/employer/post-job"
                    className="text-sm font-medium py-2 transition-colors hover:text-honey flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Briefcase className="h-4 w-4 mr-2" />
                    Publicar Empleo
                  </Link>
                  <div className="pt-4 border-t mt-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => {
                        handleSignOut()
                        setIsMenuOpen(false)
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Cerrar sesión
                    </Button>
                  </div>
                </div>
              ) : !isLoading && user ? (
                isCandidate ? (
                  renderCandidateMobileMenu()
                ) : (
                  renderEmployerMobileMenu()
                )
              ) : (
                renderPublicMobileMenu()
              )}
            </div>
          </div>
        )}
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  )
}
