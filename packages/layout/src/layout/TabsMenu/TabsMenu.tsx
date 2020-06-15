import React, { useState } from 'react'
import { createStyles, makeStyles, withStyles } from '@material-ui/core/styles'
import { AppBar, Tab, Tabs } from '@material-ui/core'
import { BasicProps } from '@smartb/archetypes-ui-components/dist/Types'
import clsx from 'clsx'

const useStyles = makeStyles(() =>
  createStyles({
    appBar: {
      background: 'transparent',
      boxShadow: 'none !important'
    },
    tab: {
      color: 'rgba(0, 0, 0, 0.87)',
      minWidth: '100px',
      maxWidth: '100px',
      minHeight: '10px',
      padding: '5px',
      overflow: 'hidden',
      whiteSpace: 'nowrap'
    },
    tabFW: {
      color: 'rgba(0, 0, 0, 0.87)',
      minHeight: '10px',
      minWidth: '0',
      padding: '5px'
    }
  })
)

const StyledTabs = withStyles(() => ({
  root: {
    minHeight: '20px',
    borderBottom: '0.2px #8f8f8f solid',
    overflow: 'visible',
    '& .MuiTabs-indicator': {
      backgroundColor: '#4d4d4d',
      height: '2px',
      bottom: '-1px'
    },
    '& .MuiTabs-scroller': {
      overflow: 'visible !important'
    }
  }
}))(Tabs)

export type Variant = 'fullWidth' | 'fixedWidth'

export interface Tab {
  label: string
  icon?: JSX.Element
}

interface TabsMenuClasses {
  appBar?: string
  tabs?: string
  tab?: string
  content?: string
}

interface TabsMenuStyles {
  appBar?: React.CSSProperties
  tabs?: React.CSSProperties
  tab?: React.CSSProperties
  content?: React.CSSProperties
}

export interface TabsMenuProps extends BasicProps {
  tabs: Tab[]
  children: React.ReactNode[]
  variant?: Variant
  classes?: TabsMenuClasses
  styles?: TabsMenuStyles
}

export const TabsMenu = (props: TabsMenuProps) => {
  const {
    tabs,
    children,
    style,
    className,
    variant = 'fullWidth',
    id,
    classes,
    styles
  } = props
  const defaultClasses = useStyles()
  const [value, setValue] = useState(0)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    event.stopPropagation()
    setValue(newValue)
  }

  return (
    <div className={clsx('AruiTabsMenu-root', className)} style={style} id={id}>
      <AppBar
        className={clsx(
          defaultClasses.appBar,
          'AruiTabsMenu-appBar',
          classes?.appBar
        )}
        style={styles?.appBar}
        position='static'
      >
        <StyledTabs
          value={value}
          style={
            variant === 'fixedWidth'
              ? { ...styles?.tabs, width: `${children.length * 100}px` }
              : styles?.tabs
          }
          className={clsx('AruiTabsMenu-tabs', classes?.tabs)}
          onChange={handleChange}
          variant={variant !== 'fullWidth' ? 'scrollable' : 'fullWidth'}
          scrollButtons='auto'
        >
          {tabs.map((tab, index) => (
            <Tab
              icon={tab.icon}
              key={index}
              className={clsx(
                {
                  [defaultClasses.tab]: variant !== 'fullWidth',
                  [defaultClasses.tabFW]: variant === 'fullWidth'
                },
                'AruiTabsMenu-tab',
                classes?.tab
              )}
              style={styles?.tab}
              label={tab.label}
            />
          ))}
        </StyledTabs>
      </AppBar>
      {children.map((child, index) => (
        <div
          key={index}
          className={clsx('AruiTabsMenu-content', classes?.content)}
          style={{
            ...styles?.content,
            display: value !== index ? 'none' : 'block'
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}
