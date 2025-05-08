import { Button } from "@/components/ui/button-custom"
import { Card, CardContent } from "@/components/ui/card-custom"
import { HoneycombBackground } from "@/components/honeycomb-background"
import { Calendar, Clock, User, ChevronRight, Search } from "lucide-react"
import Link from "next/link"

export default function BlogPage() {
  // Datos de ejemplo para los artículos del blog
  const featuredPost = {
    id: "1",
    title: "Cómo optimizar tu CV para destacar en el mercado laboral actual",
    excerpt:
      "Descubre las mejores técnicas para que tu currículum capte la atención de los reclutadores y maximiza tus oportunidades de conseguir entrevistas.",
    coverImage: "/placeholder.svg?height=400&width=800",
    date: "15 mayo, 2023",
    readTime: "8 min",
    author: "María Rodríguez",
    authorAvatar: "/placeholder.svg?height=50&width=50",
    category: "Consejos para candidatos",
  }

  const recentPosts = [
    {
      id: "2",
      title: "Las 10 preguntas más comunes en entrevistas de trabajo y cómo responderlas",
      excerpt:
        "Prepárate para tu próxima entrevista conociendo las preguntas más frecuentes y las mejores estrategias para responderlas con confianza.",
      coverImage: "/placeholder.svg?height=300&width=500",
      date: "10 mayo, 2023",
      readTime: "6 min",
      author: "Carlos Méndez",
      category: "Entrevistas",
    },
    {
      id: "3",
      title: "Tendencias del mercado laboral para 2023: sectores en crecimiento",
      excerpt: "Análisis de los sectores con mayor proyección de crecimiento y oportunidades laborales para este año.",
      coverImage: "/placeholder.svg?height=300&width=500",
      date: "5 mayo, 2023",
      readTime: "5 min",
      author: "Laura Sánchez",
      category: "Tendencias",
    },
    {
      id: "4",
      title: "Cómo crear una cultura empresarial que atraiga y retenga talento",
      excerpt:
        "Estrategias efectivas para desarrollar un ambiente de trabajo positivo que favorezca la atracción y retención de los mejores profesionales.",
      coverImage: "/placeholder.svg?height=300&width=500",
      date: "1 mayo, 2023",
      readTime: "7 min",
      author: "Javier García",
      category: "Recursos Humanos",
    },
  ]

  const popularPosts = [
    {
      id: "5",
      title: "Habilidades blandas: la clave para destacar en cualquier puesto",
      date: "20 abril, 2023",
      category: "Desarrollo profesional",
    },
    {
      id: "6",
      title: "Cómo negociar tu salario: guía paso a paso",
      date: "15 abril, 2023",
      category: "Consejos para candidatos",
    },
    {
      id: "7",
      title: "El futuro del trabajo: tendencias post-pandemia",
      date: "10 abril, 2023",
      category: "Tendencias",
    },
    {
      id: "8",
      title: "Burnout laboral: cómo identificarlo y prevenirlo",
      date: "5 abril, 2023",
      category: "Bienestar",
    },
  ]

  const categories = [
    { name: "Consejos para candidatos", count: 12 },
    { name: "Recursos Humanos", count: 8 },
    { name: "Tendencias", count: 10 },
    { name: "Entrevistas", count: 6 },
    { name: "Desarrollo profesional", count: 9 },
    { name: "Bienestar", count: 5 },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <HoneycombBackground className="absolute inset-0 opacity-10" />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Blog de BuzzJobs</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Consejos, tendencias y recursos para impulsar tu carrera profesional y encontrar el trabajo de tus
                sueños
              </p>
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <input
                  type="text"
                  placeholder="Buscar artículos..."
                  className="w-full pl-10 pr-4 py-3 rounded-full border border-input bg-background"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured post */}
        <section className="py-12 bg-muted/30">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-8">Artículo destacado</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="rounded-xl overflow-hidden">
                <img
                  src={featuredPost.coverImage || "/placeholder.svg"}
                  alt={featuredPost.title}
                  className="w-full h-auto object-cover aspect-[16/9]"
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm px-3 py-1 bg-honey/10 text-honey rounded-full">{featuredPost.category}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">{featuredPost.title}</h3>
                <p className="text-muted-foreground">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{featuredPost.readTime} de lectura</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img
                      src={featuredPost.authorAvatar || "/placeholder.svg"}
                      alt={featuredPost.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm">{featuredPost.author}</span>
                </div>
                <Button asChild>
                  <Link href={`/blog/${featuredPost.id}`}>Leer artículo completo</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Recent posts */}
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Artículos recientes</h2>
              <Link href="/blog/archive" className="text-honey hover:underline flex items-center">
                Ver todos
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden transition-shadow hover:shadow-medium">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={post.coverImage || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs px-2 py-1 bg-honey/10 text-honey rounded-full">{post.category}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4" asChild>
                      <Link href={`/blog/${post.id}`}>Leer más</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Sidebar section */}
        <section className="py-12 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Popular posts */}
              <div className="md:col-span-2 bg-background p-6 rounded-xl border">
                <h2 className="text-xl font-bold mb-6">Artículos populares</h2>
                <div className="space-y-6">
                  {popularPosts.map((post) => (
                    <div key={post.id} className="flex gap-4 pb-6 border-b last:border-0 last:pb-0">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs px-2 py-0.5 bg-honey/10 text-honey rounded-full">
                            {post.category}
                          </span>
                        </div>
                        <h3 className="font-medium mb-1">
                          <Link href={`/blog/${post.id}`} className="hover:text-honey">
                            {post.title}
                          </Link>
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full" asChild>
                          <Link href={`/blog/${post.id}`}>
                            <ChevronRight className="h-4 w-4" />
                            <span className="sr-only">Leer más</span>
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="bg-background p-6 rounded-xl border">
                <h2 className="text-xl font-bold mb-6">Categorías</h2>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.name} className="flex justify-between items-center py-2 border-b last:border-0">
                      <Link
                        href={`/blog/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                        className="hover:text-honey"
                      >
                        {category.name}
                      </Link>
                      <span className="text-sm text-muted-foreground">{category.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-12 bg-honey text-jet">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Suscríbete a nuestro newsletter</h2>
              <p className="mb-6">
                Recibe los mejores artículos, consejos y recursos directamente en tu bandeja de entrada
              </p>
              <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Tu email"
                  className="flex-1 px-4 py-2 rounded-md border border-amber-400 bg-white text-jet"
                />
                <Button className="bg-jet text-white hover:bg-jet/90">Suscribirse</Button>
              </div>
              <p className="text-xs mt-2 opacity-80">
                Respetamos tu privacidad. Puedes darte de baja en cualquier momento.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
