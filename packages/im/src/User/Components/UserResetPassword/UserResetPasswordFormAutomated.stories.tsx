import { StoryObj, Meta } from '@storybook/react-vite'
import { KeycloakProvider, OidcSecure } from '@komune-io/g2-providers'
import {
  UserResetPasswordFormAutomated,
  UserResetPasswordFormAutomatedProps
} from './UserResetPasswordFormAutomated'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default {
  title: 'IM/UserResetPasswordForm',
  component: UserResetPasswordFormAutomated
} as Meta<typeof UserResetPasswordFormAutomated>

const queryClient = new QueryClient()

export const UserResetPasswordFormAutomatedStory: StoryObj<UserResetPasswordFormAutomatedProps> =
  {
    render: (args: UserResetPasswordFormAutomatedProps) => {
      return (
        <QueryClientProvider client={queryClient}>
          <KeycloakProvider>
            <OidcSecure>
              <Following {...args} />
            </OidcSecure>
          </KeycloakProvider>
        </QueryClientProvider>
      )
    },

    args: {
      userId: 'userId'
    },

    name: 'UserResetPasswordFormAutomated'
  }

const Following = (args: UserResetPasswordFormAutomatedProps) => {
  return <UserResetPasswordFormAutomated {...args} />
}
