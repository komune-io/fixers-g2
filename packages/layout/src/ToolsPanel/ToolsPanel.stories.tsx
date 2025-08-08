import { ToolsPanel as AruiToolsPanel } from './ToolsPanel'
import { Meta } from '@storybook/react-vite'
import defaultLogo from '../assets/impactcity-logo-2.png'
import { AccountCircle } from '@mui/icons-material'
import { Menu } from './types'

export default {
  title: 'Layout/ToolsPanel',
  component: AruiToolsPanel,
  argTypes: {
    menu: {
      table: {
        type: {
          summary: 'Menu',
          detail: Menu
        }
      },
      control: null
    }
  }
} as Meta<typeof AruiToolsPanel>

export const ToolsPanel = {
  args: {
    menu: {
      label: 'profile',
      key: 'profile',
      icon: <AccountCircle />,
      items: [
        {
          key: 'key1',
          goto: () => {},
          label: 'Section 1',
          icon: (
            <img
              style={{ width: '60px', height: '60px' }}
              src={defaultLogo}
              alt='smart b'
            />
          )
        },
        {
          key: 'key2',
          goto: () => {},
          label: 'Section 2',
          icon: (
            <img
              style={{ width: '60px', height: '60px' }}
              src={defaultLogo}
              alt='smart b'
            />
          )
        },
        {
          key: 'key3',
          goto: () => {},
          label: 'Section 3',
          icon: (
            <img
              style={{ width: '60px', height: '60px' }}
              src={defaultLogo}
              alt='smart b'
            />
          )
        }
      ]
    }
  },

  name: 'ToolsPanel'
}
