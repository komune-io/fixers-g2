import { Meta, StoryFn } from '@storybook/react'
import React, { useCallback } from 'react'
import {
  AutomatedGalleryFactory,
  AutomatedGalleryFactoryProps
} from './AutomatedGalleryFactory'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default {
  title: 'Fs/AutomatedGalleryFactory',
  component: AutomatedGalleryFactory
} as Meta

const queryClient = new QueryClient()

export const AutomatedGalleryFactoryStory: StoryFn<
  AutomatedGalleryFactoryProps
> = (args: AutomatedGalleryFactoryProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SubComponent {...args} />
    </QueryClientProvider>
  )
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

AutomatedGalleryFactoryStory.args = {
  directoryPath: {
    directory: 'gallery1',
    objectId: '0fe05d72-db8e-4ae1-9852-68ec74fa3b01',
    objectType: 'project'
  }
}

AutomatedGalleryFactoryStory.storyName = 'AutomatedGalleryFactory'
