import { FunctionComponent, useMemo } from 'react'
import { UseTableOptions, useTable } from '../TableV2'
import { TableComposable, composableToColumns } from './composable'

export interface UseTableComposableOptions<
  Data extends {},
  ExtendingColumns extends Record<string, FunctionComponent>
> extends Omit<UseTableOptions<Data>, 'columns'> {
  /**
   * The composable template
   */
  tableComposable?: TableComposable<Data, ExtendingColumns>
  extendingColumns?: ExtendingColumns
}

export const useTableComposable = <
  Data extends {} = {},
  ExtendingColumns extends Record<string, FunctionComponent> = {}
>(
  params: UseTableComposableOptions<Data, ExtendingColumns>
) => {
  const { tableComposable, extendingColumns, ...rest } = params

  const columns = useMemo(
    () =>
      tableComposable
        ? composableToColumns<Data, ExtendingColumns>(
            tableComposable,
            extendingColumns
          )
        : [],
    [tableComposable, extendingColumns]
  )

  return useTable<Data>({
    ...tableComposable,
    columns,
    ...rest
  })
}
