import React, { ReactElement, useMemo } from 'react'
import {
  SelectProps,
  InputForm,
  InputFormBasicProps
} from '@komune-io/g2-forms'
import { FieldRenderProps } from '../type'
import { ElementRendererFunction } from '../../ComposableRender'
import { getValueSetup } from '../type/getValueSetup'
import { useChangeHandler } from '../type/useChangeHandler'

export type FormSelectExtendProps = Partial<
  Omit<
    SelectProps & InputFormBasicProps<'select'>,
    | 'value'
    | 'values'
    | 'onChangeValue'
    | 'onChangeValues'
    | 'label'
    | 'classes'
    | 'styles'
  >
>

export type SelectRenderProps = FieldRenderProps<
  'select',
  FormSelectExtendProps
>

export const SelectRender: ElementRendererFunction<SelectRenderProps> = (
  props: SelectRenderProps
): ReactElement => {
  const { element, formState, basicProps } = props
  const { params } = element
  const { onChange, onValueChange, ...componentProps } = basicProps
  const { value, setFieldValue } = useMemo(
    () => getValueSetup(componentProps.name, formState),
    [componentProps.name, formState]
  )
  const onChangeHandler = useChangeHandler(
    formState,
    setFieldValue,
    onChange,
    onValueChange
  )

  return params?.multiple === true ? (
    <InputForm
      inputType='select'
      values={value ?? []}
      onChangeValues={onChangeHandler}
      {...params}
      {...componentProps}
    />
  ) : (
    <InputForm
      inputType='select'
      value={value ?? ''}
      onChangeValue={onChangeHandler}
      {...params}
      {...componentProps}
    />
  )
}
