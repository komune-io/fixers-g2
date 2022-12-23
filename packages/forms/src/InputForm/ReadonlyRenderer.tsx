import { Stack, Typography } from '@mui/material'
import { Link as G2Link, Chip } from '@smartb/g2-components'
import React, { useCallback, useMemo } from 'react'
import { InputFormProps } from './InputForm'
import { Link, LinkProps } from 'react-router-dom'
import { defaultGetOptionLabel } from '../AutoComplete'

const getLabelOfOption = (
  option: any,
  getOptionLabel?: (option: any) => string
) => {
  if (option) {
    if (getOptionLabel) return getOptionLabel(option)
    if (option.label) return option.label
  }
  return ''
}

export const ReadonlyRenderer = (props: Partial<InputFormProps>) => {
  const {
    readonlyType = 'text',
    inputType,
    value,
    values,
    choices,
    options = [],
    multiple,
    getReadonlyChipColor,
    getReadonlyTextUrl,
    getOptionLabel,
    size
  } = props

  //@ts-ignore
  const hasKey = !!options[0]?.key

  const defaultOptionLabelMemo = useCallback(
    //@ts-ignore
    (option) => defaultGetOptionLabel(options, hasKey)(option),
    [options, hasKey]
  )

  const getOptionLabelMemo = getOptionLabel ?? defaultOptionLabelMemo

  const textToDisplay = useMemo(() => {
    if (inputType === 'datePicker') return new Date(value).toLocaleDateString()
    if (inputType === 'radioChoices' && choices && value)
      return choices.find((c) => c.key === value)?.label
    if (multiple) {
      if (options && values) {
        return values
          .map((v: any) =>
            getLabelOfOption(
              options.find((o) => o.key === v || o.key === v.key),
              getOptionLabelMemo
            )
          )
          .join(', ')
      }
    } else if (options && value !== undefined) {
      const option = options.find(
        (c) => c.key === value || c.key === value?.key
      )
      return getLabelOfOption(option, getOptionLabelMemo)
    }
    return typeof value === 'string' || typeof value === 'number' ? value : ''
  }, [inputType, value, values, choices, multiple, options, getOptionLabelMemo])

  const renderTag = useMemo(() => {
    if (readonlyType === 'text') return undefined
    if (!multiple) {
      const option = options?.find((o) => o.key === value)
      return (
        <Chip
          label={textToDisplay}
          color={
            option?.color ??
            (getReadonlyChipColor && getReadonlyChipColor(textToDisplay))
          }
        />
      )
    } else if (options && values) {
      return values.map((value) => {
        const option = options.find((o) => o.key === value)
        if (!option?.label) return undefined
        return (
          <Chip
            key={option.key}
            label={`${option?.label}`}
            color={
              option?.color ??
              (getReadonlyChipColor && getReadonlyChipColor(option?.label))
            }
          />
        )
      })
    }
    return
  }, [readonlyType, textToDisplay, value, options])

  const url = useMemo(() => {
    if (!value || !getReadonlyTextUrl) return undefined
    return getReadonlyTextUrl(value)
  }, [value, getReadonlyTextUrl])

  if (readonlyType === 'text') {
    if (url)
      return (
        <G2Link<LinkProps>
          componentProps={{ to: url }}
          component={Link}
          sx={{ color: '#676879' }}
          variant={size === 'small' ? 'body2' : 'body1'}
          className='AruiInputForm-readonlyLink'
        >
          {textToDisplay}
        </G2Link>
      )
    else
      return (
        <Typography
          sx={{ color: '#676879' }}
          variant={size === 'small' ? 'body2' : 'body1'}
          className='AruiInputForm-readonlyText'
        >
          {textToDisplay}
        </Typography>
      )
  }
  return (
    <Stack
      direction='row'
      sx={{
        gap: (theme) => theme.spacing(0.5)
      }}
    >
      {renderTag}
    </Stack>
  )
}
