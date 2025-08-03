import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import svgr from 'vite-plugin-svgr'
import { readFileSync } from 'fs'

const getGlobalViteConfig = (packageDir) => {
  const packageJsonPath = resolve(packageDir, 'package.json')
  const localPackageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
  const externalsDependencies = Object.keys(
    localPackageJson.dependencies || {}
  ).concat(Object.keys(localPackageJson.peerDependencies || {}))

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
      dts({
        insertTypesEntry: true,
        include: ['src/**/*'],
        exclude: [
          '**/*.stories.tsx',
          '**/*.stories.ts',
          '**/*.test.ts',
          '**/*.test.tsx'
        ],
        outDir: 'dist',
        rollupTypes: true,
        compilerOptions: {
          skipLibCheck: true,
          declaration: true
        }
      })
    ],
    build: {
      lib: {
        entry: resolve(packageDir, 'src/index.ts'),
        formats: ['es', 'cjs'],
        fileName: (format) => (format === 'es' ? 'index.es.js' : 'index.cjs')
      },
      rollupOptions: {
        external: [
          ...externalsDependencies,
          'react',
          'react-dom',
          'react/jsx-runtime'
        ],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM'
          },
          exports: 'named'
        }
      },
      sourcemap: true,
      target: 'es2015'
    },
    resolve: {
      extensions: ['.mjs', '.js', '.jsx', '.json', '.ts', '.tsx']
    }
  })
}

export default getGlobalViteConfig
