import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader } from "@/components/ui/card-custom"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <Skeleton className="h-10 w-48 mb-2" />
              <Skeleton className="h-5 w-64" />
            </div>

            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-40" />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {Array(4)
              .fill(null)
              .map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <Skeleton className="h-4 w-24 mb-2" />
                        <Skeleton className="h-8 w-16" />
                      </div>
                      <Skeleton className="w-10 h-10 rounded-full" />
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Skeleton className="h-10 flex-1" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-[180px]" />
              <Skeleton className="h-10 w-[180px]" />
              <Skeleton className="h-10 w-10" />
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="active" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="active" disabled>
                <Skeleton className="h-4 w-16" />
              </TabsTrigger>
              <TabsTrigger value="paused" disabled>
                <Skeleton className="h-4 w-16" />
              </TabsTrigger>
              <TabsTrigger value="expired" disabled>
                <Skeleton className="h-4 w-16" />
              </TabsTrigger>
              <TabsTrigger value="draft" disabled>
                <Skeleton className="h-4 w-16" />
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Array(3)
                      .fill(null)
                      .map((_, i) => (
                        <div key={i} className="border rounded-xl p-4">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="flex items-center gap-3">
                              <Skeleton className="w-12 h-12 rounded-md" />
                              <div>
                                <Skeleton className="h-6 w-48 mb-2" />
                                <Skeleton className="h-4 w-32" />
                              </div>
                            </div>
                            <Skeleton className="h-10 w-28" />
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-4">
                            {Array(5)
                              .fill(null)
                              .map((_, j) => (
                                <div key={j} className="flex flex-col">
                                  <Skeleton className="h-4 w-20 mb-1" />
                                  <Skeleton className="h-5 w-12" />
                                </div>
                              ))}
                          </div>

                          <div className="mt-4 pt-4 border-t">
                            <div className="flex justify-end gap-2">
                              <Skeleton className="h-9 w-24" />
                              <Skeleton className="h-9 w-36" />
                              <Skeleton className="h-9 w-28" />
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
