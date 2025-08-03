import { StoryObj, Meta } from '@storybook/react'
import { useState } from 'react'
import { GalleryFactory, GalleryFactoryProps } from './GalleryFactory'
import { fileToBase64 } from '@komune-io/g2-utils'
import { FsFile } from '../../Domain'

export default {
  title: 'Fs/GalleryFactory',
  component: GalleryFactory
} as Meta<typeof GalleryFactory>

export const GalleryFactoryStory: StoryObj<GalleryFactoryProps> = {
  render: (args: GalleryFactoryProps) => {
    const [gallery, setgallery] = useState<FsFile[]>([])
    return (
      <GalleryFactory
        files={gallery}
        onAdd={(files) => {
          const fsFiles = files.map(async (file): Promise<FsFile> => {
            const base64 = await fileToBase64(file)
            return {
              path: {
                name: file.name
              },
              id: 'new-' + file.name,
              metadata: {},
              objectId: 'new-' + file.name,
              url: base64
            }
          })
          Promise.all(fsFiles).then((values) => {
            setgallery((oldValues) => [...oldValues, ...values])
          })
        }}
        onDelete={(file) => {
          setgallery((oldValues) =>
            oldValues.filter((element) => file.id !== element.id)
          )
        }}
        sx={{
          height: '200px'
        }}
        {...args}
      />
    )
  },

  name: 'GalleryFactory'
}
