import getGlobalViteConfig from '../../vite-global.config.mjs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import dts from 'vite-plugin-dts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const baseConfig = getGlobalViteConfig(__dirname)

// Override the dts plugin configuration for forms package
export default defineConfig({
  ...baseConfig,
  plugins: [
    react(),
    svgr({
      include: '**/*.svg',
      svgrOptions: {
        exportType: 'named',
        namedExport: 'ReactComponent'
      }
    }),
    // Disable rollupTypes for forms package due to complex type resolution issues
    dts({ rollupTypes: false })
  ]
})
