import { StoryObj, Meta, StoryFn } from '@storybook/react'
import React, { useCallback } from 'react'
import {
  AutomatedGalleryFactory,
  AutomatedGalleryFactoryProps
} from './AutomatedGalleryFactory'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default {
  title: 'Fs/AutomatedGalleryFactory',
  component: AutomatedGalleryFactory
} as Meta<typeof AutomatedGalleryFactory>

const queryClient = new QueryClient()

export const AutomatedGalleryFactoryStory: StoryObj<AutomatedGalleryFactoryProps> =
  {
    render: (args: AutomatedGalleryFactoryProps) => {
      return (
        <QueryClientProvider client={queryClient}>
          <SubComponent {...args} />
        </QueryClientProvider>
      )
    },

    args: {
      directoryPath: {
        directory: 'gallery1',
        objectId: '0fe05d72-db8e-4ae1-9852-68ec74fa3b01',
        objectType: 'project'
      }
    },

    name: 'AutomatedGalleryFactory'
  }

const SubComponent = (args: AutomatedGalleryFactoryProps) => {
  return (
    <AutomatedGalleryFactory
      galleryName='gallery1'
      sx={{
        height: '200px'
      }}
      {...args}
    />
  )
}
