import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import svgr from 'vite-plugin-svgr'
import { readFileSync } from 'fs'

const getGlobalViteConfig = (packageDir) => {
  const packageJson = JSON.parse(
    readFileSync(resolve(packageDir, 'package.json'), 'utf-8')
  )
  const external = [
    ...Object.keys(packageJson.dependencies || {}),
    ...Object.keys(packageJson.peerDependencies || {}),
    'react',
    'react-dom',
    'react/jsx-runtime'
  ]

  return defineConfig({
    plugins: [
      react(),
      svgr({
        include: '**/*.svg',
        svgrOptions: {
          exportType: 'named',
          namedExport: 'ReactComponent'
        }
      }),
      dts({ rollupTypes: true })
    ],
    build: {
      lib: {
        entry: resolve(packageDir, 'src/index.ts'),
        formats: ['es', 'cjs'],
        fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`
      },
      rollupOptions: {
        external: (id) => {
          // Handle @komune-io packages specifically
          if (id.startsWith('@komune-io/g2-')) {
            return true
          }
          // Handle other externals
          return external.includes(id)
        }
      },
      sourcemap: true,
      target: 'ES2020'
    }
  })
}

export default getGlobalViteConfig
