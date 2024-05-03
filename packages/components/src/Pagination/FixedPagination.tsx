import { Skeleton, Stack, Typography } from '@mui/material'
import { useRef } from 'react'
import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Pagination } from './Pagination'

export interface PageQueryResult {
  total: number
  pagination?: OffsetPagination
}

export interface OffsetPagination {
  offset: number
  limit: number
}

export type FixedPaginationProps = {
  page?: PageQueryResult
  pagination: OffsetPagination
  onOffsetChange?: (newPage: OffsetPagination) => void
  isLoading?: boolean
  leftElement?: React.ReactNode
  middleElement?: React.ReactNode
}

export const FixedPagination = (props: FixedPaginationProps) => {
  const {
    pagination,
    page,
    onOffsetChange,
    isLoading,
    leftElement,
    middleElement
  } = props

  const { t } = useTranslation()
  const totalItems = useRef<number | undefined>(undefined)

  const currentPage: number = useMemo(() => {
    return pagination?.offset / pagination.limit + 1
  }, [pagination])

  const total = useMemo(() => {
    if (page?.total && totalItems.current !== page.total)
      totalItems.current = page.total
    return {
      page: totalItems.current
        ? Math.floor((totalItems.current - 1) / pagination.limit) + 1
        : undefined,
      items: totalItems.current
    }
  }, [page?.total, pagination.limit])

  const handlePageChange = useCallback(
    (pageNumber: number) => {
      const limit = pagination.limit
      const offset = (pageNumber - 1) * limit
      onOffsetChange && onOffsetChange({ offset: offset, limit: limit })
    },
    [pagination.limit, onOffsetChange]
  )

  const totalItemLabel = useMemo(() => {
    const start = pagination.offset + 1
    const end = Math.min(
      pagination.offset + pagination.limit,
      total.items ?? pagination.offset + pagination.limit
    )
    const totalItems = total.items
    return t('totalItem', { start: start, end: end, totalItems: totalItems })
  }, [pagination, total])

  return (
    <Stack
      direction='row'
      alignItems='center'
      alignContent='center'
      sx={{
        background: (theme) => theme.palette.background.default + '99',
        backdropFilter: 'blur(15px)',
        zIndex: 10,
        padding: '16px 24px',
        position: 'fixed',
        bottom: '0px',
        left: '0px',
        width: '100vw',
        borderTop: '1px solid #E0E0E0',
        '& .AruiPagination-root': {
          margin: 'unset'
        }
      }}
    >
      {leftElement ?? <div style={{ flexGrow: 1, flexBasis: 0 }} />}
      {middleElement ?? <div style={{ flexGrow: 1, flexBasis: 0 }} />}
      <Stack
        direction='row'
        gap={2}
        alignItems='center'
        justifyContent='flex-end'
        sx={{
          flexGrow: 1,
          flexBasis: 0
        }}
      >
        {isLoading && !total.page && (
          <Skeleton
            sx={{
              width: '200px',
              height: '100%',
              transform: 'none'
            }}
            animation='wave'
            variant='text'
          />
        )}
        {total.page && (
          <>
            <Typography color='text.secondary' variant='caption'>
              {totalItemLabel}
            </Typography>
            <Pagination
              onPageChange={handlePageChange}
              page={currentPage}
              totalPage={total.page}
              siblingCount={1}
            />
          </>
        )}
      </Stack>
    </Stack>
  )
}
