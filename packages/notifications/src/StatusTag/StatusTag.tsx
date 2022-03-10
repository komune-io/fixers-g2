import { Chip, ChipProps } from '@mui/material'
import {
  BasicProps,
  makeG2STyles,
  MergeMuiElementProps,
  useTheme
} from '@smartb/g2-themes'
import React, { forwardRef, useMemo } from 'react'

const useStyles = makeG2STyles<{ color: string }>()((_, { color }) => ({
  tagWidth: {
    width: 'fit-content',
    padding: '0px 5px',
    '& .MuiChip-label': {
      color: color
    },
    background: `${color}26`,
    border: `1.5px solid ${color}`
  }
}))

export interface StatusTagBasicProps extends BasicProps {
  /**
   * The label of the status
   */
  label: string
  /**
   * The variant of the color used to style the component. This props is override by `customColor`
   *
   * @default 'info'
   */
  variant?: 'info' | 'success' | 'error' | 'warning'
  /**
   * The hexadecimal color you want to style the status tag
   */
  customColor?: string
}

export type StatusTagProps = MergeMuiElementProps<
  ChipProps,
  StatusTagBasicProps
>

export const StatusTagBase = (
  props: StatusTagProps,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  const { label, variant = 'info', customColor, className, ...other } = props

  const theme = useTheme()
  const color = useMemo(() => {
    if (customColor) return { color: customColor }
    return { color: theme.colors[variant] }
  }, [variant, customColor, theme])
  const { classes, cx } = useStyles(color)
  return (
    <Chip
      ref={ref}
      label={label}
      className={cx(classes.tagWidth, 'AruiStatusTag-root', className)}
      {...other}
    />
  )
}

export const StatusTag = forwardRef(StatusTagBase) as typeof StatusTagBase