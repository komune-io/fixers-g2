import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { GroundedRowsLoading } from './GroundedRowsLoading'

interface GroundedLoadingProps {
  expectedSize: number
}

export const GroundedLoading = (props: GroundedLoadingProps) => {
  const { expectedSize } = props
  const headerCell = (
    <TableCell>
      <Typography sx={{ width: '120px' }} variant='h6'>
        <Skeleton animation='wave' />
      </Typography>
    </TableCell>
  )

  return (
    <Table>
      <TableHead>
        <TableRow>
          {headerCell}
          {headerCell}
          {headerCell}
          {headerCell}
        </TableRow>
      </TableHead>
      <TableBody>
        <GroundedRowsLoading expectedSize={expectedSize} />
      </TableBody>
    </Table>
  )
}
