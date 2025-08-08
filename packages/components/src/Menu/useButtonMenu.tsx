import {
  CircularProgress,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem as MuiMenuItem
} from '@mui/material'
import { MouseEvent, useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { MenuItem } from './MenuItem'

export interface useButtonMenuParams {
  items?: MenuItem[]
}

export const useButtonMenu = (params: useButtonMenuParams) => {
  const { items } = params
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = useCallback((event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }, [])

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const menu = useMemo(
    () => (
      <Menu
        sx={{
          '& .MuiPaper-root': {
            borderRadius: 1.5
          }
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {items?.map((item) => {
          return <Item {...item} key={item.key} />
        })}
      </Menu>
    ),
    [items, anchorEl, open]
  )

  const buttonProps = useMemo(
    () => ({
      'aria-controls': open ? 'basic-menu' : undefined,
      'aria-haspopup': 'true' as const,
      'aria-expanded': open ? ('true' as const) : undefined,
      onClick: handleClick
    }),
    [open, handleClick]
  )

  return {
    menu,
    buttonProps
  }
}

const Item = (props: MenuItem) => {
  const { to, icon, label, color, isLoading, onClick, ...rest } = props

  const [loading, setloading] = useState(false)

  const onClickMemoisied = useCallback(async () => {
    if (onClick) {
      setloading(true)
      await onClick()
      setloading(false)
    }
  }, [onClick])

  const loadingDef = isLoading ?? loading
  return (
    <MuiMenuItem
      {...rest}
      onClick={onClickMemoisied}
      sx={{
        color,
        '&:hover': {
          bgcolor: color ? color + '1A' : undefined
        },
        '&:hover .MuiListItemIcon-root, &:hover .MuiTypography-root': {
          color
        }
      }}
      //@ts-ignore
      component={to ? Link : undefined}
      to={to}
    >
      {(loadingDef || icon) && (
        <ListItemIcon>
          {loadingDef ? <CircularProgress size={24} color='inherit' /> : icon}
        </ListItemIcon>
      )}
      <ListItemText>{label}</ListItemText>
    </MuiMenuItem>
  )
}
