import { Skeleton, Stack, Typography } from '@mui/material'
import React from 'react'
import { ElevatedRowsLoading } from './ElevatedRowsLoading'

interface ElevatedLoadingProps {
  expectedSize: number
}

export const ElevatedLoading = (props: ElevatedLoadingProps) => {
  const { expectedSize } = props
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
      <ElevatedRowsLoading expectedSize={expectedSize} />
    </Stack>
  )
}
