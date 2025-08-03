import type { Meta, StoryObj } from '@storybook/react'
import { Markdown, Unstyled } from '@storybook/blocks'
import React from 'react'

// Import README as raw text
import ReadmeContent from '../README.md?raw'

const meta: Meta = {
  title: 'Overview/Getting Started',
  parameters: {
    docs: {
      page: () => (
        <Unstyled>
          <div
            style={{
              maxWidth: '800px',
              margin: '0 auto',
              padding: '2rem',
              fontFamily: 'system-ui, sans-serif'
            }}
          >
            <Markdown>{ReadmeContent}</Markdown>
          </div>
        </Unstyled>
      )
    },
    previewTabs: {
      canvas: { hidden: true }
    },
    viewMode: 'docs'
  }
}

export default meta

type Story = StoryObj<typeof meta>

// This story exists just to render the docs page
export const ReadmeDocumentation: Story = {
  render: () => null
}
