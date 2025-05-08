import { supabase } from "@/lib/supabase"
import type { Profile } from "./profile-service"

export interface BlogCategory {
  id: string
  name: string
  slug: string
  description?: string
  created_at?: string
  updated_at?: string
}

export interface BlogTag {
  id: string
  name: string
  slug: string
  created_at?: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  featured_image_url?: string
  author_id: string
  category_id?: string
  is_published: boolean
  is_featured: boolean
  views_count: number
  published_at?: string
  created_at?: string
  updated_at?: string
}

export interface BlogPostWithDetails extends BlogPost {
  author?: Profile
  category?: BlogCategory
  tags?: BlogTag[]
}

// Obtener artículo por ID
export async function getBlogPostById(id: string): Promise<BlogPostWithDetails | null> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select(`
      *,
      author:profiles (
        id,
        full_name,
        avatar_url
      ),
      category:blog_categories (
        id,
        name,
        slug
      )
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error al obtener artículo:", error)
    return null
  }

  // Obtener etiquetas
  const { data: tagsData } = await supabase
    .from("blog_post_tags")
    .select(`
      tag:blog_tags (
        id,
        name,
        slug
      )
    `)
    .eq("post_id", id)

  const tags = tagsData?.map((item) => item.tag) || []

  return { ...data, tags }
}

// Obtener artículo por slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPostWithDetails | null> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select(`
      *,
      author:profiles (
        id,
        full_name,
        avatar_url
      ),
      category:blog_categories (
        id,
        name,
        slug
      )
    `)
    .eq("slug", slug)
    .single()

  if (error) {
    console.error("Error al obtener artículo por slug:", error)
    return null
  }

  // Obtener etiquetas
  const { data: tagsData } = await supabase
    .from("blog_post_tags")
    .select(`
      tag:blog_tags (
        id,
        name,
        slug
      )
    `)
    .eq("post_id", data.id)

  const tags = tagsData?.map((item) => item.tag) || []

  return { ...data, tags }
}

// Obtener artículos recientes
export async function getRecentBlogPosts(limit = 5): Promise<BlogPostWithDetails[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select(`
      *,
      author:profiles (
        id,
        full_name,
        avatar_url
      ),
      category:blog_categories (
        id,
        name,
        slug
      )
    `)
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error al obtener artículos recientes:", error)
    return []
  }

  return data
}

// Obtener artículos destacados
export async function getFeaturedBlogPosts(limit = 3): Promise<BlogPostWithDetails[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select(`
      *,
      author:profiles (
        id,
        full_name,
        avatar_url
      ),
      category:blog_categories (
        id,
        name,
        slug
      )
    `)
    .eq("is_published", true)
    .eq("is_featured", true)
    .order("published_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error al obtener artículos destacados:", error)
    return []
  }

  return data
}

// Obtener artículos por categoría
export async function getBlogPostsByCategory(
  categorySlug: string,
  page = 1,
  pageSize = 10,
): Promise<{ posts: BlogPostWithDetails[]; count: number }> {
  // Primero obtener la categoría
  const { data: category } = await supabase.from("blog_categories").select("id").eq("slug", categorySlug).single()

  if (!category) {
    return { posts: [], count: 0 }
  }

  // Obtener el recuento total
  const { count, error: countError } = await supabase
    .from("blog_posts")
    .select("*", { count: "exact", head: true })
    .eq("is_published", true)
    .eq("category_id", category.id)

  if (countError) {
    console.error("Error al obtener recuento de artículos:", countError)
    return { posts: [], count: 0 }
  }

  // Aplicar paginación
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const { data, error } = await supabase
    .from("blog_posts")
    .select(`
      *,
      author:profiles (
        id,
        full_name,
        avatar_url
      ),
      category:blog_categories (
        id,
        name,
        slug
      )
    `)
    .eq("is_published", true)
    .eq("category_id", category.id)
    .range(from, to)
    .order("published_at", { ascending: false })

  if (error) {
    console.error("Error al obtener artículos por categoría:", error)
    return { posts: [], count: count || 0 }
  }

  return { posts: data, count: count || 0 }
}

// Obtener categorías de blog
export async function getBlogCategories(): Promise<BlogCategory[]> {
  const { data, error } = await supabase.from("blog_categories").select("*").order("name")

  if (error) {
    console.error("Error al obtener categorías:", error)
    return []
  }

  return data
}

// Crear artículo
export async function createBlogPost(
  post: Omit<BlogPost, "id" | "views_count" | "created_at" | "updated_at">,
): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from("blog_posts")
    .insert({
      ...post,
      views_count: 0,
    })
    .select()
    .single()

  if (error) {
    console.error("Error al crear artículo:", error)
    return null
  }

  return data
}

// Actualizar artículo
export async function updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  const { data, error } = await supabase.from("blog_posts").update(updates).eq("id", id).select().single()

  if (error) {
    console.error("Error al actualizar artículo:", error)
    return null
  }

  return data
}

// Incrementar contador de vistas
export async function incrementBlogPostViews(id: string): Promise<boolean> {
  const { error } = await supabase.rpc("increment_blog_post_views", { post_id: id })

  if (error) {
    console.error("Error al incrementar vistas:", error)
    return false
  }

  return true
}
