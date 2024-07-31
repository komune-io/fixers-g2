import React from 'react'
import { MenuItems } from '../Menu'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary as MuiAccordionSummary,
  ListItemText,
  MenuItem,
  MenuList,
  MenuListProps,
  Typography,
  AccordionSummaryProps,
  styled,
  Divider,
  Stack
} from '@mui/material'
import { ChevronRightRounded } from '@mui/icons-material'

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
    <MenuList
      sx={{
        p: 'unset',
        ...sx
      }}
      {...other}
    >
      {display}
    </MenuList>
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
    ...other
  } = props

  const textEllipsis = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }

  if (items)
    return (
      <MenuItem
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
        <Accordion
          elevation={0}
          disableGutters
          defaultExpanded={isSelected}
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
                color: 'text.secondary',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                bgcolor: isSelected
                  ? (theme) => theme.palette.primary.main + '1A'
                  : undefined,
                borderRadius: 0.5,
                px: 0.5,
                my: 1,
                minWidth: 0
              },
              '&:hover .MuiAccordionSummary-content': {
                bgcolor: (theme) => theme.palette.primary.main + '1A'
              }
            }}
          >
            {icon}
            <Typography sx={textEllipsis}>{label}</Typography>
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
              }
            }}
          >
            <DropdownMenu items={items} />
          </AccordionDetails>
        </Accordion>
      </MenuItem>
    )
  return (
    <MenuItem
      LinkComponent={component}
      disableRipple
      disableTouchRipple
      sx={{
        '& .MenuItem-divider': {
          bgcolor: isSelected
            ? (theme) => theme.palette.primary.main + '1A'
            : undefined,
          borderRadius: 0.5,
          px: 0.5
        },
        '&:hover .MenuItem-divider': {
          bgcolor: (theme) => theme.palette.primary.main + '1A'
        },
        '&:hover': {
          bgcolor: 'unset'
        },
        gap: 2,
        p: 0,
        height: '32px',
        color: 'text.secondary'
      }}
      {...componentProps}
      {...other}
    >
      <Divider
        sx={{ display: 'none', ml: 1.5 }}
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
          sx={{
            '& .MuiTypography-root': textEllipsis
          }}
        >
          {label}
        </ListItemText>
      </Stack>
    </MenuItem>
  )
}
