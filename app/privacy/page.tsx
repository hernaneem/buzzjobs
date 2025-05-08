import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Política de Privacidad</h1>

          <div className="prose prose-lg max-w-none">
            <p className="lead">
              En BuzzJobs, nos tomamos muy en serio la privacidad de nuestros usuarios. Esta Política de Privacidad
              describe cómo recopilamos, utilizamos y protegemos tu información personal cuando utilizas nuestra
              plataforma.
            </p>

            <h2>1. Información que recopilamos</h2>
            <p>Podemos recopilar los siguientes tipos de información:</p>
            <ul>
              <li>
                <strong>Información de registro:</strong> Cuando creas una cuenta, recopilamos tu nombre, dirección de
                correo electrónico, contraseña y tipo de usuario (candidato o empleador).
              </li>
              <li>
                <strong>Información de perfil:</strong> Como candidato, puedes proporcionar información sobre tu
                experiencia laboral, educación, habilidades, currículum y preferencias laborales. Como empleador, puedes
                proporcionar información sobre tu empresa, sector, ubicación y ofertas de empleo.
              </li>
              <li>
                <strong>Información de uso:</strong> Recopilamos información sobre cómo interactúas con nuestra
                plataforma, incluyendo las páginas que visitas, las ofertas que consultas y las acciones que realizas.
              </li>
              <li>
                <strong>Información del dispositivo:</strong> Podemos recopilar información sobre el dispositivo que
                utilizas para acceder a nuestra plataforma, incluyendo el tipo de dispositivo, sistema operativo,
                navegador y dirección IP.
              </li>
            </ul>

            <h2>2. Cómo utilizamos tu información</h2>
            <p>Utilizamos la información que recopilamos para:</p>
            <ul>
              <li>Proporcionar, mantener y mejorar nuestra plataforma.</li>
              <li>
                Conectar a candidatos con empleadores y viceversa, facilitando el proceso de búsqueda de empleo y
                contratación.
              </li>
              <li>Personalizar tu experiencia y mostrarte contenido relevante.</li>
              <li>Enviarte notificaciones, actualizaciones y comunicaciones relacionadas con el servicio.</li>
              <li>Analizar y mejorar la eficacia de nuestra plataforma.</li>
              <li>Prevenir actividades fraudulentas y proteger la seguridad de nuestros usuarios.</li>
              <li>Cumplir con nuestras obligaciones legales.</li>
            </ul>

            <h2>3. Compartición de información</h2>
            <p>Podemos compartir tu información en las siguientes circunstancias:</p>
            <ul>
              <li>
                <strong>Entre usuarios:</strong> Si eres un candidato, compartiremos tu información profesional con los
                empleadores a cuyas ofertas apliques. Si eres un empleador, compartiremos la información de tu empresa y
                ofertas con los candidatos.
              </li>
              <li>
                <strong>Con proveedores de servicios:</strong> Podemos compartir tu información con terceros que nos
                ayudan a proporcionar y mejorar nuestros servicios (procesamiento de pagos, almacenamiento de datos,
                análisis, etc.).
              </li>
              <li>
                <strong>Por motivos legales:</strong> Podemos compartir tu información si creemos de buena fe que es
                necesario para cumplir con una obligación legal, proteger nuestros derechos o los de nuestros usuarios,
                o investigar posibles infracciones.
              </li>
            </ul>

            <h2>4. Tus derechos</h2>
            <p>Dependiendo de tu ubicación, puedes tener ciertos derechos respecto a tu información personal:</p>
            <ul>
              <li>Acceder a la información que tenemos sobre ti.</li>
              <li>Corregir información inexacta o incompleta.</li>
              <li>Eliminar tu información personal.</li>
              <li>Oponerte al procesamiento de tu información.</li>
              <li>Retirar tu consentimiento en cualquier momento.</li>
              <li>Presentar una queja ante una autoridad de protección de datos.</li>
            </ul>

            <h2>5. Seguridad de la información</h2>
            <p>
              Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal contra
              accesos no autorizados, pérdida o alteración. Sin embargo, ningún sistema es completamente seguro, por lo
              que no podemos garantizar la seguridad absoluta de tu información.
            </p>

            <h2>6. Retención de datos</h2>
            <p>
              Conservaremos tu información personal mientras mantengas una cuenta activa en nuestra plataforma o
              mientras sea necesario para proporcionarte nuestros servicios. Si cierras tu cuenta o dejas de utilizar
              nuestros servicios, conservaremos tu información durante un período razonable para cumplir con nuestras
              obligaciones legales o resolver disputas.
            </p>

            <h2>7. Cambios en esta política</h2>
            <p>
              Podemos actualizar esta Política de Privacidad periódicamente para reflejar cambios en nuestras prácticas
              o por otros motivos operativos o legales. Te notificaremos cualquier cambio material mediante un aviso en
              nuestra plataforma o por correo electrónico.
            </p>

            <h2>8. Contacto</h2>
            <p>
              Si tienes preguntas o inquietudes sobre esta Política de Privacidad o sobre cómo tratamos tu información
              personal, puedes contactarnos en:
            </p>
            <p>
              Email: privacidad@buzzjobs.example.com
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
