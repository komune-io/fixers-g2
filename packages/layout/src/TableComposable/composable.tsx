import { getIn } from '@komune-io/g2-utils'
import { basicColumns, ComposableColumns } from '../ColumnFactory'
import { ColumnBase, G2ColumnDef, UseTableOptions } from '../TableV2'
import { FunctionComponent } from 'react'

export interface TableComposable<
  Data extends {} = {},
  ExtendingColumns extends Record<string, FunctionComponent> = {}
> extends Omit<UseTableOptions<Data>, 'columns' | 'data'> {
  id?: string
  label?: string
  columns: ComposableColumn<ExtendingColumns>[]
}

export interface ComposableColumnBase extends ColumnBase {
  label?: string
  value?: string | Record<string, string>
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
    const { value, label, properties, type, ...base } = column
    const Component = generators[type as keyof typeof generators]
    if (!Component) {
      throw new Error(`Column type "${type.toString()}" is not supported`)
    }

    const columnDef: G2ColumnDef<Data> = {
      id: value ? JSON.stringify(value) : type.toString(),
      header: label,
      cell: ({ row }) => {
        let retrievedValue: any = undefined
        const path = value

        if (typeof path === 'string') {
          retrievedValue = getIn(row.original, path)
        } else if (typeof path === 'object' && Object.keys(path).length > 0) {
          retrievedValue = Object.keys(path).reduce((acc: any, key) => {
            acc[key] = getIn(row.original, path[key])
            return acc
          }, {})
        }
        const props: any = {
          ...properties,
          value: retrievedValue
        }
        return <Component {...props} />
      },
      ...base
    }
    return columnDef
  })
}
