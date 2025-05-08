"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card-custom"
import { Badge } from "@/components/ui/badge-custom"
import { Button } from "@/components/ui/button-custom"
import { Bookmark, MapPin, Building2, DollarSign, Clock } from "lucide-react"
import Link from "next/link"

interface JobCardProps {
  id: string
  title: string
  company: string
  location: string
  salary?: string
  tags: string[]
  isNew?: boolean
  isUrgent?: boolean
  isRemote?: boolean
  postedAt: string
  companyLogo?: string
  onSave?: () => void
  isSaved?: boolean
}

export function JobCard({
  id,
  title,
  company,
  location,
  salary,
  tags,
  isNew = false,
  isUrgent = false,
  isRemote = false,
  postedAt,
  companyLogo,
  onSave,
  isSaved = false,
}: JobCardProps) {
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
              <CardTitle className="text-xl">{title}</CardTitle>
              <p className="text-sm text-muted-foreground">{company}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onSave} className="text-muted-foreground hover:text-honey">
            <Bookmark className={`h-5 w-5 ${isSaved ? "fill-honey text-honey" : ""}`} />
            <span className="sr-only">Guardar empleo</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-2 mb-3">
          {isNew && <Badge variant="new">Nuevo</Badge>}
          {isUrgent && <Badge variant="urgent">Urgente</Badge>}
          {isRemote && <Badge variant="remote">Remoto</Badge>}

          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-1 h-4 w-4" />
            {location}
          </div>

          {salary && (
            <div className="flex items-center text-sm text-muted-foreground">
              <DollarSign className="mr-1 h-4 w-4" />
              {salary}
            </div>
          )}

          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-1 h-4 w-4" />
            {postedAt}
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mt-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="bg-muted">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/jobs/${id}`} className="w-full">
          <Button className="w-full">Ver detalles</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
