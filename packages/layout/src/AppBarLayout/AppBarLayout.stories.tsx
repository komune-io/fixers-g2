import React from 'react'
import {
  AppBarLayout as AruiAppBarLayout,
  AppBarLayoutBasicProps
} from './AppBarLayout'
import { Meta, StoryFn } from '@storybook/react'
import { styles, classes } from './types'
import { ArgTypes, PRIMARY_STORY } from '@storybook/addon-docs'

export default {
  title: 'Layout/AppBarLayout',
  component: AruiAppBarLayout,
  parameters: {
    docs: {
      page: () => (
        <>
          <ArgTypes of={PRIMARY_STORY} />
        </>
      )
    }
  },
  argTypes: {
    classes: {
      table: {
        type: {
          summary: 'AppBarLayoutClasses',
          detail: classes
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'AppBarLayoutStyles',
          detail: styles
        }
      }
    }
  }
} as Meta<typeof AruiAppBarLayout>

const Template: StoryFn<AppBarLayoutBasicProps> = (
  args: AppBarLayoutBasicProps
) => <AruiAppBarLayout {...args}></AruiAppBarLayout>

export const AppBarLayout = {
  render: Template,

  args: {
    onDrawerOpen: () => {},
    children: 'Some content'
  },

  name: 'AppBarLayout'
}
