import React from 'react'
import { MenuItems } from '../Menu'
import {
  ListItemText,
  ListItemButton,
  List,
  MenuListProps,
  Divider,
  Stack,
  alpha
} from '@mui/material'
import { SpecialBehaviorAccordion } from './SpecialBehaviorAccordion'

export interface DropdownMenuProps extends MenuListProps {
  items: MenuItems[]
}

export const DropdownMenu = (props: DropdownMenuProps) => {
  const { items, sx, ...other } = props

  const display = items.map((item) => <Item {...item} key={item.key} />)
  return (
    <List
      sx={{
        p: 'unset',
        ...sx
      }}
      {...other}
    >
      {display}
    </List>
  )
}

const Item = (props: MenuItems<{}>) => {
  const {
    items,
    isSelected,
    label,
    icon,
    component,
    componentProps,
    href,
    ...other
  } = props

  const childIsSelected = items ? someItemsSelected(items) : false
  const isOpen = childIsSelected || isSelected

  if (items)
    return (
      <ListItemButton
        sx={{
          p: 0,
          '&:hover': {
            bgcolor: 'unset'
          }
        }}
        disableRipple
        disableTouchRipple
      >
        <Divider
          sx={{ display: 'none', ml: 1.5 }}
          className='subMenuItem-divider'
          orientation='vertical'
          flexItem
        />
        <SpecialBehaviorAccordion
          elevation={0}
          disableGutters
          expanded={isOpen}
          sx={{
            cursor: 'normal',
            bgcolor: 'transparent',
            width: 'calc(100% - 12px)',
            px: 0,
            '&:not(:last-child)': {
              borderBottom: 0
            },
            '&::before': {
              display: 'none'
            }
          }}
          childIsSelected={childIsSelected}
          item={props}
        >
          <DropdownMenu items={items} />
        </SpecialBehaviorAccordion>
      </ListItemButton>
    )
  return (
    <ListItemButton
      component={component ? component : href ? 'a' : 'div'}
      href={href}
      disableRipple
      disableTouchRipple
      sx={(theme) => ({
        '& .MenuItem-divider': {
          bgcolor: isSelected
            ? alpha(theme.palette.primary.main, 0.1)
            : undefined,
          color: isSelected ? 'primary.main' : undefined,
          borderRadius: 0.5,
          px: 0.5
        },
        '&:hover .MenuItem-divider': {
          bgcolor: 'secondary.main'
        },
        '&:hover': {
          bgcolor: 'unset'
        },
        gap: 2,
        p: 0,
        py: 0.5,
        color: 'text.secondary'
      })}
      {...componentProps}
      {...other}
    >
      <Divider
        sx={{ display: 'none', ml: 1.5, my: -0.5 }}
        className='subMenuItem-divider'
        orientation='vertical'
        flexItem
      />
      <Stack
        className='MenuItem-divider'
        direction='row'
        alignItems='center'
        gap={1}
        minWidth={0}
        width='100%'
      >
        {icon}
        <ListItemText
          sx={{ m: 0 }}
          primaryTypographyProps={{
            noWrap: true,
            sx: { color: 'currentcolor' },
            variant: 'body2'
          }}
        >
          {label}
        </ListItemText>
      </Stack>
    </ListItemButton>
  )
}

const someItemsSelected = (items: MenuItems[]) => {
  const isSelected = items.some((item) => item.isSelected)
  if (isSelected) return true
  const childIsSelected = items.some((item) => {
    if (item.items) return someItemsSelected(item.items)
    return false
  })
  return childIsSelected
}
