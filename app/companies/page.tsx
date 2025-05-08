"use client"

import { useState } from "react"
import { CompanyCard } from "@/components/ui/company-card"
import { Input } from "@/components/ui/input-custom"
import { Button } from "@/components/ui/button-custom"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select-custom"
import { Search, MapPin, Filter } from "lucide-react"

export default function CompaniesPage() {
  // Estado para filtros
  const [searchQuery, setSearchQuery] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [industryFilter, setIndustryFilter] = useState("")
  const [sizeFilter, setSizeFilter] = useState("")

  // Datos de ejemplo para las empresas
  const companies = [
    {
      id: "1",
      name: "TechCorp",
      logo: "/placeholder.svg?height=80&width=80",
      location: "Madrid, España",
      industry: "Tecnología",
      size: "50-100 empleados",
      jobCount: 5,
      description:
        "TechCorp es una empresa líder en desarrollo de software con más de 10 años de experiencia en el sector. Nos especializamos en crear soluciones tecnológicas innovadoras para empresas de todos los tamaños.",
    },
    {
      id: "2",
      name: "DesignStudio",
      logo: "/placeholder.svg?height=80&width=80",
      location: "Barcelona, España",
      industry: "Diseño",
      size: "11-50 empleados",
      jobCount: 3,
      description:
        "DesignStudio es un estudio de diseño creativo especializado en diseño de marca, UX/UI y diseño de producto. Trabajamos con empresas innovadoras para crear experiencias visuales impactantes.",
    },
    {
      id: "3",
      name: "Innovatech",
      logo: "/placeholder.svg?height=80&width=80",
      location: "Valencia, España",
      industry: "Tecnología",
      size: "11-50 empleados",
      jobCount: 2,
      description:
        "Innovatech es una startup tecnológica enfocada en el desarrollo de soluciones IoT y aplicaciones móviles. Buscamos revolucionar la forma en que las personas interactúan con la tecnología.",
    },
    {
      id: "4",
      name: "ServerPro",
      logo: "/placeholder.svg?height=80&width=80",
      location: "Sevilla, España",
      industry: "Tecnología",
      size: "1-10 empleados",
      jobCount: 1,
      description:
        "ServerPro ofrece soluciones de infraestructura y servicios en la nube para empresas de todos los tamaños. Nos especializamos en optimización de servidores y seguridad informática.",
    },
    {
      id: "5",
      name: "GrowthHackers",
      logo: "/placeholder.svg?height=80&width=80",
      location: "Madrid, España",
      industry: "Marketing",
      size: "11-50 empleados",
      jobCount: 4,
      description:
        "GrowthHackers es una agencia de marketing digital especializada en estrategias de crecimiento para startups y empresas tecnológicas. Utilizamos técnicas innovadoras para maximizar el ROI.",
    },
    {
      id: "6",
      name: "DataInsights",
      logo: "/placeholder.svg?height=80&width=80",
      location: "Barcelona, España",
      industry: "Tecnología",
      size: "11-50 empleados",
      jobCount: 3,
      description:
        "DataInsights es una empresa especializada en análisis de datos, inteligencia artificial y machine learning. Ayudamos a las empresas a tomar decisiones basadas en datos.",
    },
  ]

  // Filtrar empresas según los criterios de búsqueda
  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      searchQuery === "" ||
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesLocation =
      locationFilter === "" || company.location.toLowerCase().includes(locationFilter.toLowerCase())

    const matchesIndustry = industryFilter === "" || company.industry === industryFilter

    const matchesSize = sizeFilter === "" || company.size.includes(sizeFilter)

    return matchesSearch && matchesLocation && matchesIndustry && matchesSize
  })

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
                          <SelectItem value="all">Todas las industrias</SelectItem>
                          <SelectItem value="Tecnología">Tecnología</SelectItem>
                          <SelectItem value="Diseño">Diseño</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Finanzas">Finanzas</SelectItem>
                          <SelectItem value="Educación">Educación</SelectItem>
                          <SelectItem value="Salud">Salud</SelectItem>
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
                          <SelectItem value="all">Cualquier tamaño</SelectItem>
                          <SelectItem value="1-10">1-10 empleados</SelectItem>
                          <SelectItem value="11-50">11-50 empleados</SelectItem>
                          <SelectItem value="50-100">50-100 empleados</SelectItem>
                          <SelectItem value="101-500">101-500 empleados</SelectItem>
                          <SelectItem value="501-1000">501-1000 empleados</SelectItem>
                          <SelectItem value="1000+">Más de 1000 empleados</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Empleos disponibles</label>
                      <div className="space-y-2">
                        {["Al menos 1", "Al menos 3", "Al menos 5", "Al menos 10"].map((count) => (
                          <div key={count} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`count-${count}`}
                              className="h-4 w-4 rounded border-gray-300 text-honey focus:ring-honey"
                            />
                            <label htmlFor={`count-${count}`} className="ml-2 text-sm">
                              {count}
                            </label>
                          </div>
                        ))}
                      </div>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredCompanies.map((company) => (
                    <CompanyCard
                      key={company.id}
                      id={company.id}
                      name={company.name}
                      logo={company.logo}
                      location={company.location}
                      industry={company.industry}
                      size={company.size}
                      jobCount={company.jobCount}
                      description={company.description}
                    />
                  ))}
                </div>

                {filteredCompanies.length === 0 && (
                  <div className="text-center py-12 bg-background rounded-xl border shadow-soft">
                    <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
                      <Filter className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No se encontraron resultados</h3>
                    <p className="text-muted-foreground mb-4">
                      Intenta ajustar tus filtros o buscar con otros términos
                    </p>
                    <Button
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

                {filteredCompanies.length > 0 && (
                  <div className="flex justify-center mt-8">
                    <nav className="flex items-center gap-1">
                      <Button variant="outline" size="icon" disabled>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-chevron-left"
                        >
                          <path d="m15 18-6-6 6-6" />
                        </svg>
                        <span className="sr-only">Página anterior</span>
                      </Button>
                      <Button variant="outline" size="sm" className="bg-honey text-jet">
                        1
                      </Button>
                      <Button variant="outline" size="sm">
                        2
                      </Button>
                      <Button variant="outline" size="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-chevron-right"
                        >
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                        <span className="sr-only">Página siguiente</span>
                      </Button>
                    </nav>
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
