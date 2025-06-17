import { getIn } from '@komune-io/g2-utils'
import { basicColumns, ComposableColumns } from '../ColumnFactory'
import { G2ColumnDef, UseTableOptions } from '../TableV2'
import React, { FunctionComponent } from 'react'

export interface TableComposable<
  Data extends {} = {},
  ExtendingColumns extends Record<string, FunctionComponent> = {}
> extends Omit<UseTableOptions<Data>, 'columns' | 'data'> {
  id?: string
  label?: string
  columns: ComposableColumn<ExtendingColumns>[]
}

export interface ComposableColumnBase {
  label?: string
  value?: string | Record<string, string>
  className?: string
  style?: React.CSSProperties
}

export type ComposableColumn<
  ExtendingColumns extends Record<string, FunctionComponent>
> = ComposableColumnBase &
  ComposableColumns<ExtendingColumns & typeof basicColumns>

export const composableToColumns = <
  Data extends {} = {},
  ExtendingColumns extends Record<string, FunctionComponent> = {}
>(
  table: TableComposable<Data, ExtendingColumns>,
  extendingColumns?: ExtendingColumns
): G2ColumnDef<Data>[] => {
  const generators = {
    ...basicColumns,
    ...(extendingColumns ?? {})
  }

  return table.columns.map((column) => {
    const Component = generators[column.type as keyof typeof generators]
    if (!Component) {
      throw new Error(
        `Column type "${column.type.toString()}" is not supported`
      )
    }
    const columnDef: G2ColumnDef<Data> = {
      id: column.value ? JSON.stringify(column.value) : column.type.toString(),
      header: column.label,
      cell: ({ row }) => {
        let value: any = undefined
        const path = column.value

        if (typeof path === 'string') {
          value = getIn(row.original, path)
        } else if (typeof path === 'object' && Object.keys(path).length > 0) {
          value = Object.keys(path).reduce((acc, key) => {
            acc[key] = getIn(row.original, path[key])
            return acc
          }, {})
        }
        const props: any = {
          ...column.properties,
          value
        }
        return <Component {...props} />
      }
    }
    return columnDef
  })
}
