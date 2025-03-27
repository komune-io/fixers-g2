import { FormComposableState } from './FormComposableState'
import { SetFieldValueFnc } from './getValueSetup'
import { OnChangeFnc, OnValueChangeFnc } from './FormComposableField'
import { useCallback } from 'react'

export const useChangeHandler = <T>(
  formState: FormComposableState,
  setFieldValue: SetFieldValueFnc,
  onChange?: OnChangeFnc,
  onValueChange?: OnValueChangeFnc
) => {
  return useCallback(
    async (value: T) => {
      if (onValueChange) {
        onValueChange(value, formState)
      } else {
        await setFieldValue(value)
        !!onChange && onChange(value)
        if (formState.submitOnChange) {
          formState.submitForm()
        }
      }
    },
    [formState, setFieldValue, onChange, onValueChange]
  )
}
