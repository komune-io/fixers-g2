import { StepIconProps as MuiStepIconProps } from '@mui/material'
import clsx from 'clsx'
import React from 'react'
import { makeG2STyles } from '@smartb/g2-themes'

const useStepIconStyles = makeG2STyles()((theme) => ({
  root: {
    backgroundColor: theme.colors.tertiary,
    zIndex: 1,
    color: '#fff',
    width: 40,
    height: 40,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  active: {
    backgroundColor: theme.colors.primary,
    boxShadow: theme.colors.primary
  },
  completed: {
    backgroundColor: theme.colors.primary,
    boxShadow: theme.colors.primary
  },
  activeIcon: {
    border: '2px solid ' + theme.colors.secondary,
    padding: '3px',
    borderRadius: '50%'
  }
}))

export const StepIcon = (props: MuiStepIconProps) => {
  const { classes } = useStepIconStyles()
  const { active, completed, icon } = props
  return (
    <div className={clsx({ [classes.activeIcon]: active })}>
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
          [classes.completed]: completed
        })}
      >
        {icon}
      </div>
    </div>
  )
}

export const StepEmptyIcon = () => {
  return <></>
}
