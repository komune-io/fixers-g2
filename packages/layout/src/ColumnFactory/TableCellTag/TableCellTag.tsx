import React, { useMemo } from 'react'
import {
  Option,
  SmartKey,
  LimitedList,
  LimitedListProps
} from '@komune-io/g2-forms'
import { Chip } from '@komune-io/g2-components'
import { StatusTag } from '@komune-io/g2-notifications'

export interface TableCellTagProps
  extends Omit<LimitedListProps<{}>, 'listedComponent' | 'values'> {
  /**
   * @default "chip"
   */
  variant?: 'chip' | 'status'
  value?: SmartKey | SmartKey[]
  multiple?: boolean
  options: Option[]
}

export const TableCellTag = (props: TableCellTagProps) => {
  const { variant = 'chip', multiple = false, options, value, ...other } = props

  const selected = useMemo(
    () =>
      value
        ? (Array.isArray(value) ? value : [value]).map(
            (val) => options.find((option) => option.key === val)!
          )
        : undefined,
    [value, options]
  )

  return (
    <LimitedList
      listedComponent={variant === 'chip' ? Chip : StatusTag}
      values={selected}
      {...other}
    />
  )
}
