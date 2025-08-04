import { useState } from 'react'
import { CheckBox, CheckBoxBasicProps } from './CheckBox'
import { StoryObj, Meta } from '@storybook/react-vite'
import { CheckBoxClasses, CheckBoxStyles } from './docs'
import { Box } from '@mui/material'

export default {
  title: 'Forms/CheckBox',
  component: CheckBox,

  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kgphqh0uVhoXt8TK3LlkGj/G2-%2F-Design-System?node-id=1014%3A955'
    }
  },
  argTypes: {
    classes: {
      table: {
        type: {
          summary: 'CheckBoxClasses',
          detail: CheckBoxClasses
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'CheckBoxStyles',
          detail: CheckBoxStyles
        }
      }
    }
  }
} as Meta<typeof CheckBox>

export const CheckBoxStory: StoryObj<CheckBoxBasicProps> = {
  render: (args: CheckBoxBasicProps) => {
    return <CheckBox {...args} />
  },

  args: {
    label: 'CA Checkbox'
  },

  name: 'CheckBox'
}

export const CheckBoxStates: StoryObj<CheckBoxBasicProps> = {
  render: () => {
    const [checked, setChecked] = useState(false)

    return (
      <Box display='flex' justifyContent='space-around' alignItems='center'>
        <CheckBox
          label='Normal'
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        <CheckBox
          label='Disabled'
          checked={checked}
          onChange={() => setChecked(!checked)}
          disabled
        />
        <CheckBox
          label='Unvalid'
          checked={checked}
          onChange={() => setChecked(!checked)}
          error
          errorMessage='there is an error'
        />
      </Box>
    )
  },

  name: 'All the states of the CheckBox'
}
