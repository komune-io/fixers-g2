import { FormikConfig, FormikHelpers, useFormik } from 'formik'
import { useCallback, useMemo } from 'react'
import { FormField } from './Form'

export type PotentialError = string | undefined | Promise<string | undefined>

export type ValidatorFnc = (value: any, values: any) => PotentialError

export type FormState = Omit<ReturnType<typeof useFormik>, 'validateField'> & {
  validateField: (fieldName: string) => PotentialError
}

export type FormPartialField = {
  name: string
  defaultValue?: any
  validator?: ValidatorFnc
}

interface useFormParams<T extends FormPartialField = FormPartialField> {
  /**
   * the fields of the form
   */
  fields: T[]
  /**
   * the callback called when the form is being validated by the user
   * please use the `setSubmitting` in the formikHelpers object to inform about any asynchronous task
   * before the end of the submission
   */
  onSubmit?: (
    values: { [key: string]: any },
    formikHelpers: FormikHelpers<any>
  ) => void | Promise<any>
  /**
   * this prop allow you to add you custom config to the useFormik hook
   */
  formikConfig?: Omit<
    FormikConfig<any>,
    'initialValues' | 'onSubmit' | 'validate'
  >
}

export const useForm = (params: useFormParams<FormField>): FormState => {
  return useFormBase(params)
}

/**
 * the useForm with the minimum informations needed to init the useformik state
 */
export const useFormWithPartialFields = (
  params: useFormParams<FormPartialField>
): FormState => {
  return useFormBase(params)
}

const emptyAction = () => {}

const useFormBase = <T extends FormPartialField = FormPartialField>(
  params: useFormParams<T>
): FormState => {
  const { fields, onSubmit, formikConfig } = params
  const initialValues = useMemo(() => {
    const obj = {}
    fields.forEach((field) => {
      obj[field.name] = field.defaultValue
    })
    return obj
  }, [fields])

  const validate = useCallback(
    async (values) => {
      const errors = {}
      for (const field of fields) {
        const error = await field.validator?.(values[field.name], values)
        if (error) {
          errors[field.name] = error
        }
      }
      return errors
    },
    [fields]
  )

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit ?? emptyAction,
    validate: validate,
    validateOnBlur: false,
    validateOnChange: false,
    ...formikConfig
  })

  const validateField = useCallback(
    async (fieldName: string) => {
      const field = fields.find((field) => field.name === fieldName)
      const error = field?.validator
        ? await field?.validator(formik.values[fieldName], formik.values)
        : undefined
      formik.setFieldError(fieldName, error)
      return error
    },
    [fields, formik.values, formik.setFieldError]
  )

  return { ...formik, validateField: validateField } as FormState
}
