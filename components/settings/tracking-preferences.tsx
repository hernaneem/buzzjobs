"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card-custom"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button-custom"
import { Info } from "lucide-react"

export function TrackingPreferences() {
  const [isEnabled, setIsEnabled] = useState(false)

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
            onCheckedChange={setIsEnabled}
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
      </CardContent>
    </Card>
  )
}
