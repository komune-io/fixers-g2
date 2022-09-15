import { ElementParams, WithElementParams } from '../../ComposableRender'
import { FiltersComposableProps } from '../FiltersComposable'
import { useEffect, useMemo } from 'react'
import { FilterComposableField } from './FilterComposableField'
import { cx } from '@emotion/css'
import { useFormik } from 'formik'

export interface FieldRenderProps<TYPE extends string, PROPS>
  extends WithElementParams<TYPE, PROPS> {
  element: ElementParams<TYPE, PROPS>
  formState: ReturnType<typeof useFormik>
  basicProps: FieldRender
  defaultSubmitBehavior: boolean
}

export interface FieldRender {
  key: string
  id: string
  label?: string
  name: string
  className: any
  style: any
}

const useFormProps = (
  field: FilterComposableField,
  props: FiltersComposableProps<any>
): FieldRender => {
  const { classes, styles } = props
  return {
    key: field.key,
    id: field.key,
    label: field.label,
    name: field.name,
    className: cx(classes?.field, 'AruiForm-field', field.params?.className),
    style: {
      ...styles?.field,
      ...field.params?.style
    }
  }
}

export const useFilterRenderProps = (
  props: FiltersComposableProps<any>
): FieldRenderProps<string, any>[] => {
  const {
    fields,
    formState,
    classes,
    styles,
    defaultSubmitBehavior = false
  } = props
  const memo = useMemo<FieldRenderProps<string, any>[]>(() => {
    return fields.map((field: FilterComposableField) => {
      const formProps = useFormProps(field, props)
      const { registerField } = formState
      registerField(formProps.name, {})
      return {
        basicProps: formProps,
        formState: formState,
        element: {
          params: field.params,
          type: field.type,
          customDisplay: field.customDisplay
        },
        defaultSubmitBehavior
      } as FieldRenderProps<any, any>
    })
  }, [
    fields,
    formState.values,
    formState.handleChange,
    classes?.field,
    styles?.field,
    ,
    defaultSubmitBehavior
  ])
  const { setFieldValue } = formState
  useEffect(() => {
    fields.map((field) => {
      field.defaultValue && setFieldValue(field.name, field.defaultValue)
    })
  }, [])
  return memo
}
