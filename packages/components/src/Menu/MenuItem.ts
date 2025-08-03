import { ListItemProps } from '@mui/material'
import { ElementType } from 'react'

export interface MenuItem<T = {}> {
  key: string
  /**
   * @deprecated use onclik instead
   */
  goto?: () => void
  onClick?: () => void
  href?: string
  label?: string
  component?: ElementType<any>
  icon?: JSX.Element
  componentProps?: T & ListItemProps
  isSelected?: boolean
  to?: string
  color?: string
  isLoading?: boolean
}

export interface MenuItems<T = {}> extends MenuItem<T> {
  items?: MenuItems<T>[]
}
