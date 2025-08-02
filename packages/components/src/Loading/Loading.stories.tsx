import React from 'react'
import { Loading as AruiLoading, LoadingBasicProps } from './Loading'
import { Meta, StoryFn } from '@storybook/react'
import komune from '../assets/komune.png'
import { styles, classes } from './types'

export default {
  title: 'Components/Loading',
  component: AruiLoading,
  argTypes: {
    classes: {
      table: {
        type: {
          summary: 'LoadingClasses',
          detail: classes
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'LoadingStyles',
          detail: styles
        }
      }
    }
  }
} as Meta<typeof AruiLoading>

export const Loading = {
  args: {
    icon: <img src={komune} alt='komune logo' />
  }
}
