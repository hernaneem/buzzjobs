"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

// Tipos de datos para las preferencias de tooltips
export type TooltipFieldType = {
  id: string
  label: string
  icon: string
  description: string
}

export type TooltipCategoryType = {
  id: "job" | "company" | "application" | "interview" | "candidate"
  label: string
  description: string
  fields: TooltipFieldType[]
}

// Definición de campos disponibles por categoría
export const tooltipCategories: TooltipCategoryType[] = [
  {
    id: "job",
    label: "Empleos",
    description: "Información mostrada al pasar el cursor sobre un empleo",
    fields: [
      { id: "title", label: "Título", icon: "Briefcase", description: "Título del empleo" },
      { id: "company", label: "Empresa", icon: "Building2", description: "Nombre de la empresa" },
      { id: "location", label: "Ubicación", icon: "MapPin", description: "Ubicación del empleo" },
      { id: "salary", label: "Salario", icon: "DollarSign", description: "Rango salarial" },
      { id: "type", label: "Tipo", icon: "Clock", description: "Tipo de empleo (tiempo completo, parcial, etc.)" },
      { id: "posted", label: "Publicado", icon: "Calendar", description: "Fecha de publicación" },
      { id: "applicants", label: "Aplicantes", icon: "Users", description: "Número de aplicantes" },
    ],
  },
  {
    id: "company",
    label: "Empresas",
    description: "Información mostrada al pasar el cursor sobre una empresa",
    fields: [
      { id: "name", label: "Nombre", icon: "Building2", description: "Nombre de la empresa" },
      { id: "industry", label: "Industria", icon: "Briefcase", description: "Sector industrial" },
      { id: "size", label: "Tamaño", icon: "Users", description: "Tamaño de la empresa" },
      { id: "location", label: "Ubicación", icon: "MapPin", description: "Ubicación de la empresa" },
      { id: "founded", label: "Fundación", icon: "Calendar", description: "Año de fundación" },
      { id: "jobs", label: "Empleos", icon: "FileText", description: "Número de empleos activos" },
      { id: "rating", label: "Calificación", icon: "Star", description: "Calificación de la empresa" },
    ],
  },
  {
    id: "application",
    label: "Aplicaciones",
    description: "Información mostrada al pasar el cursor sobre una aplicación",
    fields: [
      { id: "job", label: "Empleo", icon: "Briefcase", description: "Título del empleo" },
      { id: "company", label: "Empresa", icon: "Building2", description: "Nombre de la empresa" },
      { id: "status", label: "Estado", icon: "FileText", description: "Estado de la aplicación" },
      { id: "applied", label: "Aplicado", icon: "Calendar", description: "Fecha de aplicación" },
      { id: "updated", label: "Actualizado", icon: "RefreshCw", description: "Última actualización" },
    ],
  },
  {
    id: "interview",
    label: "Entrevistas",
    description: "Información mostrada al pasar el cursor sobre una entrevista",
    fields: [
      { id: "job", label: "Empleo", icon: "Briefcase", description: "Título del empleo" },
      { id: "company", label: "Empresa", icon: "Building2", description: "Nombre de la empresa" },
      { id: "date", label: "Fecha", icon: "Calendar", description: "Fecha de la entrevista" },
      { id: "time", label: "Hora", icon: "Clock", description: "Hora de la entrevista" },
      { id: "type", label: "Tipo", icon: "Video", description: "Tipo de entrevista" },
    ],
  },
  {
    id: "candidate",
    label: "Candidatos",
    description: "Información mostrada al pasar el cursor sobre un candidato",
    fields: [
      { id: "name", label: "Nombre", icon: "User", description: "Nombre del candidato" },
      { id: "position", label: "Posición", icon: "Briefcase", description: "Posición actual o deseada" },
      { id: "experience", label: "Experiencia", icon: "Clock", description: "Años de experiencia" },
      { id: "education", label: "Educación", icon: "GraduationCap", description: "Formación académica" },
      { id: "skills", label: "Habilidades", icon: "Code", description: "Habilidades principales" },
    ],
  },
]

// Tipo para las preferencias de usuario
export type TooltipPreferencesType = {
  [key in "job" | "company" | "application" | "interview" | "candidate"]: {
    enabled: boolean
    fields: { [fieldId: string]: boolean }
  }
}

