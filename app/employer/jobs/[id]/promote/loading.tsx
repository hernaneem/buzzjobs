import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Loader2 } from "lucide-react"

export default function PromoteJobLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <Loader2 className="h-12 w-12 animate-spin text-honey" />
            <p className="mt-4 text-muted-foreground">Cargando opciones de promoción...</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
