import { Stack, Typography } from '@mui/material'
import { Link as G2Link, Chip } from '@komune-io/g2-components'
import React, { useMemo } from 'react'
import { InputFormProps } from './InputForm'
import { Link, LinkProps } from 'react-router-dom'
import { Option } from '../Select'
import { LimitedList } from '../LimitedList'
import { useTranslation } from 'react-i18next'
import { formatNumber } from '@komune-io/g2-utils'

const getLabelOfOption = (
  option: any,
  getOptionLabel?: (option: any) => string
) => {
  if (option) {
    if (getOptionLabel) return getOptionLabel(option)
    if (option.label) return option.label
  }
  return undefined
}

export const ReadOnlyRenderer = (props: Partial<InputFormProps>) => {
  const {
    readOnlyType = 'text',
    readOnlyFractionDigits,
    inputType,
    value,
    values,
    options,
    multiple,
    getReadOnlyChipColor,
    getReadOnlyTextUrl,
    getOptionLabel,
    getOptionKey,
    readOnlyElement,
    emptyValueInReadOnly,
    chipLimit,
    size
  } = props

  const { i18n } = useTranslation()

  const hValue = useMemo(() => {
    if (typeof value === 'object' && !value.key && getOptionKey) {
      return {
        ...value,
        key: getOptionKey(value)
      }
    }
    return value
  }, [value, getOptionKey])

  const hValues = useMemo(() => {
    if (
      values &&
      values.length > 0 &&
      typeof values[0] === 'object' &&
      !values[0].key &&
      getOptionKey
    ) {
      return values.map((v: any) => ({
        ...v,
        key: getOptionKey(v)
      }))
    }
    return values
  }, [values, getOptionKey])

  const hoptions = useMemo(() => {
    const optionsCopy = options ? [...options] : []
    if (typeof hValue === 'object') {
      optionsCopy.push(hValue)
    } else if (
      hValues &&
      hValues?.length > 0 &&
      typeof hValues[0] === 'object'
    ) {
      optionsCopy.push(...hValues)
    }
    if (optionsCopy.length > 0 && !optionsCopy[0].key && getOptionKey) {
      return optionsCopy.map((option) => ({
        ...option,
        label: getLabelOfOption(option, getOptionLabel),
        key: getOptionKey(option)
      }))
    }
    return optionsCopy.map((option) => ({
      ...option,
      label: getLabelOfOption(option, getOptionLabel)
    }))
  }, [options, getOptionKey, getOptionLabel, hValue, hValues])

  const valuesIsEmpty =
    (props.value == undefined || props.value === '') &&
    (props.values == undefined || props.values.length === 0)

  const textToDisplay = useMemo(() => {
    if (valuesIsEmpty) return emptyValueInReadOnly
    if (inputType === 'datePicker') return new Date(hValue).toLocaleDateString()
    if (inputType === 'radioChoices' && hValue)
      return hoptions.find((c) => c.key === hValue)?.label
    if (multiple) {
      if (hoptions.length > 0 && hValues) {
        return hValues
          .map(
            (v: any) =>
              hoptions.find((o) => o.key === v || o.key === v.key)?.label
          )
          .join(', ')
      }
    } else if (hoptions.length > 0 && hValue !== undefined) {
      const option = hoptions.find(
        (c) => c.key === hValue || c.key === hValue?.key
      )
      return option?.label
    }
    if (typeof hValue === 'number' || !isNaN(Number(hValue))) {
      return formatNumber(Number(hValue), i18n.language, readOnlyFractionDigits)
    }
    return typeof hValue === 'string' || typeof hValue === 'number'
      ? hValue
      : ''
  }, [
    inputType,
    hValue,
    hValues,
    multiple,
    hoptions,
    emptyValueInReadOnly,
    valuesIsEmpty,
    getOptionKey,
    i18n.language,
    readOnlyFractionDigits
  ])

  const renderTag = useMemo((): Option[] | undefined => {
    if (readOnlyType !== 'chip') return undefined
    if (!multiple || valuesIsEmpty) {
      const option = hoptions?.find(
        (o) => o.key === hValue || o.key === hValue.key
      )
      return [
        {
          key: option?.key ?? hValue,
          label: textToDisplay,
          color:
            option?.color ??
            (getReadOnlyChipColor && getReadOnlyChipColor(option))
        }
      ]
    } else if (hoptions.length > 0 && hValues) {
      return hValues
        .map((value) => {
          const option = hoptions.find(
            (o) => o.key === value || o.key === value.key
          )
          if (!option) return undefined
          return {
            key: option.key.toString(),
            label: `${option.label}`,
            color:
              option?.color ??
              (getReadOnlyChipColor && getReadOnlyChipColor(option))
          }
        })
        .filter(Boolean) as Option[]
    }
    return
  }, [readOnlyType, textToDisplay, hValue, hValues, hoptions, valuesIsEmpty])

  const renderCustom = useMemo(() => {
    if (
      (readOnlyType !== 'customElement' &&
        readOnlyType !== 'customContainer') ||
      !readOnlyElement
    )
      return undefined
    const Element = readOnlyElement
    if (!multiple) {
      return <Element valueKey={hValue} value={textToDisplay} />
    } else if (
      hoptions.length > 0 &&
      hValues &&
      readOnlyType === 'customElement'
    ) {
      return hValues.map((value) => {
        const option = hoptions.find(
          (o) => o.key === value || o.key === value.key
        )
        if (!option) return undefined
        return (
          <Element
            key={option.key.toString()}
            valueKey={option.key}
            value={`${option.label}`}
          />
        )
      })
    } else if (
      hoptions.length > 0 &&
      hValues &&
      readOnlyType === 'customContainer'
    ) {
      const completeValues: Option[] = []
      hValues.forEach((value) => {
        const option = hoptions.find(
          (o) => o.key === value || o.key === value.key
        )
        if (option) completeValues.push(option)
      })
      return <Element values={completeValues} />
    }
    return
  }, [readOnlyType, textToDisplay, hValue, hValues, hoptions, readOnlyElement])

  const url = useMemo(() => {
    if (!hValue || !getReadOnlyTextUrl) return undefined
    return getReadOnlyTextUrl(hValue)
  }, [hValue, getReadOnlyTextUrl])

  if (readOnlyType === 'text') {
    if (url)
      return (
        <G2Link<LinkProps>
          componentProps={{ to: url }}
          component={Link}
          sx={{ color: '#676879' }}
          variant={size === 'small' ? 'body2' : 'body1'}
          className='AruiInputForm-readOnlyLink'
        >
          {textToDisplay}
        </G2Link>
      )
    else
      return (
        <Typography
          sx={{ color: '#676879' }}
          variant={size === 'small' ? 'body2' : 'body1'}
          className='AruiInputForm-readOnlyText'
        >
          {textToDisplay}
        </Typography>
      )
  }
  if (readOnlyType === 'chip') {
    return (
      <LimitedList
        limit={chipLimit}
        values={renderTag}
        listedComponent={Chip}
      />
    )
  }
  if (readOnlyType === 'customElement') {
    return (
      <Stack
        direction='row'
        alignItems='center'
        flexWrap='wrap'
        sx={{
          gap: (theme) => theme.spacing(0.5)
        }}
      >
        {renderCustom}
      </Stack>
    )
  }
  return <>{renderCustom}</>
}
