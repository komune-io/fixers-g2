import { UserMenu as AruiUserMenu, UserMenuProps } from './UserMenu'
import { StoryObj, Meta } from '@storybook/react-vite'
import itemsLogo from '../assets/impactcity-logo-2.png'
import {
  ArgTypes,
  PRIMARY_STORY,
  Subtitle,
  Primary,
  Stories
} from '@storybook/addon-docs/blocks'
import { styles, classes } from './docs'
import { Box, Typography } from '@mui/material'
import LinkTo from '@storybook/addon-links/react'

export default {
  title: 'Layout/UserMenu',
  component: AruiUserMenu,
  parameters: {
    docs: {
      page: () => (
        <>
          <Primary />
          <ArgTypes of={PRIMARY_STORY} />
          <Subtitle>References</Subtitle>
          <Box display='flex' flexDirection='column'>
            <Typography variant='body2' style={{ marginBottom: '5px' }}>
              -{' '}
              <LinkTo kind='Components' story='Menu'>
                Menu
              </LinkTo>
            </Typography>
          </Box>
          <Stories />
        </>
      )
    }
  },
  argTypes: {
    classes: {
      table: {
        type: {
          summary: 'AppMenuClasses',
          detail: classes
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'AppMenuStyles',
          detail: styles
        }
      }
    }
  }
} as Meta<typeof AruiUserMenu>

export const UserMenu: StoryObj<UserMenuProps> = {
  render: (args: UserMenuProps) => {
    return (
      <div style={{ width: '200px' }}>
        <AruiUserMenu {...args} />
      </div>
    )
  },

  args: {
    currentUser: {
      givenName: 'John',
      familyName: 'Doe',
      role: 'Administrator'
    },
    loggedMenu: [
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
    ]
  },

  name: 'UserMenu'
}
