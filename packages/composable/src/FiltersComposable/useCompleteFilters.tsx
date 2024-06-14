import {
  FilterComposableField,
  useFiltersComposable,
  FiltersComposable
} from '@komune-io/g2'
import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FiltersComposableProps } from './FiltersComposable'

export interface OffsetPagination {
  offset: number
  limit: number
}

export const defaultOffset: OffsetPagination = {
  limit: 10,
  offset: 0
}

export interface useCompleteFiltersParams
  extends Omit<FiltersComposableProps, 'formState' | 'fields'> {
  /**
   * the filters fields
   */
  filters: FilterComposableField[]
  /**
   * add the offset pagination state to the filters state
   * @default true
   */
  withPage?: boolean
  /**
   * The initial values of the filters
   */
  initialValues?: any
  /**
   * The default state to the offset pagination
   */
  defaultOffset?: OffsetPagination
}

export const useCompleteFilters = <T extends {} = any>(
  params: useCompleteFiltersParams
) => {
  const { filters, withPage = true, actions, initialValues, ...other } = params
  const { t } = useTranslation()
  const onSubmit = useCallback((values: any, submittedFilters: any) => {
    const pagination = withPage ? defaultOffset : undefined
    if (values.offset === submittedFilters.offset)
      return { ...values, ...pagination }
  }, [])
  const { filtersCount, formState, submittedFilters, setAdditionalFilter } =
    useFiltersComposable<T & OffsetPagination>({
      onSubmit: onSubmit,
      formikConfig: {
        initialValues: {
          ...(withPage
            ? {
                offset: 0,
                limit: 10
              }
            : undefined),
          ...initialValues
        }
      }
    })

  const setOffset = useCallback(
    (newPage: OffsetPagination) => {
      setAdditionalFilter('offset', newPage.offset)
      setAdditionalFilter('limit', newPage.limit)
    },
    [setAdditionalFilter]
  )

  const component = useMemo(
    () => (
      <FiltersComposable
        formState={formState}
        filterButtonProps={{
          children: t('toFilterCount', {
            count: withPage ? filtersCount - 2 : filtersCount
          })
        }}
        fields={filters}
        filterStyleProps={{ color: 'default', variant: 'outlined' }}
        style={{
          width: '100%'
        }}
        responsiveFiltersProps={{
          drawerTitle: t('toFilter') as string,
          applyString: t('apply') as string,
          clearString: t('clearFilters') as string
        }}
        {...other}
      />
    ),
    [formState, filters, filtersCount, t, ...Object.values(other)]
  )

  return {
    component: component,
    submittedFilters,
    setOffset
  }
}
