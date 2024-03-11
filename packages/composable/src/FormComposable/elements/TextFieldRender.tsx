import {
  InputFormBasicProps,
  TextFieldProps,
  InputForm
} from '@komune-io/g2-forms'
import React, { useMemo } from 'react'
import { FieldRenderProps } from '../type'
import { ElementRendererFunction } from '../../ComposableRender'
import { getValueSetup } from '../type/getValueSetup'

export type TextFieldExtendProps = Partial<
  Omit<
    TextFieldProps & InputFormBasicProps<'textField'>,
    'value' | 'onChange' | 'label' | 'classes' | 'styles'
  >
>

export type TextFieldRenderProps = FieldRenderProps<
  'textField',
  TextFieldExtendProps
>

export const TextFieldRender: ElementRendererFunction<TextFieldRenderProps> = (
  props: TextFieldRenderProps
) => {
  const { element, formState, basicProps } = props
  const { params } = element
  const componentProps = { ...basicProps }
  const onChange = componentProps.onChange

  const { value, setFieldValue } = useMemo(
    () => getValueSetup(componentProps.name, formState),
    [componentProps.name, formState]
  )

  delete componentProps.onChange

  return (
    <InputForm
      inputType='textField'
      value={value ?? ''}
      onChange={(value: string) => {
        setFieldValue(value)
        !!onChange && onChange(value)
      }}
      {...params}
      {...componentProps}
    />
  )
}
