import React, { useMemo } from 'react'
import {
  Filters,
  FiltersBasicProps,
  FiltersField,
  FiltersAction
} from './Filters'
import { Meta, StoryFn } from '@storybook/react'
import {
  ArgsTable,
  PRIMARY_STORY,
  Subtitle,
  Primary,
  Description,
  Stories
} from '@storybook/addon-docs'
import LinkTo from '@storybook/addon-links/react'
import { Typography } from '@mui/material'
import {
  ActionDoc,
  FieldDoc,
  FiltersClasses,
  FiltersStyles,
  FiltersState
} from './docs'
import { useFilters } from './useFilters'
import { withDesign } from 'storybook-addon-designs'

export default {
  title: 'Forms/Filters',
  component: Filters,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kgphqh0uVhoXt8TK3LlkGj/G2-%2F-Design-System?node-id=1097%3A177'
    },
    docs: {
      page: () => (
        <>
          <Primary />
          <Description>
            This components is made to display a basic group of filters using
            [Filtersik](https://formik.org/).
          </Description>
          <Description>
            If you want a complexe stack of filters you will have to create it
            by your self. We recommand using [Filtersik](https://formik.org/).
          </Description>
          <ArgsTable story={PRIMARY_STORY} />
          <Subtitle>References</Subtitle>
          <Typography variant='body2' style={{ marginBottom: '5px' }}>
            -{' '}
            <LinkTo kind='Filterss' story='Select'>
              Select
            </LinkTo>
          </Typography>
          <Typography variant='body2' style={{ marginBottom: '5px' }}>
            -{' '}
            <LinkTo kind='Filterss' story='TextField'>
              TextField
            </LinkTo>
          </Typography>
          <Typography variant='body2' style={{ marginBottom: '5px' }}>
            -{' '}
            <LinkTo kind='Filterss' story='DatePicker'>
              DatePicker
            </LinkTo>
          </Typography>
          <Typography variant='body2' style={{ marginBottom: '5px' }}>
            -{' '}
            <LinkTo kind='Filterss' story='CheckBox'>
              CheckBox
            </LinkTo>
          </Typography>
          <Description>
            You have to use the hook `useFilters` that will intialise the
            filtersState and return it to you. The `FiltersState` equal to the
            return type of the hook useFormik.
          </Description>
          <Stories />
        </>
      )
    }
  },
  argTypes: {
    fields: {
      table: {
        type: {
          summary: 'Field[]',
          detail: FieldDoc
        }
      }
    },
    actions: {
      table: {
        type: {
          summary: 'Action[]',
          detail: ActionDoc
        }
      }
    },
    formState: {
      table: {
        type: {
          summary: 'FiltersState',
          detail: FiltersState
        }
      }
    },
    classes: {
      table: {
        type: {
          summary: 'FiltersClasses',
          detail: FiltersClasses
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'FiltersStyles',
          detail: FiltersStyles
        }
      }
    }
  }
} as Meta

export const FiltersStory: StoryFn<FiltersBasicProps> = (
  args: FiltersBasicProps
) => {
  const formState = useFilters({
    fields: args.fields,
    onSubmit: (values) => {
      console.log('submitted')
      console.log(values)
    }
  })

  const actions = useMemo(
    (): FiltersAction[] => [
      {
        label: 'reset',
        key: 'resetFiltersButton',
        variant: 'text',
        onClick: () => formState.resetForm()
      },
      {
        label: 'execute',
        key: 'executeFiltersButton'
      }
    ],
    [formState.resetForm]
  )

  return (
    <Filters
      {...args}
      formState={formState}
      actions={actions}
      actionsPosition='right'
    />
  )
}

const fields: FiltersField[] = [
  {
    key: 'storybook-filters-field-from',
    name: 'from',
    label: 'From',
    type: 'datepicker',
    datePickerProps: { variant: 'outlined' }
  },
  {
    key: 'storybook-filters-field-to',
    name: 'to',
    label: 'To',
    type: 'datepicker',
    datePickerProps: { variant: 'outlined' }
  },
  {
    key: 'storybook-filters-field-keyword',
    name: 'keyword',
    // label: 'Keyword',
    type: 'textfield',
    textFieldProps: {
      textFieldType: 'search',
      variant: 'outlined',
      placeholder: 'Keyword'
    }
  },
  {
    key: 'storybook-filters-field-country',
    name: 'country',
    label: 'Country',
    type: 'select',
    selectProps: {
      options: [
        { key: 'paris', label: 'Paris' },
        { key: 'lyon', label: 'Lyon' },
        { key: 'nice', label: 'Nice' },
        { key: 'marseille', label: 'Marseille' },
        { key: 'montpellier', label: 'Montpellier' }
      ],
      variant: 'outlined'
    }
  }
]

FiltersStory.args = {
  fields: fields
}

FiltersStory.storyName = 'Filters'
