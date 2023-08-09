import React, { useState } from 'react'
import {
  LabelSwitch as AruiLabelSwitch,
  LabelSwitchBasicProps,
  Label
} from './LabelSwitch'
import { Meta, StoryFn } from '@storybook/react'

import { styles, classes } from './docs'

export default {
  title: 'Components/LabelSwitch',
  component: AruiLabelSwitch,

  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kgphqh0uVhoXt8TK3LlkGj/G2-%2F-Design-System?node-id=1014%3A1009'
    }
  },
  argTypes: {
    classes: {
      table: {
        type: {
          summary: 'LabelSwitchClasses',
          detail: classes
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'LabelSwitchStyles',
          detail: styles
        }
      }
    }
  }
} as Meta

export const LabelSwitch: StoryFn<LabelSwitchBasicProps> = (
  args: LabelSwitchBasicProps
) => {
  const [labelValue, setlabelValue] = useState('3Month')
  return (
    <AruiLabelSwitch
      {...args}
      onLabelChange={setlabelValue}
      selectedLabelValue={labelValue}
    />
  )
}

const labels: Label[] = [
  {
    name: 'Month',
    value: 'Month',
    key: 'LabelSwitch_month'
  },
  {
    name: '3 months',
    value: '3Month',
    key: 'LabelSwitch_3month'
  },
  {
    name: 'Year',
    value: 'Year',
    key: 'LabelSwitch_year'
  },
  {
    name: 'All',
    value: 'All',
    key: 'LabelSwitch_all'
  }
]

LabelSwitch.args = {
  labels: labels
}

LabelSwitch.storyName = 'LabelSwitch'
