import { Link as G2Link } from '@komune-io/g2-components'
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'
import { HTMLAttributeAnchorTarget } from 'react'

export interface TableCellLinkProps {
  value?: {
    url: string
    label: string
  }
  target?: HTMLAttributeAnchorTarget
}

export const stopPropagation = (e: any) => e.stopPropagation()

export const TableCellLink = (props: TableCellLinkProps) => {
  const { value, target = '_blank' } = props
  if (!value) return <Typography>-</Typography>
  return (
    <G2Link
      component={Link}
      componentProps={{ to: value.url }}
      onClick={stopPropagation}
      rel='noopener'
      target={target}
      color='#697077'
    >
      {value.label}
    </G2Link>
  )
}
