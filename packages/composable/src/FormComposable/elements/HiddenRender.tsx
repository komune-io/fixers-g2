import React, { ChangeEventHandler, useMemo } from 'react'
import { FieldRenderProps } from '../type'
import { ElementRendererFunction } from '../../ComposableRender'
import { getValueSetup } from '../type/getValueSetup'
import { useChangeHandler } from '../type/useChangeHandler'

export type HiddenRenderProps = FieldRenderProps<
  'hidden',
  React.InputHTMLAttributes<HTMLInputElement>
>

export const HiddenRender: ElementRendererFunction<HiddenRenderProps> = (
  props: HiddenRenderProps
) => {
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
  const changeEventHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChangeHandler(e.target.value)
  }

  return (
    <input
      value={value ?? ''}
      onChange={changeEventHandler}
      type='hidden'
      {...params}
    />
  )
}
