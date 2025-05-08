"use client"

import { JobCard } from "@/components/ui/job-card"
import { Input } from "@/components/ui/input-custom"
import { Button } from "@/components/ui/button-custom"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select-custom"
import { TagChooser } from "@/components/ui/tag-chooser"
import { Search, MapPin, Filter } from "lucide-react"

export default function JobsPage() {
  // Datos de ejemplo para los trabajos
  const jobs = [
    {
      id: "1",
      title: "Desarrollador Frontend",
      company: "TechCorp",
      location: "Madrid, España",
      salary: "40.000€ - 50.000€",
      tags: ["React", "JavaScript", "CSS"],
      isNew: true,
      isRemote: true,
      postedAt: "Hace 2 días",
    },
    {
      id: "2",
      title: "Diseñador UX/UI",
      company: "DesignStudio",
      location: "Barcelona, España",
      salary: "35.000€ - 45.000€",
      tags: ["Figma", "Adobe XD", "Sketch"],
      isUrgent: true,
      postedAt: "Hace 1 semana",
    },
    {
      id: "3",
      title: "Product Manager",
      company: "Innovatech",
      location: "Valencia, España",
      salary: "50.000€ - 65.000€",
      tags: ["Agile", "Scrum", "Product Development"],
      isNew: true,
      postedAt: "Hace 3 días",
    },
    {
      id: "4",
      title: "Desarrollador Backend",
      company: "ServerPro",
      location: "Sevilla, España",
      salary: "45.000€ - 55.000€",
      tags: ["Node.js", "Python", "MongoDB"],
      isRemote: true,
      postedAt: "Hace 5 días",
    },
    {
      id: "5",
      title: "Marketing Digital Specialist",
      company: "GrowthHackers",
      location: "Madrid, España",
      salary: "30.000€ - 40.000€",
      tags: ["SEO", "SEM", "Social Media"],
      postedAt: "Hace 1 semana",
    },
    {
      id: "6",
      title: "Data Scientist",
      company: "DataInsights",
      location: "Barcelona, España",
      salary: "55.000€ - 70.000€",
      tags: ["Python", "Machine Learning", "SQL"],
      isNew: true,
      isUrgent: true,
      postedAt: "Hace 1 día",
    },
  ]

  return (
    <>
      <section className="bg-muted py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter">Encuentra tu próximo empleo</h1>
            <p className="text-muted-foreground">Explora miles de oportunidades laborales en las mejores empresas</p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input placeholder="Puesto, habilidad o empresa" className="pl-10" />
                </div>
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Ubicación" className="pl-10" />
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
                      {["Tiempo completo", "Tiempo parcial", "Contrato", "Prácticas", "Remoto"].map((type) => (
                        <div key={type} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`type-${type}`}
                            className="h-4 w-4 rounded border-gray-300 text-honey focus:ring-honey"
                          />
                          <label htmlFor={`type-${type}`} className="ml-2 text-sm">
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Experiencia</label>
                    <div className="space-y-2">
                      {["Sin experiencia", "1-2 años", "3-5 años", "5-7 años", "8+ años"].map((exp) => (
                        <div key={exp} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`exp-${exp}`}
                            className="h-4 w-4 rounded border-gray-300 text-honey focus:ring-honey"
                          />
                          <label htmlFor={`exp-${exp}`} className="ml-2 text-sm">
                            {exp}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Rango salarial</label>
                    <Select>
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
                      tags={[]}
                      onChange={() => {}}
                      placeholder="Añadir habilidad..."
                      suggestions={["JavaScript", "React", "Python", "UX/UI", "Marketing", "SEO", "Node.js"]}
                    />
                  </div>

                  <div className="pt-4 border-t">
                    <Button variant="outline" className="w-full">
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
                  <p className="text-sm text-muted-foreground">Mostrando {jobs.length} resultados</p>
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
                {jobs.map((job) => (
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
                    onSave={() => {}}
                  />
                ))}
              </div>

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
                  <Button variant="outline" size="sm">
                    3
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
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
