import { WithElementParams } from '../../ComposableRender'
import { FormComposableState } from './FormComposableState'
import { FormComposableProps } from '../FormComposable'
import { useEffect, useMemo } from 'react'
import { FormComposableField } from './FormComposableField'
import { cx } from '@emotion/css'

export interface FieldRenderProps<TYPE extends string, PROPS>
  extends WithElementParams<TYPE, PROPS> {
  formState: FormComposableState
  basicProps: FieldRender
}

export interface FieldRender {
  key: string
  id: string
  label?: string
  name: string
  error: boolean
  errorMessage: string
  className: any
  style: any
  /**
   * Indicates if the data is currently loading
   *
   * @default false
   */
  isLoading?: boolean
  /**
   * Indicates if the data is on readonly mode
   *
   * @default false
   */
  readonly?: boolean
  onChange?: (value: any) => void
}

const useFormProps = (
  field: FormComposableField,
  props: FormComposableProps<any>
): FieldRender => {
  const { formState, classes, styles, isLoading } = props
  const error = formState.getFieldMeta(field.name).error
  return {
    key: field.key,
    id: field.key,
    label: field.label,
    name: field.name,
    error: !!error,
    errorMessage: error as string,
    isLoading: isLoading,
    className: cx(classes?.field, 'AruiForm-field', field.params?.className),
    style: {
      width: '100%',
      ...styles?.field,
      ...field.params?.style
    },
    onChange: field.onChange,
    readonly: field.readonly === true ? field.readonly : props?.readonly
  }
}

export const useFieldRenderProps = (
  props: FormComposableProps<any>
): FieldRenderProps<string, any>[] => {
  const { fields, formState, classes, styles, isLoading } = props
  const memo = useMemo<FieldRenderProps<string, any>[]>(() => {
    return fields.map((field: FormComposableField) => {
      const formProps = useFormProps(field, props)
      const validator = field.validator
      const { registerField, values } = formState
      registerField(formProps.name, {
        validate: validator ? (value) => validator(value, values) : undefined
      })
      return {
        basicProps: formProps,
        formState: formState,
        key: field.key,
        element: {
          params: field.params,
          type: field.type,
          customDisplay: field.customDisplay
        }
      } as FieldRenderProps<any, any>
    })
  }, [
    fields,
    formState.values,
    formState.handleChange,
    formState.errors,
    classes?.field,
    styles?.field,
    isLoading
  ])
  const { setFieldValue } = formState
  useEffect(() => {
    fields.map((field) => {
      field.defaultValue && setFieldValue(field.name, field.defaultValue)
    })
  }, [])
  return memo
}
