"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button-custom"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Check, Settings } from "lucide-react"
import { useTooltipPreferences, tooltipCategories } from "@/contexts/tooltip-preferences-context"
import { ProfileManager } from "@/components/profile-manager"
import { trackBehaviorEventClient } from "@/lib/services/user-behavior-service"

interface TooltipPreferencesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TooltipPreferencesDialog({ open, onOpenChange }: TooltipPreferencesDialogProps) {
  const { preferences, updateCategoryEnabled, updateFieldEnabled, resetToDefaults, isTooltipEnabled, isFieldEnabled } =
    useTooltipPreferences()

  const [activeTab, setActiveTab] = useState("preferences")

  // Registrar evento de interacción
  const trackInteraction = (action: string, details?: Record<string, any>) => {
    trackBehaviorEventClient({
      event_type: "tooltip_click",
      category: "general",
      element_id: "tooltip_preferences",
      metadata: {
        action,
        ...details,
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configuración de tooltips
          </DialogTitle>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value)
            trackInteraction("change_tab", { tab: value })
          }}
          className="flex-1 flex flex-col"
        >
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="preferences">Preferencias</TabsTrigger>
            <TabsTrigger value="profiles">Perfiles</TabsTrigger>
          </TabsList>

          <TabsContent value="preferences" className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-6 py-2">
                {tooltipCategories.map((category) => (
                  <div key={category.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">{category.label}</h3>
                        <p className="text-xs text-muted-foreground">{category.description}</p>
                      </div>
                      <Switch
                        checked={isTooltipEnabled(category.id)}
                        onCheckedChange={(checked) => {
                          updateCategoryEnabled(category.id, checked)
                          trackInteraction("toggle_category", {
                            category: category.id,
                            enabled: checked,
                          })
                        }}
                      />
                    </div>

                    {isTooltipEnabled(category.id) && (
                      <div className="space-y-2 pl-2 border-l-2 border-muted">
                        {category.fields.map((field) => (
                          <div key={field.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-sm">{field.label}</span>
                              <span className="text-xs text-muted-foreground">({field.description})</span>
                            </div>
                            <Switch
                              checked={isFieldEnabled(category.id, field.id)}
                              onCheckedChange={(checked) => {
                                updateFieldEnabled(category.id, field.id, checked)
                                trackInteraction("toggle_field", {
                                  category: category.id,
                                  field: field.id,
                                  enabled: checked,
                                })
                              }}
                              size="sm"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    <Separator />
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="flex justify-between items-center pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  resetToDefaults()
                  trackInteraction("reset_defaults")
                }}
              >
                Restablecer valores predeterminados
              </Button>
              <Button
                onClick={() => {
                  onOpenChange(false)
                  trackInteraction("save_preferences")
                }}
              >
                <Check className="mr-2 h-4 w-4" />
                Guardar
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="profiles" className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 pr-4">
              <ProfileManager />
            </ScrollArea>

            <div className="flex justify-end items-center pt-4">
              <Button
                onClick={() => {
                  onOpenChange(false)
                  trackInteraction("close_profiles")
                }}
              >
                <Check className="mr-2 h-4 w-4" />
                Cerrar
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
