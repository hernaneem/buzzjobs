"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button-custom"
import { Input } from "@/components/ui/input-custom"
import { JobCard } from "@/components/ui/job-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select-custom"
import { TagChooser } from "@/components/ui/tag-chooser"
import { BeeSpinner } from "@/components/bee-spinner"
import { Search, MapPin, Filter, ArrowUp } from "lucide-react"

export default function JobFeedPage() {
  // Usuario de ejemplo
  const user = {
    name: "Carlos Méndez",
    role: "candidate",
  }

  // Estado para los filtros
  const [searchTerm, setSearchTerm] = useState("")
  const [location, setLocation] = useState("")
  const [jobType, setJobType] = useState<string[]>([])
  const [experienceLevel, setExperienceLevel] = useState<string[]>([])
  const [salaryRange, setSalaryRange] = useState("")
  const [skills, setSkills] = useState<string[]>([])

  // Estado para la paginación infinita
  const [jobs, setJobs] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [savedJobs, setSavedJobs] = useState<string[]>([])
  const [showScrollTop, setShowScrollTop] = useState(false)

  const observer = useRef<IntersectionObserver | null>(null)
  const lastJobElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore],
  )

  // Datos de ejemplo para los trabajos (simulando una API)
  const fetchJobs = (pageNum: number) => {
    setLoading(true)

    // Simulando una llamada a la API con un retraso
    setTimeout(() => {
      const newJobs = Array.from({ length: 10 }, (_, i) => ({
        id: `${pageNum}-${i}`,
        title: `${i % 2 === 0 ? "Desarrollador Frontend" : "Diseñador UX/UI"} ${pageNum}-${i}`,
        company: `${i % 3 === 0 ? "TechCorp" : i % 3 === 1 ? "DesignStudio" : "Innovatech"}`,
        location: `${i % 4 === 0 ? "Madrid" : i % 4 === 1 ? "Barcelona" : i % 4 === 2 ? "Valencia" : "Remoto"}, España`,
        salary: `${30 + i * 2}.000€ - ${40 + i * 2}.000€`,
        tags: [
          ...(i % 2 === 0 ? ["React", "JavaScript", "TypeScript"] : ["Figma", "UI Design", "UX Research"]),
          ...(i % 3 === 0 ? ["CSS", "HTML"] : i % 3 === 1 ? ["Sketch", "Adobe XD"] : ["Prototyping", "Wireframing"]),
        ],
        isNew: i % 5 === 0,
        isUrgent: i % 7 === 0,
        isRemote: i % 3 === 0,
        postedAt: `Hace ${i + 1} ${i === 0 ? "día" : "días"}`,
        companyLogo: "/placeholder.svg?height=40&width=40",
      }))

      setJobs((prevJobs) => [...prevJobs, ...newJobs])
      setHasMore(pageNum < 5) // Limitamos a 5 páginas para el ejemplo
      setLoading(false)
    }, 1000)
  }

  // Cargar trabajos iniciales
  useEffect(() => {
    fetchJobs(page)
  }, [page])

  // Manejar el scroll para mostrar/ocultar el botón de volver arriba
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Filtrar trabajos
  const filteredJobs = jobs.filter((job) => {
    // Filtro por término de búsqueda
    if (
      searchTerm &&
      !job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !job.company.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !job.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    ) {
      return false
    }

    // Filtro por ubicación
    if (location && !job.location.toLowerCase().includes(location.toLowerCase())) {
      return false
    }

    // Filtro por tipo de trabajo
    if (jobType.length > 0) {
      if (jobType.includes("remote") && !job.isRemote) return false
      // Aquí se implementarían más filtros por tipo de trabajo
    }

    // Filtro por nivel de experiencia
    // Aquí se implementaría el filtro por nivel de experiencia

    // Filtro por rango salarial
    // Aquí se implementaría el filtro por rango salarial

    // Filtro por habilidades
    if (
      skills.length > 0 &&
      !skills.some((skill) => job.tags.some((tag: string) => tag.toLowerCase() === skill.toLowerCase()))
    ) {
      return false
    }

    return true
  })

  const handleSaveJob = (id: string) => {
    setSavedJobs((prev) => (prev.includes(id) ? prev.filter((jobId) => jobId !== id) : [...prev, id]))
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleResetFilters = () => {
    setSearchTerm("")
    setLocation("")
    setJobType([])
    setExperienceLevel([])
    setSalaryRange("")
    setSkills([])
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} />

      <main className="flex-1">
        <section className="bg-muted py-8">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter">Encuentra tu próximo empleo</h1>
              <p className="text-muted-foreground">Explora miles de oportunidades laborales en las mejores empresas</p>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Puesto, habilidad o empresa"
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Ubicación"
                    className="pl-10"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
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
                      <label className="text-sm font-medium">Tipo de empleo</label>
                      <div className="space-y-2">
                        {[
                          { id: "full-time", label: "Tiempo completo" },
                          { id: "part-time", label: "Tiempo parcial" },
                          { id: "contract", label: "Contrato" },
                          { id: "internship", label: "Prácticas" },
                          { id: "remote", label: "Remoto" },
                        ].map((type) => (
                          <div key={type.id} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`type-${type.id}`}
                              checked={jobType.includes(type.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setJobType([...jobType, type.id])
                                } else {
                                  setJobType(jobType.filter((t) => t !== type.id))
                                }
                              }}
                              className="h-4 w-4 rounded border-gray-300 text-honey focus:ring-honey"
                            />
                            <label htmlFor={`type-${type.id}`} className="ml-2 text-sm">
                              {type.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Experiencia</label>
                      <div className="space-y-2">
                        {[
                          { id: "entry", label: "Sin experiencia" },
                          { id: "junior", label: "1-2 años" },
                          { id: "mid", label: "3-5 años" },
                          { id: "senior", label: "5-7 años" },
                          { id: "expert", label: "8+ años" },
                        ].map((exp) => (
                          <div key={exp.id} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`exp-${exp.id}`}
                              checked={experienceLevel.includes(exp.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setExperienceLevel([...experienceLevel, exp.id])
                                } else {
                                  setExperienceLevel(experienceLevel.filter((e) => e !== exp.id))
                                }
                              }}
                              className="h-4 w-4 rounded border-gray-300 text-honey focus:ring-honey"
                            />
                            <label htmlFor={`exp-${exp.id}`} className="ml-2 text-sm">
                              {exp.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Rango salarial</label>
                      <Select value={salaryRange} onValueChange={setSalaryRange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar rango" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Cualquiera</SelectItem>
                          <SelectItem value="20k-30k">20.000€ - 30.000€</SelectItem>
                          <SelectItem value="30k-40k">30.000€ - 40.000€</SelectItem>
                          <SelectItem value="40k-50k">40.000€ - 50.000€</SelectItem>
                          <SelectItem value="50k-60k">50.000€ - 60.000€</SelectItem>
                          <SelectItem value="60k+">60.000€+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Habilidades</label>
                      <TagChooser
                        tags={skills}
                        onChange={setSkills}
                        placeholder="Añadir habilidad..."
                        suggestions={["JavaScript", "React", "Python", "UX/UI", "Marketing", "SEO", "Node.js"]}
                      />
                    </div>

                    <div className="pt-4 border-t">
                      <Button variant="outline" className="w-full" onClick={handleResetFilters}>
                        Limpiar filtros
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Listado de empleos */}
              <div className="w-full md:w-3/4 space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-xl font-bold">Empleos disponibles</h2>
                    <p className="text-sm text-muted-foreground">
                      Mostrando {filteredJobs.length} resultados
                      {(searchTerm ||
                        location ||
                        jobType.length > 0 ||
                        experienceLevel.length > 0 ||
                        salaryRange ||
                        skills.length > 0) &&
                        " con los filtros aplicados"}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-sm">Ordenar por:</label>
                    <Select defaultValue="recent">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Ordenar por" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Más recientes</SelectItem>
                        <SelectItem value="salary-high">Mayor salario</SelectItem>
                        <SelectItem value="salary-low">Menor salario</SelectItem>
                        <SelectItem value="relevance">Relevancia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {filteredJobs.map((job, index) => {
                    if (filteredJobs.length === index + 1) {
                      return (
                        <div ref={lastJobElementRef} key={job.id}>
                          <JobCard
                            id={job.id}
                            title={job.title}
                            company={job.company}
                            location={job.location}
                            salary={job.salary}
                            tags={job.tags}
                            isNew={job.isNew}
                            isUrgent={job.isUrgent}
                            isRemote={job.isRemote}
                            postedAt={job.postedAt}
                            companyLogo={job.companyLogo}
                            isSaved={savedJobs.includes(job.id)}
                            onSave={() => handleSaveJob(job.id)}
                          />
                        </div>
                      )
                    } else {
                      return (
                        <JobCard
                          key={job.id}
                          id={job.id}
                          title={job.title}
                          company={job.company}
                          location={job.location}
                          salary={job.salary}
                          tags={job.tags}
                          isNew={job.isNew}
                          isUrgent={job.isUrgent}
                          isRemote={job.isRemote}
                          postedAt={job.postedAt}
                          companyLogo={job.companyLogo}
                          isSaved={savedJobs.includes(job.id)}
                          onSave={() => handleSaveJob(job.id)}
                        />
                      )
                    }
                  })}
                </div>

                {loading && (
                  <div className="flex justify-center py-8">
                    <BeeSpinner size="lg" />
                  </div>
                )}

                {!loading && filteredJobs.length === 0 && (
                  <div className="text-center py-12 bg-muted/30 rounded-xl border">
                    <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
                      <Search className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No se encontraron resultados</h3>
                    <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                      No hay empleos que coincidan con tus criterios de búsqueda. Intenta ajustar los filtros.
                    </p>
                    <Button onClick={handleResetFilters}>Limpiar filtros</Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-honey text-jet rounded-full shadow-lg hover:bg-honey/90 transition-all"
            aria-label="Volver arriba"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        )}
      </main>

      <Footer />
    </div>
  )
}
