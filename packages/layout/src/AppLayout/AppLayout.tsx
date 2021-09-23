import React, { useMemo } from 'react'
import { Drawer, Theme, DrawerProps } from  '@mui/material'
import { createStyles } from  '@mui/material'
import clsx from 'clsx'
import { StyleProps } from '../StyleProps'
import {
  Theme as SBTheme,
  useTheme,
  lowLevelStyles
} from '@smartb/g2-themes'
import { AppBarLayout, AppBarLayoutProps } from '../AppBarLayout'

const useStyles = lowLevelStyles<
  { styleprops: StyleProps; theme: SBTheme },
  Theme
>()((theme: Theme) =>
  createStyles({
    appbar: (props) => ({
      height: `${props.styleprops.appBarHeight}px`,
      backgroundColor: props.theme.colors.primary,
      boxShadow: props.theme.shadows[4],
      '& .MuiToolbar-root': {
        height: '100%'
      },
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    }),
    appBarOpen: (props) => ({
      width: `calc(100% - ${props.styleprops.menuWidth}px)`,
      marginLeft: `${props.styleprops.menuWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    }),
    titleContainer: (props) => ({
      height: `${props.styleprops.appBarHeight}px`,
      paddingLeft: '10px',
      display: 'flex',
      alignItems: 'center',
      position: 'fixed',
      marginLeft: `0px`,
      top: '0px',
      left: '0px',
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    }),
    titleContainerOpen: (props) => ({
      marginLeft: `${props.styleprops.menuWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    }),
    drawer: (props) => ({
      width: `${props.styleprops.menuWidth}px`,
      '& .MuiDrawer-paper': {
        top: `0px`,
        zIndex: 1000,
        width: `${props.styleprops.menuWidth}px`,
        background: 'white',
        height: `100vh`,
        overflowX: 'hidden',
        transition: theme.transitions.create('transform', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen
        })
      }
    }),
    drawerClosed: (props) => ({
      '& .MuiDrawer-paper': {
        transform: `translateX(-${props.styleprops.menuWidth}px)`,
        transition: theme.transitions.create('transform', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.leavingScreen
        })
      }
    }),
    main: (props) => ({
      flexGrow: 1,
      transition: theme.transitions.create('padding', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      paddingTop: props.styleprops.appBarHeight,
      paddingLeft: `${props.styleprops.menuWidth + 10}px`,
      paddingRight: '10px'
    }),
    mainShift: (props) => ({
      flexGrow: 1,
      paddingTop: props.styleprops.appBarHeight,
      paddingLeft: '10px',
      paddingRight: '10px',
      transition: theme.transitions.create('padding', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    }),
    hidder: {
      opacity: '0.5',
      position: 'fixed',
      height: '100vh',
      width: '100vw',
      backgroundColor: 'black',
      top: '0',
      left: '0',
      zIndex: 5
    }
  })
)

interface AppLayoutClasses {
  main?: string
}

interface AppLayoutStyles {
  main?: React.CSSProperties
}

export interface AppLayoutProps {
  /**
   * The optionnal props of the appBar
   *
   * **See the reference below** ⬇️
   */
  appBarLayoutProps?: Partial<AppBarLayoutProps>
  /**
   * The optionnal props of the drawer
   *
   * **See the reference below** ⬇️
   */
  drawerProps?: Partial<DrawerProps>
  /**
   * The content that will be displayed in the appBAr
   */
  appBarContent?: React.ReactNode
  /**
   * The application that has to be surrounded by the appbar and the drawer
   */
  children?: React.ReactNode
  /**
   * Defined if the drawer is open or not
   */
  open: boolean
  /**
   * The base dimension of the appLayout
   */
  styleProps: StyleProps
  /**
   * Defined if the appBar will be displayed or not
   */
  showAppBar?: boolean
  /**
   * Defined if the drawer will be displayed or not
   */
  showDrawer?: boolean
  /**
   * The content that will be displayed in the drawer
   */
  drawerContent?: React.ReactNode
  /**
   * The function that is called when the hamburger button is clicked
   */
  onToggle?: () => void
  /**
   * The classes applied to the different part of the component
   */
  classes?: AppLayoutClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: AppLayoutStyles
}

export const AppLayout = (props: AppLayoutProps) => {
  const {
    children,
    appBarContent,
    appBarLayoutProps,
    drawerProps,
    showDrawer = true,
    drawerContent,
    open,
    styleProps,
    showAppBar = true,
    classes,
    styles,
    onToggle
  } = props
  const theme = useTheme()
  const stylesDependencies = useMemo(
    (): { styleprops: StyleProps; theme: SBTheme } => ({
      styleprops: styleProps,
      theme: theme
    }),
    [styleProps, theme]
  )
  const defaultClasses = useStyles(stylesDependencies)

  return (
    <>
      <AppBarLayout
        {...appBarLayoutProps}
        className={
          showAppBar
            ? clsx(
                defaultClasses.appbar,
                open && defaultClasses.appBarOpen,
                appBarLayoutProps?.className
              )
            : clsx(
                defaultClasses.titleContainer,
                open && defaultClasses.titleContainerOpen,
                appBarLayoutProps?.className
              )
        }
        onDrawerOpen={showDrawer ? onToggle : undefined}
        show={showAppBar}
      >
        {appBarContent}
      </AppBarLayout>
      {showDrawer && (
        <Drawer
          open={open}
          variant='persistent'
          {...drawerProps}
          className={clsx(
            defaultClasses.drawer,
            !open && defaultClasses.drawerClosed,
            drawerProps?.className
          )}
        >
          {drawerContent}
        </Drawer>
      )}
      <main
        className={clsx(
          open ? defaultClasses.main : defaultClasses.mainShift,
          'AruiApp-main',
          classes?.main
        )}
        style={styles?.main}
      >
        <div
          className={defaultClasses.hidder}
          style={{
            display: window.innerWidth < 768 && open ? 'block' : 'none'
          }}
          onClick={onToggle}
        />
        {children}
      </main>
    </>
  )
}
