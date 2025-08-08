import { Link, LinkProps } from 'react-router-dom'
import { Button, ButtonProps } from './Button'
import { ForwardedRef, forwardRef } from 'react'

export interface LinkButtonProps
  extends Omit<ButtonProps, 'component, componentProps'> {
  to: string
}

export const LinkButton = forwardRef(
  (props: LinkButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const { to, ...other } = props
    return (
      <Button<LinkProps>
        ref={ref}
        component={Link}
        {...other}
        componentProps={{ to: to }}
      />
    )
  }
)
