# Pruebas de Regresión Visual en BuzzJobs

Este documento describe cómo ejecutar y mantener las pruebas de regresión visual para BuzzJobs.

## ¿Qué son las pruebas de regresión visual?

Las pruebas de regresión visual capturan capturas de pantalla de componentes y páginas, y las comparan con versiones de referencia para detectar cambios visuales no deseados. Esto es útil para:

- Detectar cambios no intencionales en la UI
- Asegurar la consistencia visual entre diferentes versiones
- Identificar problemas de diseño en diferentes tamaños de pantalla

## Ejecutar pruebas visuales

Para ejecutar las pruebas visuales:

\`\`\`bash
npm run visual:test
\`\`\`

Este comando ejecutará todas las pruebas visuales y comparará las capturas de pantalla con las imágenes de referencia.

## Actualizar imágenes de referencia

Cuando se realizan cambios intencionales en la UI, es necesario actualizar las imágenes de referencia:

\`\`\`bash
npm run visual:update
\`\`\`

**IMPORTANTE**: Solo actualice las imágenes de referencia cuando esté seguro de que los cambios visuales son intencionales y correctos.

## Estructura de las pruebas visuales

Las pruebas visuales están organizadas en las siguientes categorías:

- `components.cy.ts`: Pruebas para componentes individuales (navbar, footer, botones)
- `pages.cy.ts`: Pruebas para páginas completas
- `cards.cy.ts`: Pruebas para diferentes tipos de tarjetas
- `forms.cy.ts`: Pruebas para formularios

## Añadir nuevas pruebas visuales

Para añadir una nueva prueba visual:

1. Identifique el archivo apropiado según el tipo de elemento a probar
2. Añada un nuevo test siguiendo el patrón existente
3. Ejecute `npm run visual:update` para generar la imagen de referencia inicial

## Solución de problemas comunes

### Falsos positivos

Si las pruebas fallan debido a pequeñas diferencias que no son relevantes:

1. Ajuste el umbral de fallo en `cypress/support/commands.ts`
2. Considere usar selectores más específicos para capturar solo los elementos relevantes
3. Asegúrese de que las animaciones estén desactivadas durante las pruebas

### Diferencias entre entornos

Las capturas de pantalla pueden variar ligeramente entre diferentes sistemas operativos o navegadores. Para minimizar este problema:

1. Ejecute las pruebas visuales en un entorno CI consistente
2. Utilice Docker para garantizar un entorno de prueba consistente
3. Especifique una versión exacta de navegador para las pruebas

## Mejores prácticas

1. Mantenga las pruebas visuales enfocadas en componentes específicos cuando sea posible
2. Utilice selectores estables (data-testid) para identificar elementos
3. Desactive animaciones y efectos que puedan causar falsos positivos
4. Actualice las imágenes de referencia solo cuando los cambios sean intencionales
5. Revise cuidadosamente los informes de diferencias visuales
