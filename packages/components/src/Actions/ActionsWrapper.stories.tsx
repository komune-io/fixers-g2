import React from 'react'
import { ActionsWrapper, ActionsWrapperProps } from './ActionsWrapper'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'
import { withDesign } from 'storybook-addon-designs'

export default {
  title: 'Components/ActionsWrapper',
  component: ActionsWrapper,
  decorators: [withDesign],
  parameters: {}
} as Meta

const Template: Story<ActionsWrapperProps> = (args: ActionsWrapperProps) => (
  <ActionsWrapper {...args}>
    <p>wefuiwehfuiwef fiweofjewofiwf wnfoiewfnweoif</p>
  </ActionsWrapper>
)

export const Actions = Template.bind({})
Actions.args = {
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
}
Actions.storyName = 'Actions'
