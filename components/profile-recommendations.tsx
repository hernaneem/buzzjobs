"use client"

import { useState, useEffect } from "react"
import { useTooltipPreferences } from "@/contexts/tooltip-preferences-context"
import { Button } from "@/components/ui/button-custom"
import { Card, CardContent } from "@/components/ui/card-custom"
import { Lightbulb, Check, X } from "lucide-react"
import { getProfileRecommendations } from "@/lib/services/user-behavior-service"
import { useToast } from "@/hooks/use-toast"

interface ProfileRecommendation {
  profileId: string
  score: number
  reason: string
}

export function ProfileRecommendations({ userId }: { userId: string }) {
  const { profiles, setActiveProfile, activeProfileId } = useTooltipPreferences()
  const [recommendations, setRecommendations] = useState<ProfileRecommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [dismissed, setDismissed] = useState<Record<string, boolean>>({})
  const [applied, setApplied] = useState<Record<string, boolean>>({})
  const { toast } = useToast()

  // Cargar recomendaciones
  useEffect(() => {
    const loadRecommendations = async () => {
      setLoading(true)
      try {
        // Obtener recomendaciones del servicio
        const recs = await getProfileRecommendations(userId, profiles)

        // Filtrar recomendaciones para no mostrar el perfil activo
        const filteredRecs = recs.filter((rec) => rec.profileId !== activeProfileId)

        // Cargar perfiles descartados del localStorage
        const dismissedProfiles = JSON.parse(localStorage.getItem("dismissed_profile_recommendations") || "{}")

        // Filtrar recomendaciones descartadas recientemente (últimas 24 horas)
        const now = Date.now()
        const validDismissed: Record<string, boolean> = {}

        Object.entries(dismissedProfiles).forEach(([id, timestamp]) => {
          // Si el descarte fue hace menos de 24 horas, mantenerlo
          if (now - (timestamp as number) < 24 * 60 * 60 * 1000) {
            validDismissed[id] = true
          }
        })

        // Actualizar estado de descartados
        setDismissed(validDismissed)

        // Filtrar recomendaciones descartadas
        const finalRecs = filteredRecs.filter((rec) => !validDismissed[rec.profileId])

        setRecommendations(finalRecs)
      } catch (error) {
        console.error("Error al cargar recomendaciones:", error)
      } finally {
        setLoading(false)
      }
    }

    // Solo cargar si tenemos un userId
    if (userId) {
      loadRecommendations()
    }
  }, [userId, profiles, activeProfileId])

  // Aplicar un perfil recomendado
  const applyRecommendation = (profileId: string) => {
    setActiveProfile(profileId)
    setApplied((prev) => ({ ...prev, [profileId]: true }))

    toast({
      title: "Perfil aplicado",
      description: "La configuración de tooltips ha sido actualizada.",
      variant: "default",
    })
  }

  // Descartar una recomendación
  const dismissRecommendation = (profileId: string) => {
    // Marcar como descartado en el estado
    setDismissed((prev) => ({ ...prev, [profileId]: true }))

    // Guardar en localStorage con timestamp
    const dismissedProfiles = JSON.parse(localStorage.getItem("dismissed_profile_recommendations") || "{}")
    dismissedProfiles[profileId] = Date.now()
    localStorage.setItem("dismissed_profile_recommendations", JSON.stringify(dismissedProfiles))
  }

  // Si no hay recomendaciones o todas fueron descartadas, no mostrar nada
  if (loading || recommendations.length === 0) {
    return null
  }

  // Mostrar solo la recomendación principal
  const topRecommendation = recommendations[0]
  const profile = profiles.find((p) => p.id === topRecommendation.profileId)

  if (!profile || applied[topRecommendation.profileId] || dismissed[topRecommendation.profileId]) {
    return null
  }

  return (
    <Card className="mb-6 border-honey/30 bg-honey/5">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="bg-honey/20 p-2 rounded-full">
            <Lightbulb className="h-5 w-5 text-honey" />
          </div>

          <div className="flex-1">
            <h4 className="text-sm font-medium mb-1">Recomendación personalizada</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Basado en tu actividad, te recomendamos el perfil <span className="font-medium">{profile.name}</span>.
            </p>
            <p className="text-xs text-muted-foreground mb-3">Razón: {topRecommendation.reason}</p>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className="gap-1"
                onClick={() => applyRecommendation(topRecommendation.profileId)}
              >
                <Check className="h-4 w-4" />
                Aplicar
              </Button>

              <Button
                size="sm"
                variant="ghost"
                className="gap-1"
                onClick={() => dismissRecommendation(topRecommendation.profileId)}
              >
                <X className="h-4 w-4" />
                No mostrar
              </Button>
            </div>
          </div>

          <div className="flex-shrink-0">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => dismissRecommendation(topRecommendation.profileId)}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Cerrar</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
