import { AppMenu as AruiAppMenu, AppLogoProps, AppMenuProps } from './AppMenu'
import { Meta, StoryFn } from '@storybook/react-vite'
import { Box, Typography } from '@mui/material'
import {
  ArgTypes,
  PRIMARY_STORY,
  Subtitle,
  Primary,
  Stories
} from '@storybook/addon-docs/blocks'
import { styles, classes } from './types'
import LinkTo from '@storybook/addon-links/react'
import defaultLogo from '../assets/komune.png'
import itemsLogo from '../assets/impactcity-logo-2.png'

export default {
  title: 'Layout/AppMenu',
  component: AruiAppMenu,
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
} as Meta<typeof AruiAppMenu>

const Template: StoryFn<AppMenuProps> = (args: AppMenuProps) => {
  return (
    <div style={{ width: '200px' }}>
      <AruiAppMenu {...args} />
    </div>
  )
}

export const AppMenu = {
  render: Template,

  args: {
    logo: {
      src: defaultLogo
    } as AppLogoProps,
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
    ]
  },

  name: 'AppMenu'
}
