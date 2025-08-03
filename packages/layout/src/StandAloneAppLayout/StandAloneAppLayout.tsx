import { cx } from '@emotion/css'
import {
  Box,
  CssBaseline,
  Drawer,
  DrawerProps,
  IconButton,
  Stack,
  styled,
  SxProps,
  Theme,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { MenuItem } from '@komune-io/g2-components'
import { ThemeContext } from '@komune-io/g2-themes'
import {
  ComponentPropsWithRef,
  CSSProperties,
  ReactNode,
  useContext,
  useMemo
} from 'react'
import { AppLogoProps, AppMenu } from '../AppMenu'
import { UserMenu, UserMenuProps } from '../UserMenu'
import { Menu } from '@mui/icons-material'

const Main = styled('main', {
  shouldForwardProp: (prop) =>
    prop !== 'isMobile' && prop !== 'drawerWidth' && prop !== 'openDrawer'
})<{
  isMobile?: boolean
  drawerWidth: number
  openDrawer: boolean
}>(({ isMobile, drawerWidth, openDrawer, theme }) => ({
  flexGrow: 1,
  marginLeft: isMobile || !openDrawer ? '' : `${drawerWidth}px`,
  width: isMobile || !openDrawer ? '100vw' : `calc(100vw - ${drawerWidth}px)`,
  height: '100vh',
  overflow: 'auto',
  transition: !openDrawer
    ? theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    : theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
}))

interface StandAloneAppLayoutClasses {
  drawer?: string
  scrollableContainer?: string
  burgerButtonContainer?: string
  userMenu?: string
  main?: string
}

interface StandAloneAppLayoutStyles {
  drawer?: CSSProperties
  scrollableContainer?: CSSProperties
  burgerButtonContainer?: CSSProperties
  userMenu?: CSSProperties
  main?: CSSProperties
}

export interface StandAloneAppLayoutProps {
  /**
   * The application that has to be surrounded by the appbar and the drawer
   */
  children?: ReactNode
  /**
   * The list of the actions that will be displayed in the drawer menu
   */
  menu?: MenuItem[]
  /**
   * The logo in the navBar
   */
  logo?: AppLogoProps
  /**
   * Defined if the drawer is open or not. I you don't provide it an automatic behavior will be applied.
   */
  open?: boolean
  /**
   * Use these props to add a user menu to the drawer menu
   */
  userMenuProps?: UserMenuProps
  /**
   * Pass this props to false if you want to remove the default burger button to open the drawer
   *
   * @default true
   */
  defaultOpenButton?: boolean
  /**
   * Pass this props to false if you want to remove the default burger button to close the drawer
   *
   * @default true
   */
  defaultCloseButton?: boolean
  /**
   * If you have a fixed header that will get over the drawer set the padding to de the height of the header.
   * By default if there is a permanent header the padding is set to 90px
   */
  drawerPaddingTop?: string
  /**
   * The drawer component props
   */
  drawerProps?: DrawerProps
  /**
   * The main component props
   */
  mainProps?: ComponentPropsWithRef<'main'> & { sx?: SxProps<Theme> }
  /**
   * You can add additional scrollable content to the drawer menu with this prop
   */
  scrollableContent?: ReactNode
  /**
   * You can add additional content to the bottom of the drawer menu with this prop
   */
  bottomContent?: ReactNode
  /**
   * The classes applied to the different part of the component
   */
  classes?: StandAloneAppLayoutClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: StandAloneAppLayoutStyles
}

export const StandAloneAppLayout = (props: StandAloneAppLayoutProps) => {
  const {
    children,
    menu,
    logo,
    open,
    userMenuProps,
    drawerProps,
    mainProps,
    scrollableContent,
    bottomContent,
    defaultOpenButton = true,
    defaultCloseButton = true,
    drawerPaddingTop,
    classes,
    styles
  } = props
  const theme = useTheme()

  const {
    theme: g2Theme,
    openDrawer,
    toggleOpenDrawer
  } = useContext(ThemeContext)
  const isMobile =
    g2Theme.drawerAbsolutePositionBreakpoint === 'always'
      ? true
      : useMediaQuery(
          theme.breakpoints.down(g2Theme.drawerAbsolutePositionBreakpoint!)
        )

  const currentOpen = open !== undefined ? open : openDrawer

  const PermanentHeader = useMemo(
    () => g2Theme.permanentHeader,
    [g2Theme.permanentHeader]
  )

  return (
    <>
      {PermanentHeader && (
        <Box
          sx={{
            position: 'fixed',
            zIndex: 600,
            top: 0,
            left: 0,
            width: g2Theme.drawerWidth
          }}
        >
          <PermanentHeader
            toggleOpenDrawer={toggleOpenDrawer}
            openDrawer={currentOpen}
          />
        </Box>
      )}
      {defaultOpenButton && (
        <IconButton
          sx={{
            zIndex: 1001,
            position: 'fixed',
            top: 10,
            left: 10,
            width: 'fit-content'
          }}
          onClick={toggleOpenDrawer}
        >
          <Menu />
        </IconButton>
      )}
      <Drawer
        {...drawerProps}
        className={cx('AruiStandAloneAppLayout-drawer', classes?.drawer)}
        style={styles?.drawer}
        sx={{
          width: g2Theme.drawerWidth,
          zIndex: 500,
          position: 'relative',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: g2Theme.drawerWidth,
            boxSizing: 'border-box',
            border: 'unset',
            height: `100%`,
            overflow: 'visible',
            visibility: 'visible !important' as 'visible',
            bgcolor: (theme) =>
              g2Theme.bgColorOnMenu
                ? theme.palette.background.default
                : 'white',
            paddingTop: drawerPaddingTop
              ? drawerPaddingTop
              : PermanentHeader
                ? '90px'
                : undefined
          },
          ...drawerProps?.sx
        }}
        variant={isMobile ? 'temporary' : 'persistent'}
        ModalProps={{
          keepMounted: true
        }}
        onClose={toggleOpenDrawer}
        anchor='left'
        open={currentOpen}
      >
        {defaultCloseButton && (
          <IconButton
            sx={{
              zIndex: 1001,
              position: 'absolute',
              top: 10,
              right: 10,
              width: 'fit-content'
            }}
            onClick={toggleOpenDrawer}
          >
            <Menu />
          </IconButton>
        )}
        <Stack
          className={cx(
            'AruiStandAloneAppLayout-scrollableContainer',
            classes?.scrollableContainer
          )}
          style={styles?.scrollableContainer}
          sx={{
            gap: 2,
            height: '100%',
            width: '100%',
            overflow: 'auto'
          }}
        >
          {(menu || logo) && <AppMenu menu={menu ?? []} logo={logo} />}
          {scrollableContent}
        </Stack>
        {bottomContent}
        {userMenuProps && (
          <UserMenu
            defaultOpen={!isMobile}
            {...userMenuProps}
            className={cx(
              'AruiStandAloneAppLayout-userMenu',
              classes?.userMenu
            )}
            style={styles?.userMenu}
            sx={{
              position: 'relative',
              bottom: '0px',
              width: '100%',
              margin: '0px !important'
            }}
          />
        )}
      </Drawer>
      <CssBaseline />
      <Main
        {...mainProps}
        openDrawer={currentOpen}
        drawerWidth={g2Theme.drawerWidth}
        className={cx('AruiStandAloneAppLayout-main', classes?.main)}
        style={styles?.main}
        isMobile={isMobile}
        sx={{
          bgcolor: (theme) =>
            !g2Theme.bgColorOnMenu ? theme.palette.background.default : 'white',
          ...mainProps?.sx
        }}
      >
        {children}
      </Main>
    </>
  )
}
