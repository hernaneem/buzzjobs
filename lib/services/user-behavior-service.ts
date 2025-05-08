import { supabase } from "@/lib/supabase"

// Tipos de eventos que podemos rastrear
export type BehaviorEventType =
  | "page_view"
  | "tooltip_hover"
  | "tooltip_click"
  | "search"
  | "filter_use"
  | "job_view"
  | "company_view"
  | "application_view"
  | "candidate_view"
  | "interview_view"

// Categorías principales para agrupar eventos
export type BehaviorCategory = "job" | "company" | "application" | "interview" | "candidate" | "general"

// Estructura de un evento de comportamiento
export interface BehaviorEvent {
  id?: string
  user_id: string
  event_type: BehaviorEventType
  category: BehaviorCategory
  element_id?: string
  metadata?: Record<string, any>
  created_at?: string
}

// Estructura para el resumen de comportamiento
export interface BehaviorSummary {
  categoryScores: Record<BehaviorCategory, number>
  interestScores: Record<string, number>
  roleBasedScore: number // 0-100, donde 0 es completamente candidato y 100 es completamente empleador
  detailLevel: number // 0-100, donde 0 es mínimo y 100 es detallado
}

// Registrar un evento de comportamiento
export async function trackBehaviorEvent(event: Omit<BehaviorEvent, "id" | "created_at">): Promise<boolean> {
  try {
    const { error } = await supabase.from("user_behavior_events").insert(event)

    if (error) {
      console.error("Error al registrar evento de comportamiento:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Error al registrar evento de comportamiento:", error)
    return false
  }
}

// Versión del cliente que almacena eventos localmente cuando el usuario no está autenticado
// o cuando hay problemas de conexión
export function trackBehaviorEventClient(event: Omit<BehaviorEvent, "id" | "created_at" | "user_id">): void {
  try {
    // Obtener eventos almacenados o inicializar array vacío
    const storedEvents = JSON.parse(localStorage.getItem("behavior_events") || "[]")

    // Añadir nuevo evento con timestamp
    storedEvents.push({
      ...event,
      user_id: "anonymous", // Se actualizará cuando se sincronice
      created_at: new Date().toISOString(),
    })

    // Limitar a 100 eventos para no sobrecargar el localStorage
    const limitedEvents = storedEvents.slice(-100)

    // Guardar eventos actualizados
    localStorage.setItem("behavior_events", JSON.stringify(limitedEvents))
  } catch (error) {
    console.error("Error al almacenar evento localmente:", error)
  }
}

// Sincronizar eventos almacenados localmente con el servidor
export async function syncLocalEvents(userId: string): Promise<boolean> {
  try {
    const storedEvents = JSON.parse(localStorage.getItem("behavior_events") || "[]")

    if (storedEvents.length === 0) {
      return true
    }

    // Actualizar el user_id en todos los eventos
    const eventsWithUserId = storedEvents.map((event: any) => ({
      ...event,
      user_id: userId,
    }))

    // Enviar eventos al servidor en lotes de 50
    const batchSize = 50
    for (let i = 0; i < eventsWithUserId.length; i += batchSize) {
      const batch = eventsWithUserId.slice(i, i + batchSize)
      const { error } = await supabase.from("user_behavior_events").insert(batch)

      if (error) {
        console.error("Error al sincronizar eventos:", error)
        return false
      }
    }

    // Limpiar eventos locales después de sincronizar
    localStorage.removeItem("behavior_events")
    return true
  } catch (error) {
    console.error("Error al sincronizar eventos locales:", error)
    return false
  }
}

// Obtener eventos de comportamiento de un usuario
export async function getUserBehaviorEvents(userId: string, limit = 100, offset = 0): Promise<BehaviorEvent[]> {
  try {
    const { data, error } = await supabase
      .from("user_behavior_events")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error("Error al obtener eventos de comportamiento:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error al obtener eventos de comportamiento:", error)
    return []
  }
}

// Analizar el comportamiento del usuario para generar un resumen
export async function analyzeBehavior(userId: string): Promise<BehaviorSummary> {
  // Valores predeterminados
  const defaultSummary: BehaviorSummary = {
    categoryScores: {
      job: 0,
      company: 0,
      application: 0,
      interview: 0,
      candidate: 0,
      general: 0,
    },
    interestScores: {},
    roleBasedScore: 50, // Neutral entre candidato y empleador
    detailLevel: 50, // Nivel de detalle medio
  }

  try {
    // Obtener los últimos 500 eventos para análisis
    const { data, error } = await supabase
      .from("user_behavior_events")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(500)

    if (error || !data || data.length === 0) {
      console.error("Error al obtener eventos para análisis:", error)
      return defaultSummary
    }

    // Contadores para análisis
    const categoryCounts: Record<BehaviorCategory, number> = {
      job: 0,
      company: 0,
      application: 0,
      interview: 0,
      candidate: 0,
      general: 0,
    }

    const interestCounts: Record<string, number> = {}
    let candidateActions = 0
    let employerActions = 0
    let detailedViewActions = 0
    let quickViewActions = 0

    // Analizar cada evento
    data.forEach((event) => {
      // Incrementar contador de categoría
      categoryCounts[event.category]++

      // Analizar metadatos para intereses específicos
      if (event.metadata) {
        Object.entries(event.metadata).forEach(([key, value]) => {
          if (typeof value === "string") {
            interestCounts[value] = (interestCounts[value] || 0) + 1
          }
        })
      }

      // Determinar si es acción de candidato o empleador
      if (["job_view", "company_view", "application_view"].includes(event.event_type)) {
        candidateActions++
      }

      if (["candidate_view", "application_review"].includes(event.event_type)) {
        employerActions++
      }

      // Determinar nivel de detalle
      if (["tooltip_hover", "filter_use", "advanced_search"].includes(event.event_type)) {
        detailedViewActions++
      }

      if (["page_view", "quick_view"].includes(event.event_type)) {
        quickViewActions++
      }
    })

    // Calcular puntuaciones normalizadas
    const totalEvents = Object.values(categoryCounts).reduce((sum, count) => sum + count, 0)

    // Normalizar puntuaciones de categorías (0-100)
    const categoryScores: Record<BehaviorCategory, number> = {} as Record<BehaviorCategory, number>
    Object.entries(categoryCounts).forEach(([category, count]) => {
      categoryScores[category as BehaviorCategory] = Math.round((count / totalEvents) * 100)
    })

    // Normalizar puntuaciones de intereses (mantener solo los top 10)
    const interestEntries = Object.entries(interestCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)

    const interestScores: Record<string, number> = {}
    interestEntries.forEach(([interest, count]) => {
      interestScores[interest] = Math.round((count / totalEvents) * 100)
    })

    // Calcular puntuación basada en rol (0-100)
    const totalRoleActions = candidateActions + employerActions
    const roleBasedScore = totalRoleActions > 0 ? Math.round((employerActions / totalRoleActions) * 100) : 50

    // Calcular nivel de detalle (0-100)
    const totalDetailActions = detailedViewActions + quickViewActions
    const detailLevel = totalDetailActions > 0 ? Math.round((detailedViewActions / totalDetailActions) * 100) : 50

    return {
      categoryScores,
      interestScores,
      roleBasedScore,
      detailLevel,
    }
  } catch (error) {
    console.error("Error al analizar comportamiento:", error)
    return defaultSummary
  }
}

// Generar recomendaciones de perfiles basadas en el comportamiento
export function generateProfileRecommendations(
  behaviorSummary: BehaviorSummary,
  availableProfiles: any[],
): { profileId: string; score: number; reason: string }[] {
  const recommendations: { profileId: string; score: number; reason: string }[] = []

  // Calcular puntuación para cada perfil disponible
  availableProfiles.forEach((profile) => {
    let score = 0
    let reason = ""

    // Perfil detallado
    if (behaviorSummary.detailLevel > 70) {
      if (profile.id === "detailed") {
        score += 30
        reason = "Tu interacción detallada con la plataforma"
      }
    }

    // Perfil mínimo
    if (behaviorSummary.detailLevel < 30) {
      if (profile.id === "minimal") {
        score += 30
        reason = "Tu preferencia por interfaces simples"
      }
    }

    // Perfil enfocado en candidatos
    if (behaviorSummary.roleBasedScore < 30) {
      if (profile.id === "job-focused") {
        score += 25
        reason = "Tu actividad como buscador de empleo"
      }
    }

    // Perfil enfocado en empleadores
    if (behaviorSummary.roleBasedScore > 70) {
      if (profile.id === "candidate-focused") {
        score += 25
        reason = "Tu actividad como reclutador"
      }
    }

    // Analizar categorías de mayor interés
    const topCategory = Object.entries(behaviorSummary.categoryScores).sort((a, b) => b[1] - a[1])[0]

    if (topCategory && topCategory[1] > 40) {
      // Si hay un fuerte interés en una categoría específica
      const category = topCategory[0]

      if (category === "job" && profile.id === "job-focused") {
        score += 20
        reason = reason ? `${reason} y tu interés en empleos` : "Tu interés en empleos"
      } else if (category === "company" && profile.id === "job-focused") {
        score += 15
        reason = reason ? `${reason} y tu interés en empresas` : "Tu interés en empresas"
      } else if (category === "candidate" && profile.id === "candidate-focused") {
        score += 20
        reason = reason ? `${reason} y tu interés en candidatos` : "Tu interés en candidatos"
      } else if (category === "application" && (profile.id === "job-focused" || profile.id === "candidate-focused")) {
        score += 15
        reason = reason ? `${reason} y tu interés en aplicaciones` : "Tu interés en aplicaciones"
      }
    }

    // Añadir algo de puntuación al perfil estándar para usuarios nuevos o con comportamiento mixto
    if (profile.id === "default" && Object.values(behaviorSummary.categoryScores).every((score) => score < 30)) {
      score += 15
      reason = "Configuración equilibrada para tu uso variado"
    }

    // Añadir a recomendaciones si tiene puntuación significativa
    if (score > 0) {
      recommendations.push({
        profileId: profile.id,
        score,
        reason,
      })
    }
  })

  // Ordenar por puntuación descendente
  return recommendations.sort((a, b) => b.score - a.score)
}

// Obtener recomendaciones de perfiles para un usuario
export async function getProfileRecommendations(
  userId: string,
  availableProfiles: any[],
): Promise<{ profileId: string; score: number; reason: string }[]> {
  try {
    // Analizar comportamiento del usuario
    const behaviorSummary = await analyzeBehavior(userId)

    // Generar recomendaciones basadas en el análisis
    return generateProfileRecommendations(behaviorSummary, availableProfiles)
  } catch (error) {
    console.error("Error al obtener recomendaciones de perfiles:", error)
    return []
  }
}

// Alias para compatibilidad con el código existente
export const trackUserBehavior = trackBehaviorEvent
