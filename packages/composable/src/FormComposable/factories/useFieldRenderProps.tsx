import { FormClasses, FormComposableProps, FormStyles } from '../FormComposable'
import { useMemo } from 'react'
import { cx } from '@emotion/css'
import { FieldRenderProps } from './FormElementsFactories'
import { ComposableFormFieldParams } from '../type/ComposableFormFieldParams'
import { ComposableForm } from '../type/ComposableForm'
import { ComposableFormState } from '../type/ComposableFormState'

export const useFieldRenderProps = (
  props: FormComposableProps
): FieldRenderProps<any, any>[] => {
  const { fields, formState, classes, styles, isLoading } = props
  return useMemo<FieldRenderProps<any, any>[]>(() => {
    return fields.map((field) => {
      const formProps: ComposableForm = getFormProps(
        field,
        formState,
        classes,
        styles,
        isLoading
      )
      const { registerField } = formState
      registerField(formProps.name, {
        validate: field.validator
      })
      return {
        formProps: formProps,
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
}

const getFormProps = (
  field: ComposableFormFieldParams,
  formState: ComposableFormState,
  classes?: FormClasses,
  styles?: FormStyles,
  isLoading?: boolean
): ComposableForm => {
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
    onChange: field.onChange
  }
}
