# CI/CD en BuzzJobs

Este documento describe el sistema de Integración Continua (CI) y Despliegue Continuo (CD) implementado para BuzzJobs utilizando GitHub Actions.

## Flujo de trabajo

El flujo de trabajo de CI/CD está configurado para ejecutarse en los siguientes eventos:

- **Push** a las ramas `main` o `develop`
- **Pull Requests** hacia las ramas `main` o `develop`

## Trabajos (Jobs)

El flujo de trabajo consta de los siguientes trabajos:

### 1. Lint

Verifica que el código cumpla con las reglas de estilo definidas en ESLint.

\`\`\`bash
npm run lint
\`\`\`

### 2. Type Check

Verifica que el código TypeScript no tenga errores de tipo.

\`\`\`bash
npx tsc --noEmit
\`\`\`

### 3. Unit Tests

Ejecuta las pruebas unitarias con Jest y genera informes de cobertura.

\`\`\`bash
npm test -- --coverage
\`\`\`

### 4. E2E Tests

Ejecuta las pruebas end-to-end con Cypress.

\`\`\`bash
npm run e2e:run
\`\`\`

### 5. Visual Regression Tests

Ejecuta las pruebas de regresión visual para detectar cambios no deseados en la UI.

\`\`\`bash
npm run visual:test
\`\`\`

### 6. Deploy

Despliega la aplicación en Vercel:
- En la rama `develop`: Despliegue a un entorno de previsualización
- En la rama `main`: Despliegue a producción

## Secretos necesarios

Para que el flujo de trabajo funcione correctamente, se deben configurar los siguientes secretos en GitHub:

- `CODECOV_TOKEN`: Token para subir informes de cobertura a Codecov
- `CYPRESS_RECORD_KEY`: Clave para registrar las ejecuciones de Cypress
- `VERCEL_TOKEN`: Token de API de Vercel
- `VERCEL_ORG_ID`: ID de la organización en Vercel
- `VERCEL_PROJECT_ID`: ID del proyecto en Vercel
- `SUPABASE_URL`: URL de la base de datos Supabase
- `SUPABASE_ANON_KEY`: Clave anónima de Supabase
- `SUPABASE_SERVICE_ROLE_KEY`: Clave de rol de servicio de Supabase
- `NEXT_PUBLIC_SUPABASE_URL`: URL pública de Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Clave anónima pública de Supabase

## Configuración de secretos en GitHub

1. Ve a tu repositorio en GitHub
2. Haz clic en "Settings" (Configuración)
3. En el menú lateral, haz clic en "Secrets and variables" > "Actions"
4. Haz clic en "New repository secret"
5. Añade cada uno de los secretos mencionados anteriormente

## Configuración de Vercel

Para configurar el despliegue automático a Vercel:

1. Inicia sesión en [Vercel](https://vercel.com)
2. Crea un nuevo proyecto o selecciona uno existente
3. Ve a "Settings" > "General" para obtener el ID del proyecto
4. Ve a "Settings" > "General" > "Your Account" para obtener el ID de la organización
5. Ve a "Settings" > "Tokens" para crear un token de API

## Configuración de Cypress Dashboard

Para habilitar el registro de pruebas de Cypress:

1. Inicia sesión en [Cypress Dashboard](https://dashboard.cypress.io)
2. Crea un nuevo proyecto
3. Obtén la clave de registro del proyecto
4. Configura la clave como secreto en GitHub (`CYPRESS_RECORD_KEY`)

## Ejecución local del flujo de trabajo

Para ejecutar localmente el flujo de trabajo completo:

\`\`\`bash
npm run ci && npm run ci:visual
\`\`\`

## Solución de problemas

### Fallos en pruebas visuales

Si las pruebas visuales fallan en CI pero pasan localmente:

1. Descarga los artefactos de la ejecución fallida
2. Compara las imágenes de diferencia para identificar los cambios
3. Si los cambios son intencionales, actualiza las capturas de referencia:
   \`\`\`bash
   npm run visual:update
   \`\`\`
4. Sube las nuevas capturas de referencia al repositorio

### Fallos en pruebas E2E

Si las pruebas E2E fallan en CI pero pasan localmente:

1. Revisa los videos y capturas de pantalla generados por Cypress
2. Verifica si hay problemas de temporización (timing) o condiciones de carrera
3. Ajusta las pruebas para hacerlas más robustas

## Mejores prácticas

1. **Ejecuta las pruebas localmente** antes de hacer push o crear un PR
2. **Revisa los informes de cobertura** para asegurarte de que las nuevas características estén bien probadas
3. **Actualiza las capturas de referencia** cuando los cambios visuales sean intencionales
4. **Monitorea los tiempos de ejecución** del flujo de trabajo y optimiza las pruebas si es necesario
5. **Mantén actualizadas las dependencias** para beneficiarte de las últimas mejoras y correcciones de seguridad
\`\`\`

Finalmente, vamos a crear un archivo de configuración para CodeCov:
