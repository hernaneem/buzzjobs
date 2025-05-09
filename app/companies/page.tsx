"use client"

import { useState, useEffect } from "react"
import { CompanyCard } from "@/components/ui/company-card"
import { Input } from "@/components/ui/input-custom"
import { Button } from "@/components/ui/button-custom"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select-custom"
import { Search, MapPin, Filter, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"
import type { Company } from "@/lib/services/company-service"

// Interfaz extendida para incluir jobCount
interface CompanyWithJobCount extends Company {
  jobCount?: number
}

export default function CompaniesPage() {
  // Estado para filtros
  const [searchQuery, setSearchQuery] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [industryFilter, setIndustryFilter] = useState("")
  const [sizeFilter, setSizeFilter] = useState("")
  
  // Estado para las empresas
  const [companies, setCompanies] = useState<CompanyWithJobCount[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Cargar empresas de Supabase
  useEffect(() => {
    async function loadCompanies() {
      setIsLoading(true)
      try {
        // Obtener todas las empresas
        const { data: companiesData, error: companiesError } = await supabase
          .from("companies")
          .select("*")
          .eq("is_verified", true)
        
        if (companiesError) {
          console.error("Error loading companies:", companiesError)
          return
        }
        
        // Para cada empresa, obtener el número de trabajos
        const companiesWithJobCount = await Promise.all(
          (companiesData || []).map(async (company) => {
            const { count, error: jobsError } = await supabase
              .from("jobs")
              .select("*", { count: "exact", head: true })
              .eq("company_id", company.id)
              .eq("is_active", true)
            
            if (jobsError) {
              console.error(`Error loading job count for company ${company.id}:`, jobsError)
              return { ...company, jobCount: 0 }
            }
            
            return { ...company, jobCount: count || 0 }
          })
        )
        
        setCompanies(companiesWithJobCount)
      } catch (error) {
        console.error("Error loading companies data:", error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadCompanies()
  }, [])

  // Filtrar empresas según los criterios de búsqueda
  const filteredCompanies = companies.filter((company) => {
    const companyName = company.name?.toLowerCase() || ""
    const companyDescription = company.description?.toLowerCase() || ""
    const companyLocation = company.location?.toLowerCase() || ""
    const companyIndustry = company.industry || ""
    const companySize = company.size || ""
    
    const matchesSearch =
      searchQuery === "" ||
      companyName.includes(searchQuery.toLowerCase()) ||
      companyDescription.includes(searchQuery.toLowerCase())

    const matchesLocation =
      locationFilter === "" || companyLocation.includes(locationFilter.toLowerCase())

    const matchesIndustry = industryFilter === "" || companyIndustry === industryFilter

    const matchesSize = sizeFilter === "" || (companySize && companySize.includes(sizeFilter))

    return matchesSearch && matchesLocation && matchesIndustry && matchesSize
  })

  // Obtener lista única de industrias para el filtro
  const industries = [...new Set(companies.map(c => c.industry).filter(Boolean))] as string[]
  
  // Mostrar estado de carga
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-honey" />
          <p className="text-muted-foreground">Cargando empresas...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="bg-muted py-8">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter">Explora empresas</h1>
              <p className="text-muted-foreground">
                Descubre empresas que están contratando y encuentra tu próxima oportunidad laboral
              </p>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Nombre de empresa o palabra clave"
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Ubicación"
                    className="pl-10"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                  />
                </div>

                <Button className="w-full">Buscar</Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Filtros */}
              <div className="w-full md:w-1/4 space-y-6">
                <div className="bg-background p-6 rounded-xl border shadow-soft">
                  <h3 className="text-lg font-bold mb-4 flex items-center">
                    <Filter className="mr-2 h-5 w-5" />
                    Filtros
                  </h3>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Industria</label>
                      <Select value={industryFilter} onValueChange={setIndustryFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Todas las industrias" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Todas las industrias</SelectItem>
                          {industries.map((industry) => (
                            <SelectItem key={industry} value={industry}>
                              {industry}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Tamaño de empresa</label>
                      <Select value={sizeFilter} onValueChange={setSizeFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Cualquier tamaño" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Cualquier tamaño</SelectItem>
                          <SelectItem value="1-10">1-10 empleados</SelectItem>
                          <SelectItem value="11-50">11-50 empleados</SelectItem>
                          <SelectItem value="51-200">51-200 empleados</SelectItem>
                          <SelectItem value="201-500">201-500 empleados</SelectItem>
                          <SelectItem value="501-1000">501-1000 empleados</SelectItem>
                          <SelectItem value="1001+">Más de 1000 empleados</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="pt-4 border-t">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          setSearchQuery("")
                          setLocationFilter("")
                          setIndustryFilter("")
                          setSizeFilter("")
                        }}
                      >
                        Limpiar filtros
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Listado de empresas */}
              <div className="w-full md:w-3/4 space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-xl font-bold">Empresas</h2>
                    <p className="text-sm text-muted-foreground">Mostrando {filteredCompanies.length} resultados</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-sm">Ordenar por:</label>
                    <Select defaultValue="name">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Ordenar por" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">Nombre</SelectItem>
                        <SelectItem value="jobs-high">Más empleos</SelectItem>
                        <SelectItem value="jobs-low">Menos empleos</SelectItem>
                        <SelectItem value="recent">Más recientes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Cuadrícula de empresas */}
                {filteredCompanies.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredCompanies.map((company) => (
                      <CompanyCard
                        key={company.id}
                        id={company.id}
                        name={company.name || "Empresa sin nombre"}
                        logo={company.logo_url || "/placeholder.svg?height=80&width=80"}
                        location={company.location || "Ubicación no disponible"}
                        industry={company.industry || "Industria no especificada"}
                        size={company.size || "Tamaño no especificado"}
                        jobCount={company.jobCount || 0}
                        description={company.description || "Sin descripción disponible"}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 border rounded-xl">
                    <h3 className="text-xl font-bold mb-2">No se encontraron empresas</h3>
                    <p className="text-muted-foreground mb-4">
                      No hay empresas que coincidan con tus criterios de búsqueda.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery("")
                        setLocationFilter("")
                        setIndustryFilter("")
                        setSizeFilter("")
                      }}
                    >
                      Limpiar filtros
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
