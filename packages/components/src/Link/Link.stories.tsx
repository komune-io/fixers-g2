import React from 'react'
import { Link as AruiLink, LinkProps } from './Link'
import { Meta, StoryFn } from '@storybook/react'

export default {
  title: 'Components/Link',
  component: AruiLink,

  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kgphqh0uVhoXt8TK3LlkGj/G2-%2F-Design-System?node-id=1014%3A1004'
    }
  }
} as Meta

export const Link: StoryFn<LinkProps> = (args: LinkProps) => (
  <AruiLink {...args} />
)

Link.args = {
  children: 'I am a link',
  href: '/?path=/docs/components-link--link'
}

Link.storyName = 'Link'
