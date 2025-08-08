import { Typography } from '@mui/material'
import { Presentation } from '@komune-io/g2-components'

export interface TableCellProfileProps {
  value?: {
    givenName?: string
    familyName?: string
  }
}

export const TableCellProfile = (props: TableCellProfileProps) => {
  const { value } = props
  if (!value?.givenName && !value?.familyName) return <Typography>-</Typography>
  return <Presentation label={`${value?.givenName} ${value?.familyName}`} />
}
