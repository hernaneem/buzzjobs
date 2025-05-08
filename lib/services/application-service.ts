import { supabase } from "@/lib/supabase"
import type { Profile } from "./profile-service"
import type { JobWithCompany } from "./job-service"

export type ApplicationStatus = "pendiente" | "revisado" | "entrevista" | "oferta" | "rechazado" | "contratado"

export interface Application {
  id: string
  job_id: string
  candidate_id: string
  cover_letter?: string
  resume_url?: string
  status: ApplicationStatus
  notes?: string
  created_at?: string
  updated_at?: string
}

export interface ApplicationWithDetails extends Application {
  job?: JobWithCompany
  candidate?: Profile
}

// Crear aplicación
export async function createApplication(
  application: Omit<Application, "id" | "created_at" | "updated_at">,
): Promise<Application | null> {
  const { data, error } = await supabase.from("applications").insert(application).select().single()

  if (error) {
    console.error("Error al crear aplicación:", error)
    return null
  }

  // Incrementar contador de aplicaciones para el trabajo
  await supabase.rpc("increment_job_applications", { job_id: application.job_id })

  return data
}

// Obtener aplicación por ID
export async function getApplicationById(id: string): Promise<ApplicationWithDetails | null> {
  const { data, error } = await supabase
    .from("applications")
    .select(`
      *,
      job:jobs (
        *,
        company:companies (
          id,
          name,
          logo_url,
          location
        )
      ),
      candidate:profiles (
        id,
        full_name,
        email,
        avatar_url,
        location
      )
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error al obtener aplicación:", error)
    return null
  }

  return data
}

// Actualizar estado de aplicación
export async function updateApplicationStatus(
  id: string,
  status: ApplicationStatus,
  notes?: string,
): Promise<Application | null> {
  const updates: Partial<Application> = { status }
  if (notes !== undefined) {
    updates.notes = notes
  }

  const { data, error } = await supabase.from("applications").update(updates).eq("id", id).select().single()

  if (error) {
    console.error("Error al actualizar estado de aplicación:", error)
    return null
  }

  return data
}

// Obtener aplicaciones por trabajo
export async function getApplicationsByJob(jobId: string): Promise<ApplicationWithDetails[]> {
  const { data, error } = await supabase
    .from("applications")
    .select(`
      *,
      candidate:profiles (
        id,
        full_name,
        email,
        avatar_url,
        location
      )
    `)
    .eq("job_id", jobId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error al obtener aplicaciones por trabajo:", error)
    return []
  }

  return data
}

// Obtener aplicaciones por candidato
export async function getApplicationsByCandidate(candidateId: string): Promise<ApplicationWithDetails[]> {
  const { data, error } = await supabase
    .from("applications")
    .select(`
      *,
      job:jobs (
        *,
        company:companies (
          id,
          name,
          logo_url,
          location
        )
      )
    `)
    .eq("candidate_id", candidateId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error al obtener aplicaciones por candidato:", error)
    return []
  }

  return data
}

// Verificar si un candidato ya ha aplicado a un trabajo
export async function hasApplied(candidateId: string, jobId: string): Promise<boolean> {
  const { count, error } = await supabase
    .from("applications")
    .select("*", { count: "exact", head: true })
    .eq("candidate_id", candidateId)
    .eq("job_id", jobId)

  if (error) {
    console.error("Error al verificar aplicación:", error)
    return false
  }

  return (count || 0) > 0
}
