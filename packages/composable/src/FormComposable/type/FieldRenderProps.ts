import { WithElementParams } from '../../ComposableRender'
import { FormComposableState } from './FormComposableState'
import { FormComposableProps } from '../FormComposable'
import { useEffect, useMemo } from 'react'
import {
  FormComposableField,
  OnChangeFnc,
  OnValueChangeFnc
} from './FormComposableField'
import { cx } from '@emotion/css'
import { getIn } from 'formik'
import { SxProps, Theme } from '@mui/material'
import {
  Condition,
  evalEnableConditions,
  requiredFieldConditions,
  validateConditions
} from '../../Conditions'
import { useTranslation } from 'react-i18next'

export interface FieldRenderProps<TYPE extends string, PROPS>
  extends WithElementParams<TYPE, PROPS> {
  formState: FormComposableState
  basicProps: FieldRender
}

export interface FieldRender {
  key: string
  id: string
  label?: React.ReactNode
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
   * Indicates if the data is on readOnly mode
   *
   * @default false
   */
  readOnly?: boolean
  sx?: SxProps<Theme>
  onChange?: OnChangeFnc
  onValueChange?: OnValueChangeFnc
  emptyValueInReadOnly?: any
}

const getFormProps = (
  field: FormComposableField,
  props: FormComposableProps<any>,
  index: number
): FieldRender => {
  const {
    formState,
    classes,
    styles,
    isLoading,
    readOnly,
    gridColumnNumber = 2
  } = props
  const error = getIn(formState.errors, field.name)
  return {
    key: field.key ?? field.name,
    id: field.key ?? field.name,
    label: field.label,
    name: field.name,
    error: !!error,
    errorMessage: error as string,
    isLoading: isLoading === true ? isLoading : formState.isLoading,
    className: cx(classes?.field, 'AruiForm-field', field.params?.className),
    style: {
      width: '100%',
      ...styles?.field,
      ...field.params?.style
    },
    sx: field.fullRow
      ? {
          gridArea: {
            sm: 'unset',
            md: `${index} / 1 / ${index} / ${gridColumnNumber + 1}`
          }
        }
      : undefined,
    onChange: field.onChange,
    onValueChange: field.onValueChange,
    readOnly:
      field.readOnly === true
        ? field.readOnly
        : readOnly === true
          ? readOnly
          : formState.readOnly,

    emptyValueInReadOnly:
      //@ts-ignore
      field.params?.emptyValueInReadOnly ?? formState.emptyValueInReadOnly
  }
}

export const useFieldRenderProps = (
  props: FormComposableProps<any>
): FieldRenderProps<string, any>[] => {
  const {
    fields,
    formState,
    classes,
    styles,
    isLoading,
    readOnly,
    orientation
  } = props

  const { t } = useTranslation()

  useEffect(() => {
    const { registerField, unregisterField } = formState
    fields.forEach((field) => {
      if (
        !field.readOnly &&
        (field.validator || field.conditions || field.required)
      ) {
        const validator =
          !!field.conditions || field.required
            ? validateConditions(
                (field.required
                  ? [
                      requiredFieldConditions(t, field.name),
                      ...(field.conditions ?? [])
                    ]
                  : field.conditions) as Condition[]
              )
            : field.validator
        registerField(field.name, validator)
      } else {
        unregisterField(field.name)
      }
    })
    return () => {
      fields.forEach((field) => formState.unregisterField(field.name))
    }
  }, [formState.registerField, formState.unregisterField, fields])

  const memo = useMemo<FieldRenderProps<string, any>[]>(() => {
    let gridIndex = 0
    return fields.map((field: FormComposableField) => {
      gridIndex += field.fullRow ? props.gridColumnNumber ?? 2 : 1
      const formProps = getFormProps(
        field,
        props,
        Math.ceil(gridIndex / (props.gridColumnNumber ?? 2))
      )

      const enabled = evalEnableConditions(field.conditions, formState.values)
      return {
        basicProps: formProps,
        formState: formState,
        key: field.key ?? field.name,
        element: {
          params: {
            orientation,
            disabled: !enabled,
            ...field.params
          },
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
    readOnly,
    isLoading,
    formState.readOnly,
    formState.isLoading,
    formState.emptyValueInReadOnly,
    orientation
  ])
  const { setFieldValue } = formState

  useEffect(() => {
    fields.map((field) => {
      field.defaultValue && setFieldValue(field.name, field.defaultValue)
    })
  }, [])
  return memo
}
