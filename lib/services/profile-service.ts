import { supabase } from "@/lib/supabase"
import type { User } from "@supabase/supabase-js"

export type ProfileRole = "candidate" | "employer" | "admin"

export interface Profile {
  id: string
  full_name: string
  role: ProfileRole
  email: string
  phone?: string
  location?: string
  bio?: string
  avatar_url?: string
  website?: string
  resume_url?: string
  linkedin_url?: string
  github_url?: string
  created_at?: string
  updated_at?: string
}

export interface Skill {
  id: string
  name: string
  category?: string
}

export interface ProfileSkill {
  skill_id: string
  level: "principiante" | "intermedio" | "avanzado" | "experto"
  skill?: Skill
}

export interface WorkExperience {
  id: string
  profile_id: string
  company_name: string
  position: string
  location?: string
  start_date: string
  end_date?: string
  is_current: boolean
  description?: string
}

export interface Education {
  id: string
  profile_id: string
  institution: string
  degree: string
  field_of_study?: string
  start_date: string
  end_date?: string
  is_current: boolean
  description?: string
}

// Obtener perfil por ID
export async function getProfileById(id: string): Promise<Profile | null> {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", id).single()

  if (error) {
    console.error("Error al obtener perfil:", error)
    return null
  }

  return data
}

// Obtener perfil por usuario autenticado
export async function getCurrentProfile(): Promise<Profile | null> {
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

  if (sessionError || !sessionData.session) {
    console.error("Error al obtener sesión:", sessionError)
    return null
  }

  return getProfileById(sessionData.session.user.id)
}

// Crear o actualizar perfil
export async function upsertProfile(profile: Partial<Profile> & { id: string }): Promise<Profile | null> {
  const { data, error } = await supabase.from("profiles").upsert(profile).select().single()

  if (error) {
    console.error("Error al actualizar perfil:", error)
    return null
  }

  return data
}

// Crear perfil después del registro
export async function createProfileAfterSignUp(
  user: User,
  fullName: string,
  role: ProfileRole,
): Promise<Profile | null> {
  const profile: Partial<Profile> & { id: string } = {
    id: user.id,
    full_name: fullName,
    role: role,
    email: user.email || "",
  }

  return upsertProfile(profile)
}

// Obtener habilidades de un perfil
export async function getProfileSkills(profileId: string): Promise<ProfileSkill[]> {
  const { data, error } = await supabase
    .from("profile_skills")
    .select(`
      skill_id,
      level,
      skills (
        id,
        name,
        category
      )
    `)
    .eq("profile_id", profileId)

  if (error) {
    console.error("Error al obtener habilidades:", error)
    return []
  }

  return data.map((item) => ({
    skill_id: item.skill_id,
    level: item.level,
    skill: item.skills,
  }))
}

// Agregar habilidad a un perfil
export async function addProfileSkill(
  profileId: string,
  skillId: string,
  level: "principiante" | "intermedio" | "avanzado" | "experto",
): Promise<boolean> {
  const { error } = await supabase.from("profile_skills").upsert({
    profile_id: profileId,
    skill_id: skillId,
    level,
  })

  if (error) {
    console.error("Error al agregar habilidad:", error)
    return false
  }

  return true
}

// Eliminar habilidad de un perfil
export async function removeProfileSkill(profileId: string, skillId: string): Promise<boolean> {
  const { error } = await supabase.from("profile_skills").delete().eq("profile_id", profileId).eq("skill_id", skillId)

  if (error) {
    console.error("Error al eliminar habilidad:", error)
    return false
  }

  return true
}

// Obtener experiencias laborales de un perfil
export async function getWorkExperiences(profileId: string): Promise<WorkExperience[]> {
  const { data, error } = await supabase
    .from("work_experiences")
    .select("*")
    .eq("profile_id", profileId)
    .order("is_current", { ascending: false })
    .order("end_date", { ascending: false })

  if (error) {
    console.error("Error al obtener experiencias laborales:", error)
    return []
  }

  return data
}

// Agregar experiencia laboral
export async function addWorkExperience(experience: Omit<WorkExperience, "id">): Promise<WorkExperience | null> {
  const { data, error } = await supabase.from("work_experiences").insert(experience).select().single()

  if (error) {
    console.error("Error al agregar experiencia laboral:", error)
    return null
  }

  return data
}

// Actualizar experiencia laboral
export async function updateWorkExperience(experience: WorkExperience): Promise<WorkExperience | null> {
  const { data, error } = await supabase
    .from("work_experiences")
    .update(experience)
    .eq("id", experience.id)
    .select()
    .single()

  if (error) {
    console.error("Error al actualizar experiencia laboral:", error)
    return null
  }

  return data
}

// Eliminar experiencia laboral
export async function deleteWorkExperience(id: string): Promise<boolean> {
  const { error } = await supabase.from("work_experiences").delete().eq("id", id)

  if (error) {
    console.error("Error al eliminar experiencia laboral:", error)
    return false
  }

  return true
}

// Obtener educación de un perfil
export async function getEducations(profileId: string): Promise<Education[]> {
  const { data, error } = await supabase
    .from("educations")
    .select("*")
    .eq("profile_id", profileId)
    .order("is_current", { ascending: false })
    .order("end_date", { ascending: false })

  if (error) {
    console.error("Error al obtener educación:", error)
    return []
  }

  return data
}

// Agregar educación
export async function addEducation(education: Omit<Education, "id">): Promise<Education | null> {
  const { data, error } = await supabase.from("educations").insert(education).select().single()

  if (error) {
    console.error("Error al agregar educación:", error)
    return null
  }

  return data
}

// Actualizar educación
export async function updateEducation(education: Education): Promise<Education | null> {
  const { data, error } = await supabase.from("educations").update(education).eq("id", education.id).select().single()

  if (error) {
    console.error("Error al actualizar educación:", error)
    return null
  }

  return data
}

// Eliminar educación
export async function deleteEducation(id: string): Promise<boolean> {
  const { error } = await supabase.from("educations").delete().eq("id", id)

  if (error) {
    console.error("Error al eliminar educación:", error)
    return false
  }

  return true
}

// Buscar habilidades
export async function searchSkills(query: string): Promise<Skill[]> {
  const { data, error } = await supabase.from("skills").select("*").ilike("name", `%${query}%`).limit(10)

  if (error) {
    console.error("Error al buscar habilidades:", error)
    return []
  }

  return data
}

// Crear habilidad si no existe
export async function createSkillIfNotExists(name: string, category?: string): Promise<Skill | null> {
  // Primero buscar si ya existe
  const { data: existingSkill } = await supabase.from("skills").select("*").ilike("name", name).single()

  if (existingSkill) {
    return existingSkill
  }

  // Si no existe, crear
  const { data, error } = await supabase.from("skills").insert({ name, category }).select().single()

  if (error) {
    console.error("Error al crear habilidad:", error)
    return null
  }

  return data
}

// Alias para compatibilidad con el código existente
export const getProfile = getProfileById
export const updateProfile = upsertProfile
export const createProfile = createProfileAfterSignUp
