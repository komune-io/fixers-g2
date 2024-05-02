import { Meta, StoryFn } from '@storybook/react'
import React from 'react'
import { Gallery, GalleryProps } from './Gallery'
import { Box } from '@mui/material'
import horizontalSrc from './horizontal.jpg'
import verticalSrc from './vertical.jpg'
import squaredSrc from './squared.jpg'
import { FsFile } from '../../Domain'

export default {
  title: 'Fs/Gallery',
  component: Gallery
} as Meta

const files: FsFile[] = [
  {
    id: '1',
    metadata: {},
    path: {
      directory: 'files',
      objectId: '1',
      objectType: 'objectType',
      name: 'horizontal.jpg'
    },
    url: horizontalSrc
  },
  {
    id: '2',
    metadata: {},
    path: {
      directory: 'files',
      objectId: '1',
      objectType: 'objectType',
      name: 'squared.jpg'
    },
    url: squaredSrc
  },
  {
    id: '3',
    metadata: {},
    path: {
      directory: 'files',
      objectId: '1',
      objectType: 'objectType',
      name: 'vertical.jpg'
    },
    url: verticalSrc
  },
  {
    id: '4',
    metadata: {},
    path: {
      directory: 'files',
      objectId: '1',
      objectType: 'objectType',
      name: 'vertical.jpg'
    },
    url: verticalSrc
  },
  {
    id: '5',
    metadata: {},
    path: {
      directory: 'files',
      objectId: '1',
      objectType: 'objectType',
      name: 'horizontal.jpg'
    },
    url: horizontalSrc
  },
  {
    id: '6',
    metadata: {},
    path: {
      directory: 'files',
      objectId: '1',
      objectType: 'objectType',
      name: 'horizontal.jpg'
    },
    url: horizontalSrc
  },
  {
    id: '7',
    metadata: {},
    path: {
      directory: 'files',
      objectId: '1',
      objectType: 'objectType',
      name: 'squared.jpg'
    },
    url: squaredSrc
  },
  {
    id: '8',
    metadata: {},
    path: {
      directory: 'files',
      objectId: '1',
      objectType: 'objectType',
      name: 'vertical.jpg'
    },
    url: verticalSrc
  },
  {
    id: '9',
    metadata: {},
    path: {
      directory: 'files',
      objectId: '1',
      objectType: 'objectType',
      name: 'horizontal.jpg'
    },
    url: horizontalSrc
  },
  {
    id: '10',
    metadata: {},
    path: {
      directory: 'files',
      objectId: '1',
      objectType: 'objectType',
      name: 'squared.jpg'
    },
    url: squaredSrc
  },
  {
    id: '11',
    metadata: {},
    path: {
      directory: 'files',
      objectId: '1',
      objectType: 'objectType',
      name: 'vertical.jpg'
    },
    url: verticalSrc
  },
  {
    id: '12',
    metadata: {},
    path: {
      directory: 'files',
      objectId: '1',
      objectType: 'objectType',
      name: 'horizontal.jpg'
    },
    url: horizontalSrc
  }
]

export const GalleryStory: StoryFn<GalleryProps> = (args: GalleryProps) => {
  return (
    <Box
      sx={{
        width: '400px',
        height: '500px'
      }}
    >
      <Gallery {...args} />
    </Box>
  )
}

GalleryStory.args = {
  files: files
}

GalleryStory.storyName = 'Gallery'

export const GalleryStoryVariantQuilted: StoryFn<GalleryProps> = (
  args: GalleryProps
) => {
  return (
    <Box
      sx={{
        width: '400px',
        height: '500px'
      }}
    >
      <Gallery
        gridProps={{
          cols: 1,
          variant: 'quilted'
        }}
        {...args}
      />
    </Box>
  )
}
GalleryStoryVariantQuilted.args = {
  files: files
}

GalleryStoryVariantQuilted.storyName = 'Gallery Quilted'
