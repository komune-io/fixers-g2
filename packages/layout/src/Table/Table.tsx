import { TableContainerProps, IconButton } from '@mui/material'
import {
  useRowSelect,
  useExpanded,
  TableRowProps,
  HeaderProps,
  Hooks,
  usePagination
} from 'react-table'
import React, { useEffect, useMemo, useCallback } from 'react'
import { BasicProps, MergeMuiElementProps } from '@smartb/g2-themes'
import { CheckBox } from '@smartb/g2-forms'
import { Arrow } from '../icons'
import {
  CompleteTableOptions,
  CellProps,
  Row,
  Column,
  UseCompleteTable,
  BasicData
} from './types'
import { cx } from '@emotion/css'
import { TableContainer } from './TableContainer'
import { GroundedBase } from './GroundedBase'
import { ElevatedBase } from './ElevatedBase'

export interface TableClasses {
  table?: string
  tableHead?: string
  tableBody?: string
  tableHeaderRow?: string
  tableRow?: string
  tableCell?: string
  tableHeaderCell?: string
  Pagination?: string
}

export interface TableStyles {
  table?: React.CSSProperties
  tableHead?: React.CSSProperties
  tableBody?: React.CSSProperties
  tableHeaderRow?: React.CSSProperties
  tableRow?: React.CSSProperties
  tableCell?: React.CSSProperties
  tableHeaderCell?: React.CSSProperties
  Pagination?: React.CSSProperties
}

export interface TableBasicProps<Data extends BasicData> extends BasicProps {
  /**
   * An array of the data that will be displayed in the table
   */
  data: Data[]
  /**
   * The columns of the table build with the data
   */
  columns: Column<Data>[]
  /**
   * The variants of the style of the table
   * @default elevated
   */
  variant?: 'grounded' | 'elevated'
  /**
   * The table options refered here https://react-table.tanstack.com/docs/api/useTable#table-options
   */
  tableOptions?: CompleteTableOptions<Data>
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
   * the envent triggered when the selectedRows state changes
   */
  setSelectedRowIds?: (rowIds: Record<string, boolean>) => void
  /**
   * the envent triggered when a sub components is called
   */
  renderSubComponent?: (row: Row<Data>, rowProps: TableRowProps) => JSX.Element
  /**
   * the envent triggered when a row is clicked
   */
  onRowClicked?: (row: Row<Data>) => void
  /**
   * Indicates if the data is currently loading
   */
  isLoading?: boolean
  /**
   * The classes applied to the different part of the component
   */
  classes?: TableClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: TableStyles
}

export type TableProps<Data extends BasicData> = MergeMuiElementProps<
  TableContainerProps,
  TableBasicProps<Data>
>

export const Table = <Data extends BasicData>(props: TableProps<Data>) => {
  const {
    data,
    columns,
    tableOptions,
    page,
    handlePageChange,
    isLoading,
    totalPages,
    setSelectedRowIds,
    variant = 'elevated',
    renderSubComponent,
    className,
    classes,
    styles,
    onRowClicked,
    ...other
  } = props
  const isSelectabale = !!setSelectedRowIds
  const isExpandable = !!renderSubComponent

  const useVariableHooks = useCallback(
    (hooks: Hooks<Data>) => {
      hooks.allColumns.push((columns) => [
        ...(isExpandable
          ? [
              {
                id: 'expander',
                accessor: 'expander',
                Cell: ({ row }: CellProps<Data>) => (
                  <IconButton {...row.getToggleRowExpandedProps()}>
                    <Arrow
                      key='expanderIcon'
                      color='#353945'
                      width='20px'
                      height='20px'
                      style={{
                        transform: row.isExpanded
                          ? 'rotate(90deg)'
                          : 'rotate(-90deg)',
                        transition: '0.2s'
                      }}
                    />
                  </IconButton>
                ),
                maxWidth: 50,
                className: 'AruiTable-actionColumn'
              } as Column<Data>
            ]
          : []),
        ...(isSelectabale
          ? [
              {
                id: 'selection',
                accessor: 'selection',
                Header: ({
                  //@ts-ignore
                  getToggleAllPageRowsSelectedProps
                }: HeaderProps<Data>) => {
                  console.log(getToggleAllPageRowsSelectedProps())
                  return <CheckBox {...getToggleAllPageRowsSelectedProps()} />
                },
                Cell: ({ row }: CellProps<Data>) => {
                  return (
                    <CheckBox
                      {...row.getToggleRowSelectedProps()}
                      onClick={(event) => event.stopPropagation()}
                    />
                  )
                },
                maxWidth: 50,
                className: 'AruiTable-actionColumn'
              } as Column<Data>
            ]
          : []),
        ...columns
      ])
    },
    [isSelectabale, isExpandable]
  )

  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    state: { selectedRowIds }
  } = UseCompleteTable<Data>(
    variant,
    {
      data,
      columns,
      initialState: { pageIndex: 0, pageSize: data.length },
      manualPagination: true,
      pageCount: totalPages,
      autoResetSelectedRows: false,
      getRowId: (row) => `${row.id}`,
      ...tableOptions
    },
    useExpanded,
    usePagination,
    useRowSelect,
    useVariableHooks
  )

  useEffect(() => {
    setSelectedRowIds && setSelectedRowIds(selectedRowIds)
  }, [selectedRowIds, setSelectedRowIds])

  const tableProps = useMemo(() => getTableProps(), [getTableProps])

  return (
    <TableContainer
      className={cx('AruiTable-root', className)}
      sx={
        variant === 'elevated'
          ? {
              padding: '0 10px',
              boxSizing: 'border-box',
              '& .AruiTable-principaleTableRow:hover': !!onRowClicked
                ? {
                    borderColor: 'secondary.main',
                    cursor: 'pointer'
                  }
                : {}
            }
          : {
              '& .AruiTable-principaleTableRow:hover': !!onRowClicked
                ? {
                    background: '#D9DBE14D',
                    cursor: 'pointer'
                  }
                : {}
            }
      }
      variant={variant}
      {...other}
    >
      {variant === 'elevated' ? (
        <ElevatedBase
          headerGroups={headerGroups}
          prepareRow={prepareRow}
          rows={rows}
          tableProps={tableProps}
          classes={classes}
          handlePageChange={handlePageChange}
          onRowClicked={onRowClicked}
          selectedRowIds={selectedRowIds}
          page={page}
          renderSubComponent={renderSubComponent}
          styles={styles}
          totalPages={totalPages}
        />
      ) : (
        <GroundedBase
          headerGroups={headerGroups}
          selectedRowIds={selectedRowIds}
          page={page}
          prepareRow={prepareRow}
          rows={rows}
          tableProps={tableProps}
          classes={classes}
          handlePageChange={handlePageChange}
          onRowClicked={onRowClicked}
          renderSubComponent={renderSubComponent}
          styles={styles}
          totalPages={totalPages}
        />
      )}
    </TableContainer>
  )
}
