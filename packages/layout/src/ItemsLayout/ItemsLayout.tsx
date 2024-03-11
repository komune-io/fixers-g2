import React from 'react'
import { MenuItems } from '@komune-io/g2-components'
import {
  MenuItem as MuiMenuItem,
  Typography,
  ListItemIcon,
  Grid
} from '@mui/material'
import { BasicProps, makeG2STyles } from '@komune-io/g2-themes'
import { MergeReactElementProps } from '@komune-io/g2-utils'

const useStyles = makeG2STyles()({
  gridContainer: {
    display: 'flex',
    padding: '5px',
    flexWrap: 'wrap',
    boxSizing: 'initial'
  },
  gridItem: {
    width: '110px',
    display: 'flex',
    height: '95px',
    margin: '3px',
    padding: '5px',
    flexWrap: 'nowrap',
    borderRadius: '3px',
    cursor: 'pointer',
    '& h6': {
      maxWidth: '100px',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden'
    },
    '&:hover h6': {
      textOverflow: 'initial',
      whiteSpace: 'initial'
    },
    '&:hover': {
      height: 'auto',
      minHeight: '90px',
      background: '#f5f5f5'
    }
  },
  gridRoot: {
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  item: {
    padding: '6px 15px'
  },
  icon: {
    minWidth: '0px',
    marginRight: '10px'
  }
})

export type Display = 'list' | 'grid'

interface ItemsLayoutClasses {
  gridContainer?: string
  gridItem?: string
  listItem?: string
}

interface ItemsLayoutStyles {
  gridContainer?: React.CSSProperties
  gridItem?: React.CSSProperties
  listItem?: React.CSSProperties
}

export interface ItemsLayoutBasicProps extends BasicProps {
  /**
   * MenuItems contains all the items that will be displayed in the profile
   */
  menu: MenuItems
  /**
   * The organization of the items
   */
  display?: Display
  /**
   * The classes applied to the different part of the component
   */
  classes?: ItemsLayoutClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: ItemsLayoutStyles
}

export type ItemsLayoutProps = MergeReactElementProps<
  'div',
  ItemsLayoutBasicProps
>

export const ItemsLayout = React.forwardRef(
  (props: ItemsLayoutProps, ref: React.Ref<HTMLDivElement>) => {
    const {
      menu,
      display = 'list',
      className,
      style,
      id,
      classes,
      styles,
      ...other
    } = props
    const defaultStyles = useStyles()

    if (display === 'list')
      return (
        <div
          className={defaultStyles.cx('AruiItemsLayout-listRoot', className)}
          style={style}
          id={id}
          ref={ref}
          {...other}
        >
          {menu.items &&
            menu.items.map((it) => (
              <MuiMenuItem
                component={it.href ? 'a' : 'div'}
                onClick={() => it.goto && !it.href && it.goto()}
                href={it.href}
                className={defaultStyles.cx(
                  defaultStyles.classes.item,
                  'AruiItemsLayout-listItem',
                  classes?.listItem
                )}
                style={styles?.listItem}
                key={it.key}
              >
                {it.icon && (
                  <ListItemIcon classes={{ root: defaultStyles.classes.icon }}>
                    {it.icon}
                  </ListItemIcon>
                )}
                <Typography variant='subtitle2'>{it.label}</Typography>
              </MuiMenuItem>
            ))}
        </div>
      )
    return (
      <div
        className={defaultStyles.cx(
          defaultStyles.classes.gridRoot,
          'AruiItemsLayout-gridRoot',
          className
        )}
        style={style}
        id={id}
        ref={ref}
        {...other}
      >
        <Grid
          wrap='wrap'
          container
          direction='row'
          alignContent='flex-start'
          className={defaultStyles.cx(
            defaultStyles.classes.gridContainer,
            'AruiItemsLayout-gridContainer',
            classes?.gridContainer
          )}
          style={styles?.gridContainer}
        >
          {menu.items &&
            menu.items.map((it) => (
              <Grid
                key={it.key}
                component={it.href ? 'a' : 'div'}
                onClick={() => it.goto && !it.href && it.goto()}
                href={it.href}
                alignItems='center'
                direction='column'
                justifyContent='space-around'
                className={defaultStyles.cx(
                  defaultStyles.classes.gridItem,
                  'AruiItemsLayout-gridItem',
                  classes?.gridItem
                )}
                style={styles?.gridItem}
              >
                {it.icon}
                <Typography variant='subtitle2' align='center'>
                  {it.label}
                </Typography>
              </Grid>
            ))}
        </Grid>
      </div>
    )
  }
)
