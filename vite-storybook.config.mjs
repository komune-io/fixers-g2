import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { resolve } from 'path'
import { readdirSync } from 'fs'

// Auto-generate aliases from packages directory
const packages = readdirSync('./packages')
const alias = packages.reduce((acc, pkg) => {
  acc[`@komune-io/g2-${pkg}`] = resolve(`./packages/${pkg}/src`)
  return acc
}, {})

export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: '**/*.svg',
      svgrOptions: {
        exportType: 'named',
        namedExport: 'ReactComponent'
      }
    })
  ],
  resolve: { alias },
  assetsInclude: ['**/*.md', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif'],
  server: { fs: { allow: ['..'] } },
  build: {
    rollupOptions: {
      external: (id) => {
        // Don't externalize dependencies that Storybook needs to bundle
        const externals = [
          // Keep these as external (provided by Storybook runtime)
          'react',
          'react-dom',
          'react/jsx-runtime'
        ]
        return externals.includes(id)
      }
    }
  }
})
