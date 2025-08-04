import {
  CopyToClipboard as AruiCopyToClipboard,
  CopyToClipboardBasicProps
} from './CopyToClipboard'
import { StoryObj, Meta } from '@storybook/react-vite'
import { styles, classes } from './docs'

export default {
  title: 'Components/CopyToClipboard',
  component: AruiCopyToClipboard,
  argTypes: {
    classes: {
      table: {
        type: {
          summary: 'CopyToClipboardClasses',
          detail: classes
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'CopyToClipboardStyles',
          detail: styles
        }
      }
    }
  }
} as Meta<typeof AruiCopyToClipboard>

export const CopyToClipboard: StoryObj<CopyToClipboardBasicProps> = {
  render: (args: CopyToClipboardBasicProps) => {
    return <AruiCopyToClipboard {...args} />
  },

  args: {
    value: 'example'
  },

  name: 'CopyToClipboard'
}
