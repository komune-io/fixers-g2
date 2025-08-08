import { cx } from '@emotion/css'
import { MoreHorizRounded, NavigateNextRounded } from '@mui/icons-material'
import {
  IconButton,
  Breadcrumbs as MuiBreadcrumbs,
  BreadcrumbsProps as MuiBreadcrumbsProps,
  Typography
} from '@mui/material'
import { CSSProperties, useMemo } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Link } from '../Link'
import { MenuItem, useButtonMenu } from '../Menu'

interface BreadcrumbsClasses {
  link?: string
  currentPage?: string
}

interface BreadcrumbsStyles {
  link?: CSSProperties
  currentPage?: CSSProperties
}

export type Crumb = {
  label: string
  url: string
}

export interface BreadcrumbsProps extends MuiBreadcrumbsProps {
  /**
   * The crumbs to build the breadcrumbs
   */
  crumbs?: Crumb[]
  /**
   * The classes applied to the different part of the component
   */
  classes?: BreadcrumbsClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: BreadcrumbsStyles
}

export const Breadcrumbs = (props: BreadcrumbsProps) => {
  const { crumbs, sx, className, classes, styles, ...other } = props

  const collapsedCrumbs = useMemo(() => {
    if ((crumbs?.length ?? 0) < 4) return
    const targetedCrumbs = crumbs?.slice(1, crumbs.length - 2)
    return <CollapsedCrumbs crumbs={targetedCrumbs} />
  }, [crumbs])

  const crumbsDisplay = useMemo(() => {
    let crumbsToDisplay = crumbs
    if (collapsedCrumbs && crumbs) {
      crumbsToDisplay = [
        crumbs[0],
        crumbs[crumbs.length - 2],
        crumbs[crumbs.length - 1]
      ]
    }
    const display = crumbsToDisplay?.map((crumb, index) =>
      index !== crumbsToDisplay.length - 1 ? (
        <Link
          component={RouterLink}
          componentProps={{
            to: crumb.url
          }}
          key={crumb.url}
          sx={{
            color: '#757575',
            maxWidth: '160px',
            display: 'block',
            textDecoration: 'none !important',
            '&:hover': {
              textDecoration: 'underline !important'
            }
          }}
          className={cx('AruiBreadcrumbs-link', classes?.link)}
          style={styles?.link}
          variant='body2'
          noWrap
        >
          {crumb.label}
        </Link>
      ) : (
        <Typography
          sx={{
            color: '#424242',
            maxWidth: '160px',
            display: 'block',
            fontWeight: 600
          }}
          key={crumb.url}
          className={cx('AruiBreadcrumbs-currentPage', classes?.currentPage)}
          style={styles?.currentPage}
          variant='body2'
          noWrap
        >
          {crumb.label}
        </Typography>
      )
    )
    if (collapsedCrumbs && display) {
      return [
        display[0],
        collapsedCrumbs,
        display[display.length - 2],
        display[display.length - 1]
      ]
    }
    return display
  }, [crumbs, collapsedCrumbs, classes, styles])

  return (
    <MuiBreadcrumbs
      separator={
        <NavigateNextRounded
          sx={{
            color: '#757575'
          }}
        />
      }
      {...other}
      className={cx('AruiBreadcrumbs-root', className)}
      sx={{
        '& .MuiBreadcrumbs-separator': {
          margin: 0
        },
        '& .MuiBreadcrumbs-ol': {
          flexWrap: 'nowrap'
        },
        '& .MuiBreadcrumbs-li:has(p), .MuiBreadcrumbs-li:has(a)': {
          flexShrink: 1,
          minWidth: 0
        },
        ...sx
      }}
      aria-label='breadcrumb'
    >
      {crumbsDisplay}
    </MuiBreadcrumbs>
  )
}

const CollapsedCrumbs = (props: { crumbs?: Crumb[] }) => {
  const { crumbs } = props

  const items = useMemo(
    () =>
      crumbs?.map(
        (crumb): MenuItem => ({
          key: crumb.url,
          to: crumb.url,
          label: crumb.label
        })
      ),
    [crumbs]
  )

  const { buttonProps, menu } = useButtonMenu({
    items
  })

  return (
    <>
      <IconButton
        size='small'
        {...buttonProps}
        sx={{
          borderRadius: 0.5
        }}
        disableTouchRipple
      >
        <MoreHorizRounded />
      </IconButton>

      {menu}
    </>
  )
}