// Tipo para un perfil de configuración
export type ConfigurationProfileType = {
  id: string
  name: string
  description: string
  isDefault: boolean
  preferences: TooltipPreferencesType
}

// Valores predeterminados para las preferencias
const defaultPreferences: TooltipPreferencesType = {
  job: {
    enabled: true,
    fields: {
      title: true,
      company: true,
      location: true,
      salary: true,
      type: true,
      posted: false,
      applicants: false,
    },
  },
  company: {
    enabled: true,
    fields: {
      name: true,
      industry: true,
      size: true,
      location: true,
      founded: false,
      jobs: true,
      rating: true,
    },
  },
  application: {
    enabled: true,
    fields: {
      job: true,
      company: true,
      status: true,
      applied: true,
      updated: false,
    },
  },
  interview: {
    enabled: true,
    fields: {
      job: true,
      company: true,
      date: true,
      time: true,
      type: false,
    },
  },
  candidate: {
    enabled: true,
    fields: {
      name: true,
      position: true,
      experience: true,
      education: true,
      skills: false,
    },
  },
}

// Perfiles predefinidos
const predefinedProfiles: ConfigurationProfileType[] = [
  {
    id: "default",
    name: "Estándar",
    description: "Configuración equilibrada con información esencial",
    isDefault: true,
    preferences: defaultPreferences,
  },
  {
    id: "minimal",
    name: "Mínimo",
    description: "Solo la información más básica",
    isDefault: false,
    preferences: {
      job: {
        enabled: true,
        fields: {
          title: true,
          company: true,
          location: false,
          salary: false,
          type: false,
          posted: false,
          applicants: false,
        },
      },
      company: {
        enabled: true,
        fields: {
          name: true,
          industry: true,
          size: false,
          location: false,
          founded: false,
          jobs: false,
          rating: false,
        },
      },
      application: {
        enabled: true,
        fields: {
          job: true,
          company: true,
          status: false,
          applied: false,
          updated: false,
        },
      },
      interview: {
        enabled: true,
        fields: {
          job: true,
          company: true,
          date: false,
          time: false,
          type: false,
        },
      },
      candidate: {
        enabled: true,
        fields: {
          name: true,
          position: true,
          experience: false,
          education: false,
          skills: false,
        },
      },
    },
  },
  {
    id: "detailed",
    name: "Detallado",
    description: "Toda la información disponible",
    isDefault: false,
    preferences: {
      job: {
        enabled: true,
        fields: {
          title: true,
          company: true,
          location: true,
          salary: true,
          type: true,
          posted: true,
          applicants: true,
        },
      },
      company: {
        enabled: true,
        fields: {
          name: true,
          industry: true,
          size: true,
          location: true,
          founded: true,
          jobs: true,
          rating: true,
        },
      },
      application: {
        enabled: true,
        fields: {
          job: true,
          company: true,
          status: true,
          applied: true,
          updated: true,
        },
      },
      interview: {
        enabled: true,
        fields: {
          job: true,
          company: true,
          date: true,
          time: true,
          type: true,
        },
      },
      candidate: {
        enabled: true,
        fields: {
          name: true,
          position: true,
          experience: true,
          education: true,
          skills: true,
        },
      },
    },
  },
  {
    id: "candidate-focused",
    name: "Enfocado en candidatos",
    description: "Optimizado para reclutadores",
    isDefault: false,
    preferences: {
      job: {
        enabled: true,
        fields: {
          title: true,
          company: true,
          location: true,
          salary: false,
          type: true,
          posted: false,
          applicants: false,
        },
      },
      company: {
        enabled: true,
        fields: {
          name: true,
          industry: true,
          size: false,
          location: false,
          founded: false,
          jobs: false,
          rating: false,
        },
      },
      application: {
        enabled: true,
        fields: {
          job: true,
          company: true,
          status: true,
          applied: true,
          updated: false,
        },
      },
      interview: {
        enabled: true,
        fields: {
          job: true,
          company: true,
          date: true,
          time: true,
          type: true,
        },
      },
      candidate: {
        enabled: true,
        fields: {
          name: true,
          position: true,
          experience: true,
          education: true,
          skills: true,
        },
      },
    },
  },
  {
    id: "job-focused",
    name: "Enfocado en empleos",
    description: "Optimizado para búsqueda de empleo",
    isDefault: false,
    preferences: {
      job: {
        enabled: true,
        fields: {
          title: true,
          company: true,
          location: true,
          salary: true,
          type: true,
          posted: true,
          applicants: false,
        },
      },
      company: {
        enabled: true,
        fields: {
          name: true,
          industry: true,
          size: true,
          location: true,
          founded: false,
          jobs: true,
          rating: true,
        },
      },
      application: {
        enabled: true,
        fields: {
          job: true,
          company: true,
          status: true,
          applied: true,
          updated: false,
        },
      },
      interview: {
        enabled: true,
        fields: {
          job: true,
          company: true,
          date: true,
          time: true,
          type: false,
        },
      },
      candidate: {
        enabled: true,
        fields: {
          name: true,
          position: true,
          experience: false,
          education: false,
          skills: false,
        },
      },
    },
  },
]

