"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { TooltipPreferencesDialog } from "@/components/tooltip-preferences-dialog"
import { Button } from "@/components/ui/button-custom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card-custom"
import { ArrowLeft, Plus, Settings, Star } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useTooltipPreferences } from "@/contexts/tooltip-preferences-context"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { ProfileRecommendations } from "@/components/profile-recommendations"
import { trackBehaviorEventClient } from "@/lib/services/user-behavior-service"

export default function TooltipSettingsPage() {
  const [open, setOpen] = useState(true)
  const { profiles, activeProfileId } = useTooltipPreferences()
  const [userId, setUserId] = useState<string>("")

  const activeProfile = profiles.find((p) => p.id === activeProfileId)

  // Usuario de ejemplo
  const user = {
    name: "Carlos Méndez",
    role: "candidate",
    id: "user-123456", // ID de ejemplo
  }

  // Registrar evento de vista de página
  useEffect(() => {
    if (user?.id) {
      setUserId(user.id)

      // Registrar evento de vista de página
      trackBehaviorEventClient({
        event_type: "page_view",
        category: "general",
        element_id: "settings_tooltips",
        metadata: {
          page: "settings_tooltips",
        },
      })
    }
  }, [user?.id])

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} />

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6 max-w-4xl">
          <Breadcrumbs
            items={[
              { label: "Inicio", href: "/" },
              { label: "Configuración", href: "/settings" },
              { label: "Tooltips", href: "/settings/tooltips" },
            ]}
          />

          <div className="mb-8">
            <Link href="/settings" className="text-sm text-muted-foreground hover:text-honey flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Volver a configuración
            </Link>

            <h1 className="text-3xl font-bold mt-4">Configuración de tooltips</h1>
            <p className="text-muted-foreground">
              Personaliza la información que se muestra al pasar el cursor sobre los elementos de navegación.
            </p>
          </div>

          {/* Recomendaciones de perfiles basadas en comportamiento */}
          {userId && <ProfileRecommendations userId={userId} />}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Preferencias de tooltips
              </CardTitle>
              <CardDescription>
                Selecciona qué información deseas ver en los tooltips de las migas de pan y otros elementos de
                navegación.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 space-y-4">
                <p>
                  Los tooltips te muestran información adicional al pasar el cursor sobre elementos como empleos,
                  empresas, aplicaciones y más. Personaliza qué información quieres ver para mejorar tu experiencia de
                  navegación.
                </p>

                <div className="bg-muted p-4 rounded-md">
                  <h3 className="text-sm font-medium mb-2">Perfil activo</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{activeProfile?.name}</span>
                        {activeProfile?.isDefault && (
                          <span className="bg-honey/20 text-honey text-xs px-2 py-0.5 rounded-full flex items-center">
                            <Star className="h-3 w-3 mr-1" />
                            Predeterminado
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{activeProfile?.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => setOpen(true)} className="gap-2">
                        <Settings className="h-4 w-4" />
                        Configurar
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Perfiles disponibles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {profiles
                      .filter((p) => p.id !== activeProfileId)
                      .map((profile) => (
                        <div key={profile.id} className="border rounded-md p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{profile.name}</span>
                            {profile.isDefault && (
                              <span className="bg-honey/20 text-honey text-xs px-2 py-0.5 rounded-full flex items-center">
                                <Star className="h-3 w-3 mr-1" />
                                Predeterminado
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">{profile.description}</p>
                        </div>
                      ))}
                    <div
                      className="border border-dashed rounded-md p-3 flex items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => setOpen(true)}
                    >
                      <div className="text-center">
                        <Plus className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Crear nuevo perfil</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button onClick={() => setOpen(true)} className="gap-2">
                  <Settings className="h-4 w-4" />
                  Gestionar perfiles y configuración
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <TooltipPreferencesDialog open={open} onOpenChange={setOpen} />

      <Footer />
    </div>
  )
}
