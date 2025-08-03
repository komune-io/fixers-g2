import { useState } from 'react'
import { Select, Option, SelectBasicProps } from './Select'
import { StoryObj, Meta } from '@storybook/react'
import { Box } from '@mui/material'
import { SelectClasses, SelectStyles } from './docs'

import {
  ContentCopy,
  ContentCut,
  ContentPaste,
  SortByAlphaRounded
} from '@mui/icons-material'

export default {
  title: 'Forms/Select',
  component: Select,

  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kgphqh0uVhoXt8TK3LlkGj/G2-%2F-Design-System?node-id=1097%3A293'
    }
  },
  argTypes: {
    classes: {
      table: {
        type: {
          summary: 'SelectClasses',
          detail: SelectClasses
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'SelectStyles',
          detail: SelectStyles
        }
      }
    }
  }
} as Meta<typeof Select>

const options: Option[] = [
  {
    key: 1,
    label: 'test1'
  },
  {
    key: 2,
    label: 'test2',
    icon: <ContentCut fontSize='small' />
  },
  {
    key: 3,
    label: 'test3',
    icon: <ContentCopy fontSize='small' />
  },
  {
    key: 4,
    label: 'test4',
    icon: <ContentPaste fontSize='small' />
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

export const SelectStory: StoryObj<SelectBasicProps> = {
  render: (args: SelectBasicProps) => {
    const [value, setvalue] = useState('')
    const [values, setvalues] = useState([])
    console.log(values)
    return (
      <Select
        options={[]}
        {...args}
        startAdornment={<SortByAlphaRounded fontSize='small' />}
        value={args.multiple ? undefined : value}
        values={args.multiple ? values : undefined}
        onChangeValue={(value) => setvalue(value)}
        onChangeValues={(values) => setvalues(values)}
        onRemove={() => {
          setvalue('')
          setvalues([])
        }}
        style={{ width: 350 }}
      />
    )
  },

  args: {
    options: options,
    placeholder: 'Choose a name'
  },

  name: 'Select'
}

export const SelectSizes: StoryObj<SelectBasicProps> = {
  render: () => {
    return (
      <Box display='flex' flexDirection='column' alignItems='center'>
        <Select
          placeholder='small'
          id='smallSelect'
          value=''
          options={options}
          size='small'
          style={{ width: 350, margin: 20 }}
        />
        <Select
          placeholder='medium'
          id='mediumSelect'
          options={options}
          size='medium'
          style={{ width: 350, margin: 20 }}
        />
        <Select
          placeholder='large'
          id='largeSelect'
          options={options}
          size='large'
          style={{ width: 350, margin: 20 }}
        />
      </Box>
    )
  },

  name: 'All size of the select'
}

export const SelectStates: StoryObj<SelectBasicProps> = {
  render: () => {
    return (
      <Box display='flex' flexDirection='column' alignItems='center'>
        <Select
          placeholder='select with error'
          id='errorSelect'
          options={options}
          error
          errorMessage='A custom error message'
          style={{ width: 350, margin: 20 }}
        />
        <Select
          placeholder='select disabled'
          id='disabledSelect'
          options={options}
          disabled
          style={{ width: 350, margin: 20 }}
        />
      </Box>
    )
  },

  name: 'The select states'
}

export const MultipleSelect: StoryObj<SelectBasicProps> = {
  render: () => {
    const [values, setvalues] = useState([])

    return (
      <Box display='flex' flexDirection='column' alignItems='center'>
        <Select
          placeholder='multiple select'
          id='multpileSelect'
          multiple
          options={options}
          values={values}
          onChangeValues={(values) => setvalues(values)}
          onRemove={() => {
            setvalues([])
          }}
          style={{ width: 350, margin: 20 }}
        />
      </Box>
    )
  },

  name: 'Multiple select'
}
