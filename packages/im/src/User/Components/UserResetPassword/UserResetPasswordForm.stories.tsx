import { StoryObj, Meta, StoryFn } from '@storybook/react'
import React from 'react'
import {
  UserResetPasswordForm,
  UserResetPasswordFormProps
} from './UserResetPasswordForm'

import { styles, classes } from '../../Domain'

export default {
  title: 'IM/UserResetPasswordForm',
  component: UserResetPasswordForm,
  argTypes: {
    classes: {
      table: {
        type: {
          summary: 'UserResetPasswordFormClasses',
          detail: classes
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'UserResetPasswordFormStyles',
          detail: styles
        }
      }
    }
  }
} as Meta<typeof UserResetPasswordForm>

export const UserResetPasswordFormStory: StoryObj<UserResetPasswordFormProps> =
  {
    render: (args: UserResetPasswordFormProps) => {
      return <UserResetPasswordForm {...args} />
    },

    args: {
      onSubmit: (cmd) => {
        console.log(cmd)
        return true
      },
      userId: 'userId'
    },

    name: 'UserResetPasswordForm'
  }
