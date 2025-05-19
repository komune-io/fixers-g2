import {
  InputFormBasicProps,
  AutoCompleteProps,
  InputForm
} from '@komune-io/g2-forms'
import React, { useMemo } from 'react'
import { FieldRenderProps } from '../type'
import { ElementRendererFunction } from '../../ComposableRender'
import { getValueSetup } from '../type/getValueSetup'
import { useChangeHandler } from '../type/useChangeHandler'

export type AutoCompleteExtendProps = Partial<
  Omit<
    AutoCompleteProps & InputFormBasicProps<'autoComplete'>,
    | 'value'
    | 'values'
    | 'onChangeValue'
    | 'onChangeValues'
    | 'label'
    | 'classes'
    | 'styles'
  >
>

export type AutoCompleteRenderProps = FieldRenderProps<
  'autoComplete',
  AutoCompleteExtendProps
>

export const AutoCompleteRender: ElementRendererFunction<
  AutoCompleteRenderProps
> = (props: AutoCompleteRenderProps) => {
  const { element, formState, basicProps } = props
  const { params } = element
  const { onChange, onValueChange, emptyValueInReadOnly, ...componentProps } =
    basicProps
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
    // @ts-ignore
    <InputForm
      inputType='autoComplete'
      values={value ?? undefined}
      onChangeValues={onChangeHandler}
      {...params}
      {...componentProps}
    />
  ) : (
    // @ts-ignore
    <InputForm
      inputType='autoComplete'
      value={value ?? null}
      onChangeValue={onChangeHandler}
      {...params}
      {...componentProps}
    />
  )
}
