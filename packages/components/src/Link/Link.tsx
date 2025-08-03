import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material'
import { BasicProps, MergeMuiElementProps } from '@komune-io/g2-themes'
import { makeG2STyles } from '@komune-io/g2-themes'
import { ElementType, ReactNode } from 'react'

const useStyles = makeG2STyles()({
  link: {
    opacity: '0.9',
    textDecoration: 'underline',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  disabled: {
    cursor: 'default',
    opacity: '0.5'
  }
})

export interface LinkBasicProps<T extends object = {}> extends BasicProps {
  /**
   * The content of the link
   */
  children?: ReactNode
  /**
   * The href of the link
   */
  href?: string
  /**
   * The element that will be placed in the root element (a button by default)
   */
  component?: ElementType<any>
  /**
   * The additional props of the root element
   */
  componentProps?: T
  /**
   * Define if the component is disabled or note
   */
  disabled?: boolean
}

export type LinkProps<T extends object = {}> = MergeMuiElementProps<
  MuiLinkProps,
  LinkBasicProps<T>
>

export const Link = <T extends object = {}>(props: LinkProps<T>) => {
  const {
    href,
    className,
    component,
    componentProps,
    disabled,
    variant = 'body1',
    ...other
  } = props
  const { classes, cx } = useStyles()
  if (component)
    return (
      <MuiLink
        href={!disabled ? href : undefined}
        className={cx(
          classes.link,
          disabled && classes.disabled,
          'AruiLink-root',
          className
        )}
        component={component}
        variant={variant}
        color='inherit'
        {...componentProps}
        {...other}
      />
    )
  return (
    <MuiLink
      href={!disabled ? href : undefined}
      className={cx(
        classes.link,
        disabled && classes.disabled,
        'AruiLink-root',
        className
      )}
      variant={variant}
      color='inherit'
      {...other}
    />
  )
}
