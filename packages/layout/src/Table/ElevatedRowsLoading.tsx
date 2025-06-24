import { Skeleton } from '@mui/material'
import React, { useMemo } from 'react'

interface ElevatedRowsLoadingProps {
  expectedSize: number
}

export const ElevatedRowsLoading = ({
  expectedSize
}: ElevatedRowsLoadingProps) => {
  const rows = useMemo(() => {
    const display: JSX.Element[] = []
    for (let i = 0; i < expectedSize; i++) {
      display.push(
        <Skeleton
          key={i}
          animation='wave'
          variant='rectangular'
          sx={{
            height: '42px',
            width: '100%',
            margin: '10px 0',
            borderRadius: (theme) => `${theme.shape.borderRadius}px`
          }}
        />
      )
    }
    return display
  }, [expectedSize])
  return <>{rows}</>
}
