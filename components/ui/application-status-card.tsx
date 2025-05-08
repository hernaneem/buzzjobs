import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card-custom"
import { Badge } from "@/components/ui/badge-custom"
import { Building2, Calendar, Clock } from "lucide-react"

type ApplicationStatus = "new" | "screening" | "interview" | "offer" | "hired" | "rejected"

interface ApplicationStatusCardProps {
  jobTitle: string
  company: string
  companyLogo?: string
  appliedDate: string
  status: ApplicationStatus
  lastUpdated: string
}

export function ApplicationStatusCard({
  jobTitle,
  company,
  companyLogo,
  appliedDate,
  status,
  lastUpdated,
}: ApplicationStatusCardProps) {
  const getStatusBadge = () => {
    switch (status) {
      case "new":
        return <Badge variant="secondary">Nueva</Badge>
      case "screening":
        return <Badge variant="secondary">Preselección</Badge>
      case "interview":
        return <Badge variant="default">Entrevista</Badge>
      case "offer":
        return <Badge variant="default">Oferta</Badge>
      case "hired":
        return <Badge variant="new">Contratado</Badge>
      case "rejected":
        return <Badge variant="outline">Rechazado</Badge>
      default:
        return null
    }
  }

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-medium">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
              {companyLogo ? (
                <img
                  src={companyLogo || "/placeholder.svg"}
                  alt={`${company} logo`}
                  className="w-10 h-10 object-contain"
                />
              ) : (
                <Building2 className="w-6 h-6 text-muted-foreground" />
              )}
            </div>
            <div>
              <CardTitle className="text-lg">{jobTitle}</CardTitle>
              <p className="text-sm text-muted-foreground">{company}</p>
            </div>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Calendar className="mr-1 h-4 w-4" />
            Aplicado: {appliedDate}
          </div>
          <div className="flex items-center text-muted-foreground">
            <Clock className="mr-1 h-4 w-4" />
            Actualizado: {lastUpdated}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
