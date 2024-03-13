import { G2ColumnDef, UseTableOptions, useTable } from '@komune-io/g2-layout'
import { User } from '../../Domain'
import { useUserColumns, UseUserColumnsParams } from './useUserColumns'

export interface UseUserTableStateParams<T extends User>
  extends Partial<UseTableOptions<T>>,
    UseUserColumnsParams<T> {
  /**
   * The columns
   */
  columns?: G2ColumnDef<T>[]
  /**
   * The user to pe parsed in the table
   */
  users: T[]
}

export const useUserTableState = <T extends User = User>(
  params?: UseUserTableStateParams<T>
) => {
  const {
    columns,
    users = [],
    getOrganizationUrl,
    hasOrganizations = false,
    getActions,
    ...other
  } = params ?? {}

  const base = useUserColumns({
    getOrganizationUrl,
    hasOrganizations,
    users,
    getActions
  })

  return useTable({
    data: users,
    columns: columns ?? base.columnsArray,
    getRowId: (row) => row.id,
    ...other
  })
}
