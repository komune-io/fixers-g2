import { StoryObj, Meta } from '@storybook/react'
import { useState } from 'react'
import { FilterTextField, FilterTextFieldProps } from './FilterTextField'
import { FilterTextFieldClasses, FilterTextFieldStyles } from './docs'
import { Box, Typography } from '@mui/material'
import { CreditCard } from '@mui/icons-material'

export default {
  title: 'Forms/FilterTextField',
  component: FilterTextField,

  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Nl4422AUGHNVClZOHzPg8/SmartB-UI-kit?node-id=210%3A45'
    }
  },
  argTypes: {
    classes: {
      table: {
        type: {
          summary: 'FilterTextFieldClasses',
          detail: FilterTextFieldClasses
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'FilterTextFieldStyles',
          detail: FilterTextFieldStyles
        }
      }
    }
  }
} as Meta<typeof FilterTextField>

export const FilterTextFieldStory: StoryObj<FilterTextFieldProps> = {
  render: (args: FilterTextFieldProps) => {
    const [value, setValue] = useState('')
    return (
      <FilterTextField
        value={value}
        onChange={setValue}
        onRemove={() => setValue('')}
        textFieldType='search'
        {...args}
      />
    )
  },

  args: {
    label: 'A Filter'
  },

  name: 'FilterTextField'
}

export const FilterTextFieldVariants: StoryObj<FilterTextFieldProps> = {
  render: () => {
    return (
      <Box display='flex' justifyContent='space-around' alignItems='center'>
        <Box display='flex' flexDirection='column' alignItems='center'>
          <FilterTextField
            label='Primary outlined'
            color='primary'
            variant='outlined'
            style={{ margin: 20, width: '180px' }}
          />
          <FilterTextField
            label='Secondary outlined'
            color='secondary'
            variant='outlined'
            style={{ margin: 20, width: '180px' }}
          />
          <FilterTextField
            label='Default outlined'
            color='default'
            variant='outlined'
            style={{ margin: 20, width: '180px' }}
          />
        </Box>
        <Box display='flex' flexDirection='column' alignItems='center'>
          <FilterTextField
            label='Primary filled'
            color='primary'
            variant='filled'
            style={{ margin: 20, width: '180px' }}
          />
          <FilterTextField
            label='Secondary filled'
            color='secondary'
            variant='filled'
            style={{ margin: 20, width: '180px' }}
          />
          <FilterTextField
            label='Default filled'
            color='default'
            variant='filled'
            style={{ margin: 20, width: '180px' }}
          />
        </Box>
      </Box>
    )
  },

  name: 'All the variants of the FilterTextField'
}

export const FilterTextFieldStates: StoryObj<FilterTextFieldProps> = {
  render: () => {
    return (
      <Box display='flex' flexDirection='column' alignItems='center'>
        <FilterTextField
          label='outlined disabled'
          variant='outlined'
          disabled
          style={{ width: 170, margin: 20 }}
        />
        <FilterTextField
          label='filled disabled'
          variant='filled'
          disabled
          style={{ width: 170, margin: 20 }}
        />
      </Box>
    )
  },

  name: 'The FilterTextField states'
}

export const SerchFilterTextField: StoryObj<FilterTextFieldProps> = {
  render: () => {
    const [value, setValue] = useState('')
    const [search, setSearch] = useState(undefined)

    return (
      <Box display='flex' flexDirection='column' alignItems='center'>
        <FilterTextField
          label='Search filter'
          value={value}
          color='secondary'
          onChange={(value) => setValue(value)}
          onSearch={() => setSearch(value)}
          onRemove={() => setValue('')}
          id='searchFilterTextField'
          textFieldType='search'
          style={{ margin: 20, width: 150 }}
        />
        <FilterTextField
          label='Search filter'
          value={value}
          variant='outlined'
          onChange={(value) => setValue(value)}
          onSearch={() => setSearch(value)}
          onRemove={() => setValue('')}
          id='searchFilterTextField'
          textFieldType='search'
          style={{ margin: 20, width: 150 }}
        />
        {search && <Typography>You searched: {search}</Typography>}
      </Box>
    )
  },

  name: 'The search type FilterTextField'
}

export const CustomIcon: StoryObj<FilterTextFieldProps> = {
  render: () => {
    return (
      <Box display='flex' flexDirection='column' alignItems='center'>
        <FilterTextField
          inputIcon={<CreditCard />}
          id='creditFilterTextField'
          color='secondary'
          label='Credit card'
          style={{ width: 150, margin: 20 }}
        />
        <FilterTextField
          inputIcon={'€'}
          iconPosition='end'
          label='The price'
          id='paymentFilterTextField'
          style={{ width: 150, margin: 20 }}
        />
      </Box>
    )
  },

  name: 'FilterTextFields with custom icon'
}
