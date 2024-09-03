import { getIn } from 'formik'
import { FormComposableState } from './FormComposableState'

/**
 * Function type for setting a new value in the form state.
 *
 * @param newValue - The new value to set in the form state.
 */
export type SetFieldValueFnc = (newValue: any) => void

/**
 * Interface representing the return value of the `getValueSetup` function.
 */
export interface GetValueSetupReturn {
  /**
   * The current value from the form state.
   */
  value: any

  /**
   * Function to set a new value in the form state.
   */
  setFieldValue: SetFieldValueFnc
}

/**
 * Retrieves the current value from the form state and provides a function to set a new value.
 *
 * @param name - The name of the field in the form state.
 * @param formState - The current state of the form.
 * @returns An object containing the current value and a function to set a new value.
 */
export const getValueSetup = (
  name: string,
  formState: FormComposableState
): GetValueSetupReturn => {
  const value = getIn(formState.values, name)
  return {
    value: value,
    setFieldValue: (newValue) => {
      formState.setFieldValue(name, newValue, false)
    }
  }
}
