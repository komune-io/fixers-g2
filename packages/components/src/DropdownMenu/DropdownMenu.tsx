import React from 'react'
import { MenuItems } from '../Menu'
import {
  AccordionDetails,
  AccordionSummary as MuiAccordionSummary,
  ListItemText,
  ListItemButton,
  List,
  MenuListProps,
  Typography,
  AccordionSummaryProps,
  styled,
  Divider,
  Stack
} from '@mui/material'
import { ChevronRightRounded } from '@mui/icons-material'
import { SpecialBehaviorAccordion } from './SpecialBehaviorAccordion'

// const stopPropagation = (e: MouseEvent) => e?.stopPropagation()

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ChevronRightRounded sx={{ color: 'text.secondary' }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)'
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1)
  }
}))

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
            width: '100%',
            px: 0,
            '&:not(:last-child)': {
              borderBottom: 0
            },
            '&::before': {
              display: 'none'
            }
          }}
        >
          <AccordionSummary
            aria-controls={`${label}-content`}
            sx={{
              pr: 0,
              pl: 0,
              minHeight: 0,
              '& .MuiAccordionSummary-content': {
                color: isSelected ? '#387A6E' : 'text.secondary',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                bgcolor: isSelected ? '#387A6E1A' : undefined,
                borderRadius: 0.5,
                px: 0.5,
                my: 0.75,
                minWidth: 0
              },
              '&:hover .MuiAccordionSummary-content': {
                bgcolor: '#387A6E1A'
              }
            }}
          >
            {icon}
            <Typography
              component={component ? component : href ? 'a' : 'p'}
              // onClick={isOpen ? stopPropagation : undefined}
              sx={{
                flexGrow: 1,
                textDecoration: 'none',
                color: 'currentcolor'
              }}
              noWrap
              {...componentProps}
              {...other}
            >
              {label}
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              paddingRight: 'none',
              p: 0,
              '& .subMenuItem-divider': {
                display: 'block'
              },
              '& .MuiAccordionSummary-root': {
                pl: 1
              },
              '& .MuiAccordionDetails-root': {
                pl: 1
              },
              '& .MuiListItemButton-root:first-of-type': {
                pt: 0
              }
            }}
          >
            <DropdownMenu items={items} />
          </AccordionDetails>
        </SpecialBehaviorAccordion>
      </ListItemButton>
    )
  return (
    <ListItemButton
      component={component ? component : href ? 'a' : 'div'}
      href={href}
      disableRipple
      disableTouchRipple
      sx={{
        '& .MenuItem-divider': {
          bgcolor: isSelected ? '#387A6E1A' : undefined,
          color: isSelected ? '#387A6E' : undefined,
          borderRadius: 0.5,
          px: 0.5
        },
        '&:hover .MenuItem-divider': {
          bgcolor: '#387A6E1A'
        },
        '&:hover': {
          bgcolor: 'unset'
        },
        gap: 2,
        p: 0,
        py: 0.5,
        color: 'text.secondary'
      }}
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
            sx: { color: 'currentcolor' }
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
