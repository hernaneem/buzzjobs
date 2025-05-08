# BuzzJobs

BuzzJobs es una plataforma de reclutamiento que conecta talento con oportunidades laborales.

## Tecnologías

- Next.js 15
- React 19
- Supabase (Autenticación y base de datos)
- TailwindCSS
- Radix UI

## Requisitos

- Node.js 18+
- pnpm (recomendado) o npm

## Configuración

1. Clona este repositorio
2. Copia el archivo `.env.example` a `.env.local` y completa las variables de entorno:
   ```
   cp .env.example .env.local
   ```
3. Actualiza las variables en el archivo `.env.local` con tus credenciales de Supabase
4. Instala las dependencias:
   ```
   pnpm install
   ```

## Desarrollo

```
pnpm dev
```

## Construcción para producción

```
pnpm build
```

## Despliegue en Vercel

Este proyecto está optimizado para ser desplegado en Vercel:

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno en el panel de control de Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Despliega el proyecto

## Estructura del proyecto

- `/app` - Rutas y páginas de la aplicación (App Router de Next.js)
- `/components` - Componentes reutilizables
- `/contexts` - Contextos de React, incluido autenticación
- `/lib` - Utilidades y servicios
- `/public` - Activos estáticos