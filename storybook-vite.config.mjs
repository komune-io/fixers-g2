import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: '**/*.svg',
      svgrOptions: {
        exportType: 'named',
        namedExport: 'ReactComponent'
      }
    }),
    // Custom plugin to handle raw-loader syntax for legacy imports
    {
      name: 'raw-loader-compat',
      transform(code, id) {
        if (code.includes('!raw-loader!')) {
          return code.replace(/['"`]!raw-loader!([^'"`]+)['"`]/g, "'$1?raw'")
        }
      }
    }
  ],
  resolve: {
    alias: {
      '@komune-io/g2-components': resolve('./packages/components/src'),
      '@komune-io/g2-forms': resolve('./packages/forms/src'),
      '@komune-io/g2-layout': resolve('./packages/layout/src'),
      '@komune-io/g2-notifications': resolve('./packages/notifications/src'),
      '@komune-io/g2-themes': resolve('./packages/themes/src'),
      '@komune-io/g2-utils': resolve('./packages/utils/src'),
      '@komune-io/g2-providers': resolve('./packages/providers/src'),
      '@komune-io/g2-s2': resolve('./packages/s2/src'),
      '@komune-io/g2-fs': resolve('./packages/fs/src'),
      '@komune-io/g2-im': resolve('./packages/im/src'),
      '@komune-io/g2-composable': resolve('./packages/composable/src'),
      '@komune-io/g2-documentation': resolve('./packages/documentation/src')
    },
    extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx', '.json']
  },
  assetsInclude: ['**/*.md'],
  server: {
    fs: {
      allow: ['..']
    }
  }
})
