import { StoryObj, Meta } from '@storybook/react-vite'
import {
  AutomatedOrganizationTable,
  AutomatedOrganizationTableBasicProps as AutomatedOrganizationTableProps
} from './AutomatedOrganizationTable'

import { KeycloakProvider, OidcSecure, useAuth } from '@komune-io/g2-providers'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Organization } from '../../Domain'

export default {
  title: 'IM/AutomatedOrganizationTable',
  component: AutomatedOrganizationTable
} as Meta<typeof AutomatedOrganizationTable>

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000000
    }
  }
})

export const AutomatedOrganizationTableStory: StoryObj<
  AutomatedOrganizationTableProps<Organization>
> = {
  render: (args: AutomatedOrganizationTableProps<Organization>) => {
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
  name: 'AutomatedOrganizationTable'
}

const Following = (args: AutomatedOrganizationTableProps<Organization>) => {
  const { keycloak } = useAuth()

  if (!keycloak.isAuthenticated) return <></>
  return <AutomatedOrganizationTable {...args} />
}
