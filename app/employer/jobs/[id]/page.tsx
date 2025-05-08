import { PageHeader } from "@/components/page-header"

// Asumiendo que este archivo ya existe, solo mostrando cómo usar PageHeader
export default function JobDetailsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title="Detalles del Empleo" description="Información completa sobre la oferta de trabajo" />

      {/* Resto del contenido de la página */}
    </div>
  )
}
