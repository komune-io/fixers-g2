import { useDidUpdate } from '@mantine/hooks'
import { Accordion, AccordionProps } from '@mui/material'
import React, { useCallback, useState } from 'react'

export const SpecialBehaviorAccordion = (props: AccordionProps) => {
  const { expanded, children, ...other } = props
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
      {children}
    </Accordion>
  )
}
