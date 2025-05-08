import { defineConfig } from "cypress"
import { addMatchImageSnapshotPlugin } from "cypress-image-snapshot/plugin"

export default defineConfig({
  projectId: process.env.CYPRESS_PROJECT_ID || "buzzjobs",
  e2e: {
    setupNodeEvents(on, config) {
      // Configurar el plugin de cypress-image-snapshot
      addMatchImageSnapshotPlugin(on, config)

      // Configurar variables de entorno
      config.env = {
        ...config.env,
        ...process.env,
      }

      return config
    },
    baseUrl: "http://localhost:3000",
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    experimentalStudio: true,
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    viewportWidth: 1280,
    viewportHeight: 720,
  },
  retries: {
    runMode: 2,
    openMode: 0,
  },
})
