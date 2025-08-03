import { DropZonePicture as AruiDropZonePicture } from './DropZonePicture'
import { Meta } from '@storybook/react'

export default {
  title: 'Fs/DropZonePicture',
  component: AruiDropZonePicture,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kgphqh0uVhoXt8TK3LlkGj/G2-%2F-Design-System?node-id=1014%3A942'
    }
  }
} as Meta<typeof AruiDropZonePicture>

export const DropPicture = {
  name: 'DropPicture'
}
