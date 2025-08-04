import { useCallback, useEffect, useMemo } from 'react'
import { StoryObj, Meta } from '@storybook/react-vite'
import {
  ArgTypes,
  PRIMARY_STORY,
  Primary,
  Description,
  Stories
} from '@storybook/addon-docs/blocks'
import {
  FiltersComposableBasicProps,
  FiltersComposable
} from './FiltersComposable'
import { useFiltersComposable, FilterComposableField } from './.'
import { Action, Button } from '@komune-io/g2-components'
import {
  Router as AruiRouter,
  AppProvider as AruiAppProvider
} from '@komune-io/g2-providers'
import { Typography } from '@mui/material'
import { Route } from 'react-router-dom'
import { QueryClient } from '@tanstack/react-query'
import { ArrowRightAltRounded, SortByAlphaRounded } from '@mui/icons-material'

export default {
  title: 'Composable/FiltersComposable',
  component: FiltersComposable,
  parameters: {
    docs: {
      page: () => (
        <>
          <Primary />
          <Description>
            This components is made to display a simple form using
            [Formik](https://formik.org/).
          </Description>
          <ArgTypes of={PRIMARY_STORY} />
          <Stories />
        </>
      )
    }
  }
} as Meta<typeof FiltersComposable>

const queryClient = new QueryClient()

const fields: FilterComposableField[] = [
  {
    name: 'from',
    label: 'From',
    type: 'datePicker'
  },
  {
    name: 'to',
    label: 'To',
    type: 'datePicker'
  },
  {
    name: 'spacer',
    type: 'spacer'
  },
  {
    name: 'keyword',
    label: 'Keyword',
    type: 'textField',
    params: { textFieldType: 'search' },
    mandatory: true
  },
  {
    name: 'country',
    label: 'Country',
    type: 'select',
    params: {
      multiple: true,
      options: [
        { key: 'paris', label: 'Paris' },
        { key: 'lyon', label: 'Lyon' },
        { key: 'nice', label: 'Nice' },
        { key: 'marseille', label: 'Marseille' },
        { key: 'montpellier', label: 'Montpellier' }
      ]
    }
  },
  {
    name: 'countries',
    label: 'Countries',
    type: 'select',
    params: {
      multiple: true,
      displaySelected: true,
      options: [
        { key: 'paris', label: 'Paris' },
        { key: 'lyon', label: 'Lyon' },
        { key: 'nice', label: 'Nice' },
        { key: 'marseille', label: 'Marseille' },
        { key: 'montpellier', label: 'Montpellier' }
      ]
    }
  }
]

export const FiltersStory: StoryObj<FiltersComposableBasicProps<any>> = {
  render: (args: FiltersComposableBasicProps<any>) => {
    interface Languages {
      fr: string
      en: string
    }

    const languages: Languages = {
      fr: 'fr-FR',
      en: 'en-US'
    }

    return (
      <AruiAppProvider<Languages>
        languages={languages}
        loadingComponent={<Typography>Loading ...</Typography>}
        queryClient={queryClient}
      >
        <Router {...args} />
      </AruiAppProvider>
    )
  },

  args: {
    fields: fields
  },

  name: 'Filters'
}

const Router = (props) => {
  return (
    <AruiRouter>
      <Route
        path='/iframe.html'
        key='home'
        element={<Example {...props} />}
      ></Route>
    </AruiRouter>
  )
}

const Example = (args: any) => {
  const onSubmit = useCallback((values: any, submittedFilters: any) => {
    if (values.page === submittedFilters.page) return { ...values, page: 0 }
  }, [])
  const { formState, setAdditionalFilter, submittedFilters, emptyFilters } =
    useFiltersComposable({
      onSubmit,
      formikConfig: {
        initialValues: {
          page: 0
        }
      }
    })

  const incrementPage = useCallback(() => {
    setAdditionalFilter('page', submittedFilters.page + 1)
  }, [submittedFilters.page, setAdditionalFilter])

  const actions = useMemo(
    (): Action[] => [
      {
        label: 'reset',
        key: 'resetFiltersButton',
        variant: 'text',
        onClick: () => {
          emptyFilters({ page: submittedFilters.page })
        }
      },
      {
        label: 'execute',
        key: 'executeFiltersButton'
      }
    ],
    [emptyFilters, submittedFilters.page]
  )

  useEffect(() => {
    console.log(submittedFilters)
  }, [submittedFilters])

  return (
    <>
      <FiltersComposable
        {...args}
        filterStyleProps={{ color: 'default', variant: 'filled' }}
        formState={formState}
        actions={actions}
        sortField={{
          name: 'sort',
          type: 'select',
          label: 'Sort',
          params: {
            startAdornment: <SortByAlphaRounded fontSize='small' />,
            displaySelected: true,
            options: [
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
          }
        }}
      />
      <Typography>{`current page: ${submittedFilters.page + 1}`}</Typography>
      <Button onClick={incrementPage}>+1 to page</Button>
    </>
  )
}
