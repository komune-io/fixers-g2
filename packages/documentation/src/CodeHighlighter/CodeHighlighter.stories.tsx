import {
  CodeHighlighter as AruiCodeHighlighter,
  CodeHighlighterProps
} from './CodeHighlighter'
import { StoryObj, Meta } from '@storybook/react-vite'

const style = `export type darkStyles =
| 'atomOneDark'
| 'androidstudio'
| 'darcula'
| 'hopscotch'
| 'tomorrowNight'
export type lightStyles =
| 'atomOneLight'
| 'gruvboxLight'
| 'tomorrow'
`

export default {
  title: 'Documentation/CodeHighlighter',
  component: AruiCodeHighlighter,
  argTypes: {
    style: {
      table: {
        type: {
          detail: style
        }
      }
    }
  }
} as Meta<typeof AruiCodeHighlighter>

export const CodeHighlighter: StoryObj<CodeHighlighterProps> = {
  args: {
    code: `function test(arg: String) {
      console.log(arg)
    }`,
    language: 'typescript',
    title: 'Example'
  },

  name: 'CodeHighlighter'
}

export const objectHiglighter: StoryObj = {
  render: () => (
    <AruiCodeHighlighter
      object={{
        name: 'test',
        age: 18,
        do: (arg: string) => {
          console.log(arg)
        },
        child: {
          name: 'testChild',
          age: 5
        }
      }}
    />
  ),

  name: 'object highlighter'
}

export const httpDefinition: StoryObj<CodeHighlighterProps> = {
  args: {
    object: [
      {
        method: 'POST',
        path: '/fileUpload',
        url: '#fileUpload'
      },
      {
        method: 'DELETE',
        path: '/fileDelete',
        url: 'https://komune-io.github.io/fixers-g2'
      }
    ],
    language: 'http-definition',
    title: 'Example'
  },

  name: 'http definition'
}
