import { CheckBox, CheckBoxProps } from '@komune-io/g2-forms'
import { ChangeEvent, useMemo } from 'react'
import { FieldRenderProps } from '../type'
import { ElementRendererFunction } from '../../ComposableRender'
import { getValueSetup } from '../type/getValueSetup'
import { useChangeHandler } from '../type/useChangeHandler'

export type CheckBoxExtendProps = Partial<
  Omit<CheckBoxProps, 'checked' | 'onChange' | 'label' | 'classes' | 'styles'>
>

export type CheckBoxRenderProps = FieldRenderProps<
  'checkBox',
  CheckBoxExtendProps
>

export const CheckBoxRender: ElementRendererFunction<CheckBoxRenderProps> = (
  props: CheckBoxRenderProps
) => {
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

  return (
    <CheckBox
      checked={value}
      disabled={params?.disabled}
      onChange={(_: ChangeEvent<HTMLInputElement>, value: boolean) => {
        onChangeHandler(value)
      }}
      {...params}
      {...componentProps}
      readOnly={
        componentProps.readOnly === true
          ? componentProps.readOnly
          : params?.readOnly
      }
    />
  )
}
