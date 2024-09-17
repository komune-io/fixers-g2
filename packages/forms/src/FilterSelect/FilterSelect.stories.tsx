import React, { useState } from 'react'
import { FilterSelect, FilterSelectBasicProps } from './FilterSelect'
import { Option, SmartKey } from '../Select'
import { Meta, StoryFn } from '@storybook/react'
import { Box } from '@mui/material'
import { FilterSelectClasses, FilterSelectStyles } from './docs'

import { ArrowRightAltRounded, SortByAlphaRounded } from '@mui/icons-material'

export default {
  title: 'Forms/FilterSelect',
  component: FilterSelect,

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
          summary: 'FilterSelectClasses',
          detail: FilterSelectClasses
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'FilterSelectStyles',
          detail: FilterSelectStyles
        }
      }
    }
  }
} as Meta<typeof FilterSelect>

export const FilterSelectStory: StoryFn<FilterSelectBasicProps> = (
  args: FilterSelectBasicProps
) => {
  const [value, setValue] = useState<SmartKey>('')
  const [values, setValues] = useState<SmartKey[]>([])
  return (
    <FilterSelect
      options={[]}
      {...args}
      value={args.multiple ? undefined : value}
      values={args.multiple ? values : undefined}
      onChangeValue={(value) =>
        setValue((oldValue) => (oldValue === value ? '' : value))
      }
      onChangeValues={(values) => setValues(values)}
      onRemove={() => {
        setValue('')
        setValues([])
      }}
    />
  )
}

export const FilterSelectSizes: StoryFn<FilterSelectBasicProps> = (
  args: Partial<FilterSelectBasicProps>
) => {
  const [value, setvalue] = useState<SmartKey>()
  const [values, setvalues] = useState<SmartKey[]>()
  return (
    <Box display='flex' justifyContent='space-around' alignItems='center'>
      <Box display='flex' flexDirection='column' alignItems='center'>
        <FilterSelect
          {...args}
          label='Primary outlined'
          color='primary'
          variant='outlined'
          value={value}
          onChangeValue={(value) =>
            setvalue((oldValue) => (oldValue === value ? '' : value))
          }
          values={values}
          onChangeValues={(values) => setvalues(values)}
          onRemove={() => {
            setvalue('')
          }}
          options={options}
          style={{ margin: 20, width: '200px' }}
        />
        <FilterSelect
          {...args}
          label='Secondary outlined'
          color='secondary'
          variant='outlined'
          value={value}
          onChangeValue={(value) =>
            setvalue((oldValue) => (oldValue === value ? '' : value))
          }
          values={values}
          onChangeValues={(values) => setvalues(values)}
          onRemove={() => {
            setvalue('')
          }}
          options={options}
          style={{ margin: 20, width: '200px' }}
        />
        <FilterSelect
          {...args}
          label='Default outlined'
          color='default'
          variant='outlined'
          value={value}
          onChangeValue={(value) =>
            setvalue((oldValue) => (oldValue === value ? '' : value))
          }
          values={values}
          onChangeValues={(values) => setvalues(values)}
          onRemove={() => {
            setvalue('')
          }}
          options={options}
          style={{ margin: 20, width: '200px' }}
        />
      </Box>
      <Box display='flex' flexDirection='column' alignItems='center'>
        <FilterSelect
          {...args}
          label='Primary filled'
          color='primary'
          variant='filled'
          value={value}
          onChangeValue={(value) =>
            setvalue((oldValue) => (oldValue === value ? '' : value))
          }
          values={values}
          onChangeValues={(values) => setvalues(values)}
          onRemove={() => {
            setvalue('')
          }}
          options={options}
          style={{ margin: 20, width: '200px' }}
        />
        <FilterSelect
          {...args}
          label='Secondary filled'
          color='secondary'
          variant='filled'
          value={value}
          onChangeValue={(value) =>
            setvalue((oldValue) => (oldValue === value ? '' : value))
          }
          values={values}
          onChangeValues={(values) => setvalues(values)}
          onRemove={() => {
            setvalue('')
          }}
          options={options}
          style={{ margin: 20, width: '200px' }}
        />
        <FilterSelect
          {...args}
          label='Default filled'
          color='default'
          variant='filled'
          value={value}
          onChangeValue={(value) =>
            setvalue((oldValue) => (oldValue === value ? '' : value))
          }
          values={values}
          onChangeValues={(values) => setvalues(values)}
          onRemove={() => {
            setvalue('')
          }}
          options={options}
          style={{ margin: 20, width: '200px' }}
        />
      </Box>
    </Box>
  )
}

