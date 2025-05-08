import { supabase } from "@/lib/supabase"

export interface Company {
  id: string
  owner_id: string
  name: string
  logo_url?: string
  website?: string
  industry?: string
  size?: "1-10" | "11-50" | "51-200" | "201-500" | "501-1000" | "1001+"
  founded_year?: number
  description?: string
  mission?: string
  location?: string
  address?: string
  phone?: string
  email?: string
  facebook_url?: string
  twitter_url?: string
  linkedin_url?: string
  instagram_url?: string
  is_verified: boolean
  created_at?: string
  updated_at?: string
}

// Obtener empresa por ID
export async function getCompanyById(id: string): Promise<Company | null> {
  const { data, error } = await supabase.from("companies").select("*").eq("id", id).single()

  if (error) {
    console.error("Error al obtener empresa:", error)
    return null
  }

  return data
}

// Obtener empresas por propietario
export async function getCompaniesByOwner(ownerId: string): Promise<Company[]> {
  const { data, error } = await supabase.from("companies").select("*").eq("owner_id", ownerId)

  if (error) {
    console.error("Error al obtener empresas:", error)
    return []
  }

  return data
}

// Crear empresa
export async function createCompany(
  company: Omit<Company, "id" | "is_verified" | "created_at" | "updated_at">,
): Promise<Company | null> {
  const { data, error } = await supabase
    .from("companies")
    .insert({ ...company, is_verified: false })
    .select()
    .single()

  if (error) {
    console.error("Error al crear empresa:", error)
    return null
  }

  return data
}

// Actualizar empresa
export async function updateCompany(id: string, updates: Partial<Company>): Promise<Company | null> {
  const { data, error } = await supabase.from("companies").update(updates).eq("id", id).select().single()

  if (error) {
    console.error("Error al actualizar empresa:", error)
    return null
  }

  return data
}

// Buscar empresas
export async function searchCompanies(query: string, limit = 10): Promise<Company[]> {
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .or(`name.ilike.%${query}%, industry.ilike.%${query}%, location.ilike.%${query}%`)
    .limit(limit)

  if (error) {
    console.error("Error al buscar empresas:", error)
    return []
  }

  return data
}

// Obtener todas las empresas (con paginación)
export async function getCompanies(page = 1, pageSize = 10): Promise<{ companies: Company[]; count: number }> {
  // Obtener el recuento total
  const { count, error: countError } = await supabase.from("companies").select("*", { count: "exact", head: true })

  if (countError) {
    console.error("Error al obtener recuento de empresas:", countError)
    return { companies: [], count: 0 }
  }

  // Obtener las empresas para la página actual
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const { data, error } = await supabase.from("companies").select("*").range(from, to).order("name")

  if (error) {
    console.error("Error al obtener empresas:", error)
    return { companies: [], count: count || 0 }
  }

  return { companies: data, count: count || 0 }
}
