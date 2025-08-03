import { Drawer, DrawerProps } from '@mui/material'
import { MergeMuiElementProps } from '@komune-io/g2-themes'
import { Stepper, StepperProps } from './Stepper'
import { ReactNode } from 'react'

export interface SidePageStepperBasicProps {
  headerComponent?: ReactNode
  stepperProps: StepperProps
}

export type SidePageStepperProps = MergeMuiElementProps<
  DrawerProps,
  SidePageStepperBasicProps
>

export const SidePageStepper = (props: SidePageStepperProps) => {
  const { headerComponent, stepperProps, sx, ...other } = props
  return (
    <Drawer
      sx={{
        width: '350px',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: '350px',
          boxSizing: 'border-box',
          background: '#F2F4F5',
          border: 'none',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: (theme) => theme.spacing(3)
        },
        ...sx
      }}
      variant='permanent'
      anchor='left'
      {...other}
    >
      {headerComponent}
      <Stepper
        {...stepperProps}
        sx={{
          marginTop: '120px',
          ...stepperProps.sx
        }}
      />
    </Drawer>
  )
}
