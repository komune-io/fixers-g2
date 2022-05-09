import { Meta } from '@storybook/react'
import { MyOrganization, MyOrganizationProps } from './MyOrganization'
import { Story } from '@storybook/react/types-6-0'
import { g2Config, KeycloakProvider } from '@smartb/g2-providers'
import { Typography } from '@mui/material'
import { QueryClient, QueryClientProvider } from 'react-query'

export default {
  title: 'I2/MyOrganization',
  component: MyOrganization
} as Meta

const queryClient = new QueryClient()

export const MyOrganizationStory: Story<MyOrganizationProps> = (
  args: MyOrganizationProps
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

const Following = (args: MyOrganizationProps) => {
  return <MyOrganization {...args} />
}

MyOrganizationStory.args = {}

MyOrganizationStory.storyName = 'MyOrganization'
