import { StoryObj, Meta } from '@storybook/react'
import { AutomatedGallery, AutomatedGalleryProps } from './AutomatedGallery'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Box } from '@mui/material'

export default {
  title: 'Fs/AutomatedGallery',
  component: AutomatedGallery
} as Meta<typeof AutomatedGallery>

const queryClient = new QueryClient()

export const AutomatedGalleryStory: StoryObj<AutomatedGalleryProps> = {
  render: (args: AutomatedGalleryProps) => {
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

  name: 'AutomatedGallery'
}

const SubComponent = (args: AutomatedGalleryProps) => {
  return (
    <Box
      sx={{
        width: '400px',
        height: '500px'
      }}
    >
      <AutomatedGallery galleryName='gallery1' {...args} />
    </Box>
  )
}
