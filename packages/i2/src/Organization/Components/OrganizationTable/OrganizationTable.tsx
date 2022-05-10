import { Box, Stack, Typography } from '@mui/material'
import { Link, MenuItem, MoreOptions } from '@smartb/g2-components'
import { Option } from '@smartb/g2-forms'
import { Column, Table, TableProps, CellProps } from '@smartb/g2-layout'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useCallback, useMemo, useState } from 'react'
import { Organization } from '../OrganizationFactory'
import {
  OrganizationFilters,
  OrganizationFiltersProps
} from './OrganizationFilters'

export type OrganizationTableFilters = {
  page?: number
} & OrganizationFilters

export type OrganizationTableBlockedFilters = {
  search?: boolean
  role?: boolean
}

export interface OrganizationTableBasicProps extends BasicProps {
  /**
   * The organizations to pe parsed in the table
   */
  organizations: Organization[]
  /**
   * The initial values of the filters
   */
  initialFiltersValues?: OrganizationTableFilters
  /**
   * The filters that will be used in the Api calls but not rendered for the user.
   * by default they are all set to false
   */
  blockedFilters?: OrganizationTableBlockedFilters
  /**
   * The actions place on the top near the filters
   */
  tableActions?: React.ReactNode
  /**
   * The roles options needed to make the roles select.
   * The default role selected in the form will be the first of the list
   */
  rolesOptions?: Option[]
  /**
   * Used for the pagination
   */
  totalPages?: number
  /**
   * The event called when the filters are submitted or when the pagination updates
   */
  onFetchOrganizations: (params?: OrganizationTableFilters) => void
  /**
   * The props passes to the filters component
   */
  filtersProps?: Partial<OrganizationFiltersProps>
  /**
   * The actions available on a organization
   */
  getActions?: (org: Organization) => MenuItem<{}>[]
}

export type OrganizationTableProps = MergeMuiElementProps<
  Omit<TableProps<Organization>, 'columns' | 'data' | 'page' | 'onChangePage'>,
  OrganizationTableBasicProps
>

// TODO Remove code duplicated with UserTable. Ask Adrien for project Tracabois
export const OrganizationTable = (props: OrganizationTableProps) => {
  const {
    organizations,
    initialFiltersValues,
    onFetchOrganizations,
    filtersProps,
    getActions,
    rolesOptions,
    blockedFilters,
    tableActions,
    totalPages,
    ...other
  } = props
  const [page, setPage] = useState(initialFiltersValues?.page ?? 1)
  const [filters, setFilters] = useState<OrganizationFilters | undefined>(
    initialFiltersValues
  )

  const onFetch = useCallback(
    (pageNumber?: number, params?: OrganizationFilters) => {
      onFetchOrganizations({
        page: pageNumber ?? page,
        role: params?.role ?? filters?.role,
        search: params?.search ?? filters?.search
      })
    },
    [onFetchOrganizations, filters, page]
  )

  const onSubmitFilters = useCallback(
    (values: OrganizationFilters) => {
      setFilters(values)
      onFetch(undefined, values)
    },
    [onFetch]
  )

  const onChangePage = useCallback(
    (page: number) => {
      setPage(page)
      onFetch(page)
    },
    [onFetch]
  )

  const columns = useMemo(
    (): Column<Organization>[] => [
      {
        Header: 'Organisation',
        accessor: 'name',
        Cell: ({ row }: CellProps<Organization>) => (
          <Stack
            display='flex'
            justifyContent='space-around'
            alignItems='center'
            direction='row'
          >
            {row.original.image && (
              <Box
                width='50px'
                marginRight='10px'
                sx={{
                  '& .companyImage': {
                    width: '50px',
                    marginTop: '3px',
                    borderRadius: '5px'
                  }
                }}
              >
                <img
                  src={row.original.image}
                  alt={`Le logo de l'entreprise ${row.original.name}`}
                  className='companyImage'
                />
              </Box>
            )}
            <Typography align='left'>{row.original.name}</Typography>
          </Stack>
        )
      },
      {
        Header: 'Adresse',
        accessor: 'address',
        Cell: ({ row }: CellProps<Organization>) =>
          row.original.address ? (
            <Typography>
              {`${row.original.address.street} ${row.original.address.postalCode} ${row.original.address.city}`}
            </Typography>
          ) : undefined
      },
      {
        Header: 'Site web',
        accessor: 'website',
        Cell: ({ row }: CellProps<Organization>) => (
          <Link
            href={row.original.website}
            onClick={(e) => e.stopPropagation()}
          >
            {row.original.website}
          </Link>
        )
      },
      ...(getActions
        ? [
            {
              id: 'moreoptions',
              Cell: ({ row }: CellProps<Organization>) => (
                <MoreOptions
                  options={getActions(row.original)}
                  onClick={(e) => e.stopPropagation()}
                />
              )
            }
          ]
        : [])
    ],
    [getActions]
  )

  return (
    <Box
      sx={{
        '& .AruiTable-root': {
          borderRadius: '5px',
          boxShadow: 1,
          background: 'white',
          marginBottom: '20px'
        }
      }}
    >
      <Table<Organization>
        page={page}
        handlePageChange={onChangePage}
        data={organizations}
        columns={columns}
        totalPages={totalPages}
        variant='grounded'
        header={
          <OrganizationFilters
            onSubmit={onSubmitFilters}
            initialFiltersValues={initialFiltersValues}
            blockedFilters={blockedFilters}
            rolesOptions={rolesOptions}
            tableActions={tableActions}
            {...filtersProps}
          />
        }
        {...other}
      />
    </Box>
  )
}
