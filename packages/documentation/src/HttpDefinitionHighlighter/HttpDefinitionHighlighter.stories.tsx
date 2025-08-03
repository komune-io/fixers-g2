import {
  HttpDefinitionHighlighter,
  HttpDefinitionHighlighterProps
} from './HttpDefinitionHighlighter'
import { StoryObj, Meta } from '@storybook/react'

export default {
  title: 'Documentation/HttpDefinitionHighlighter',
  component: HttpDefinitionHighlighter
} as Meta<typeof HttpDefinitionHighlighter>

export const httpDefinitionHighlighter: StoryObj<HttpDefinitionHighlighterProps> =
  {
    args: {
      httpDefinitions: [
        {
          method: 'POST',
          path: '/fileUpload',
          url: '#fileUpload'
        },
        {
          method: 'DELETE',
          path: '/fileDelete',
          url: 'https://github.com/komune-io/fixers-g2'
        }
      ],
      language: 'http-definition',
      title: 'Example'
    },

    name: 'HttpDefinitionHighlighter'
  }
