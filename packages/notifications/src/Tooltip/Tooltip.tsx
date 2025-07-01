import React, { forwardRef } from 'react'
import {
  Tooltip as MuiTooltip,
  TooltipProps as MuiTooltipProps
} from '@mui/material'
import { cx } from '@emotion/css'

export interface TooltipProps extends Omit<MuiTooltipProps, 'title'> {
  /**
   * The element to tooltiped
   */
  children: React.ReactElement<any, any>
  /**
   * The text that will be displayed in the tooltip
   */
  helperText: React.ReactNode
  /**
   * Indicates wether the tooltip is open or not. If open is undefined the openning of the tooltip
   * will be actionned by the hover on the given element.
   *
   * You can use the Material-ui `onClose` and `onOpen` props to controlthe tooltip openning manually.
   */
  open?: boolean
}

const TooltipBase = (
  props: TooltipProps,
  ref: React.ForwardedRef<HTMLElement>
) => {
  const { children, helperText, classes, open, className, ...other } = props

  return (
    <MuiTooltip
      ref={ref}
      arrow
      slotProps={{
        tooltip: {
          sx: {
            bgcolor: 'white',
            fontSize: '13px',
            color: (theme) => theme.palette.text.primary,
            padding: 1,
            boxShadow: (theme) => theme.shadows[3]
          }
        },
        arrow: {
          sx: {
            color: 'white',
            width: '16px !important',
            height: '12px !important',
            marginTop: '-11px !important',
            '&::before': {
              borderRadius: '2px'
            }
          }
        }
      }}
      {...other}
      open={open}
      title={helperText}
      placement='bottom'
      className={cx('AruiTooltip-root', className)}
    >
      {children}
    </MuiTooltip>
  )
}

export const Tooltip = forwardRef(TooltipBase) as typeof TooltipBase
