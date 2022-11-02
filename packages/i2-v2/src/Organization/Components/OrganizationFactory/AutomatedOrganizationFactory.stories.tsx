import React, { useState } from 'react'
import { Meta } from '@storybook/react'
import { AutomatedOrganizationFactory } from './AutomatedOrganizationFactory'
import { Story } from '@storybook/react/types-6-0'
import { g2Config, KeycloakProvider } from '@smartb/g2-providers'
import { Typography } from '@mui/material'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useOrganizationFormState } from './useOrganizationFormState'
import { OrganizationFactoryBasicProps } from './OrganizationFactory'
import { Button } from '@smartb/g2-components'

export default {
  title: 'I2-V2/AutomatedOrganizationFactory',
  component: AutomatedOrganizationFactory
} as Meta

const queryClient = new QueryClient()

export const AutomatedOrganizationFactoryStory: Story<
  OrganizationFactoryBasicProps
> = (args: OrganizationFactoryBasicProps) => {
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

const Following = (args: OrganizationFactoryBasicProps) => {
  const [organizationId, setOrganizationId] = useState<string | undefined>()

  const organizationFormState = useOrganizationFormState({
    update: !!organizationId,
    organizationId: organizationId,
    createOrganizationOptions: {
      onSuccess: (data) => {
        setOrganizationId(data?.id)
      }
    }
  })
  return (
    <>
      <AutomatedOrganizationFactory {...organizationFormState} {...args} />
      <Button onClick={organizationFormState.formState.submitForm}>
        Validate
      </Button>
    </>
  )
}

AutomatedOrganizationFactoryStory.args = {}

AutomatedOrganizationFactoryStory.storyName = 'AutomatedOrganizationFactory'
