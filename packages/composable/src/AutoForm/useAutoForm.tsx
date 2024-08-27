import React, { useCallback, useMemo } from 'react'
import { AutoForm, AutoFormData } from './AutoForm'
import { CommandWithFile } from '@komune-io/g2-utils'
import { FormComposableState } from '../FormComposable'

/**
 * Props for the `useAutoForm` hook.
 *
 * @template INITIAL - The type of the initial values.
 * @template CMD - The type of the command values.
 */
interface UseAutoFormProps<INITIAL, CMD> {
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
  onSubmit: (values: CMD) => Promise<any>
}

/**
 * A custom hook that creates an auto form with file handling capabilities.
 *
 * @template INITIAL - The type of the initial values.
 * @template CMD - The type of the command values.
 *
 * @param props - The properties for the auto form.
 * @param props.data - The data for the auto form.
 * @param props.initialValues - The initial values for the form.
 * @param props.actions - A function that returns the actions to be displayed in the form.
 * @param props.onSubmit - A function that handles the form submission.
 *
 * @returns A React element representing the auto form.
 */
export const useAutoFormWithFile = <INITIAL, CMD>(
  props: UseAutoFormProps<INITIAL, CommandWithFile<CMD>>
) => {
  const { data, initialValues, actions, onSubmit } = props

  const form = useMemo(
    () => (
      <AutoForm
        formData={data}
        getFormActions={actions}
        onSubmit={onSubmit}
        initialValues={initialValues}
      />
    ),
    [data, actions, onSubmit, initialValues]
  )
  return form
}

/**
 * A custom hook that creates an auto form, if you need file handling capabilities use `useAutoFormWithFile`.
 *
 * @template INITIAL - The type of the initial values.
 * @template CMD - The type of the command values.
 *
 * @param props - The properties for the auto form.
 * @param props.data - The data for the auto form.
 * @param props.initialValues - The initial values for the form.
 * @param props.actions - A function that returns the actions to be displayed in the form.
 * @param props.onSubmit - A function that handles the form submission.
 *
 * @returns A React element representing the auto form.
 */
export const useAutoForm = <INITIAL, CMD>(
  props: UseAutoFormProps<INITIAL, CMD>
) => {
  const { data, initialValues, actions, onSubmit } = props
  const handleSubmit = useCallback(async (command: CommandWithFile<CMD>) => {
    await onSubmit(command.command as CMD)
  }, [])
  return useAutoFormWithFile({
    data,
    initialValues,
    actions,
    onSubmit: handleSubmit
  })
}
