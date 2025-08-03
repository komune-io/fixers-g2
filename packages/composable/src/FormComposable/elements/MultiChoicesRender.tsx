import { ReactElement, useMemo } from 'react'
import {
  InputForm,
  InputFormBasicProps,
  MultiChoicesProps
} from '@komune-io/g2-forms'
import { FieldRenderProps } from '../type'
import { ElementRendererFunction } from '../../ComposableRender'
import { getValueSetup } from '../type/getValueSetup'
import { useChangeHandler } from '../type/useChangeHandler'

export type MultiChoicesExtendProps = Partial<
  Omit<
    MultiChoicesProps & InputFormBasicProps<'multiChoices'>,
    'value' | 'onChange' | 'label' | 'classes' | 'styles'
  >
>

export type MultiChoicesRenderProps = FieldRenderProps<
  'multiChoices',
  MultiChoicesExtendProps
>

export const MultiChoicesRender: ElementRendererFunction<
  MultiChoicesRenderProps
> = (props: MultiChoicesRenderProps): ReactElement => {
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

  return (
    <InputForm
      inputType='multiChoices'
      values={value ?? ''}
      {...params}
      {...componentProps}
      onChange={onChangeHandler}
    />
  )
}
