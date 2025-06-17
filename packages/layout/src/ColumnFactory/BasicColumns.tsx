import {
  TableCellContact,
  TableCellDate,
  TableCellIconTag,
  TableCellLink,
  TableCellNumber,
  TableCellProfile,
  TableCellText,
  TableCellTag
} from './.'
import { TableCellStatus } from './TableCellStatus/TableCellStatus'
import { TableCellChip } from './TableCellChip/TableCellChip'
import { ComponentProps, FunctionComponent } from 'react'

export const basicColumns = {
  contact: TableCellContact,
  date: TableCellDate,
  link: TableCellLink,
  number: TableCellNumber,
  profile: TableCellProfile,
  text: TableCellText,
  chip: TableCellChip,
  status: TableCellStatus,
  iconTag: TableCellIconTag,
  tag: TableCellTag
}

export type ComposableColumns<
  columns extends Record<string, FunctionComponent>
> = {
  [K in keyof columns]: {
    type: K
    properties: ComponentProps<columns[K]>
  }
}[keyof columns]

export type BasicComposableColumns = ComposableColumns<typeof basicColumns>
