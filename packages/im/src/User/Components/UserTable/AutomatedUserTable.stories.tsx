import React from 'react'
import { StoryObj, Meta, StoryFn } from '@storybook/react'
import {
  AutomatedUserTable,
  AutomatedUserTableProps
} from './AutomatedUserTable'

import { KeycloakProvider, OidcSecure } from '@komune-io/g2-providers'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default {
  title: 'IM/AutomatedUserTable',
  component: AutomatedUserTable
} as Meta<typeof AutomatedUserTable>

const queryClient = new QueryClient()

export const AutomatedUserTableStory: StoryObj<AutomatedUserTableProps> = {
  render: (args: AutomatedUserTableProps) => {
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

  args: {},
  name: 'AutomatedUserTable'
}

const Following = (args: AutomatedUserTableProps) => {
  return <AutomatedUserTable {...args} />
}
