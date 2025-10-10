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
      const isEmptyString = typeof value === 'string' && value.trim() !== ''
      const defValue =
        (isEmptyString || typeof value !== 'string') && !isNaN(Number(value))
          ? Number(value)
          : value

      if (onValueChange) {
        onValueChange(defValue, formState)
      } else {
        await setFieldValue(defValue)
        !!onChange && onChange(defValue)
        if (formState.submitOnChange) {
          formState.submitForm()
        }
      }
    },
    [formState, setFieldValue, onChange, onValueChange]
  )
}
