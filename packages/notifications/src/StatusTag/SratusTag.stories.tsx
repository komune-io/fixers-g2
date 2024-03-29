import React from 'react'
import { StatusTag as AruiStatusTag, StatusTagBasicProps } from './StatusTag'
import { Meta, StoryFn } from '@storybook/react'

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
} as Meta

export const StatusTag: StoryFn<StatusTagBasicProps> = (
  args: StatusTagBasicProps
) => {
  return <AruiStatusTag {...args} />
}

StatusTag.args = {
  label: 'Status'
}

StatusTag.storyName = 'StatusTag'

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
