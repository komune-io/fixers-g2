import { Avatar, Box, Stack, Typography } from '@mui/material'
import { Link, MenuItem, MoreOptions } from '@smartb/g2-components'
import { Column, Table, TableProps, CellProps } from '@smartb/g2-layout'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import React, { useCallback, useMemo, useState } from 'react'
import {
  UserFilters,
  UserFiltersProps,
  UserFiltersStrings
} from './UserFilters'
import { stringToAvatarAttributs } from '@smartb/g2-utils'
import { User } from '../../Domain'
import { Option } from '@smartb/g2-forms'
import { OrganizationId, OrganizationRef } from '../../../Organization'

export type UserTableFilters = {
  page?: number
} & UserFilters

export type UserTableBlockedFilters = {
  search?: boolean
  organizationId?: boolean
  role?: boolean
}

export interface UserTableStrings {
  /**
   * @default "Utilisateur"
   */
  user?: string
  /**
   * @default "Adresse"
   */
  adress?: string
  /**
   * @default "Email"
   */
  email?: string
  /**
   * @default "Oganisation"
   */
  organization?: string
  filters: UserFiltersStrings
}

export interface UserTableBasicProps extends BasicProps {
  /**
   * The user to pe parsed in the table
   */
  users: User[]
  /**
   * The initial values of the filters
   */
  initialFiltersValues?: UserTableFilters
  /**
   * The filters that will be used in the Api calls but not rendered for the user.
   * by default they are all set to false
   */
  blockedFilters?: UserTableBlockedFilters
  /**
   * The organizationRefs are essentials for the filter organizations
   */
  organizationsRefs?: OrganizationRef[]
  /**
   * The roles options needed to make the roles select.
   * The default role selected in the form will be the first of the list
   */
  rolesOptions?: Option[]
  /**
   * The actions place on the top near the filters
   */
  tableActions?: React.ReactNode
  /**
   * The event called when the filters are submitted or when the pagination updates
   */
  onFiltersChanged: (params?: UserTableFilters) => void
  /**
   * Used for the pagination
   */
  totalPages?: number
  /**
   * The props passes to the filters component
   */
  filtersProps?: Partial<UserFiltersProps>
  /**
   * The actions available on a user
   */
  getActions?: (user: User) => MenuItem<{}>[]
  /**
   * If you want the columns organization to contain links redirecting to the organization page provide this prop
   */
  getOrganizationUrl?: (organizationId: OrganizationId) => string
  /**
   * Force the display of the organization over the user list (if the first user of the list has no organization)
   *
   * @default false
   */
  hasOrganizations?: boolean
  /**
   * The prop to use to add custom translation to the component
   */
  strings?: UserTableStrings
}

export type UserTableProps = MergeMuiElementProps<
  Omit<TableProps<User>, 'columns' | 'data' | 'page' | 'onChangePage'>,
  UserTableBasicProps
>

// TODO Remove code duplicated with UserTable. Ask Adrien for project Tracabois
export const UserTable = (props: UserTableProps) => {
  const {
    users,
    initialFiltersValues,
    onFiltersChanged,
    filtersProps,
    getActions,
    getOrganizationUrl,
    organizationsRefs,
    blockedFilters,
    rolesOptions,
    tableActions,
    totalPages,
    strings,
    hasOrganizations = false,
    ...other
  } = props
  const [page, setPage] = useState(initialFiltersValues?.page ?? 1)
  const [filters, setFilters] = useState<UserFilters | undefined>(
    initialFiltersValues
  )

  const onFetch = useCallback(
    (
      pageNumber?: number,
      search?: string,
      organizationId?: OrganizationId,
      role?: string
    ) => {
      onFiltersChanged({
        page: pageNumber ?? page,
        search: search ?? filters?.search,
        organizationId: organizationId ?? filters?.organizationId,
        role: role ?? filters?.role
      })
    },
    [onFiltersChanged, filters, page]
  )

  const onSubmitFilters = useCallback(
    (values: UserFilters) => {
      setFilters(values)
      onFetch(undefined, values.search, values.organizationId, values.role)
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
    (): Column<User>[] => [
      {
        Header: strings?.user ?? 'Utilisateur',
        accessor: 'givenName',
        Cell: ({ row }: CellProps<User>) => {
          const attr = stringToAvatarAttributs(
            `${row.original.givenName} ${row.original.familyName}`
          )
          return (
            <Stack
              display='flex'
              justifyContent='flex-start'
              alignItems='center'
              direction='row'
            >
              <Avatar
                sx={{
                  bgcolor: attr.color,
                  marginRight: '10px'
                }}
              >
                {attr.label}
              </Avatar>
              <Stack>
                <Typography align='left'>{row.original.givenName}</Typography>
                <Typography align='left'>{row.original.familyName}</Typography>
              </Stack>
            </Stack>
          )
        },
        maxWidth: 220,
        width: 170
      },
      {
        Header: strings?.adress ?? 'Adresse',
        accessor: 'address',
        Cell: ({ row }: CellProps<User>) =>
          row.original.address ? (
            <Typography>
              {`${row.original.address.street} ${row.original.address.postalCode} ${row.original.address.city}`}
            </Typography>
          ) : undefined,
        width: 200
      },
      {
        Header: strings?.email ?? 'Email',
        accessor: 'email',
        Cell: ({ row }: CellProps<User>) => (
          <Typography>{row.original.email}</Typography>
        ),
        width: 250
      },
      ...((!!users[0] && !!users[0].memberOf) || hasOrganizations
        ? [
            {
              Header: strings?.organization ?? 'Organisation',
              accessor: 'memberOf',
              Cell: ({ row }: CellProps<User>) => {
                if (!!getOrganizationUrl && row.original.memberOf?.id) {
                  return (
                    <Link
                      href={getOrganizationUrl(row.original.memberOf?.id)}
                      target='_blank'
                      onClick={(e) => e.stopPropagation()}
                    >
                      {row.original.memberOf?.name}
                    </Link>
                  )
                }
                return <Typography>{row.original.memberOf?.name}</Typography>
              },
              width: 150
            } as Column<User>
          ]
        : []),
      ...(getActions
        ? [
            {
              id: 'moreoptions',
              Cell: ({ row }: CellProps<User>) => (
                <MoreOptions
                  options={getActions(row.original)}
                  onClick={(e) => e.stopPropagation()}
                />
              )
            }
          ]
        : [])
    ],
    [getActions, getOrganizationUrl, strings, hasOrganizations]
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
      <Table<User>
        page={page}
        handlePageChange={onChangePage}
        totalPages={totalPages}
        data={users}
        columns={columns}
        variant='grounded'
        header={
          <UserFilters
            organizationsRefs={organizationsRefs}
            onSubmit={onSubmitFilters}
            initialFiltersValues={initialFiltersValues}
            blockedFilters={blockedFilters}
            rolesOptions={rolesOptions}
            tableActions={tableActions}
            strings={strings?.filters}
            {...filtersProps}
          />
        }
        {...other}
      />
    </Box>
  )
}
