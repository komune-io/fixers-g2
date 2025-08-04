import { useState } from 'react'
import { RadioChoices, Choice, RadioChoicesBasicProps } from './RadioChoices'
import { StoryObj, Meta, StoryFn } from '@storybook/react-vite'
import { RadioChoicesClasses, RadioChoicesStyles } from './docs'

export default {
  title: 'Forms/RadioChoices',
  component: RadioChoices,

  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Nl4422AUGHNVClZOHzPg8/SmartB-UI-kit?node-id=418%3A26'
    }
  },
  argTypes: {
    classes: {
      table: {
        type: {
          summary: 'RadioChoicesClasses',
          detail: RadioChoicesClasses
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'RadioChoicesStyles',
          detail: RadioChoicesStyles
        }
      }
    }
  }
} as Meta<typeof RadioChoices>

const options: Choice[] = [
  {
    key: 1,
    label: 'test1'
  },
  {
    key: 2,
    label: 'test2'
  },
  {
    key: 3,
    label: 'test3'
  },
  {
    key: 4,
    label: 'test4'
  },
  {
    key: 5,
    label: 'test5'
  },
  {
    key: 6,
    label: 'test6'
  },
  {
    key: 7,
    label: 'test7'
  }
]

export const RadioChoicesStory: StoryObj<RadioChoicesBasicProps> = {
  render: (args: RadioChoicesBasicProps) => {
    const [value, setvalue] = useState('')
    return (
      <RadioChoices
        {...args}
        value={value}
        onChange={(value) => setvalue(value)}
        style={{ width: 350 }}
      />
    )
  },

  args: {
    options: options
  },

  name: 'RadioChoices'
}

export const withEditableLabel: StoryFn = () => {
  const [value, setvalue] = useState('')
  console.log(value)
  const options: Choice[] = [
    {
      key: 1,
      label: 'test1'
    },
    {
      key: 2,
      label: 'test2'
    },
    {
      key: 3,
      label: 'test3'
    },
    {
      key: 4,
      label: 'test4',
      editableLabel: true
    },
    {
      key: 5,
      label: 'test5'
    },
    {
      key: 6,
      label: 'test6'
    },
    {
      key: 7,
      label: 'test7'
    }
  ]
  return (
    <RadioChoices
      value={value}
      onChange={(value) => setvalue(value)}
      options={options}
      style={{ width: 350 }}
    />
  )
}
