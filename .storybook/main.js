import { dirname, join } from 'path'

module.exports = {
  stories: [
    '../docs/**/*.stories.@(ts|tsx|mdx)',
    '../packages/components/src/**/*.stories.@(ts|tsx|mdx)',
    '../packages/composable/src/**/*.stories.@(ts|tsx|mdx)',
    '../packages/documentation/src/**/*.stories.@(ts|tsx|mdx)',
    '../packages/forms/src/**/*.stories.@(ts|tsx|mdx)',
    '../packages/layout/src/**/*.stories.@(ts|tsx|mdx)',
    '../packages/notifications/src/**/*.stories.@(ts|tsx|mdx)',
    '../packages/s2/src/**/*.stories.@(ts|tsx|mdx)',
    '../packages/providers/src/**/*.stories.@(ts|tsx|mdx)',
    '../packages/im/src/**/*.stories.@(ts|tsx|mdx)',
    '../packages/fs/src/**/*.stories.@(ts|tsx|mdx)'
  ],

  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-docs')
  ],

  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      savePropValueAsString: true,
      propFilter: (prop) => {
        if (!prop.parent) return false
        if (prop.parent.name.includes('Basic')) {
          return true
        }
        if (/node_modules/.test(prop.parent.fileName)) return false
        return true
      }
    }
  },

  staticDirs: ['./public'],

  features: {
    buildStoriesJson: true
  },

  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {}
  },

  async viteFinal(config) {
    // Merge with custom Vite config
    const { mergeConfig } = await import('vite')
    const { default: storybookViteConfig } = await import(
      '../storybook-vite.config.mjs'
    )

    return mergeConfig(config, storybookViteConfig)
  }
}
/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')))
}
