import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button-custom"
import { Card, CardContent } from "@/components/ui/card-custom"
import { Calendar, Clock, ChevronRight, ChevronLeft, Share2, Bookmark, ThumbsUp } from "lucide-react"
import Link from "next/link"

export default function BlogPostPage({ params }: { params: { id: string } }) {
  // Datos de ejemplo para el artículo
  const post = {
    id: params.id,
    title: "Cómo optimizar tu CV para destacar en el mercado laboral actual",
    excerpt:
      "Descubre las mejores técnicas para que tu currículum capte la atención de los reclutadores y maximiza tus oportunidades de conseguir entrevistas.",
    coverImage: "/placeholder.svg?height=600&width=1200",
    date: "15 mayo, 2023",
    readTime: "8 min",
    author: "María Rodríguez",
    authorAvatar: "/placeholder.svg?height=100&width=100",
    authorBio:
      "Especialista en Recursos Humanos con más de 10 años de experiencia en procesos de selección para empresas tecnológicas.",
    category: "Consejos para candidatos",
    content: `
      <p>En el competitivo mercado laboral actual, tener un currículum que destaque es fundamental para captar la atención de los reclutadores y conseguir entrevistas. Un CV bien estructurado y optimizado puede ser la diferencia entre ser seleccionado o descartado en los primeros segundos de revisión.</p>
      
      <h2>1. Adapta tu CV a cada oferta</h2>
      <p>Uno de los errores más comunes es enviar el mismo CV a todas las ofertas. Los sistemas de seguimiento de candidatos (ATS) buscan palabras clave específicas relacionadas con la posición. Analiza la descripción del puesto y adapta tu CV incluyendo términos relevantes.</p>
      
      <h2>2. Estructura clara y concisa</h2>
      <p>Los reclutadores dedican aproximadamente 6-7 segundos a la primera revisión de un CV. Utiliza una estructura clara con secciones bien definidas:</p>
      <ul>
        <li>Información de contacto</li>
        <li>Perfil profesional o resumen</li>
        <li>Experiencia laboral</li>
        <li>Formación académica</li>
        <li>Habilidades</li>
        <li>Logros destacados</li>
      </ul>
      
      <h2>3. Destaca tus logros, no solo tus responsabilidades</h2>
      <p>En lugar de listar simplemente tus funciones, enfócate en los resultados que has conseguido. Utiliza datos cuantitativos siempre que sea posible:</p>
      <ul>
        <li>"Aumenté las ventas en un 30% en 6 meses"</li>
        <li>"Reduje los costes operativos en un 15% implementando nuevos procesos"</li>
        <li>"Lideré un equipo de 10 personas en el desarrollo de un proyecto que se entregó antes del plazo previsto"</li>
      </ul>
      
      <h2>4. Optimiza la sección de habilidades</h2>
      <p>Incluye tanto habilidades técnicas como blandas relevantes para el puesto. Las habilidades técnicas pueden incluir software específico, idiomas o certificaciones, mientras que las habilidades blandas pueden ser trabajo en equipo, comunicación o resolución de problemas.</p>
      
      <h2>5. Diseño profesional y legible</h2>
      <p>Utiliza un diseño limpio y profesional. Evita fuentes extravagantes, colores excesivos o diseños complicados que dificulten la lectura. Asegúrate de que tu CV sea fácil de escanear tanto por humanos como por sistemas ATS.</p>
      
      <h2>6. Incluye palabras clave relevantes</h2>
      <p>Investiga las palabras clave más utilizadas en tu sector y asegúrate de incluirlas de forma natural en tu CV. Esto mejorará tus posibilidades de superar los filtros ATS.</p>
      
      <h2>7. Actualiza regularmente tu CV</h2>
      <p>Mantén tu CV actualizado con tus últimos logros, formaciones y experiencias. Un CV desactualizado puede dar la impresión de falta de interés o desarrollo profesional estancado.</p>
      
      <h2>Conclusión</h2>
      <p>Un CV optimizado es tu carta de presentación en el mercado laboral. Dedica tiempo a personalizarlo para cada oferta, destacando tus logros más relevantes y utilizando un formato claro y profesional. Recuerda que el objetivo principal de tu CV es conseguir una entrevista, donde podrás ampliar y demostrar todo tu potencial.</p>
      
      <p>¿Tienes más dudas sobre cómo mejorar tu CV? Deja tus comentarios abajo y estaremos encantados de ayudarte.</p>
    `,
    tags: ["CV", "Búsqueda de empleo", "Reclutamiento", "Desarrollo profesional", "Entrevistas"],
  }

  // Artículos relacionados
  const relatedPosts = [
    {
      id: "2",
      title: "Las 10 preguntas más comunes en entrevistas de trabajo y cómo responderlas",
      excerpt:
        "Prepárate para tu próxima entrevista conociendo las preguntas más frecuentes y las mejores estrategias para responderlas con confianza.",
      coverImage: "/placeholder.svg?height=200&width=300",
      date: "10 mayo, 2023",
      category: "Entrevistas",
    },
    {
      id: "6",
      title: "Cómo negociar tu salario: guía paso a paso",
      excerpt:
        "Aprende estrategias efectivas para negociar tu salario y conseguir la compensación que mereces en tu próximo trabajo o ascenso.",
      coverImage: "/placeholder.svg?height=200&width=300",
      date: "15 abril, 2023",
      category: "Consejos para candidatos",
    },
    {
      id: "7",
      title: "El futuro del trabajo: tendencias post-pandemia",
      excerpt:
        "Análisis de cómo ha cambiado el mercado laboral tras la pandemia y qué habilidades serán más valoradas en los próximos años.",
      coverImage: "/placeholder.svg?height=200&width=300",
      date: "10 abril, 2023",
      category: "Tendencias",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Hero section */}
        <section className="relative py-12 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-2 mb-4">
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-honey flex items-center">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Volver al blog
                </Link>
              </div>
              <div className="mb-6">
                <span className="inline-block text-sm px-3 py-1 bg-honey/10 text-honey rounded-full mb-4">
                  {post.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
                <p className="text-xl text-muted-foreground">{post.excerpt}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src={post.authorAvatar || "/placeholder.svg"}
                      alt={post.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{post.author}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime} de lectura</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-full">
                    <Share2 className="h-4 w-4" />
                    <span className="sr-only">Compartir</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-full">
                    <Bookmark className="h-4 w-4" />
                    <span className="sr-only">Guardar</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured image */}
        <div className="container px-4 md:px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-xl overflow-hidden">
              <img src={post.coverImage || "/placeholder.svg"} alt={post.title} className="w-full h-auto" />
            </div>
          </div>
        </div>

        {/* Content */}
        <section className="py-8">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3">
                <article className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

                <div className="mt-8 pt-8 border-t">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-sm px-3 py-1 bg-muted rounded-full hover:bg-muted/80"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        Me gusta
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Share2 className="h-4 w-4" />
                        Compartir
                      </Button>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Bookmark className="h-4 w-4" />
                      Guardar
                    </Button>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t">
                  <div className="flex items-center gap-4 bg-muted/30 p-6 rounded-xl">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={post.authorAvatar || "/placeholder.svg"}
                        alt={post.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold">Sobre {post.author}</h3>
                      <p className="text-sm text-muted-foreground">{post.authorBio}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-20 space-y-8">
                  <div>
                    <h3 className="text-lg font-bold mb-4">Artículos relacionados</h3>
                    <div className="space-y-4">
                      {relatedPosts.map((relatedPost) => (
                        <Card key={relatedPost.id} className="overflow-hidden">
                          <CardContent className="p-4">
                            <div className="aspect-[16/9] rounded-md overflow-hidden mb-3">
                              <img
                                src={relatedPost.coverImage || "/placeholder.svg"}
                                alt={relatedPost.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="space-y-2">
                              <span className="text-xs px-2 py-0.5 bg-honey/10 text-honey rounded-full">
                                {relatedPost.category}
                              </span>
                              <h4 className="font-medium line-clamp-2">
                                <Link href={`/blog/${relatedPost.id}`} className="hover:text-honey">
                                  {relatedPost.title}
                                </Link>
                              </h4>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3 mr-1" />
                                <span>{relatedPost.date}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-4">Suscríbete</h3>
                    <Card>
                      <CardContent className="p-4">
                        <p className="text-sm mb-4">Recibe los mejores artículos y consejos directamente en tu email</p>
                        <div className="space-y-2">
                          <input
                            type="email"
                            placeholder="Tu email"
                            className="w-full px-3 py-2 rounded-md border border-input bg-background"
                          />
                          <Button className="w-full">Suscribirse</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* More articles */}
        <section className="py-12 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Más artículos</h2>
              <Link href="/blog" className="text-honey hover:underline flex items-center">
                Ver todos
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((post) => (
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
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/blog/${post.id}`}>Leer más</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