// Tipo para el contexto
type TooltipPreferencesContextType = {
  // Preferencias actuales
  preferences: TooltipPreferencesType
  updateCategoryEnabled: (category: keyof TooltipPreferencesType, enabled: boolean) => void
  updateFieldEnabled: (category: keyof TooltipPreferencesType, fieldId: string, enabled: boolean) => void
  resetToDefaults: () => void
  isTooltipEnabled: (category: keyof TooltipPreferencesType) => boolean
  isFieldEnabled: (category: keyof TooltipPreferencesType, fieldId: string) => boolean

  // Gestión de perfiles
  profiles: ConfigurationProfileType[]
  activeProfileId: string
  createProfile: (name: string, description: string) => string
  updateProfile: (id: string, updates: Partial<Omit<ConfigurationProfileType, "id">>) => void
  deleteProfile: (id: string) => void
  setActiveProfile: (id: string) => void
  duplicateProfile: (id: string, newName: string) => string
}

// Crear el contexto
const TooltipPreferencesContext = createContext<TooltipPreferencesContextType | undefined>(undefined)

// Hook personalizado para usar el contexto
export function useTooltipPreferences() {
  const context = useContext(TooltipPreferencesContext)
  if (context === undefined) {
    throw new Error("useTooltipPreferences debe ser usado dentro de un TooltipPreferencesProvider")
  }
  return context
}

