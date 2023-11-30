import React, { useState } from 'react'
import { Meta, StoryFn } from '@storybook/react'
import {
  AutomatedOrganizationFactory,
  AutomatedOrganizationFactoryBasicProps as AutomatedOrganizationFactoryProps
} from './AutomatedOrganizationFactory'
import { g2Config, KeycloakProvider } from '@smartb/g2-providers'
import { Typography } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default {
  title: 'I2/AutomatedOrganizationFactory',
  component: AutomatedOrganizationFactory
} as Meta

const queryClient = new QueryClient()

export const AutomatedOrganizationFactoryStory: StoryFn<
  AutomatedOrganizationFactoryProps
> = (args: AutomatedOrganizationFactoryProps) => {
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

const Following = (args: AutomatedOrganizationFactoryProps) => {
  const [organizationId, setOrganizationId] = useState<string | undefined>()
  return (
    <AutomatedOrganizationFactory
      createOrganizationOptions={{
        onSuccess: (data) => {
          setOrganizationId(data.id)
        }
      }}
      organizationId={organizationId}
      update={!!organizationId}
      {...args}
    />
  )
}

AutomatedOrganizationFactoryStory.args = {}

AutomatedOrganizationFactoryStory.storyName = 'AutomatedOrganizationFactory'
