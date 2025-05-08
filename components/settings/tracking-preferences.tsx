"use client"

import { useContext } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card-custom"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button-custom"
import { BehaviorTrackingContext } from "@/contexts/behavior-tracking-context"
import { AlertCircle, Info } from "lucide-react"

export function TrackingPreferences() {
  const { isEnabled, enableTracking, disableTracking, clearSessionEvents } = useContext(BehaviorTrackingContext)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferencias de seguimiento</CardTitle>
        <CardDescription>
          Configura cómo se recopilan datos sobre tu uso de la plataforma para mejorar tu experiencia
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="tracking-toggle" className="text-base">
              Seguimiento de comportamiento
            </Label>
            <p className="text-sm text-muted-foreground">
              Permite recopilar datos sobre cómo utilizas la plataforma para personalizar tu experiencia
            </p>
          </div>
          <Switch
            id="tracking-toggle"
            checked={isEnabled}
            onCheckedChange={(checked) => {
              if (checked) {
                enableTracking()
              } else {
                disableTracking()
              }
            }}
          />
        </div>

        <div className="rounded-md bg-muted p-4">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-muted-foreground mt-0.5 mr-3" />
            <div>
              <h4 className="text-sm font-medium">¿Cómo se utilizan estos datos?</h4>
              <ul className="mt-2 text-sm text-muted-foreground space-y-2">
                <li>• Personalizar las recomendaciones de perfiles de tooltips</li>
                <li>• Adaptar la interfaz a tus necesidades específicas</li>
                <li>• Mejorar la relevancia de la información mostrada</li>
                <li>• Optimizar la experiencia de usuario en la plataforma</li>
              </ul>
              <p className="mt-2 text-sm text-muted-foreground">
                Todos los datos se utilizan exclusivamente para mejorar tu experiencia y no se comparten con terceros.
              </p>
            </div>
          </div>
        </div>

        {isEnabled && (
          <div className="rounded-md bg-amber-50 dark:bg-amber-950/20 p-4 border border-amber-200 dark:border-amber-800">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 mr-3" />
              <div>
                <h4 className="text-sm font-medium text-amber-800 dark:text-amber-300">
                  Datos recopilados en esta sesión
                </h4>
                <p className="mt-1 text-sm text-amber-700 dark:text-amber-400">
                  Los datos de comportamiento se están recopilando actualmente para personalizar tu experiencia.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-900/30"
                  onClick={clearSessionEvents}
                >
                  Limpiar datos de sesión
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
