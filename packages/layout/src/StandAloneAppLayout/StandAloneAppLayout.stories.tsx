import {
  StandAloneAppLayout as AruiStandAloneAppLayout,
  StandAloneAppLayoutProps
} from './StandAloneAppLayout'
import { StoryObj, Meta, StoryFn } from '@storybook/react'
import { Box, Divider, Link, Paper, Stack, Typography } from '@mui/material'
import { ArgTypes, PRIMARY_STORY, Subtitle } from '@storybook/addon-docs'
import LinkTo from '@storybook/addon-links/react'
import itemsLogo from '../assets/impactcity-logo-2.png'
import { styles, classes } from './docs'
import { Button, DropdownMenu } from '@komune-io/g2-components'
import { FilterTextField } from '@komune-io/g2-forms'
import { Page } from '../Page'
import { ControlPointRounded, ListRounded } from '@mui/icons-material'

export default {
  title: 'Layout/StandAloneAppLayout',
  component: AruiStandAloneAppLayout,
  parameters: {
    docs: {
      page: () => (
        <>
          <ArgTypes of={PRIMARY_STORY} />
          <Subtitle>References</Subtitle>
          <Box display='flex' flexDirection='column'>
            <Typography variant='body2' style={{ marginBottom: '5px' }}>
              -{' '}
              <LinkTo kind='Layout' story='UserMenu'>
                UserMenuProps
              </LinkTo>
            </Typography>
            <Typography variant='body2' style={{ marginBottom: '5px' }}>
              -{' '}
              <LinkTo kind='Layout' story='AppMenu'>
                AppMenu
              </LinkTo>
            </Typography>
            <Typography variant='body2' style={{ marginBottom: '5px' }}>
              -{' '}
              <Link
                color='#0000ee'
                href='https://material-ui.com/api/drawer/#drawer-api'
              >
                drawerProps
              </Link>
            </Typography>
          </Box>
        </>
      )
    },
    layout: 'fullscreen'
  },
  argTypes: {
    classes: {
      table: {
        type: {
          summary: 'StandAloneAppLayoutClasses',
          detail: classes
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'StandAloneAppLayoutStyles',
          detail: styles
        }
      }
    }
  }
} as Meta<typeof AruiStandAloneAppLayout>

export const StandAloneAppLayout: StoryObj<StandAloneAppLayoutProps> = {
  render: (args: StandAloneAppLayoutProps) => {
    return (
      <AruiStandAloneAppLayout {...args}>
        <Content />
      </AruiStandAloneAppLayout>
    )
  },

  args: {
    userMenuProps: {
      defaultOpen: true,
      currentUser: {
        givenName: 'John',
        familyName: 'Doe',
        role: 'Administrator'
      },
      loggedMenu: [
        {
          key: 'my-profile',
          goto: () => {},
          label: 'My Profile'
        },
        {
          key: 'preferances',
          goto: () => {},
          label: 'Preferences'
        },
        {
          key: 'logout',
          goto: () => {},
          label: 'Log out'
        }
      ]
    },
    menu: [
      {
        key: 'dashboard',
        goto: () => {},
        label: 'dashboard',
        icon: <img style={{ width: '30px', height: '30px' }} src={itemsLogo} />
      },
      {
        key: 'activities',
        goto: () => {},
        label: 'activities',
        icon: <img style={{ width: '30px', height: '30px' }} src={itemsLogo} />
      },
      {
        key: 'application',
        goto: () => {},
        label: 'application',
        icon: <img style={{ width: '30px', height: '30px' }} src={itemsLogo} />
      }
    ],
    defaultOpenButton: false,
    defaultCloseButton: false,
    drawerPaddingTop: '90px'
  },

  name: 'StandAloneAppLayout'
}

export const CustomMenu: StoryFn<StandAloneAppLayoutProps> = () => {
  return (
    <AruiStandAloneAppLayout
      defaultOpenButton={false}
      defaultCloseButton={false}
      drawerPaddingTop='90px'
      userMenuProps={{
        currentUser: {
          givenName: 'John',
          familyName: 'Doe',
          role: 'Administrator'
        },
        loggedMenu: [
          {
            key: 'my-profile',
            goto: () => {},
            label: 'My Profile'
          },
          {
            key: 'preferances',
            goto: () => {},
            label: 'Preferences'
          },
          {
            key: 'logout',
            goto: () => {},
            label: 'Log out'
          }
        ]
      }}
      scrollableContent={
        <Stack
          sx={{
            gap: 2,
            px: 1
          }}
        >
          <FilterTextField
            variant='outlined'
            color='default'
            style={{ width: '100%' }}
            textFieldType='search'
            placeholder='Search Mission'
          />
          <Button startIcon={<ControlPointRounded />} variant='text'>
            New mission
          </Button>
          <Divider flexItem />
          <DropdownMenu
            items={[
              {
                key: 'ecosystem',
                label: 'Ecosystème Bois Local blablabla',
                isSelected: true,
                items: [
                  {
                    key: '1',
                    label: 'Coordinateur Écosystème'
                  },
                  {
                    key: '2',
                    label: 'Analyste Politique'
                  },
                  {
                    key: '3',
                    label: 'Expert Methodologies'
                  },
                  {
                    key: '4',
                    label: 'Expert technologies Durables'
                  }
                ]
              }
            ]}
          />
        </Stack>
      }
      bottomContent={
        <Stack
          sx={{
            gap: 2,
            px: 1
          }}
        >
          <Divider flexItem />
          <DropdownMenu
            items={[
              {
                key: 'settings',
                label: 'Settings',
                isSelected: true,
                items: [
                  {
                    key: '1',
                    label: 'Agents'
                  },
                  {
                    key: '2',
                    label: 'Audit templates'
                  },
                  {
                    key: '3',
                    label: 'Report templates'
                  },
                  {
                    key: '4',
                    label: 'Tags'
                  }
                ]
              },
              {
                key: 'documents',
                label: 'Documents Library',
                icon: <ListRounded />
              }
            ]}
          />
        </Stack>
      }
    >
      <Content />
    </AruiStandAloneAppLayout>
  )
}

export const Content = () => {
  return (
    <Page
      headerProps={{
        ignoreDrawer: true,
        content: [
          {
            leftPart: [
              <Typography key='page-title' variant='h5'>
                Page Header
              </Typography>
            ],
            rightPart: [<Button key='page-action'>An action</Button>]
          }
        ],
        currentTab: 'tab-1'
      }}
      bottomActionsProps={{
        actions: [
          {
            label: 'Cancel',
            key: 'cancelButton',
            variant: 'text'
          },
          {
            label: 'validate',
            key: 'validateFormButton',
            type: 'submit'
          }
        ]
      }}
    >
      <Stack direction='row' height='120vh' alignItems='strecth' gap='32px'>
        <Paper sx={{ flexGrow: 1 }} elevation={0} />
        <Paper sx={{ flexGrow: 1 }} elevation={0} />
      </Stack>
    </Page>
  )
}
