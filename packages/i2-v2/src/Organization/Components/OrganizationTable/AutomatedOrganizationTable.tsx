import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useState } from 'react'
import { OrganizationTable, OrganizationTableProps } from './OrganizationTable'
import { useGetOrganizations, GetOrganizationsOptions } from '../../Api'
import { i2Config, useAuth } from '@smartb/g2-providers'
import { Organization } from '../../Domain'
import {
  useOrganizationTableState,
  useOrganizationTableStateParams
} from './useOrganizationTableState'

export interface AutomatedOrganizationTableBasicProps<T extends Organization>
  extends BasicProps {
  /**
   * The getOrganizations hook options
   */
  getOrganizationsOptions?: GetOrganizationsOptions<T>
  /**
   * Pass the current state of the filters
   */
  filters?: any
  /**
   * Override the default local page state
   */
  page?: number
  /**
   * the event called when the page changes
   */
  setPage?: (newPage: number) => void
  /**
   * the table state params
   */
  tableStateParams?: Partial<useOrganizationTableStateParams<T>>
}

export type AutomatedOrganizationTableProps<
  T extends Organization = Organization
> = MergeMuiElementProps<
  Omit<
    OrganizationTableProps<T> & useOrganizationTableStateParams<T>,
    | 'organizations'
    | 'onFetchOrganizations'
    | 'totalPages'
    | 'page'
    | 'setPage'
    | 'tableState'
  >,
  AutomatedOrganizationTableBasicProps<T>
>

export const AutomatedOrganizationTable = <
  T extends Organization = Organization
>(
  props: AutomatedOrganizationTableProps<T>
) => {
  const {
    filters,
    getOrganizationsOptions,
    page,
    setPage,
    tableStateParams,
    ...other
  } = props

  const [localPage, localSetPage] = useState<number>(1)
  const { keycloak } = useAuth()

  const getOrganizations = useGetOrganizations<T>({
    apiUrl: i2Config().orgUrl,
    jwt: keycloak.token,
    queryParams: {
      page: localPage - 1,
      ...filters
    },
    options: getOrganizationsOptions
  })

  const tableState = useOrganizationTableState<T>({
    organizations: getOrganizations.data?.items ?? [],
    ...tableStateParams
  })

  return (
    <OrganizationTable<T>
      isLoading={!getOrganizations.isSuccess}
      tableState={tableState}
      totalPages={
        getOrganizations.data?.total && getOrganizations.data?.total > 1
          ? getOrganizations.data?.total
          : undefined
      }
      page={page ?? localPage}
      setPage={setPage ?? localSetPage}
      {...other}
    />
  )
}
