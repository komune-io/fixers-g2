import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import {
  AutomatedUserTable,
  AutomatedUserTableProps
} from './AutomatedUserTable'

import { KeycloakProvider, OidcSecure } from '@komune-io/g2-providers'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default {
  title: 'IM/AutomatedUserTable',
  component: AutomatedUserTable
} as Meta

const queryClient = new QueryClient()

export const AutomatedUserTableStory: StoryFn<AutomatedUserTableProps> = (
  args: AutomatedUserTableProps
) => {
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

const Following = (args: AutomatedUserTableProps) => {
  return <AutomatedUserTable {...args} />
}

AutomatedUserTableStory.args = {}

AutomatedUserTableStory.storyName = 'AutomatedUserTable'
