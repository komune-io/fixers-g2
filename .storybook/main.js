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
    getAbsolutePath('@storybook/addon-essentials'),
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
    name: getAbsolutePath('@storybook/react-webpack5'),
    options: {}
  },
  docs: {
    autodocs: true
  },

  webpackFinal: async (config) => {
    // Remove existing typescript rules to avoid conflicts
    config.module.rules = config.module.rules.filter((rule) => {
      if (rule.test) {
        const testStr = rule.test.toString()
        return !testStr.includes('tsx?') && !testStr.includes('ts')
      }
      return true
    })

    // Add comprehensive TypeScript and JSX handling
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: { node: 'current' } }],
              ['@babel/preset-react', { runtime: 'automatic' }],
              ['@babel/preset-typescript', { allowDeclareFields: true }]
            ],
            plugins: [
              '@babel/plugin-proposal-nullish-coalescing-operator',
              '@babel/plugin-proposal-optional-chaining'
            ]
          }
        }
      ],
      exclude: /node_modules/
    })

    // Add JSX support for .jsx files
    config.module.rules.push({
      test: /\.jsx$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: { node: 'current' } }],
              ['@babel/preset-react', { runtime: 'automatic' }]
            ]
          }
        }
      ],
      exclude: /node_modules/
    })

    // Handle markdown files as raw text
    config.module.rules.push({
      test: /\.md$/,
      type: 'asset/source'
    })

    return config
  }
}
/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')))
}
