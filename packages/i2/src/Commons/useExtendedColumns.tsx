import React from 'react'
import { MenuItem, MoreOptions } from '@komune-io/g2-components'
import { CellProps, Column } from '@komune-io/g2-layout'
import { useMemo } from 'react'

export interface ExtandedColumnsParams<T extends object> {
  initialColumns: Column<T>[]
  /**
   * The additional columns to add to the table
   */
  additionalColumns?: Column<T>[]
  /**
   * The id or the accessor of the columns you want to block
   */
  blockedColumns?: string[]
  /**
   * The actions available on a organization
   */
  getActions?: (org: T) => MenuItem<{}>[]
}

export const useExtendedColumns = <T extends object>(
  extandParams: ExtandedColumnsParams<T>
) => {
  const {
    initialColumns,
    additionalColumns = [],
    blockedColumns,
    getActions
  } = extandParams
  const columns = useMemo(() => {
    const actions = getActions
      ? [
          {
            id: 'moreoptions',
            Cell: ({ row }: CellProps<T>) => (
              <MoreOptions
                options={getActions(row.original)}
                onClick={(e) => e.stopPropagation()}
              />
            )
          } as Column<T>
        ]
      : []
    const columns: Column<T>[] = [
      ...initialColumns,
      ...additionalColumns,
      ...actions
    ]
    const columnsFiltered = blockedColumns
      ? columns.filter(
          (col) =>
            !blockedColumns.includes(col.id as string) &&
            !blockedColumns.includes(col.accessor as string)
        )
      : columns
    return columnsFiltered
  }, [initialColumns, additionalColumns, blockedColumns, getActions])
  return columns
}
