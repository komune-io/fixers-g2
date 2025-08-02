import React, { useState } from 'react'
import { Actions as AruiActions, ActionsBasicProps } from './Actions'
import { Meta, StoryFn } from '@storybook/react'

export default {
  title: 'Components/Actions',
  component: AruiActions
} as Meta<typeof AruiActions>

export const Actions = {
  args: {
    // actions: [
    //   {
    //     key: 'action1',
    //     label: 'Action1'
    //   },
    //   {
    //     key: 'action2',
    //     label: 'Cancel',
    //     variant: 'cancellation'
    //   },
    //   {
    //     key: 'action2',
    //     label: 'Delete',
    //     variant: 'deletion'
    //   }
    // ]
  },

  name: 'Actions'
}

export const ActionsDisable: StoryFn<ActionsBasicProps> = () => {
  const [enable, setEnable] = useState(false)
  const word = enable ? 'disable' : 'enable'
  return (
    <AruiActions
      actions={[
        {
          key: 'action2',
          label: 'Second Action',
          showIf: () => enable
        },
        {
          key: 'action1',
          label: `Click to ${word} second action`,
          showIf: () => true,
          onClick: () => setEnable(!enable)
        }
      ]}
    />
  )
}
