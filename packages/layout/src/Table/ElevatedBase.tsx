import { cx } from '@emotion/css'
import { Box, Collapse, Typography } from '@mui/material'
import { Pagination } from '@smartb/g2-components'
import React, { Fragment, useMemo } from 'react'
import { HeaderGroup, TableProps, TableRowProps } from 'react-table'
import { TableClasses, TableStyles } from './Table'
import { Row } from './types'

export interface ElevatedBaseProps<Data extends object> {
  /**
   * The number of pages the table contain.
   *
   * ⚠️ if you want the pagination to appear you must provide this props and also `totalPages`
   */
  page?: number
  /**
   * The number of pages the table contain.
   *
   * ⚠️ if you want the pagination to appear you must provide this props and also **page**
   */
  totalPages?: number
  /**
   * the envent triggered when the current page has to change
   */
  handlePageChange?: (page: number) => void
  /**
   * the envent triggered when a sub components is called
   */
  renderSubComponent?: (row: Row<Data>, rowProps: TableRowProps) => JSX.Element
  /**
   * the envent triggered when a row is clicked
   */
  onRowClicked?: (row: Row<Data>) => void
  /**
   * The classes applied to the different part of the component
   */
  classes?: TableClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: TableStyles
  rows: Row<Data>[]
  prepareRow: (row: Row<Data>) => void
  headerGroups: HeaderGroup<Data>[]
  tableProps: TableProps
}

export const ElevatedBase = <Data extends object = {}>(
  props: ElevatedBaseProps<Data>
) => {
  const {
    headerGroups,
    prepareRow,
    rows,
    classes,
    handlePageChange,
    onRowClicked,
    page,
    renderSubComponent,
    styles,
    totalPages,
    tableProps
  } = props
  const isPaginated = !!page && !!totalPages
  const rowsDisplay = useMemo(() => {
    return rows.map((row) => {
      prepareRow(row)
      row.getRowProps()
      const rowProps = row.getRowProps()
      return (
        <Fragment key={rowProps.key}>
          <Box
            onClick={() => onRowClicked && onRowClicked(row)}
            className={cx(
              'AruiTable-principaleTableRow',
              'AruiTable-tableRow',
              classes?.tableRow
            )}
            style={styles?.tableRow}
            {...row.getRowProps()}
          >
            {row.cells.map((cell) => {
              const column = cell.column
              return (
                <Box
                  className={cx(
                    //@ts-ignore
                    column.className,
                    'AruiTable-tableCell',
                    classes?.tableCell
                  )}
                  //@ts-ignore
                  style={{ ...column.style, ...styles?.tableCell }}
                  {...cell.getCellProps()}
                >
                  {cell.render('Cell')}
                </Box>
              )
            })}
          </Box>
          <Box
            className={cx('AruiTable-tableRow', classes?.tableRow)}
            style={styles?.tableRow}
          >
            <Box
              className={cx('AruiTable-tableCell', classes?.tableCell)}
              style={styles?.tableCell}
              sx={{ paddingBottom: 0, paddingTop: 0 }}
            >
              <Collapse in={row.isExpanded} timeout='auto' unmountOnExit>
                {renderSubComponent && renderSubComponent(row, rowProps)}
              </Collapse>
            </Box>
          </Box>
        </Fragment>
      )
    })
  }, [
    rows,
    renderSubComponent,
    prepareRow,
    classes?.tableRow,
    styles?.tableRow,
    classes?.tableCell,
    styles?.tableCell,
    onRowClicked
  ])

  const headerDisplay = useMemo(
    () =>
      headerGroups.map((headerGroup) => (
        <Box
          className={cx('AruiTable-tableHeaderRow', classes?.tableHeaderRow)}
          style={styles?.tableHeaderRow}
          {...headerGroup.getHeaderGroupProps()}
        >
          {headerGroup.headers.map((column) => (
            <Box
              className={cx(
                //@ts-ignore
                column.className,
                'AruiTable-tableHeaderCell',
                classes?.tableHeaderCell
              )}
              //@ts-ignore
              style={{ ...column.style, ...styles?.tableHeaderCell }}
              {...column.getHeaderProps()}
            >
              <Typography variant='subtitle1'>
                {column.render('Header')}
              </Typography>
            </Box>
          ))}
        </Box>
      )),
    [
      headerGroups,
      classes?.tableRow,
      styles?.tableRow,
      classes?.tableHeaderCell,
      styles?.tableHeaderCell
    ]
  )

  return (
    <Box
      className={cx('AruiTable-table', classes?.table)}
      style={styles?.table}
      {...tableProps}
    >
      <Box
        className={cx('AruiTable-tableHead', classes?.tableHead)}
        style={styles?.tableHead}
      >
        {headerDisplay}
      </Box>
      <Box
        className={cx('AruiTable-tableBody', classes?.tableBody)}
        style={styles?.tableBody}
      >
        {rowsDisplay}
      </Box>
      <Box
        className={cx('AruiTable-tableFooter', classes?.tableFooter)}
        style={styles?.tableFooter}
      >
        {isPaginated ? (
          <Box>
            <Pagination
              onPageChange={handlePageChange}
              page={page}
              totalPage={totalPages}
            />
          </Box>
        ) : undefined}
      </Box>
    </Box>
  )
}
