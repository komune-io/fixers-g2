import { Skeleton, Stack, Typography } from '@mui/material'
import React, { useMemo } from 'react'

interface ElevatedLoadingProps {
  expectedSize: number
}

export const ElevatedLoading = (props: ElevatedLoadingProps) => {
  const { expectedSize } = props
  const rows = useMemo(() => {
    const display = []
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
            borderRadius: '4px'
          }}
        />
      )
    }
    return display
  }, [expectedSize])
  return (
    <Stack
      sx={{
        width: '100%'
      }}
      alignItems='center'
    >
      <Stack
        direction='row'
        spacing={3}
        justifyContent='space-between'
        sx={{
          padding: '10px',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <Typography sx={{ width: '100px' }} variant='h6'>
          <Skeleton animation='wave' />
        </Typography>
        <Typography sx={{ width: '100px' }} variant='h6'>
          <Skeleton animation='wave' />
        </Typography>
        <Typography sx={{ width: '100px' }} variant='h6'>
          <Skeleton animation='wave' />
        </Typography>
        <Typography sx={{ width: '100px' }} variant='h6'>
          <Skeleton animation='wave' />
        </Typography>
      </Stack>
      {rows}
    </Stack>
  )
}
