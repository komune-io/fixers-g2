import { FormComposableState } from './FormComposableState'
import { SetFieldValueFnc } from './getValueSetup'
import { OnChangeFnc, OnValueChangeFnc } from './FormComposableField'
import { useCallback } from 'react'
import { useDebouncedCallback } from '@mantine/hooks'

export const useChangeHandler = <T>(
  formState: FormComposableState,
  setFieldValue: SetFieldValueFnc,
  onChange?: OnChangeFnc,
  onValueChange?: OnValueChangeFnc
) => {
  const submit = useDebouncedCallback(() => {
    formState.submitForm()
  }, 500)
  return useCallback(
    async (value: T) => {
      if (onValueChange) {
        onValueChange(value, formState)
      } else {
        await setFieldValue(value)
        !!onChange && onChange(value)
        if (formState.submitOnChange) {
          submit()
        }
      }
    },
    [formState, setFieldValue, onChange, onValueChange]
  )
}
