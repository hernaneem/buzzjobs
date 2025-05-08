import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card-custom"
import { Badge } from "@/components/ui/badge-custom"
import { Button } from "@/components/ui/button-custom"
import { Building2, MapPin, Users, Briefcase } from "lucide-react"
import Link from "next/link"

interface CompanyCardProps {
  id: string
  name: string
  logo?: string
  location: string
  industry: string
  size?: string
  jobCount: number
  description: string
}

export function CompanyCard({ id, name, logo, location, industry, size, jobCount, description }: CompanyCardProps) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-medium">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-muted rounded-md flex items-center justify-center">
            {logo ? (
              <img src={logo || "/placeholder.svg"} alt={`${name} logo`} className="w-12 h-12 object-contain" />
            ) : (
              <Building2 className="w-7 h-7 text-muted-foreground" />
            )}
          </div>
          <div>
            <CardTitle className="text-xl">{name}</CardTitle>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-1 h-4 w-4" />
              {location}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="secondary">{industry}</Badge>

          {size && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="mr-1 h-4 w-4" />
              {size}
            </div>
          )}

          <div className="flex items-center text-sm text-muted-foreground">
            <Briefcase className="mr-1 h-4 w-4" />
            {jobCount} {jobCount === 1 ? "empleo" : "empleos"}
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mt-2">{description}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/companies/${id}`} className="w-full">
          <Button variant="secondary" className="w-full">
            Ver perfil
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
