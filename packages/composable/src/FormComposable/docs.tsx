import { CommonFieldProps, FormComposableField } from './type'

const inputTypes = {} as FormComposableField

export interface InputTypes {
  type: typeof inputTypes.type
}

export const FormField = (props: InputTypes & CommonFieldProps) => {
  props
  return <></>
}
