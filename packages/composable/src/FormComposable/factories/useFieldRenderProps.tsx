import { FormComposableProps } from '../FormComposable'
import { useEffect, useMemo } from 'react'
import { cx } from '@emotion/css'
import { FieldRenderProps } from './FormElementsRenderer'
import { FormComposableField } from '../type/FormComposableField'
import { FieldRender } from './FieldRenderProps'

export const useFieldRenderProps = (
  props: FormComposableProps
): FieldRenderProps<any, any>[] => {
  const { fields, formState, classes, styles, isLoading } = props
  const memo = useMemo<FieldRenderProps<any, any>[]>(() => {
    return fields.map((field) => {
      const formProps = useFormProps(field, props)
      const { registerField } = formState
      registerField(formProps.name, {
        validate: field.validator
      })
      return {
        basicProps: formProps,
        formState: formState,
        element: field
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

const useFormProps = (
  field: FormComposableField,
  props: FormComposableProps
): FieldRender => {
  const { formState, classes, styles, isLoading } = props
  return {
    key: field.key,
    id: field.key,
    label: field.label,
    name: field.name,
    error: !!formState.errors[field.name],
    errorMessage: formState.errors[field.name] as string,
    isLoading: isLoading,
    className: cx(classes?.field, 'AruiForm-field', field.props?.className),
    style: {
      ...styles?.field,
      ...field.props?.style
    },
    onChange: field.onChange,
    readonly: field.readonly === true ? field.readonly : props?.readonly
  }
}
