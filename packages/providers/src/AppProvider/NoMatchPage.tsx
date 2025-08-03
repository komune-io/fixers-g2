import { CSSProperties, ReactNode } from 'react'
import { Box, BoxProps, Typography } from '@mui/material'
import { NotFoundIcon } from '../assets/NotFoundIcon'
import {
  BasicProps,
  makeG2STyles,
  MergeMuiElementProps
} from '@komune-io/g2-themes'
import { Button } from '@komune-io/g2-components'
import { Link, LinkProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const useStyles = makeG2STyles()((theme) => ({
  notFoundIcon: {
    maxWidth: '400px',
    width: '80vw'
  },
  title: {
    margin: theme.spacing * 2,
    '@media (max-width:800px)': {
      fontSize: '35px'
    },
    '@media (max-width:400px)': {
      fontSize: '30px'
    }
  }
}))

interface NoMatchPageClasses {
  notFoundIcon?: string
  title?: string
  backButton?: string
}

interface NoMatchPageStyles {
  notFoundIcon?: CSSProperties
  title?: CSSProperties
  backButton?: CSSProperties
}

export interface NoMatchPageBasicProps extends BasicProps {
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
  children?: ReactNode
}

export type NoMatchPageProps = MergeMuiElementProps<
  BoxProps,
  NoMatchPageBasicProps
>

export const NoMatchPage = (props: NoMatchPageProps) => {
  const {
    noGoBack = false,
    classes,
    styles,
    className,
    style,
    id,
    children,
    ...other
  } = props
  const defaultStyles = useStyles()
  const { t } = useTranslation()
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
      padding='20px'
      gap={4}
      {...other}
    >
      <NotFoundIcon
        className={defaultStyles.cx(
          defaultStyles.classes.notFoundIcon,
          classes?.notFoundIcon
        )}
        style={styles?.notFoundIcon}
      />
      <Typography
        variant='h3'
        className={defaultStyles.cx(
          defaultStyles.classes.title,
          classes?.title
        )}
        style={styles?.title}
      >
        {t('g2.pageNotFound')}
      </Typography>
      {children}
      {!noGoBack && (
        <Button<LinkProps>
          className={classes?.backButton}
          style={styles?.backButton}
          component={Link}
          componentProps={{ to: '/' }}
          variant='outlined'
        >
          {t('g2.goBackHome')}
        </Button>
      )}
    </Box>
  )
}
