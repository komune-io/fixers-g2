import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { KeycloakProvider, OidcSecure } from '@komune-io/g2-providers'
import {
  UserResetPasswordFormAutomated,
  UserResetPasswordFormAutomatedProps
} from './UserResetPasswordFormAutomated'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default {
  title: 'I2V2/UserResetPasswordForm',
  component: UserResetPasswordFormAutomated
} as Meta

const queryClient = new QueryClient()

export const UserResetPasswordFormAutomatedStory: StoryFn<
  UserResetPasswordFormAutomatedProps
> = (args: UserResetPasswordFormAutomatedProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <KeycloakProvider>
        <OidcSecure>
          <Following {...args} />
        </OidcSecure>
      </KeycloakProvider>
    </QueryClientProvider>
  )
}

const Following = (args: UserResetPasswordFormAutomatedProps) => {
  return <UserResetPasswordFormAutomated {...args} />
}

UserResetPasswordFormAutomatedStory.args = {
  userId: 'userId'
}

UserResetPasswordFormAutomatedStory.storyName = 'UserResetPasswordFormAutomated'
