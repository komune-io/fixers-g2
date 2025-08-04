import { TabsMenu as AruiTabsMenu } from './TabsMenu'
import { Meta } from '@storybook/react-vite'
import { styles, classes, Tab } from './types'

export default {
  title: 'Layout/TabsMenu',
  component: AruiTabsMenu,
  argTypes: {
    tabs: {
      table: {
        type: {
          summary: 'Tab[]',
          detail: Tab
        }
      }
    },
    classes: {
      table: {
        type: {
          summary: 'TabsMenuClasses',
          detail: classes
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'PopUpStyles',
          detail: styles
        }
      }
    }
  }
} as Meta<typeof AruiTabsMenu>

export const TabsMenu = {
  args: {
    variant: 'fullWidth',
    tabs: [{ label: 'section1' }, { label: 'section2' }],
    children: ['Content 1', 'Content 2']
  },

  name: 'TabsMenu'
}
