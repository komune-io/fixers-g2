import { UseTableOptions, useTable } from '../TableV2'
import { TableComposable, composableToColumns } from './composable'

export interface UseTableComposableOptions<Data extends {}>
  extends Omit<UseTableOptions<Data>, 'columns'> {
  /**
   * The composable template
   */
  tableComposable: TableComposable
}

export const useTableComposable = <Data extends {} = {}>(
  params: UseTableComposableOptions<Data>
) => {
  const { tableComposable, ...rest } = params

  return useTable({
    columns: composableToColumns<Data>(tableComposable),
    ...rest
  })
}
