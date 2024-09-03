import { getIn } from 'formik'
import { FormComposableState } from './FormComposableState'

export type SetFieldValue = (newValue: any) => void

export interface GetValueSetupReturn {
  value: any
  setFieldValue: SetFieldValue
}

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
