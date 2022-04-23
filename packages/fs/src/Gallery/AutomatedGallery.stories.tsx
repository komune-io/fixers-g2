import { Meta } from '@storybook/react'
import React, { useCallback } from 'react'
import { AutomatedGallery, AutomatedGalleryProps } from './AutomatedGallery'
import { Story } from '@storybook/react/types-6-0'
import { useGetGallery } from '.'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Box } from '@mui/material'

export default {
  title: 'Fs/AutomatedGallery',
  component: AutomatedGallery
} as Meta

const queryClient = new QueryClient()

export const AutomatedGalleryStory: Story<AutomatedGalleryProps> = (
  args: AutomatedGalleryProps
) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SubComponent {...args} />
    </QueryClientProvider>
  )
}

const SubComponent = (args: AutomatedGalleryProps) => {
  const gallery = useGetGallery({
    apiUrl: 'http://51.83.34.130:8090',
    directoryPath: {
      directory: 'gallery1',
      objectId: '0fe05d72-db8e-4ae1-9852-68ec74fa3b01',
      objectType: 'project'
    }
  })

  return (
    <Box
      sx={{
        width: '400px',
        height: '500px'
      }}
    >
      <AutomatedGallery gallery={gallery} galleryName='gallery1' {...args} />
    </Box>
  )
}

AutomatedGalleryStory.storyName = 'AutomatedGallery'
