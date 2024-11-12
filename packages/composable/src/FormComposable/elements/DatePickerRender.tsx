import {
  InputFormBasicProps,
  DatePickerProps,
  InputForm
} from '@komune-io/g2-forms'
import React, { useCallback, useMemo } from 'react'
import { FieldRenderProps } from '../type'
import { ElementRendererFunction } from '../../ComposableRender'
import { getValueSetup } from '../type/getValueSetup'

export type DatePickerExtendProps = Partial<
  Omit<
    DatePickerProps & InputFormBasicProps<'datePicker'>,
    'value' | 'onChangeDate' | 'label' | 'classes' | 'styles'
  >
>

export type DatePickerRenderProps = FieldRenderProps<
  'datePicker',
  DatePickerExtendProps
>

export const DatePickerRender: ElementRendererFunction<
  DatePickerRenderProps
> = (props: DatePickerRenderProps) => {
  const { element, formState, basicProps } = props
  const { params } = element

  const { onChange, onValueChange, ...componentProps } = basicProps
  const { value, setFieldValue } = useMemo(
    () => getValueSetup(componentProps.name, formState),
    [componentProps.name, formState]
  )
  const date = new Date(value)

  const onChangeHandler = useCallback(
    (date?: Date) => {
      const value =
        date && !isNaN(date.getTime()) ? date.getTime() : date?.toString()
      if (onValueChange) {
        onValueChange(value, formState)
      } else {
        setFieldValue(value)
        !!onChange && onChange(value)
      }
    },
    [formState, setFieldValue, onChange, onValueChange]
  )

  return (
    <InputForm
      inputType='datePicker'
      value={!isNaN(date.getTime()) ? date : value ?? ''}
      onChangeDate={onChangeHandler}
      {...params}
      {...componentProps}
    />
  )
}
