import { useDidUpdate } from '@mantine/hooks'
import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummaryProps,
  AccordionSummary as MuiAccordionSummary,
  Typography,
  alpha,
  styled
} from '@mui/material'
import React, { useCallback, useState } from 'react'
import { MenuItems } from '../Menu'
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

const stopPropagation = (e: MouseEvent) => e?.stopPropagation()

export const SpecialBehaviorAccordion = (
  props: AccordionProps & { item: MenuItems<{}>; childIsSelected: boolean }
) => {
  const { expanded, children, item, childIsSelected, ...other } = props
  const {
    label,
    isSelected,
    icon,
    component,
    href,
    componentProps,
    ...otherItemProps
  } = item
  const [customExpanded, setcustomExpanded] = useState(expanded)

  useDidUpdate(() => {
    setcustomExpanded(expanded)
  }, [expanded])

  const onChange = useCallback(
    (_: React.SyntheticEvent<Element, Event>, expanded: boolean) => {
      setcustomExpanded(expanded)
    },
    []
  )

  return (
    <Accordion expanded={customExpanded} onChange={onChange} {...other}>
      <AccordionSummary
        aria-controls={`${label}-content`}
        sx={(theme) => ({
          pr: 0,
          pl: 0,
          minHeight: 0,
          '& .MuiAccordionSummary-content': {
            color: isSelected ? 'primary.main' : 'text.secondary',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            bgcolor: isSelected
              ? alpha(theme.palette.primary.main, 0.1)
              : undefined,
            borderRadius: 0.5,
            px: 0.5,
            my: 0.75,
            ml: 0.5,
            minWidth: 0
          },
          '&:hover .MuiAccordionSummary-content': {
            bgcolor: 'secondary.main'
          }
        })}
      >
        {icon}
        <Typography
          component={component ? component : href ? 'a' : 'p'}
          onClick={childIsSelected ? stopPropagation : undefined}
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'currentcolor'
          }}
          //@ts-ignore
          variant='body2'
          noWrap
          {...componentProps}
          {...otherItemProps}
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
        {customExpanded ? children : null}
      </AccordionDetails>
    </Accordion>
  )
}
