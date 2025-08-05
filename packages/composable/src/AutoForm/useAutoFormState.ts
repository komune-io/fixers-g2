import { useCallback, useMemo } from 'react'
import { FormikFormParams, useFormComposable } from '../FormComposable'
import { CommandWithFile, getIn, setIn } from '@komune-io/g2-utils'
import { FormikHelpers } from 'formik'
import { AutoFormData } from './AutoForm'

export const autoformValuesToCommand = <COMMAND = any>(
  formData: AutoFormData,
  values: any
) => {
  let command: CommandWithFile<COMMAND> = {
    command: {} as COMMAND,
    files: []
  }
  formData.sections.forEach((section) =>
    section.fields.forEach((field) => {
      const fieldValue = getIn(values, field.name)
      if (fieldValue != undefined) {
        if (field.type === 'documentHandler') {
          command.files.push({
            file: fieldValue,
            atrKey: field.name
          })
        } else {
          command.command = setIn(command.command, field.name, fieldValue)
        }
      }
    })
  )
  return command
}

export interface UseAutoFormStateParams
  extends Omit<FormikFormParams<{}>, 'onSubmit'> {
  onSubmit?: (
    command: CommandWithFile<any>,
    values: any,
    formikHelpers: FormikHelpers<any>
  ) => boolean | void | Promise<any> | Promise<boolean>
  formData?: AutoFormData
  initialValues?: any
  downloadDocument?: (
    fieldName: string,
    fieldValue: any
  ) => Promise<string | undefined>
}

export const useAutoFormState = (params: UseAutoFormStateParams) => {
  const {
    onSubmit,
    formData,
    initialValues,
    downloadDocument,
    formikConfig,
    readOnly,
    ...formikParams
  } = params
  const initial = useMemo(() => {
    let initialValuesCopy = { ...formData?.initialValues, ...initialValues }
    formData?.sections.forEach((section) =>
      section.fields.forEach((field) => {
        if (field.type === 'documentHandler') {
          const fieldValue = getIn(initialValuesCopy, field.name)
          if (fieldValue && downloadDocument) {
            initialValuesCopy = setIn(
              initialValuesCopy,
              `${field.name}Uploaded`,
              () => downloadDocument(field.name, fieldValue)
            )
            initialValuesCopy = setIn(initialValuesCopy, field.name, undefined)
          }
        }
      })
    )
    return initialValuesCopy
  }, [initialValues, formData, downloadDocument])

  const onSubmitCommand = useCallback(
    async (values: any, formikHelpers: FormikHelpers<any>) => {
      if (onSubmit && formData) {
        await onSubmit(
          autoformValuesToCommand(formData, values),
          values,
          formikHelpers
        )
      }
    },
    [onSubmit, formData]
  )

  return useFormComposable({
    onSubmit: onSubmitCommand,
    readOnly: formData?.readOnly ?? readOnly,
    formikConfig: {
      ...formikConfig,
      ...formData?.formikConfig,
      initialValues: initial
    },
    ...formikParams
  })
}
