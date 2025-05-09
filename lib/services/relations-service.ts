import { supabase } from "@/lib/supabase"

/**
 * Obtiene todas las aplicaciones de un candidato específico junto con la información del trabajo y la empresa
 */
export async function getCandidateApplications(candidateId: string) {
  const { data, error } = await supabase
    .from('applications')
    .select(`
      *,
      job:jobs(
        *,
        company:companies(*)
      )
    `)
    .eq('candidate_id', candidateId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching applications:', error)
    return []
  }

  return data
}

/**
 * Obtiene todos los candidatos que han aplicado a trabajos de una empresa específica
 */
export async function getCompanyCandidates(companyId: string) {
  const { data, error } = await supabase
    .from('applications')
    .select(`
      *,
      candidate:profiles(*),
      job:jobs(*)
    `)
    .eq('company_id', companyId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching candidates:', error)
    return []
  }

  return data
}

/**
 * Obtiene todos los trabajos guardados por un candidato
 */
export async function getSavedJobs(candidateId: string) {
  const { data, error } = await supabase
    .from('saved_jobs')
    .select(`
      *,
      job:jobs(
        *,
        company:companies(*)
      )
    `)
    .eq('candidate_id', candidateId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching saved jobs:', error)
    return []
  }

  return data
}

/**
 * Obtiene trabajos recomendados para un candidato basado en sus habilidades y experiencia
 */
export async function getRecommendedJobs(candidateId: string, limit = 5) {
  // Esta función es más compleja y requeriría una lógica personalizada
  // Por ahora, simplemente devuelve los trabajos más recientes como recomendación
  const { data, error } = await supabase
    .from('jobs')
    .select(`
      *,
      company:companies(*)
    `)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching recommended jobs:', error)
    return []
  }

  return data
}

/**
 * Obtiene todos los trabajos publicados por una empresa
 */
export async function getCompanyJobs(companyId: string) {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('company_id', companyId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching company jobs:', error)
    return []
  }

  return data
}

/**
 * Obtiene las estadísticas de candidatos para una empresa
 */
export async function getCandidateStats(companyId: string) {
  const { data, error } = await supabase
    .from('applications')
    .select('status')
    .eq('company_id', companyId)

  if (error) {
    console.error('Error fetching candidate stats:', error)
    return {
      total: 0,
      new: 0,
      screening: 0,
      interview: 0,
      offer: 0,
      hired: 0,
      rejected: 0
    }
  }

  // Conteo de candidatos por estado
  const stats = {
    total: data.length,
    new: data.filter(app => app.status === 'new').length,
    screening: data.filter(app => app.status === 'screening').length,
    interview: data.filter(app => app.status === 'interview').length,
    offer: data.filter(app => app.status === 'offer').length,
    hired: data.filter(app => app.status === 'hired').length,
    rejected: data.filter(app => app.status === 'rejected').length
  }

  return stats
}

/**
 * Obtiene las métricas de trabajos para una empresa
 */
export async function getJobMetrics(companyId: string) {
  // Esta función requeriría múltiples consultas para obtener diferentes métricas
  // Por ahora, implementamos una versión simplificada

  // Obtener vistas totales y aplicaciones para todos los trabajos de la empresa
  const { data: jobs, error: jobsError } = await supabase
    .from('jobs')
    .select('id, views_count, applications_count, created_at')
    .eq('company_id', companyId)

  if (jobsError) {
    console.error('Error fetching job metrics:', jobsError)
    return {
      totalViews: 0,
      totalApplicants: 0
    }
  }

  // Calcular vistas totales y aplicaciones
  const totalViews = jobs.reduce((sum, job) => sum + (job.views_count || 0), 0)
  const totalApplicants = jobs.reduce((sum, job) => sum + (job.applications_count || 0), 0)

  // Calcular tasa de conversión
  const conversionRate = totalViews > 0 ? (totalApplicants / totalViews) * 100 : 0

  return {
    totalViews,
    totalApplicants,
    conversionRate: parseFloat(conversionRate.toFixed(2))
  }
} 