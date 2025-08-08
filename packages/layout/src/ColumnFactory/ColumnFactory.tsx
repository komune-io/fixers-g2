import { ElementType } from 'react'
import { G2ColumnDef } from '../TableV2'
import {
  TableCellContact,
  TableCellContactProps,
  TableCellDate,
  TableCellDateProps,
  TableCellIconTag,
  TableCellIconTagProps,
  TableCellLink,
  TableCellLinkProps,
  TableCellNumber,
  TableCellNumberProps,
  TableCellProfile,
  TableCellProfileProps,
  TableCellText,
  TableCellTextProps,
  TableCellTag,
  TableCellTagProps
} from './.'
import { Column } from '../Table'
import {
  TableCellStatus,
  TableCellStatusProps
} from './TableCellStatus/TableCellStatus'
import {
  TableCellChip,
  TableCellChipProps
} from './TableCellChip/TableCellChip'

type ColumnGeneratorParams<CellProps, Data, ColumnType> = Omit<
  ColumnType,
  'cell' | 'Cell'
> & {
  getCellProps: (row: Data) => CellProps
}

type ColumnGenerator<CellProps, Data, ColumnType> = (
  params: ColumnGeneratorParams<CellProps, Data, ColumnType>
) => ColumnType

const getColumnGenerator =
  <
    CellProps,
    Data extends {} = {},
    ColumnType extends G2ColumnDef<Data> | Column<Data> = any
  >(
    CellElement: ElementType
  ): ColumnGenerator<CellProps, Data, ColumnType> =>
  (params) => {
    const { getCellProps, ...other } = params
    //@ts-ignore
    return {
      ...other,
      cell: ({ row }) => <CellElement {...getCellProps(row.original)} />
    } as ColumnType
  }

export type ColumnGenerators<Data, ColumnType> = {
  contact: ColumnGenerator<TableCellContactProps, Data, ColumnType>
  date: ColumnGenerator<TableCellDateProps, Data, ColumnType>
  link: ColumnGenerator<TableCellLinkProps, Data, ColumnType>
  number: ColumnGenerator<TableCellNumberProps, Data, ColumnType>
  profile: ColumnGenerator<TableCellProfileProps, Data, ColumnType>
  text: ColumnGenerator<TableCellTextProps, Data, ColumnType>
  chip: ColumnGenerator<TableCellChipProps, Data, ColumnType>
  status: ColumnGenerator<TableCellStatusProps, Data, ColumnType>
  iconTag: ColumnGenerator<TableCellIconTagProps, Data, ColumnType>
  tag: ColumnGenerator<TableCellTagProps, Data, ColumnType>
}

export const columnsGenerators: any = {
  contact: getColumnGenerator<TableCellContactProps>(TableCellContact),
  date: getColumnGenerator<TableCellDateProps>(TableCellDate),
  link: getColumnGenerator<TableCellLinkProps>(TableCellLink),
  number: getColumnGenerator<TableCellNumberProps>(TableCellNumber),
  profile: getColumnGenerator<TableCellProfileProps>(TableCellProfile),
  text: getColumnGenerator<TableCellTextProps>(TableCellText),
  chip: getColumnGenerator<TableCellChipProps>(TableCellChip),
  status: getColumnGenerator<TableCellStatusProps>(TableCellStatus),
  iconTag: getColumnGenerator<TableCellIconTagProps>(TableCellIconTag),
  tag: getColumnGenerator<TableCellTagProps>(TableCellTag)
}

export interface ColumnFactoryParams<Data extends {}> {
  /**
   * return the wanted columns witd the ColumnGenerators utility in parameter
   */
  generateColumns: (
    generators: ColumnGenerators<Data, G2ColumnDef<Data>>
  ) => G2ColumnDef<Data>[] | Record<string, G2ColumnDef<Data>>
}

export const ColumnFactory = <Data extends {} = {}>(
  params: ColumnFactoryParams<Data>
): G2ColumnDef<Data>[] => {
  const { generateColumns } = params

  const columns = generateColumns(columnsGenerators)

  if (Array.isArray(columns)) return columns
  const finalColumns: G2ColumnDef<Data>[] = []
  Object.keys(columns).forEach((key) => {
    const column = (columns as any)[key]
    column.id = column.id ?? key
    finalColumns.push(column)
  })
  return finalColumns
}

export interface ColumnFactoryV1Params<Data extends {}> {
  /**
   * return the wanted columns witd the ColumnGenerators utility in parameter
   */
  generateColumns: (
    generators: ColumnGenerators<Data, Column<Data>>
  ) => G2ColumnDef<Data>[] | Record<string, G2ColumnDef<Data>>
}

export const ColumnFactoryV1 = <Data extends {} = {}>(
  params: ColumnFactoryV1Params<Data>
): Column<Data>[] => {
  const { generateColumns } = params

  //@ts-ignore
  const columnsObject = generateColumns(columnsGenerators)
  const columns: Column<Data>[] = []

  for (const key in columnsObject) {
    const column = (columnsObject as any)[key]
    column.id = Array.isArray(columnsObject) ? column.id : (column.id ?? key)
    //@ts-ignore
    column.Cell = column.cell
    //@ts-ignore
    delete column.cell
    //@ts-ignore
    columns.push(column)
  }

  return columns
}