// Proveedor del contexto
export function TooltipPreferencesProvider({ children }: { children: React.ReactNode }) {
  // Estado para las preferencias actuales
  const [preferences, setPreferences] = useState<TooltipPreferencesType>(defaultPreferences)

  // Estado para los perfiles de configuración
  const [profiles, setProfiles] = useState<ConfigurationProfileType[]>(predefinedProfiles)

  // ID del perfil activo
  const [activeProfileId, setActiveProfileId] = useState<string>("default")

  // Cargar perfiles y preferencias guardadas al iniciar
  useEffect(() => {
    const savedProfiles = localStorage.getItem("tooltipProfiles")
    const savedActiveProfileId = localStorage.getItem("tooltipActiveProfileId")

    if (savedProfiles) {
      try {
        const parsedProfiles = JSON.parse(savedProfiles) as ConfigurationProfileType[]
        setProfiles(parsedProfiles)

        // Si hay un perfil activo guardado y existe en los perfiles cargados
        if (savedActiveProfileId && parsedProfiles.some((p) => p.id === savedActiveProfileId)) {
          setActiveProfileId(savedActiveProfileId)

          // Establecer las preferencias del perfil activo
          const activeProfile = parsedProfiles.find((p) => p.id === savedActiveProfileId)
          if (activeProfile) {
            setPreferences(activeProfile.preferences)
          }
        } else {
          // Si no hay perfil activo válido, usar el perfil predeterminado
          const defaultProfile = parsedProfiles.find((p) => p.isDefault) || parsedProfiles[0]
          if (defaultProfile) {
            setActiveProfileId(defaultProfile.id)
            setPreferences(defaultProfile.preferences)
          }
        }
      } catch (error) {
        console.error("Error al cargar perfiles de tooltips:", error)
        // En caso de error, usar los perfiles predefinidos
        setProfiles(predefinedProfiles)
        setActiveProfileId("default")
        setPreferences(defaultPreferences)
      }
    }
  }, [])

  // Guardar perfiles y perfil activo cuando cambien
  useEffect(() => {
    localStorage.setItem("tooltipProfiles", JSON.stringify(profiles))
    localStorage.setItem("tooltipActiveProfileId", activeProfileId)
  }, [profiles, activeProfileId])

  // Actualizar las preferencias en el perfil activo cuando cambien
  useEffect(() => {
    setProfiles((prevProfiles) =>
      prevProfiles.map((profile) => (profile.id === activeProfileId ? { ...profile, preferences } : profile)),
    )
  }, [preferences, activeProfileId])

  // Actualizar si una categoría está habilitada
  const updateCategoryEnabled = (category: keyof TooltipPreferencesType, enabled: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        enabled,
      },
    }))
  }

  // Actualizar si un campo específico está habilitado
  const updateFieldEnabled = (category: keyof TooltipPreferencesType, fieldId: string, enabled: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        fields: {
          ...prev[category].fields,
          [fieldId]: enabled,
        },
      },
    }))
  }

  // Restablecer a valores predeterminados
  const resetToDefaults = () => {
    const defaultProfile = profiles.find((p) => p.id === "default")
    if (defaultProfile) {
      setPreferences(defaultProfile.preferences)
    } else {
      setPreferences(defaultPreferences)
    }
  }

  // Verificar si un tooltip está habilitado
  const isTooltipEnabled = (category: keyof TooltipPreferencesType) => {
    return preferences[category].enabled
  }

  // Verificar si un campo específico está habilitado
  const isFieldEnabled = (category: keyof TooltipPreferencesType, fieldId: string) => {
    return preferences[category].enabled && preferences[category].fields[fieldId]
  }

  // Crear un nuevo perfil
  const createProfile = (name: string, description: string): string => {
    const newId = `profile-${Date.now()}`
    const newProfile: ConfigurationProfileType = {
      id: newId,
      name,
      description,
      isDefault: false,
      preferences: { ...preferences }, // Usar las preferencias actuales como base
    }

    setProfiles((prev) => [...prev, newProfile])
    return newId
  }

  // Actualizar un perfil existente
  const updateProfile = (id: string, updates: Partial<Omit<ConfigurationProfileType, "id">>) => {
    setProfiles((prev) =>
      prev.map((profile) => {
        if (profile.id === id) {
          return { ...profile, ...updates }
        }

        // Si estamos estableciendo este perfil como predeterminado,
        // asegurarse de que ningún otro perfil sea predeterminado
        if (updates.isDefault && profile.isDefault) {
          return { ...profile, isDefault: false }
        }

        return profile
      }),
    )
  }

  // Eliminar un perfil
  const deleteProfile = (id: string) => {
    // No permitir eliminar el perfil activo o el último perfil
    if (id === activeProfileId || profiles.length <= 1) {
      return
    }

    setProfiles((prev) => {
      const filteredProfiles = prev.filter((profile) => profile.id !== id)

      // Si eliminamos el perfil predeterminado, establecer otro como predeterminado
      if (prev.find((p) => p.id === id)?.isDefault) {
        filteredProfiles[0].isDefault = true
      }

      return filteredProfiles
    })
  }

  // Establecer el perfil activo
  const setActiveProfile = (id: string) => {
    const profile = profiles.find((p) => p.id === id)
    if (profile) {
      setActiveProfileId(id)
      setPreferences(profile.preferences)
    }
  }

  // Duplicar un perfil existente
  const duplicateProfile = (id: string, newName: string): string => {
    const profileToDuplicate = profiles.find((p) => p.id === id)
    if (!profileToDuplicate) return ""

    const newId = `profile-${Date.now()}`
    const newProfile: ConfigurationProfileType = {
      id: newId,
      name: newName,
      description: `Copia de ${profileToDuplicate.name}`,
      isDefault: false,
      preferences: JSON.parse(JSON.stringify(profileToDuplicate.preferences)),
    }

    setProfiles((prev) => [...prev, newProfile])
    return newId
  }

  return (
    <TooltipPreferencesContext.Provider
      value={{
        // Preferencias
        preferences,
        updateCategoryEnabled,
        updateFieldEnabled,
        resetToDefaults,
        isTooltipEnabled,
        isFieldEnabled,

        // Perfiles
        profiles,
        activeProfileId,
        createProfile,
        updateProfile,
        deleteProfile,
        setActiveProfile,
        duplicateProfile,
      }}
    >
      {children}
    </TooltipPreferencesContext.Provider>
  )
}
