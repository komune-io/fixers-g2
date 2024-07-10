import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FiltersComposable, FiltersComposableProps } from './FiltersComposable'
import { FormikFormParams, useFiltersComposable } from './useFiltersComposable'
import { FilterComposableField } from './type'

export interface OffsetPagination {
  offset: number
  limit: number
}

export const initDefaultOffset: OffsetPagination = {
  limit: 10,
  offset: 0
}

export interface useCompleteFiltersParams<T>
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
  useFiltersParams?: FormikFormParams<T>
  /**
   * The default state to the offset pagination
   */
  defaultOffset?: OffsetPagination
}

export const useCompleteFilters = <T extends {} = any>(
  params: useCompleteFiltersParams<T>
) => {
  const {
    filters,
    withPage = true,
    actions,
    useFiltersParams,
    defaultOffset,
    ...other
  } = params
  const { t } = useTranslation()

  const onSubmit = useCallback(
    (values: any, submittedFilters: any) => {
      const pagination = withPage
        ? defaultOffset ?? initDefaultOffset
        : undefined
      if (values.offset === submittedFilters.offset)
        return { ...values, ...pagination }
    },
    [defaultOffset]
  )

  const { filtersCount, formState, submittedFilters, setAdditionalFilter } =
    useFiltersComposable<T & OffsetPagination>({
      ...useFiltersParams,
      onSubmit: onSubmit,
      ...useFiltersParams?.formikConfig,
      formikConfig: {
        initialValues: {
          ...(withPage ? defaultOffset ?? initDefaultOffset : undefined),
          ...useFiltersParams?.formikConfig?.initialValues
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
    setOffset,
    setAdditionalFilter,
    formState,
    filtersCount
  }
}
