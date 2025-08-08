import { ElementType, Fragment } from 'react'
import { TableBaseProps } from './TableBase'
import { useSortable } from '@dnd-kit/sortable'
import { Row, flexRender } from '@tanstack/react-table'
import { CSS } from '@dnd-kit/utilities'
import { cx } from '@emotion/css'
import {
  Box,
  Collapse,
  TableCell,
  TableCellBaseProps,
  TableRow as MuiTableRow
} from '@mui/material'
import { G2ColumnDef } from './useTable'
import { Link } from 'react-router-dom'

export interface TableRowProps<Data extends {}> extends TableBaseProps<Data> {
  row: Row<Data>
  tableRowComponent: ElementType
  tableCellComponent: ElementType<TableCellBaseProps>
}

export const TableRow = <Data extends {}>(props: TableRowProps<Data>) => {
  const {
    tableState,
    additionalRowsProps = {},
    row,
    variant,
    classes,
    styles,
    onRowClicked,
    expandInRow,
    tableRowComponent,
    tableCellComponent,
    renderRowHoveredComponent,
    renderSubComponent,
    getRowLink
  } = props
  const cell = (
    <>
      {row?.getVisibleCells().map((cell) => {
        const column = cell.column.columnDef as G2ColumnDef<Data>
        return (
          <TableCell
            component={tableCellComponent}
            key={cell.id}
            className={cx(
              column.className,
              'AruiTable-tableCell',
              classes?.tableCell
            )}
            style={{ ...column.style, ...styles?.tableCell }}
            sx={
              variant === 'elevated'
                ? {
                    flex: '100 0 auto',
                    width: '100px'
                  }
                : undefined
            }
          >
            {flexRender(column.cell, cell.getContext())}
          </TableCell>
        )
      })}
      {!!renderRowHoveredComponent && (
        <TableCell
          component={tableCellComponent}
          sx={{
            padding: 0,
            position: 'absolute',
            width: '100%',
            height: '100%'
          }}
          className={cx(
            'AruiTable-rowHoveredComponentContainer',
            classes?.rowHoveredComponentContainer
          )}
          style={styles?.rowHoveredComponentContainer}
        >
          {renderRowHoveredComponent(row)}
        </TableCell>
      )}
    </>
  )

  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: tableState._getRowId(row.original, row.index)
  })

  const extProps =
    additionalRowsProps[tableState._getRowId(row.original, row.index)] ??
    additionalRowsProps?.all

  // console.log(tableState._getRowId(row.original, row.index), row.index, isDragging, transition)
  return (
    <Fragment>
      <MuiTableRow
        component={tableRowComponent}
        {...extProps}
        onClick={() => {
          onRowClicked && onRowClicked(row)
        }}
        className={cx(
          extProps?.className,
          'AruiTable-principaleTableRow',
          'AruiTable-tableRow',
          classes?.tableRow
        )}
        style={{
          ...styles?.tableRow,
          transform: CSS.Transform.toString(transform), //let dnd-kit do its thing
          transition: transition,
          opacity: isDragging ? 0.8 : undefined,
          zIndex: isDragging ? 2 : undefined
        }}
        sx={{
          display:
            variant === 'elevated'
              ? expandInRow
                ? undefined
                : 'flex'
              : undefined
        }}
        ref={setNodeRef}
      >
        {expandInRow && variant === 'elevated' ? (
          <Box
            sx={{
              display: 'flex'
            }}
          >
            {cell}
          </Box>
        ) : (
          cell
        )}
        {expandInRow && variant === 'elevated' && (
          <Collapse in={row.getIsExpanded()} timeout='auto' unmountOnExit>
            {renderSubComponent && renderSubComponent(row)}
          </Collapse>
        )}
        {getRowLink && (
          <TableCell
            component={tableCellComponent}
            sx={{
              padding: 0,
              position: 'absolute',
              width: '100%',
              height: '100%',
              zIndex: 1,
              top: 0,
              left: 0
            }}
            className='AruiTable-rowLinkContainer'
          >
            <Link
              {...getRowLink(row)}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%'
              }}
            />
          </TableCell>
        )}
      </MuiTableRow>
      {(!expandInRow || variant === 'grounded') && (
        <MuiTableRow
          component={tableRowComponent}
          className={cx('AruiTable-tableRow', classes?.tableRow)}
          style={styles?.tableRow}
        >
          <TableCell
            component={tableCellComponent}
            className={cx('AruiTable-tableCell', classes?.tableCell)}
            style={styles?.tableCell}
            sx={{ paddingBottom: 0, paddingTop: 0 }}
            colSpan={variant === 'grounded' ? 100 : undefined}
          >
            <Collapse in={row.getIsExpanded()} timeout='auto' unmountOnExit>
              {renderSubComponent && renderSubComponent(row)}
            </Collapse>
          </TableCell>
        </MuiTableRow>
      )}
    </Fragment>
  )
}
