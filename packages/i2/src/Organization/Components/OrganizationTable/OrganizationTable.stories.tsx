import { Meta } from '@storybook/react'
import React from 'react'
import { OrganizationTable, OrganizationTableProps } from './OrganizationTable'
import { Story } from '@storybook/react/types-6-0'
import { ArgsTable, PRIMARY_STORY, Subtitle } from '@storybook/addon-docs'
import LinkTo from '@storybook/addon-links/react'
import { Stack, Typography } from '@mui/material'
import { Button } from '@smartb/g2-components'
import { Organization } from '../OrganizationFactory'

export default {
  title: 'I2/OrganizationTable',
  component: OrganizationTable,
  parameters: {
    docs: {
      page: () => (
        <>
          <ArgsTable story={PRIMARY_STORY} />
          <Subtitle>References</Subtitle>
          <Stack>
            <Typography variant='body2' style={{ marginBottom: '5px' }}>
              -{' '}
              <LinkTo kind='Components' story='Table'>
                Table
              </LinkTo>
            </Typography>
            <Typography variant='body2' style={{ marginBottom: '5px' }}>
              -{' '}
              <LinkTo kind='Forms' story='Filters'>
                Filters
              </LinkTo>
            </Typography>
          </Stack>
        </>
      )
    }
  }
} as Meta

export const OrganizationTableStory: Story<OrganizationTableProps> = (
  args: OrganizationTableProps
) => {
  return <OrganizationTable {...args} />
}

const organizations: Organization[] = [
  {
    id: '1',
    roles: ['Manager'],
    name: 'Smartb',
    address: {
      street: '2 Rue du Pavillon',
      postalCode: '34000',
      city: 'Montpellier'
    },
    siret: '12345678912345',
    website: 'https://smartb.city'
  },
  {
    id: '2',
    roles: ['Manager'],
    name: 'Smartb',
    address: {
      street: '2 Rue du Pavillon',
      postalCode: '34000',
      city: 'Montpellier'
    },
    siret: '12345678912345',
    website: 'https://smartb.city'
  },
  {
    id: '3',
    roles: ['Manager'],
    name: 'Smartb',
    address: {
      street: '2 Rue du Pavillon',
      postalCode: '34000',
      city: 'Montpellier'
    },
    siret: '12345678912345',
    website: 'https://smartb.city'
  }
]

OrganizationTableStory.args = {
  organizations: organizations,
  totalPages: 10,
  onFetchOrganizations: (params) => console.log(params),
  tableActions: <Button>Créer un utilisateur</Button>,
  rolesOptions: [
    {
      key: 'manager',
      label: 'Manager'
    },
    {
      key: 'opérateur',
      label: 'Opérateur'
    }
  ]
}

OrganizationTableStory.storyName = 'OrganizationTable'