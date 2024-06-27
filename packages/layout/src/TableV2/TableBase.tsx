import { cx } from '@emotion/css'
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableCellBaseProps,
  TableFooter,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { TableRow as G2TableRow } from './TableRow'
import { Table, flexRender, Row } from '@tanstack/react-table'
import React from 'react'
import { LinkProps } from 'react-router-dom'
import { TableClasses, TableStyles } from '../Table'
import { G2ColumnDef } from './useTable'

export interface TableBaseProps<Data extends {}> {
  /**
   * The number of pages the table contain.
   *
   * ⚠️ if you want the pagination to appear you must provide this props and also `totalPages`
   */
  page?: number
  /**
   * The tableState returned by the useTable
   */
  tableState: Table<Data>
  /**
   * the envent triggered when a sub components is called
   */
  renderSubComponent?: (row: Row<Data>) => JSX.Element
  /**
   * the envent triggered when a row is clicked
   */
  onRowClicked?: (row: Row<Data>) => void
  /**
   * use this prop to make every rows a clickable link
   */
  getRowLink?: (row: Row<Data>) => LinkProps
  /**
   * The classes applied to the different part of the component
   */
  classes?: TableClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: TableStyles
  /**
   * The variants of the style of the table
   */
  variant: 'grounded' | 'elevated'
  withFooter: boolean
  expandInRow: boolean
  renderRowHoveredComponent?: (row: Row<Data>) => JSX.Element
  additionalRowsProps?: Record<string, any>
}

export const TableBase = <Data extends {}>(props: TableBaseProps<Data>) => {
  const { classes, styles, tableState, withFooter, variant } = props

  //@ts-ignore
  const TableComponent: React.ElementType =
    variant === 'elevated' ? 'div' : undefined
  //@ts-ignore
  const TableHeadComponent: React.ElementType =
    variant === 'elevated' ? 'div' : undefined
  //@ts-ignore
  const TableBodyComponent: React.ElementType =
    variant === 'elevated' ? 'div' : undefined
  //@ts-ignore
  const TableFooterComponent: React.ElementType =
    variant === 'elevated' ? 'div' : undefined
  //@ts-ignore
  const TableRowComponent: React.ElementType =
    variant === 'elevated' ? 'div' : undefined
  //@ts-ignore
  const TableCellComponent: React.ElementType<TableCellBaseProps> =
    variant === 'elevated' ? 'div' : undefined

  const rowsDisplay = tableState.getRowModel().rows.map((row) => {
    return (
      <G2TableRow
        {...props}
        key={tableState._getRowId(row.original, row.index)}
        tableCellComponent={TableCellComponent}
        tableRowComponent={TableRowComponent}
        row={row}
      />
    )
  })

  const headerDisplay = tableState.getHeaderGroups().map((headerGroup) => (
    <TableRow
      component={TableRowComponent}
      className={cx('AruiTable-tableHeaderRow', classes?.tableHeaderRow)}
      style={styles?.tableHeaderRow}
      key={headerGroup.id}
      sx={
        variant === 'elevated'
          ? {
              display: 'flex'
            }
          : undefined
      }
    >
      {headerGroup.headers.map((header) => {
        const column = header.column.columnDef as G2ColumnDef<Data>
        return (
          <TableCell
            component={TableCellComponent}
            key={header.id}
            className={cx(
              column.className,
              'AruiTable-tableHeaderCell',
              classes?.tableHeaderCell
            )}
            style={{ ...column.style, ...styles?.tableHeaderCell }}
            sx={
              variant === 'elevated'
                ? {
                    flex: '100 0 auto',
                    width: '100px'
                  }
                : undefined
            }
            variant={variant === 'grounded' ? 'head' : undefined}
          >
            {header.id !== 'selection' ? (
              <Typography variant='subtitle1'>
                {flexRender(column.header, header.getContext())}
              </Typography>
            ) : (
              flexRender(column.header, header.getContext())
            )}
          </TableCell>
        )
      })}
    </TableRow>
  ))

  const footerDisplay = !withFooter
    ? undefined
    : tableState.getFooterGroups().map((footerGroup) => (
        <TableRow
          component={TableRowComponent}
          key={footerGroup.id}
          className={cx('AruiTable-tableFooterRow', classes?.tableFooterRow)}
          style={styles?.tableFooterRow}
          sx={
            variant === 'elevated'
              ? {
                  display: 'flex'
                }
              : undefined
          }
        >
          {footerGroup.headers.map((header) => {
            const column = header.column.columnDef as G2ColumnDef<Data>
            return (
              <TableCell
                component={TableCellComponent}
                key={header.id}
                className={cx(
                  column.className,
                  'AruiTable-tableFooterCell',
                  classes?.tableFooterCell
                )}
                style={{ ...column.style, ...styles?.tableFooterCell }}
                sx={
                  variant === 'elevated'
                    ? {
                        flex: '100 0 auto',
                        width: '100px'
                      }
                    : undefined
                }
                variant={variant === 'grounded' ? 'body' : undefined}
              >
                {flexRender(column.footer, header.getContext())}
              </TableCell>
            )
          })}
        </TableRow>
      ))

  return (
    <MuiTable
      component={TableComponent}
      className={cx('AruiTable-table', classes?.table)}
      style={styles?.table}
    >
      <TableHead
        component={TableHeadComponent}
        className={cx('AruiTable-tableHead', classes?.tableHead)}
        style={styles?.tableHead}
      >
        {headerDisplay}
      </TableHead>
      <TableBody
        component={TableBodyComponent}
        className={cx('AruiTable-tableBody', classes?.tableBody)}
        style={styles?.tableBody}
      >
        {rowsDisplay}
      </TableBody>
      {footerDisplay && (
        <TableFooter
          component={TableFooterComponent}
          className={cx('AruiTable-tableFooter', classes?.tableFooter)}
          style={styles?.tableFooter}
        >
          {footerDisplay}
        </TableFooter>
      )}
    </MuiTable>
  )
}
