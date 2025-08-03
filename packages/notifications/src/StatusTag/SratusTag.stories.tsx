import { StatusTag as AruiStatusTag, StatusTagBasicProps } from './StatusTag'
import { StoryObj, Meta, StoryFn } from '@storybook/react'

import { Box } from '@mui/material'

export default {
  title: 'Notifications/StatusTag',
  component: AruiStatusTag,

  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kgphqh0uVhoXt8TK3LlkGj/G2-%2F-Design-System?node-id=1017%3A1805'
    }
  }
} as Meta<typeof AruiStatusTag>

export const StatusTag: StoryObj<StatusTagBasicProps> = {
  render: (args: StatusTagBasicProps) => {
    return <AruiStatusTag {...args} />
  },

  args: {
    label: 'Status'
  },

  name: 'StatusTag'
}

export const StatusVariant: StoryFn<StatusTagBasicProps> = () => {
  return (
    <Box display='flex' justifyContent='space-around'>
      <AruiStatusTag label='info' variant='info' />
      <AruiStatusTag label='error' variant='error' />
      <AruiStatusTag label='success' variant='success' />
      <AruiStatusTag label='warning' variant='warning' />
      <AruiStatusTag label='custom color' customColor='#9FB0C9' />
    </Box>
  )
}
