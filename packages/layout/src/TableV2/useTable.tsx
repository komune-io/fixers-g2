import { Box, IconButton } from '@mui/material'
import { CheckBox } from '@komune-io/g2-forms'
import {
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
  TableOptions,
  ColumnDef,
  Table,
  RowModel,
  Row
} from '@tanstack/react-table'
import React, { useMemo } from 'react'
import { Arrow } from '../icons'
import { useSortable } from '@dnd-kit/sortable'
import { DragIndicator } from '@mui/icons-material'

export type ColumnBase = {
  className?: string
  style?: React.CSSProperties
  sortable?: boolean
}

export type G2ColumnDef<Data extends {}> = ColumnDef<Data> & ColumnBase

export interface UseTableOptions<Data extends {}>
  extends Omit<TableOptions<Data>, 'getCoreRowModel' | 'columns'> {
  /**
   * The columns to display in the table
   */
  columns: G2ColumnDef<Data>[]
  /**
   * The poistion in the row of the expand icon
   * @default 'start'
   */
  expandIconPosition?: 'start' | 'end'
  /**
   * The poistion in the row of the expand icon
   * @default 'start'
   */
  RowSelectionPosition?: 'start' | 'end'
  /**
   * You optionnal custom icon used to indicate the expand status of a row
   */
  expandIcon?: JSX.Element
  /**
   * Indicates if the columns are draggable
   * @default false
   */
  enableDragging?: boolean
  /**
   * Indicates if there shouldn't be a checkbox to check or uncheck all the rows on the current page at the same time
   * @default false
   */
  noToggleAllPageRowsSelected?: boolean
  getCoreRowModel?: (table: Table<any>) => () => RowModel<any>
}

export const useTable = <Data extends {}>(
  options: UseTableOptions<Data>
): Table<Data> => {
  const {
    columns,
    enableExpanding = false,
    enableRowSelection = false,
    expandIconPosition = 'start',
    RowSelectionPosition = 'start',
    expandIcon,
    noToggleAllPageRowsSelected = false,
    enableDragging = false,
    ...other
  } = options

  const extendedColumns = useMemo(() => {
    const draggableRow: G2ColumnDef<Data> = {
      id: 'dragger',
      cell: ({ row }) => {
        return <RowDragHandleCell {...row} />
      },
      className: 'AruiTable-actionColumn'
    }

    const expanderRow: G2ColumnDef<Data> = {
      id: 'expander',
      cell: ({ row }) => {
        return (
          <ExpandRowCell
            {...row}
            expandIcon={expandIcon}
            expandIconPosition={expandIconPosition}
          />
        )
      },
      className: 'AruiTable-actionColumn'
    }

    const rowSelection: G2ColumnDef<Data> = {
      id: 'selection',
      header: ({ table }) => {
        return noToggleAllPageRowsSelected ? (
          <div />
        ) : (
          <CheckBox
            onChange={table.getToggleAllRowsSelectedHandler()}
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
          />
        )
      },
      cell: ({ row }) => {
        if (!row.getCanSelect()) return undefined
        return (
          <CheckBox
            onChange={(_, value) => row.toggleSelected(value)}
            checked={row.getIsSelected()}
            onClick={(event) => event.stopPropagation()}
          />
        )
      },
      className: 'AruiTable-actionColumn'
    }

    return [
      ...(enableDragging ? [draggableRow] : []),
      ...(enableExpanding && expandIconPosition === 'start'
        ? [expanderRow]
        : []),
      ...(enableRowSelection && RowSelectionPosition === 'start'
        ? [rowSelection]
        : []),
      ...columns,
      ...(enableRowSelection && RowSelectionPosition === 'end'
        ? [rowSelection]
        : []),
      ...(enableExpanding && expandIconPosition === 'end' ? [expanderRow] : [])
    ]
  }, [
    columns,
    enableExpanding,
    enableRowSelection,
    expandIconPosition,
    expandIcon,
    noToggleAllPageRowsSelected,
    enableDragging
  ])

  return useReactTable({
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    enableExpanding,
    enableRowSelection,
    ...other,
    columns: extendedColumns
  })
}

const RowDragHandleCell = <T extends {}>({ id }: Row<T>) => {
  const { attributes, listeners } = useSortable({
    id
  })
  return (
    // Alternatively, you could set these attributes on the rows themselves
    <IconButton {...attributes} {...listeners}>
      <DragIndicator />
    </IconButton>
  )
}

const ExpandRowCell = <T extends {}>({
  expandIcon,
  expandIconPosition,
  ...row
}: Row<T> & {
  expandIconPosition: 'start' | 'end'
  expandIcon?: JSX.Element
}) => {
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <IconButton
        className='AruiTable-actionColumn'
        onClick={() => row.toggleExpanded()}
      >
        <Box
          sx={{
            transform:
              row.getIsExpanded() && expandIconPosition === 'start'
                ? 'rotate(-180deg)'
                : row.getIsExpanded() && expandIconPosition === 'end'
                  ? 'rotate(180deg)'
                  : '',
            transition: '0.2s',
            display: 'flex'
          }}
        >
          {expandIcon || (
            <Arrow
              key='expanderIcon'
              color='#353945'
              width='20px'
              height='20px'
              style={{
                transform: 'rotate(-90deg)'
              }}
            />
          )}
        </Box>
      </IconButton>
    </div>
  )
}
