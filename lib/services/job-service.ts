import { supabase } from "@/lib/supabase"
import type { Skill } from "./profile-service"

export type JobType = "tiempo_completo" | "medio_tiempo" | "contrato" | "freelance" | "pasantia"
export type ExperienceLevel = "entry" | "mid" | "senior" | "lead" | "executive"
export type SalaryPeriod = "hora" | "dia" | "semana" | "quincena" | "mes" | "año"
export type SalaryCurrency = "MXN" | "USD"

export interface Job {
  id: string
  company_id: string
  title: string
  description: string
  responsibilities?: string
  requirements?: string
  benefits?: string
  location?: string
  is_remote: boolean
  job_type: JobType
  experience_level: ExperienceLevel
  salary_min?: number
  salary_max?: number
  salary_currency?: SalaryCurrency
  salary_period?: SalaryPeriod
  is_salary_hidden: boolean
  application_deadline?: string
  is_active: boolean
  views_count: number
  applications_count: number
  created_at?: string
  updated_at?: string
  published_at?: string
}

export interface JobWithCompany extends Job {
  company: {
    id: string
    name: string
    logo_url?: string
    location?: string
  }
}

export interface JobSkill {
  job_id: string
  skill_id: string
  is_required: boolean
  skill?: Skill
}

// Obtener trabajo por ID
export async function getJobById(id: string): Promise<JobWithCompany | null> {
  const { data, error } = await supabase
    .from("jobs")
    .select(`
      *,
      company:companies (
        id,
        name,
        logo_url,
        location
      )
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error al obtener trabajo:", error)
    return null
  }

  return data
}

// Crear trabajo
export async function createJob(
  job: Omit<Job, "id" | "views_count" | "applications_count" | "created_at" | "updated_at">,
): Promise<Job | null> {
  const { data, error } = await supabase
    .from("jobs")
    .insert({
      ...job,
      views_count: 0,
      applications_count: 0,
      published_at: job.is_active ? new Date().toISOString() : null,
    })
    .select()
    .single()

  if (error) {
    console.error("Error al crear trabajo:", error)
    return null
  }

  return data
}

// Actualizar trabajo
export async function updateJob(id: string, updates: Partial<Job>): Promise<Job | null> {
  // Si estamos activando el trabajo y no tiene fecha de publicación, establecerla
  if (updates.is_active && !updates.published_at) {
    updates.published_at = new Date().toISOString()
  }

  const { data, error } = await supabase.from("jobs").update(updates).eq("id", id).select().single()

  if (error) {
    console.error("Error al actualizar trabajo:", error)
    return null
  }

  return data
}

// Eliminar trabajo
export async function deleteJob(id: string): Promise<boolean> {
  const { error } = await supabase.from("jobs").delete().eq("id", id)

  if (error) {
    console.error("Error al eliminar trabajo:", error)
    return false
  }

  return true
}

// Obtener trabajos por empresa
export async function getJobsByCompany(companyId: string): Promise<Job[]> {
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error al obtener trabajos por empresa:", error)
    return []
  }

  return data
}

// Buscar trabajos
export async function searchJobs(
  query?: string,
  filters?: {
    location?: string
    jobType?: JobType[]
    experienceLevel?: ExperienceLevel[]
    isRemote?: boolean
    salaryMin?: number
    salaryMax?: number
    salaryCurrency?: SalaryCurrency
  },
  page = 1,
  pageSize = 10,
): Promise<{ jobs: JobWithCompany[]; count: number }> {
  let queryBuilder = supabase
    .from("jobs")
    .select(
      `
      *,
      company:companies (
        id,
        name,
        logo_url,
        location
      )
    `,
      { count: "exact" },
    )
    .eq("is_active", true)

  // Aplicar filtros de búsqueda
  if (query) {
    queryBuilder = queryBuilder.or(`title.ilike.%${query}%, description.ilike.%${query}%`)
  }

  if (filters) {
    if (filters.location) {
      queryBuilder = queryBuilder.ilike("location", `%${filters.location}%`)
    }

    if (filters.jobType && filters.jobType.length > 0) {
      queryBuilder = queryBuilder.in("job_type", filters.jobType)
    }

    if (filters.experienceLevel && filters.experienceLevel.length > 0) {
      queryBuilder = queryBuilder.in("experience_level", filters.experienceLevel)
    }

    if (filters.isRemote !== undefined) {
      queryBuilder = queryBuilder.eq("is_remote", filters.isRemote)
    }

    if (filters.salaryMin !== undefined) {
      queryBuilder = queryBuilder.gte("salary_max", filters.salaryMin)
    }

    if (filters.salaryMax !== undefined) {
      queryBuilder = queryBuilder.lte("salary_min", filters.salaryMax)
    }

    if (filters.salaryCurrency) {
      queryBuilder = queryBuilder.eq("salary_currency", filters.salaryCurrency)
    }
  }

  // Obtener el recuento total
  const { count, error: countError } = await queryBuilder.select("id", { count: "exact", head: true })

  if (countError) {
    console.error("Error al obtener recuento de trabajos:", countError)
    return { jobs: [], count: 0 }
  }

  // Aplicar paginación
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const { data, error } = await queryBuilder.range(from, to).order("published_at", { ascending: false })

  if (error) {
    console.error("Error al buscar trabajos:", error)
    return { jobs: [], count: count || 0 }
  }

  return { jobs: data, count: count || 0 }
}

// Incrementar contador de vistas
export async function incrementJobViews(id: string): Promise<boolean> {
  const { error } = await supabase.rpc("increment_job_views", { job_id: id })

  if (error) {
    console.error("Error al incrementar vistas:", error)
    return false
  }

  return true
}

// Obtener habilidades requeridas para un trabajo
export async function getJobSkills(jobId: string): Promise<JobSkill[]> {
  const { data, error } = await supabase
    .from("job_skills")
    .select(`
      job_id,
      skill_id,
      is_required,
      skills (
        id,
        name,
        category
      )
    `)
    .eq("job_id", jobId)

  if (error) {
    console.error("Error al obtener habilidades del trabajo:", error)
    return []
  }

  return data.map((item) => ({
    job_id: item.job_id,
    skill_id: item.skill_id,
    is_required: item.is_required,
    skill: item.skills,
  }))
}

// Agregar habilidad a un trabajo
export async function addJobSkill(jobId: string, skillId: string, isRequired = true): Promise<boolean> {
  const { error } = await supabase.from("job_skills").upsert({
    job_id: jobId,
    skill_id: skillId,
    is_required: isRequired,
  })

  if (error) {
    console.error("Error al agregar habilidad al trabajo:", error)
    return false
  }

  return true
}

// Eliminar habilidad de un trabajo
export async function removeJobSkill(jobId: string, skillId: string): Promise<boolean> {
  const { error } = await supabase.from("job_skills").delete().eq("job_id", jobId).eq("skill_id", skillId)

  if (error) {
    console.error("Error al eliminar habilidad del trabajo:", error)
    return false
  }

  return true
}
