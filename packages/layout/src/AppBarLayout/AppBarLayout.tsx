import { AppBar as MuiAppBar } from '@mui/material'
import { AppBarProps as MuiAppBarProps, Box, Toolbar } from '@mui/material'
import { Menu } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import {
  BasicProps,
  MergeMuiElementProps,
  makeG2Styles
} from '@komune-io/g2-themes'
import { CSSProperties, ReactNode } from 'react'

const useStyles = makeG2Styles()({
  root: {
    zIndex: 1100
  },
  iconButton: {
    marginRight: '20px'
  },
  toolbar: {
    paddingRight: '24px'
  }
})

interface AppBarLayoutClasses {
  menuButton?: string
  menuIcon?: string
  toolBar?: string
}

interface AppBarLayoutStyles {
  menuIcon?: CSSProperties
  toolBar?: CSSProperties
}

export interface AppBarLayoutBasicProps extends BasicProps {
  children?: ReactNode
  show?: boolean
  classes?: AppBarLayoutClasses
  styles?: AppBarLayoutStyles
  onDrawerOpen?: () => void
}

export type AppBarLayoutProps = MergeMuiElementProps<
  MuiAppBarProps,
  AppBarLayoutBasicProps
>

export const AppBarLayout = (props: AppBarLayoutProps) => {
  const {
    className,
    style,
    id,
    children,
    classes,
    styles,
    onDrawerOpen,
    show = true,
    ...other
  } = props
  const defaultStyles = useStyles()
  if (!show)
    return (
      <Box
        className={defaultStyles.cx(
          defaultStyles.classes.root,
          'AruiAppBar-root',
          className
        )}
      >
        {onDrawerOpen && (
          <IconButton
            className={defaultStyles.cx(
              defaultStyles.classes.iconButton,
              'AruiAppBar-menuButton',
              classes?.menuButton
            )}
            color='inherit'
            aria-label='Open drawer'
            onClick={onDrawerOpen}
            size='large'
          >
            <Menu
              className={defaultStyles.cx(
                'AruiAppBar-menuIcon',
                classes?.menuIcon
              )}
              style={styles?.menuIcon}
            />
          </IconButton>
        )}
        <Box
          display='flex'
          className={defaultStyles.cx(
            defaultStyles.classes.toolbar,
            'AruiAppBar-toolbar',
            classes?.toolBar
          )}
          style={styles?.toolBar}
        >
          {children}
        </Box>
      </Box>
    )
  return (
    <MuiAppBar
      className={defaultStyles.cx('AruiAppBar-root', className)}
      id={id}
      style={style}
      square={true}
      {...other}
    >
      <Toolbar
        className={defaultStyles.cx(
          defaultStyles.classes.toolbar,
          'AruiAppBar-toolbar',
          classes?.toolBar
        )}
        style={styles?.toolBar}
      >
        {onDrawerOpen && (
          <IconButton
            className={defaultStyles.cx(
              defaultStyles.classes.iconButton,
              'AruiAppBar-menuButton',
              classes?.menuButton
            )}
            color='inherit'
            aria-label='Open drawer'
            onClick={onDrawerOpen}
            size='large'
          >
            <Menu
              className={defaultStyles.cx(
                'AruiAppBar-menuIcon',
                classes?.menuIcon
              )}
              style={styles?.menuIcon}
            />
          </IconButton>
        )}
        {children}
      </Toolbar>
    </MuiAppBar>
  )
}
