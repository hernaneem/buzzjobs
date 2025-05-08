"use client"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrackingPreferences } from "@/components/settings/tracking-preferences"

export default function PrivacySettingsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <PageHeader
            title="Configuración de privacidad"
            description="Gestiona tus preferencias de privacidad y seguimiento"
          />

          <div className="mt-8">
            <Tabs defaultValue="tracking">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="tracking">Seguimiento</TabsTrigger>
                <TabsTrigger value="data">Mis datos</TabsTrigger>
              </TabsList>

              <TabsContent value="tracking" className="space-y-6">
                <TrackingPreferences />
              </TabsContent>

              <TabsContent value="data" className="space-y-6">
                <div className="bg-background p-6 rounded-xl border shadow-soft">
                  <h2 className="text-xl font-bold mb-4">Mis datos personales</h2>
                  <p className="text-muted-foreground mb-6">
                    Aquí puedes gestionar tus datos personales y solicitar su descarga o eliminación.
                  </p>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 border rounded-md">
                      <div>
                        <h3 className="font-medium">Descargar mis datos</h3>
                        <p className="text-sm text-muted-foreground">Obtén una copia de todos tus datos personales</p>
                      </div>
                      <Button variant="outline">Solicitar descarga</Button>
                    </div>

                    <div className="flex justify-between items-center p-4 border rounded-md">
                      <div>
                        <h3 className="font-medium">Eliminar mi cuenta</h3>
                        <p className="text-sm text-muted-foreground">
                          Elimina permanentemente tu cuenta y todos tus datos
                        </p>
                      </div>
                      <Button variant="destructive">Solicitar eliminación</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
