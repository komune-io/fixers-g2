export default {
  stories: [
    '../docs/**/*.stories.@(ts|tsx|mdx)',
    '../packages/*/src/**/*.stories.@(ts|tsx|mdx)'
  ],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@chromatic-com/storybook'
  ],

  framework: {
    name: '@storybook/react-vite'
  },

  features: {
    buildStoriesJson: true
  },

  staticDirs: ['./public'],

  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false
      },
      propFilter: (prop) => {
        if (prop.name === 'children') return true
        if (!prop.parent) return true

        // Filter out node_modules except @mui and @komune-io packages
        return (
          !prop.parent.fileName.includes('node_modules') ||
          /@mui|@komune-io/.test(prop.parent.fileName)
        )
      }
    }
  },

  async viteFinal(config) {
    const { mergeConfig } = await import('vite')
    const storybookConfig = await import('../vite-storybook.config.mjs')
    return mergeConfig(config, storybookConfig.default)
  }
}
