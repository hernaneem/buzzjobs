"use client"

import { useState } from "react"
import { useTooltipPreferences } from "@/contexts/tooltip-preferences-context"
import { Button } from "@/components/ui/button-custom"
import { Input } from "@/components/ui/input-custom"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Copy, Edit, MoreHorizontal, Plus, Star, Trash, Check } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

export function ProfileManager() {
  const { profiles, activeProfileId, createProfile, updateProfile, deleteProfile, setActiveProfile, duplicateProfile } =
    useTooltipPreferences()

  const { toast } = useToast()

  // Estados para el formulario de creación/edición
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [profileName, setProfileName] = useState("")
  const [profileDescription, setProfileDescription] = useState("")

  // Estado para el diálogo de confirmación de eliminación
  const [profileToDelete, setProfileToDelete] = useState<string | null>(null)

  // Iniciar creación de perfil
  const handleCreateNew = () => {
    setProfileName("")
    setProfileDescription("")
    setIsCreating(true)
    setIsEditing(null)
  }

  // Guardar nuevo perfil
  const handleSaveNew = () => {
    if (profileName.trim()) {
      const newId = createProfile(profileName.trim(), profileDescription.trim())
      toast({
        title: "Perfil creado",
        description: `El perfil "${profileName}" ha sido creado correctamente.`,
      })
      setIsCreating(false)

      // Opcionalmente, activar el nuevo perfil
      setActiveProfile(newId)
    }
  }

  // Iniciar edición de perfil
  const handleEdit = (id: string) => {
    const profile = profiles.find((p) => p.id === id)
    if (profile) {
      setProfileName(profile.name)
      setProfileDescription(profile.description)
      setIsEditing(id)
      setIsCreating(false)
    }
  }

  // Guardar cambios de perfil
  const handleSaveEdit = () => {
    if (isEditing && profileName.trim()) {
      updateProfile(isEditing, {
        name: profileName.trim(),
        description: profileDescription.trim(),
      })
      toast({
        title: "Perfil actualizado",
        description: `El perfil "${profileName}" ha sido actualizado correctamente.`,
      })
      setIsEditing(null)
    }
  }

  // Cancelar creación/edición
  const handleCancel = () => {
    setIsCreating(false)
    setIsEditing(null)
  }

  // Confirmar eliminación de perfil
  const handleConfirmDelete = () => {
    if (profileToDelete) {
      const profileName = profiles.find((p) => p.id === profileToDelete)?.name
      deleteProfile(profileToDelete)
      setProfileToDelete(null)

      toast({
        title: "Perfil eliminado",
        description: `El perfil "${profileName}" ha sido eliminado correctamente.`,
        variant: "destructive",
      })
    }
  }

  // Duplicar perfil
  const handleDuplicate = (id: string) => {
    const profile = profiles.find((p) => p.id === id)
    if (profile) {
      const newName = `${profile.name} (copia)`
      const newId = duplicateProfile(id, newName)

      toast({
        title: "Perfil duplicado",
        description: `Se ha creado una copia del perfil "${profile.name}".`,
      })

      // Opcionalmente, activar el nuevo perfil
      setActiveProfile(newId)
    }
  }

  // Establecer perfil como predeterminado
  const handleSetDefault = (id: string) => {
    updateProfile(id, { isDefault: true })

    toast({
      title: "Perfil predeterminado actualizado",
      description: `El perfil ha sido establecido como predeterminado.`,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Perfiles de configuración</h3>
        <Button onClick={handleCreateNew} size="sm" className="gap-1">
          <Plus className="h-4 w-4" />
          Nuevo perfil
        </Button>
      </div>

      {/* Formulario de creación */}
      {isCreating && (
        <div className="border rounded-md p-4 space-y-3">
          <h4 className="text-sm font-medium">Nuevo perfil</h4>
          <div className="space-y-2">
            <Input
              placeholder="Nombre del perfil"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
            />
            <Textarea
              placeholder="Descripción (opcional)"
              value={profileDescription}
              onChange={(e) => setProfileDescription(e.target.value)}
              rows={2}
            />
          </div>
          <div className="flex justify-end gap-2 mt-3">
            <Button variant="outline" size="sm" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button size="sm" onClick={handleSaveNew} disabled={!profileName.trim()}>
              Guardar
            </Button>
          </div>
        </div>
      )}

      {/* Lista de perfiles */}
      <div className="space-y-2">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className={`border rounded-md p-3 ${profile.id === activeProfileId ? "border-honey bg-honey/5" : ""} ${
              isEditing === profile.id ? "border-primary" : ""
            }`}
          >
            {isEditing === profile.id ? (
              // Modo edición
              <div className="space-y-3">
                <Input
                  placeholder="Nombre del perfil"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                />
                <Textarea
                  placeholder="Descripción (opcional)"
                  value={profileDescription}
                  onChange={(e) => setProfileDescription(e.target.value)}
                  rows={2}
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={handleCancel}>
                    Cancelar
                  </Button>
                  <Button size="sm" onClick={handleSaveEdit} disabled={!profileName.trim()}>
                    Guardar
                  </Button>
                </div>
              </div>
            ) : (
              // Modo visualización
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{profile.name}</h4>
                    {profile.isDefault && (
                      <span className="bg-honey/20 text-honey text-xs px-2 py-0.5 rounded-full flex items-center">
                        <Star className="h-3 w-3 mr-1" />
                        Predeterminado
                      </span>
                    )}
                    {profile.id === activeProfileId && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full flex items-center">
                        <Check className="h-3 w-3 mr-1" />
                        Activo
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{profile.description}</p>

                  {profile.id !== activeProfileId && (
                    <Button
                      variant="link"
                      size="sm"
                      className="h-auto p-0 text-xs mt-1"
                      onClick={() => setActiveProfile(profile.id)}
                    >
                      Activar este perfil
                    </Button>
                  )}
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Opciones</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEdit(profile.id)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDuplicate(profile.id)}>
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicar
                    </DropdownMenuItem>
                    {!profile.isDefault && (
                      <DropdownMenuItem onClick={() => handleSetDefault(profile.id)}>
                        <Star className="h-4 w-4 mr-2" />
                        Establecer como predeterminado
                      </DropdownMenuItem>
                    )}
                    {!profile.isDefault && profiles.length > 1 && (
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => setProfileToDelete(profile.id)}
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Eliminar
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Diálogo de confirmación de eliminación */}
      <AlertDialog open={!!profileToDelete} onOpenChange={(open) => !open && setProfileToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar perfil?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El perfil será eliminado permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
