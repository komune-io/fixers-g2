import React from 'react'
import { Tooltip as AruiTooltip, TooltipBasicProps } from './Tooltip'
import { Meta, StoryFn } from '@storybook/react'
import { Typography } from '@mui/material'

export default {
  title: 'Notifications/Tooltip',
  component: AruiTooltip,

  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kgphqh0uVhoXt8TK3LlkGj/G2-%2F-Design-System?node-id=1017%3A1671'
    }
  }
} as Meta<typeof AruiTooltip>

const Template: StoryFn<TooltipBasicProps> = (args: TooltipBasicProps) => {
  return (
    <AruiTooltip {...args} open={args.open ? true : undefined}>
      <Typography align='center'>The element to tooltiped</Typography>
    </AruiTooltip>
  )
}

const Template2: StoryFn = () => {
  return (
    <AruiTooltip helperText='A helper message' open>
      <Typography align='center'>The element to tooltiped</Typography>
    </AruiTooltip>
  )
}

export const Tooltip = {
  render: Template,

  args: {
    helperText: 'A helper message'
  },

  name: 'Tooltip'
}

export const PermanentTooltip = {
  render: Template2,
  name: 'permanent tooltip'
}
