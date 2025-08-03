import { Link as AruiLink, LinkProps } from './Link'
import { StoryObj, Meta } from '@storybook/react'

export default {
  title: 'Components/Link',
  component: AruiLink,

  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kgphqh0uVhoXt8TK3LlkGj/G2-%2F-Design-System?node-id=1014%3A1004'
    }
  }
} as Meta<typeof AruiLink>

export const Link: StoryObj<LinkProps> = {
  args: {
    children: 'I am a link',
    href: '/?path=/docs/components-link--link'
  },

  name: 'Link'
}
