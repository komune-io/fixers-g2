import {
  Presentation as AruiPresentation,
  PresentationBasicProps
} from './Presentation'
import { StoryObj, Meta } from '@storybook/react-vite'

import { Stack } from '@mui/material'
import komuneLogo from '../assets/komune.png'

export default {
  title: 'Components/Presentation',
  component: AruiPresentation,

  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kgphqh0uVhoXt8TK3LlkGj/G2-%2F-Design-System?node-id=1019%3A1023'
    }
  }
} as Meta<typeof AruiPresentation>

export const Presentation: StoryObj<PresentationBasicProps> = {
  render: (args: PresentationBasicProps) => {
    return (
      <Stack
        sx={{
          gap: '30px'
        }}
      >
        <AruiPresentation {...args} />
        <AruiPresentation
          label='Smartb'
          imgSrc={komuneLogo}
          description='komune logo'
        />
      </Stack>
    )
  },

  args: {
    label: 'John Doe',
    subLabel: 'Administrateur'
  },

  name: 'Presentation'
}
