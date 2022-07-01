import React, { useState } from 'react'
import { Meta } from '@storybook/react'
import {
  AutomatedOrganizationTable,
  AutomatedOrganizationTableBasicProps as AutomatedOrganizationTableProps
} from './AutomatedOrganizationTable'
import { Story } from '@storybook/react/types-6-0'
import { g2Config, KeycloakProvider, useAuth } from '@smartb/g2-providers'
import { Typography } from '@mui/material'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Organization } from '../OrganizationFactory'

export default {
  title: 'I2/AutomatedOrganizationTable',
  component: AutomatedOrganizationTable
} as Meta

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000000
    }
  }
})

export const AutomatedOrganizationTableStory: Story<AutomatedOrganizationTableProps<Organization>> =
  (args: AutomatedOrganizationTableProps<Organization>) => {
    return (
      <QueryClientProvider client={queryClient}>
        <KeycloakProvider
          config={g2Config().keycloak}
          loadingComponent={<Typography>Loading...</Typography>}
          initOptions={{ onLoad: 'login-required' }}
        >
          <Following {...args} />
        </KeycloakProvider>
      </QueryClientProvider>
    )
  }

const Following = (args: AutomatedOrganizationTableProps<Organization>) => {
  const { keycloak } = useAuth()

  if (!keycloak.authenticated) return <></>
  return <AutomatedOrganizationTable {...args} />
}

AutomatedOrganizationTableStory.args = {}

AutomatedOrganizationTableStory.storyName = 'AutomatedOrganizationTable'
