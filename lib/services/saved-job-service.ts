import { supabase } from "@/lib/supabase"
import type { JobWithCompany } from "./job-service"

// Guardar trabajo
export async function saveJob(candidateId: string, jobId: string): Promise<boolean> {
  const { error } = await supabase.from("saved_jobs").upsert({
    candidate_id: candidateId,
    job_id: jobId,
  })

  if (error) {
    console.error("Error al guardar trabajo:", error)
    return false
  }

  return true
}

// Eliminar trabajo guardado
export async function unsaveJob(candidateId: string, jobId: string): Promise<boolean> {
  const { error } = await supabase.from("saved_jobs").delete().eq("candidate_id", candidateId).eq("job_id", jobId)

  if (error) {
    console.error("Error al eliminar trabajo guardado:", error)
    return false
  }

  return true
}

// Verificar si un trabajo está guardado
export async function isJobSaved(candidateId: string, jobId: string): Promise<boolean> {
  const { count, error } = await supabase
    .from("saved_jobs")
    .select("*", { count: "exact", head: true })
    .eq("candidate_id", candidateId)
    .eq("job_id", jobId)

  if (error) {
    console.error("Error al verificar trabajo guardado:", error)
    return false
  }

  return (count || 0) > 0
}

// Obtener trabajos guardados por un candidato
export async function getSavedJobs(candidateId: string): Promise<JobWithCompany[]> {
  const { data, error } = await supabase
    .from("saved_jobs")
    .select(`
      job_id,
      jobs (
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
    console.error("Error al obtener trabajos guardados:", error)
    return []
  }

  return data.map((item) => item.jobs)
}
