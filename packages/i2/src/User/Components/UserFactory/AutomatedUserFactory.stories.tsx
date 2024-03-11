import React, { useRef, useState } from 'react'
import { Meta, StoryFn } from '@storybook/react'
import {
  AutomatedUserFactory,
  AutomatedUserFactoryBasicProps as AutomatedUserFactoryProps
} from './AutomatedUserFactory'

import { g2Config, KeycloakProvider } from '@komune-io/g2-providers'
import { Typography } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Button } from '@komune-io/g2-components'

export default {
  title: 'I2/AutomatedUserFactory',
  component: AutomatedUserFactory
} as Meta

const queryClient = new QueryClient()

export const AutomatedUserFactoryStory: StoryFn<AutomatedUserFactoryProps> = (
  args: AutomatedUserFactoryProps
) => {
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

const Following = (args: AutomatedUserFactoryProps) => {
  const [userId, setuserId] = useState<string | undefined>(
    'b78ce604-72ce-4bf5-99a2-f0b0d5f06b2a'
  )
  const submitRef = useRef<HTMLButtonElement>(null)
  return (
    <>
      <AutomatedUserFactory
        update={userId}
        createUserOptions={{
          onSuccess: (data) => {
            setuserId(data.id)
          }
        }}
        organizationId={'1'}
        organizationsRefs={[
          {
            id: '1',
            name: 'Organization 1'
          }
        ]}
        resetPasswordType='forced'
        SubmitButtonRef={submitRef}
        {...args}
        userId={userId}
      />
      <Button ref={submitRef}>Validate</Button>
    </>
  )
}

AutomatedUserFactoryStory.args = {}

AutomatedUserFactoryStory.storyName = 'AutomatedUserFactory'
