import React, { useCallback, useEffect } from 'react'
import { request, useAsyncResponse } from 'utils'
import { Organization } from '../OrgCreation/OrgCreation'
import { OrgTable } from './OrgTable'

export interface AutomatedOrgTableProps {
  apiUrl: string
  jwt?: string
  initialFiltersValues?: { search?: string; page?: number }
}

export const AutomatedOrgTable = (props: AutomatedOrgTableProps) => {
  const { apiUrl, jwt, initialFiltersValues } = props

  const getOrganizations = useCallback(
    async (params?: { page?: number; search?: string }) => {
      return request<Organization[]>({
        url: `${apiUrl}/getOrganizations`,
        method: 'POST',
        body: JSON.stringify(params),
        jwt: jwt
      })
    },
    [apiUrl, jwt]
  )

  const { result, status, execute } = useAsyncResponse(getOrganizations, false)

  useEffect(() => {
    execute(initialFiltersValues)
  }, [execute, initialFiltersValues])

  const onFetchOrganizations = useCallback(
    (page: number, search?: string | undefined) => {
      execute({ page: page, search: search })
    },
    [execute]
  )

  return (
    <OrgTable
      isLoading={status !== 'SUCCESS'}
      organizations={result ?? []}
      onFetchOrganizations={onFetchOrganizations}
    />
  )
}
