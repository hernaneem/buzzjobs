import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card-custom"

export default function NotificationsLoading() {
  return (
    <div className="py-8">
      <div className="container px-4 md:px-6">
        <div className="mb-8">
          <Skeleton className="h-5 w-32" />

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4">
            <div>
              <Skeleton className="h-10 w-48 mb-2" />
              <Skeleton className="h-5 w-64" />
            </div>

            <div className="flex items-center gap-2">
              <Skeleton className="h-9 w-40" />
              <Skeleton className="h-9 w-32" />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filtros */}
          <div className="w-full md:w-1/4">
            <Card>
              <CardContent className="p-4">
                <Skeleton className="h-10 w-full mb-4" />
                <div className="space-y-2">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <Skeleton key={i} className="h-9 w-full" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Listado de notificaciones */}
          <div className="w-full md:w-3/4">
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Skeleton className="h-5 w-5 rounded-full mt-1" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <Skeleton className="h-5 w-40 mb-2" />
                          <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-6 w-6 rounded-full" />
                          </div>
                        </div>
                        <Skeleton className="h-4 w-full mb-1" />
                        <Skeleton className="h-4 w-3/4 mb-3" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
