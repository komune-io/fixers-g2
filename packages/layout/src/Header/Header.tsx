import { cx } from '@emotion/css'
import {
  Box,
  BoxProps,
  Stack,
  Tab,
  Tabs,
  TabsProps,
  useTheme
} from '@mui/material'
import {
  BasicProps,
  MergeMuiElementProps,
  useTheme as useG2Theme
} from '@komune-io/g2-themes'
import { CSSProperties, ReactNode, useMemo, SyntheticEvent } from 'react'

export type HeaderTab = {
  key: string
  label: string
}

export type HeaderContent = {
  leftPart?: (JSX.Element | undefined)[]
  rightPart?: (JSX.Element | undefined)[]
}

interface HeaderClasses {
  contentContainer?: string
  lineContainer?: string
  leftPartContainer?: string
  rightPartContainer?: string
  tabs?: string
}

interface HeaderStyles {
  contentContainer?: CSSProperties
  lineContainer?: CSSProperties
  leftPartContainer?: CSSProperties
  rightPartContainer?: CSSProperties
  tabs?: CSSProperties
}

export interface HeaderBasicProps extends BasicProps {
  /**
   * The content of the header strictly displayed as a line with content to the left and right.
   * @default []
   */
  content?: HeaderContent[]
  /**
   * The content of the header freely displayed.
   */
  freeContent?: ReactNode
  /**
   * Provide this props if you want to have tabs in the header. It will disable the bottom padding and put the tabs instead.
   * @default []
   */
  tabs?: HeaderTab[]
  /**
   * Pass to this prop the key of the current tab
   */
  currentTab?: string
  /**
   * The event called when the tab changes
   */
  onTabChange?: (event: SyntheticEvent<Element, Event>, value: any) => void
  /**
   * Indicates whether or not to display the divider at the bottom of the header.
   * @true
   */
  withBottomDivider?: string
  /**
   * The tabs component props
   */
  tabsProps?: TabsProps
  /**
   * Define if the header is fixed or not.
   * @default true
   */
  isFixed?: boolean
  /**
   * Add a strong padding, used in the page headers for example
   * @default false
   */
  strongPadding?: boolean
  /**
   * background color of the header
   * @default theme.colors.background
   */
  bgcolor?: string
  /**
   * usually not needed, but if you have 2 headers on top of each others they might overlap each other in a weird way if they have the same z index
   * @default 300
   */
  zIndex?: number
  /**
   * The classes applied to the different part of the component
   */
  classes?: HeaderClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: HeaderStyles
}

export type HeaderProps = MergeMuiElementProps<BoxProps, HeaderBasicProps>

export const Header = (props: HeaderProps) => {
  const {
    content = [],
    freeContent,
    tabs,
    currentTab,
    withBottomDivider = true,
    isFixed = true,
    strongPadding = false,
    bgcolor,
    sx,
    onTabChange,
    tabsProps,
    classes,
    styles,
    className,
    zIndex = 300,
    ...rest
  } = props

  const theme = useTheme()
  const g2Theme = useG2Theme()

  const contentDisplay = useMemo(
    () =>
      content.map((it, index) => (
        <Stack
          className={cx('AruiHeader-lineContainer', classes?.lineContainer)}
          style={styles?.lineContainer}
          direction='row'
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: (theme) => theme.spacing(2)
          }}
          key={index}
        >
          {it.leftPart ? (
            <Stack
              direction='row'
              className={cx(
                'AruiHeader-leftPartContainer',
                classes?.leftPartContainer
              )}
              style={styles?.leftPartContainer}
              sx={{
                alignItems: 'center',
                gap: (theme) => theme.spacing(2)
              }}
              key={`${index}-leftPart`}
            >
              {it.leftPart}
            </Stack>
          ) : (
            <Box />
          )}
          {it.rightPart ? (
            <Stack
              className={cx(
                'AruiHeader-rightPartContainer',
                classes?.rightPartContainer
              )}
              style={styles?.rightPartContainer}
              direction='row'
              sx={{
                alignItems: 'center',
                gap: (theme) => theme.spacing(2),
                justifyContent: 'flex-end'
              }}
              key={`${index}-rightPart`}
            >
              {it.rightPart}
            </Stack>
          ) : (
            <Box />
          )}
        </Stack>
      )),
    [content, classes, styles]
  )

  const tabsDisplay = useMemo(
    () =>
      tabs &&
      tabs.map((tab) => (
        <Tab
          disableRipple
          key={tab.key}
          value={tab.key}
          label={tab.label}
          sx={{
            color: '#000000'
          }}
        />
      )),
    [tabs]
  )

  return (
    <Box
      className={cx('AruiHeader-root', className)}
      sx={{
        [theme.breakpoints.down('sm')]: {
          padding: (theme) => {
            const topPadding = theme.spacing(2)
            const horizontalPadding = strongPadding
              ? theme.spacing(2)
              : theme.spacing(1)
            if (tabs) {
              return `${topPadding} ${horizontalPadding} 0`
            }
            return `${topPadding} ${horizontalPadding}`
          }
        },
        padding: (theme) => {
          const topPadding = theme.spacing(2)
          const horizontalPadding = strongPadding
            ? theme.spacing(5)
            : theme.spacing(3)
          if (tabs) {
            return `${topPadding} ${horizontalPadding} 0`
          }
          return `${topPadding} ${horizontalPadding}`
        },
        borderBottom: withBottomDivider ? '1px solid #E0E0E0' : 'none',
        width: '100%',
        boxSizing: 'border-box',
        bgcolor: (theme) => {
          const color = bgcolor
            ? bgcolor
            : g2Theme.bgColorOnMenu
              ? 'white'
              : theme.palette.background.default
          return color + '99'
        },
        position: isFixed ? 'sticky' : 'relative',
        top: isFixed ? '0px' : undefined,
        backdropFilter: 'blur(15px)',
        webkitBackdropFilter: 'blur(15px)',
        zIndex: zIndex,
        ...sx
      }}
      {...rest}
    >
      <Stack
        className={cx('AruiHeader-contentContainer', classes?.contentContainer)}
        style={styles?.contentContainer}
        sx={{
          gap: (theme) => theme.spacing(2)
        }}
      >
        {freeContent}
        {contentDisplay}
        {tabsDisplay && (
          <Tabs
            {...tabsProps}
            className={cx('AruiHeader-tabs', classes?.tabs)}
            style={styles?.tabs}
            value={currentTab}
            onChange={onTabChange}
            variant='scrollable'
            scrollButtons='auto'
            sx={{
              marginTop: (theme) => `-${theme.spacing(1.5)}`,
              marginBottom: '-1px',
              ...tabsProps?.sx
            }}
          >
            {tabsDisplay}
          </Tabs>
        )}
      </Stack>
    </Box>
  )
}