export const FilterSelectStates: StoryFn<FilterSelectBasicProps> = () => {
  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <FilterSelect
        label='outlined disabled'
        variant='outlined'
        disabled
        options={options}
        style={{ width: 170, margin: 20 }}
      />
      <FilterSelect
        label='filled disabled'
        variant='filled'
        options={options}
        disabled
        style={{ width: 170, margin: 20 }}
      />
    </Box>
  )
}

export const MultipleFilterSelect: StoryFn<FilterSelectBasicProps> = () => {
  const [values, setvalues] = useState<string[]>([])

  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <FilterSelect
        label='multiple select'
        multiple
        options={options}
        values={values}
        onChangeValues={(values) => setvalues(values.map((v) => v.toString()))}
        onRemove={() => {
          setvalues([])
        }}
      />
    </Box>
  )
}

export const MultipleFilterSelectDisplaySelected: StoryFn<
  FilterSelectBasicProps
> = () => {
  const [values, setvalues] = useState<SmartKey[]>([])

  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <FilterSelect
        label='multiple select'
        multiple
        options={options}
        values={values}
        onChangeValues={(values) => setvalues(values)}
        displaySelected
        onRemove={() => {
          setvalues([])
        }}
      />
    </Box>
  )
}

export const SortSelect: StoryFn<FilterSelectBasicProps> = () => {
  const [value, setvalue] = useState<SmartKey>('')

  const options: Option[] = [
    {
      key: 'ascDate',
      label: 'Date',
      icon: (
        <ArrowRightAltRounded
          fontSize='small'
          sx={{ transform: 'rotate(-90deg)' }}
        />
      )
    },
    {
      key: 'descDate',
      label: 'Date',
      icon: (
        <ArrowRightAltRounded
          fontSize='small'
          sx={{ transform: 'rotate(90deg)' }}
        />
      )
    },
    {
      key: 'ascPrice',
      label: 'Price',
      icon: (
        <ArrowRightAltRounded
          fontSize='small'
          sx={{ transform: 'rotate(-90deg)' }}
        />
      )
    },
    {
      key: 'descPrice',
      label: 'Price',
      icon: (
        <ArrowRightAltRounded
          fontSize='small'
          sx={{ transform: 'rotate(90deg)' }}
        />
      )
    }
  ]

  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <FilterSelect
        color='default'
        variant='outlined'
        label='sort select'
        options={options}
        value={value}
        onChangeValue={setvalue}
        onRemove={() => {
          setvalue('')
        }}
        startAdornment={<SortByAlphaRounded fontSize='small' />}
        displaySelected
      />
    </Box>
  )
}

const options: Option[] = [
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

FilterSelectStory.args = {
  options: options,
  label: 'A filter'
}

FilterSelectStory.storyName = 'FilterSelect'
FilterSelectSizes.storyName = 'All the select variants'
FilterSelectStates.storyName = 'The select states'
MultipleFilterSelect.storyName = 'Multiple select'
MultipleFilterSelectDisplaySelected.storyName =
  'Multiple select Display Selected'

export const VariantsMultipleSelectDisplaySelected: StoryFn<FilterSelectBasicProps> =
  FilterSelectSizes.bind({})
VariantsMultipleSelectDisplaySelected.args = {
  displaySelected: true,
  multiple: true
}
VariantsMultipleSelectDisplaySelected.storyName =
  'Variants Multiple select Display Selected'
