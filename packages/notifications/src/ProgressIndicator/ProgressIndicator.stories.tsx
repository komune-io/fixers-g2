import React from 'react'
import {
  ProgressIndicator as AruiProgressIndicator,
  ProgressIndicatorProps
} from './ProgressIndicator'
import { StoryObj, Meta, StoryFn } from '@storybook/react'

import { classes, styles } from './docs'

export default {
  title: 'Notifications/ProgressIndicator',
  component: AruiProgressIndicator,

  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kgphqh0uVhoXt8TK3LlkGj/G2-%2F-Design-System?node-id=1017%3A1677'
    }
  },
  argTypes: {
    classes: {
      table: {
        type: {
          summary: 'ProgressIndicatorClasses',
          detail: classes
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'ProgressIndicatorStyles',
          detail: styles
        }
      }
    }
  }
} as Meta<typeof AruiProgressIndicator>

export const ProgressIndicator: StoryObj<ProgressIndicatorProps> = {
  args: {
    value: 30
  },

  name: 'ProgressIndicator'
}
