import { Typography } from '@mui/material'

export interface TableCellDateProps {
  value?: number
}

export const TableCellDate = (props: TableCellDateProps) => {
  const { value } = props
  if (!value) return <Typography>-</Typography>
  const dateString = new Date(value).toLocaleDateString()
  return <Typography>{dateString}</Typography>
}
