import { Skeleton, TableCell, TableRow, Typography } from '@mui/material'
import { useMemo } from 'react'

interface GroundedRowsLoadingProps {
  expectedSize: number
  columnsNumber?: number
}

export const GroundedRowsLoading = ({
  expectedSize,
  columnsNumber = 4
}: GroundedRowsLoadingProps) => {
  const rows = useMemo(() => {
    const display: JSX.Element[] = []
    for (let i = 0; i < expectedSize; i++) {
      display.push(
        <TableRow key={i}>
          {Array.from({ length: columnsNumber }).map((_, colIndex) => (
            <TableCell key={colIndex}>
              <Typography sx={{ width: '100%', maxWidth: '120px' }}>
                <Skeleton animation='wave' />
              </Typography>
            </TableCell>
          ))}
        </TableRow>
      )
    }
    return display
  }, [expectedSize])
  return <>{rows}</>
}
