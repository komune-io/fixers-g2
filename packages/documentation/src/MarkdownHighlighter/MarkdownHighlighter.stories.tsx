import React from 'react'
import {
  MarkdownHighlighter as AruiMarkdownHighlighter,
  MarkdownHighlighterProps
} from './MarkdownHighlighter'
import { StoryObj, Meta, StoryFn } from '@storybook/react'
//@ts-ignore
import md from '!raw-loader!./example.md'

export default {
  title: 'Documentation/MarkdownHighlighter',
  component: AruiMarkdownHighlighter
} as Meta<typeof AruiMarkdownHighlighter>

export const MarkdownHighlighter: StoryObj<MarkdownHighlighterProps> = {
  args: {
    markdown: `
    # Example
    - 1
    - 2 
    - \`3\`
    `
  },

  name: 'MarkdownHighlighter'
}

export const MarkdownHighlighterFromFile: StoryObj = {
  render: () => (
    //import md from './example.md'
    <AruiMarkdownHighlighter markdown={md} />
  ),

  name: 'MarkdownHighlighterFromFile'
}
