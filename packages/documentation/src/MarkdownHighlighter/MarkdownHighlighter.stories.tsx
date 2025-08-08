import {
  MarkdownHighlighter as AruiMarkdownHighlighter,
  MarkdownHighlighterProps
} from './MarkdownHighlighter'
import { StoryObj, Meta } from '@storybook/react-vite'
//@ts-ignore
import md from './example.md?raw'

export default {
  title: 'Documentation/MarkdownHighlighter',
  component: AruiMarkdownHighlighter
} as Meta<typeof AruiMarkdownHighlighter>

export const MarkdownHighlighter2: StoryObj<MarkdownHighlighterProps> = {
  args: {
    markdown: `# Example
  - 1
  - 2
  - \`3\`
`
  },
  name: 'MarkdownHighlighter'
}

export const MarkdownHighlighterFromFile: StoryObj<MarkdownHighlighterProps> = {
  args: {
    markdown: md
  },
  name: 'MarkdownHighlighterFromFile'
}
