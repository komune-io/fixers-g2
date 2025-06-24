import { Stack, StackProps } from '@mui/material'
import { Chip } from '@komune-io/g2-components'
import { MergeMuiElementProps, useTheme } from '@komune-io/g2-themes'
import React, { useMemo } from 'react'
import { Tooltip } from '@komune-io/g2-notifications'
import { Option } from '../Select'

export interface LimitedListBasicProps<T extends {}> extends StackProps {
  values?: (Option & T)[]
  listedComponent: React.ElementType<any>
  /**
   * if undefined  the list is unlimited
   * @default undefined
   */
  limit?: number
}

export type LimitedListProps<T extends {}> = MergeMuiElementProps<
  StackProps,
  LimitedListBasicProps<T>
>

export const LimitedList = <T extends {} = {}>(props: LimitedListProps<T>) => {
  const { values = [], limit, listedComponent, ...other } = props
  const theme = useTheme()
  const tagsDisplay = useMemo(() => {
    const limited = limit ? values.slice(0, limit) : values
    const Component = listedComponent
    return limited.map((el) => <Component {...el} key={el.key ?? el.label} />)
  }, [values, limit, listedComponent])

  const textRest = useMemo(() => {
    if (limit && limit <= values.length - 1) {
      const rest = values.slice(limit, values.length).map((el) => el.label)
      return rest.join(' | ')
    }
    return undefined
  }, [values, limit, listedComponent])

  const lastChipColor = useMemo(() => {
    if (values.length > 0 && values[values.length - 1].color)
      return values[values.length - 1].color
    return theme.colors.primary
  }, [values, theme.colors.primary])

  return (
    <Stack direction='row' gap={0.5} flexWrap='wrap' {...other}>
      {tagsDisplay}
      {textRest && (
        <Tooltip helperText={textRest}>
          <Chip
            label={`+ ${values.length - (limit ?? 0)}`}
            sx={{
              bgcolor: lastChipColor + '1A',
              color: lastChipColor
            }}
          />
        </Tooltip>
      )}
    </Stack>
  )
}
