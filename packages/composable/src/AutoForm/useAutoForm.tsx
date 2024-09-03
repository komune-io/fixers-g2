import React, { useCallback, useMemo } from 'react'
import { FormikHelpers } from 'formik'
import { AutoForm, AutoFormData } from './AutoForm'
import { FormComposableState } from '../FormComposable'
import { CommandWithFile } from '@komune-io/g2-utils'

/**
 * Props for the `useAutoForm` hook.
 *
 * @template INITIAL - The type of the initial values.
 * @template CMD - The type of the command values.
 */
export interface UseAutoFormProps<INITIAL, CMD = INITIAL> {
  /**
   * The data for the auto form.
   */
  data: AutoFormData

  /**
   * The initial values for the form.
   */
  initialValues?: INITIAL

  /**
   * A function that returns the actions to be displayed in the form.
   *
   * @param formState - The current state of the form.
   * @returns A React node representing the actions.
   */
  actions: (formState: FormComposableState) => React.ReactNode

  /**
   * A function that handles the form submission.
   *
   * @param values - The values of the form.
   * @returns A promise that resolves when the submission is complete.
   */
  onSubmit: (
    values: CMD,
    initialValue: INITIAL,
    formikHelpers: FormikHelpers<any>
  ) => Promise<any>
}

/**
 * The return type of the `useAutoForm` hook.
 */
export interface UseAutoFormReturn {
  form: JSX.Element
}

/**
 * A custom hook type definition to creates an auto form
 */
export type UseAutoFormHook = <INITIAL, CMD = INITIAL>(
  props: UseAutoFormProps<INITIAL, CMD>
) => UseAutoFormReturn

/**
 * A custom hook type definition to creates an auto form, with file handling capabilities
 */
export type UseAutoFormWithFileHook = <INITIAL, CMD = INITIAL>(
  props: UseAutoFormProps<INITIAL, CommandWithFile<CMD>>
) => UseAutoFormReturn

/**
 * A custom hook that creates an auto form, if you need file handling capabilities use `useAutoFormWithFile`
 *
 * @template INITIAL - The type of the initial values.
 * @template CMD - The type of the command values.
 *
 * @param props - The properties for the auto form.
 *
 * @returns A React element representing the auto form.
 */
export const useAutoForm: UseAutoFormHook = <INITIAL, CMD = INITIAL>(
  props: UseAutoFormProps<INITIAL, CMD>
): UseAutoFormReturn => {
  const { data, initialValues, actions, onSubmit } = props
  const handleSubmit = useCallback(
    async (
      command: CommandWithFile<CMD>,
      initialValue: INITIAL,
      formikHelpers: FormikHelpers<any>
    ) => {
      await onSubmit(command.command as CMD, initialValue, formikHelpers)
    },
    [onSubmit]
  )
  return useAutoFormWithFile({
    data,
    initialValues,
    actions,
    onSubmit: handleSubmit
  })
}

/**
 * A custom hook that creates an auto form with file handling capabilities.
 *
 * @template INITIAL - The type of the initial values.
 * @template CMD - The type of the command values.
 *
 * @param props - The properties for the auto form.
 *
 * @returns A React element representing the auto form.
 */
export const useAutoFormWithFile: UseAutoFormWithFileHook = <
  INITIAL,
  CMD = INITIAL
>(
  props: UseAutoFormProps<INITIAL, CommandWithFile<CMD>>
): UseAutoFormReturn => {
  const { data, initialValues, actions, onSubmit } = props

  const form = useMemo(
    () => (
      <AutoForm
        formData={data}
        getFormActions={actions}
        onSubmit={(
          command: CommandWithFile<any>,
          values: any,
          formikHelpers: FormikHelpers<any>
        ) => onSubmit(command, values, formikHelpers)}
        initialValues={initialValues}
      />
    ),
    [data, actions, onSubmit, initialValues]
  )
  return { form }
}
