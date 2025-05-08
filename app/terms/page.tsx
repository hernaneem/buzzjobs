import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Términos y Condiciones</h1>

          <div className="prose prose-lg max-w-none">
            <p className="lead">
              Bienvenido a BuzzJobs. Estos Términos y Condiciones rigen tu uso de nuestra plataforma y servicios. Al
              acceder o utilizar BuzzJobs, aceptas estar legalmente vinculado por estos términos.
            </p>

            <h2>1. Definiciones</h2>
            <p>En estos Términos y Condiciones:</p>
            <ul>
              <li>
                <strong>"BuzzJobs", "nosotros", "nos" o "nuestro"</strong> se refiere a la plataforma BuzzJobs y a la
                empresa que la opera.
              </li>
              <li>
                <strong>"Plataforma"</strong> se refiere al sitio web, aplicaciones móviles y servicios relacionados de
                BuzzJobs.
              </li>
              <li>
                <strong>"Usuario", "tú" o "tu"</strong> se refiere a cualquier persona que acceda o utilice la
                Plataforma.
              </li>
              <li>
                <strong>"Candidato"</strong> se refiere a un Usuario que busca oportunidades de empleo.
              </li>
              <li>
                <strong>"Empleador"</strong> se refiere a un Usuario que publica ofertas de empleo y busca candidatos.
              </li>
              <li>
                <strong>"Contenido"</strong> se refiere a cualquier información, texto, gráficos, fotos, videos u otros
                materiales cargados, descargados o que aparecen en la Plataforma.
              </li>
            </ul>

            <h2>2. Registro y cuentas</h2>
            <p>
              2.1. Para utilizar ciertas funciones de nuestra Plataforma, debes registrarte y crear una cuenta. Al
              hacerlo, aceptas proporcionar información precisa, actualizada y completa.
            </p>
            <p>
              2.2. Eres responsable de mantener la confidencialidad de tu contraseña y de todas las actividades que
              ocurran bajo tu cuenta.
            </p>
            <p>
              2.3. Nos reservamos el derecho de suspender o terminar tu cuenta si determinamos, a nuestra sola
              discreción, que has violado estos Términos o has proporcionado información falsa o engañosa.
            </p>

            <h2>3. Uso de la plataforma</h2>
            <p>3.1. Como Usuario, aceptas:</p>
            <ul>
              <li>Utilizar la Plataforma de acuerdo con estos Términos y todas las leyes aplicables.</li>
              <li>No utilizar la Plataforma para fines ilegales o no autorizados.</li>
              <li>
                No intentar interferir con el funcionamiento adecuado de la Plataforma o acceder a áreas o
                características no destinadas a ti.
              </li>
              <li>
                No recopilar información de otros Usuarios sin su consentimiento o para fines no relacionados con el uso
                previsto de la Plataforma.
              </li>
            </ul>

            <p>3.2. Como Candidato, aceptas adicionalmente:</p>
            <ul>
              <li>Proporcionar información precisa sobre tu experiencia, habilidades y calificaciones.</li>
              <li>
                No crear múltiples perfiles o aplicar a ofertas de empleo con información falsa o engañosa sobre tu
                experiencia o calificaciones.
              </li>
            </ul>

            <p>3.3. Como Empleador, aceptas adicionalmente:</p>
            <ul>
              <li>
                Proporcionar información precisa sobre tu empresa y las ofertas de empleo que publicas, incluyendo
                requisitos, responsabilidades y compensación.
              </li>
              <li>
                No utilizar la información de los Candidatos para fines distintos a la evaluación de su idoneidad para
                las posiciones ofrecidas.
              </li>
              <li>
                Cumplir con todas las leyes aplicables relacionadas con el empleo, la no discriminación y la protección
                de datos.
              </li>
            </ul>

            <h2>4. Contenido</h2>
            <p>
              4.1. Eres el único responsable de cualquier Contenido que publiques, cargues o compartas a través de la
              Plataforma.
            </p>
            <p>4.2. Al publicar Contenido en la Plataforma, garantizas que:</p>
            <ul>
              <li>Eres el propietario del Contenido o tienes los derechos necesarios para compartirlo.</li>
              <li>
                El Contenido no infringe los derechos de propiedad intelectual, privacidad u otros derechos de terceros.
              </li>
              <li>
                El Contenido no es difamatorio, obsceno, ofensivo, fraudulento o de otra manera objetable o ilegal.
              </li>
            </ul>
            <p>
              4.3. Nos reservamos el derecho de eliminar cualquier Contenido que, a nuestra sola discreción, viole estos
              Términos o que consideremos inapropiado u objetable.
            </p>
            <p>
              4.4. Al publicar Contenido en la Plataforma, nos otorgas una licencia mundial, no exclusiva, transferible,
              libre de regalías para usar, reproducir, modificar, adaptar, publicar, distribuir y mostrar dicho
              Contenido en relación con la operación y promoción de la Plataforma.
            </p>

            <h2>5. Propiedad intelectual</h2>
            <p>
              5.1. La Plataforma y todo su contenido, características y funcionalidades son propiedad de BuzzJobs o de
              nuestros licenciantes y están protegidos por leyes de propiedad intelectual.
            </p>
            <p>
              5.2. No puedes reproducir, distribuir, modificar, crear obras derivadas, mostrar públicamente, realizar
              públicamente, republicar, descargar, almacenar o transmitir cualquier material de nuestra Plataforma,
              excepto según lo permitido por estos Términos.
            </p>

            <h2>6. Pagos y suscripciones</h2>
            <p>
              6.1. Algunos servicios en nuestra Plataforma pueden requerir el pago de tarifas. Aceptas pagar todas las
              tarifas aplicables según lo especificado en el momento de la compra.
            </p>
            <p>
              6.2. Las suscripciones se renovarán automáticamente al final de cada período de suscripción a menos que
              las canceles antes de la fecha de renovación.
            </p>
            <p>
              6.3. No ofrecemos reembolsos por tarifas pagadas, excepto según lo requiera la ley aplicable o según lo
              especificado en nuestra política de reembolsos.
            </p>

            <h2>7. Limitación de responsabilidad</h2>
            <p>
              7.1. En la medida permitida por la ley, BuzzJobs no será responsable por daños indirectos, incidentales,
              especiales, consecuentes o punitivos, o por cualquier pérdida de beneficios o ingresos, ya sea incurrida
              directa o indirectamente, o cualquier pérdida de datos, uso, buena voluntad u otras pérdidas intangibles.
            </p>
            <p>
              7.2. En ningún caso nuestra responsabilidad total por todas las reclamaciones relacionadas con el servicio
              excederá la cantidad que hayas pagado a BuzzJobs en los últimos doce meses.
            </p>

            <h2>8. Indemnización</h2>
            <p>
              Aceptas indemnizar, defender y mantener indemne a BuzzJobs y a nuestros directores, funcionarios,
              empleados y agentes, de y contra cualquier reclamación, responsabilidad, daño, pérdida y gasto, incluyendo
              honorarios legales razonables, que surjan de o estén relacionados con tu uso de la Plataforma, tu
              violación de estos Términos o tu violación de cualquier derecho de un tercero.
            </p>

            <h2>9. Modificaciones</h2>
            <p>
              Podemos modificar estos Términos en cualquier momento a nuestra sola discreción. Te notificaremos sobre
              cualquier cambio material mediante un aviso en nuestra Plataforma o por correo electrónico. Tu uso
              continuado de la Plataforma después de dichos cambios constituye tu aceptación de los Términos
              modificados.
            </p>

            <h2>10. Ley aplicable</h2>
            <p>
              Estos Términos se regirán e interpretarán de acuerdo con las leyes de España, sin tener en cuenta sus
              principios de conflicto de leyes.
            </p>

            <h2>11. Contacto</h2>
            <p>Si tienes preguntas sobre estos Términos, puedes contactarnos en:</p>
            <p>
              Email: legal@buzzjobs.example.com
              <br />
              Dirección: Calle Gran Vía, 28, 28013 Madrid, España
            </p>

            <p className="text-sm text-muted-foreground mt-8">Última actualización: 1 de junio de 2023</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
