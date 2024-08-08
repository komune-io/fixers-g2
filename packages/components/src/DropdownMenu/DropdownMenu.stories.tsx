import React from 'react'
import {
  DropdownMenuProps,
  DropdownMenu as AruiDropdownMenu
} from './DropdownMenu'
import { Meta, StoryFn } from '@storybook/react'
import { ListRounded } from '@mui/icons-material'
import { Link } from '@mui/material'
export default {
  title: 'Components/DropdownMenu',
  component: AruiDropdownMenu
} as Meta

const Template: StoryFn<DropdownMenuProps> = (args: DropdownMenuProps) => (
  <AruiDropdownMenu {...args} />
)

export const DropdownMenu = Template.bind({})
DropdownMenu.args = {
  items: [
    {
      key: 'key1',
      label: 'Section 1'
    },
    {
      key: 'key2',
      label: 'Section 2',
      icon: <ListRounded />,
      items: [
        {
          key: 'key2-1',
          label: 'Section 2-1',
          component: Link,
          items: [
            {
              key: 'key2-1-1',
              label: 'Section 2-1-1',
              isSelected: true
            },
            {
              key: 'key2-1-2',
              label: 'Section 2-1-2'
            }
          ]
        },
        {
          key: 'key2-2',
          label: 'Section 2-2'
        }
      ]
    },
    {
      key: 'key3',
      label: 'Section 3',
      component: Link,
      items: [
        {
          key: 'key3-1',
          label: 'Section 3-1'
        },
        {
          key: 'key3-2',
          label: 'Section 3-1'
        }
      ]
    },
    {
      key: 'key5',
      label: 'Section 5',
      icon: <ListRounded />
    }
  ]
}

DropdownMenu.storyName = 'DropdownMenu'
