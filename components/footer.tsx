import Link from "next/link"
import { BeeIcon } from "@/components/bee-icon"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col">
            <Link href="/" className="flex items-center gap-2">
              <BeeIcon size={32} />
              <span className="font-bold text-xl">BuzzJobs</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Conectando talento y empleadores de forma ágil y confiable.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Para candidatos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/jobs" className="text-muted-foreground hover:text-foreground">
                  Buscar empleos
                </Link>
              </li>
              <li>
                <Link href="/candidate/dashboard" className="text-muted-foreground hover:text-foreground">
                  Mi dashboard
                </Link>
              </li>
              <li>
                <Link href="/candidate/profile" className="text-muted-foreground hover:text-foreground">
                  Mi perfil
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-muted-foreground hover:text-foreground">
                  Recursos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Para empresas</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/employer/post-job" className="text-muted-foreground hover:text-foreground">
                  Publicar empleo
                </Link>
              </li>
              <li>
                <Link href="/employer/dashboard" className="text-muted-foreground hover:text-foreground">
                  Dashboard empresarial
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-foreground">
                  Planes y precios
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="text-muted-foreground hover:text-foreground">
                  Casos de éxito
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                  Términos
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} BuzzJobs. Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-linkedin"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-twitter"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-instagram"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
