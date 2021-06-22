import React from 'react'
import { Box, BoxProps, Typography } from '@material-ui/core'
import { NotFoundIcon } from '../assets/NotFoundIcon'
import {
  BasicProps,
  lowLevelStyles,
  MergeMuiElementProps
} from '@smartb/archetypes-ui-themes'
import { Button } from '@smartb/archetypes-ui-components'
import { Link, LinkProps } from 'react-router-dom'
import clsx from 'clsx'

const useStyles = lowLevelStyles()({
  notFoundIcon: {
    maxWidth: '400px',
    width: '80vw'
  },
  title: {
    margin: '20px',
    '@media (max-width:800px)': {
      fontSize: '35px'
    },
    '@media (max-width:400px)': {
      fontSize: '30px'
    }
  }
})

interface NoMatchPageClasses {
  notFoundIcon?: string
  title?: string
  backButton?: string
}

interface NoMatchPageStyles {
  notFoundIcon?: React.CSSProperties
  title?: React.CSSProperties
  backButton?: React.CSSProperties
}

export interface NoMatchPageBasicProps extends BasicProps {
  /**
   * The title beneath the 404 logo
   *
   * @default "Page not found"
   */
  title?: string
  /**
   * The label inside the go back button
   *
   * @default "Go back home"
   */
  buttonLabel?: string
  /**
   * If true the go back button will be removed
   *
   * @default false
   */
  noGoBack?: boolean
  /**
   * The classes applied to the different part of the component
   */
  classes?: NoMatchPageClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: NoMatchPageStyles
}

export type NoMatchPageProps = MergeMuiElementProps<
  BoxProps,
  NoMatchPageBasicProps
>

export const NoMatchPage = (props: NoMatchPageProps) => {
  const {
    title = 'Page not found',
    buttonLabel = 'Go back home',
    noGoBack = false,
    classes,
    styles,
    className,
    style,
    id,
    ...other
  } = props
  const defaultClasses = useStyles()
  return (
    <Box
      className={className}
      style={style}
      id={id}
      display='flex'
      width='100%'
      height='100%'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      {...other}
    >
      <NotFoundIcon
        className={clsx(defaultClasses.notFoundIcon, classes?.notFoundIcon)}
        style={styles?.notFoundIcon}
      />
      <Typography
        variant='h3'
        className={clsx(defaultClasses.title, classes?.title)}
        style={styles?.title}
      >
        {title}
      </Typography>
      {!noGoBack && (
        <Button<LinkProps>
          className={classes?.backButton}
          style={styles?.backButton}
          component={Link}
          componentProps={{ to: '/' }}
          variant='outlined'
        >
          {buttonLabel}
        </Button>
      )}
    </Box>
  )
}
