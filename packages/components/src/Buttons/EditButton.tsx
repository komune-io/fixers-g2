import { ForwardedRef, forwardRef } from 'react'
import { Edit } from '../icons'
import { makeG2Styles } from '@komune-io/g2-themes'
import { Button, ButtonProps } from './Button'

const useStyles = makeG2Styles()({
  icon: {
    width: '19px',
    height: '19px'
  }
})

const EditButtonBase = function <T = {}>(
  props: ButtonProps<T>,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const { classes } = useStyles()
  return (
    <Button
      variant='text'
      startIcon={<Edit color={'#828282'} className={classes.icon} />}
      ref={ref}
      {...props}
    />
  )
}

export const EditButton = forwardRef(EditButtonBase) as typeof EditButtonBase
