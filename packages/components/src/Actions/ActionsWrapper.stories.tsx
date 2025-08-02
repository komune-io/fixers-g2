import React from 'react'
import { ActionsWrapper, ActionsWrapperProps } from './ActionsWrapper'
import { Meta, StoryFn } from '@storybook/react'

export default {
  title: 'Components/ActionsWrapper',
  component: ActionsWrapper
} as Meta<typeof ActionsWrapper>

const Template: StoryFn<ActionsWrapperProps> = (args: ActionsWrapperProps) => (
  <ActionsWrapper {...args}>
    <p>wefuiwehfuiwef fiweofjewofiwf wnfoiewfnweoif</p>
  </ActionsWrapper>
)

export const Actions = {
  render: Template,

  args: {
    actions: [
      {
        key: 'action1',
        label: 'Action1'
      },
      {
        key: 'action2',
        label: 'Action2'
      }
    ],
    position: 'both'
  },

  name: 'Actions'
}
