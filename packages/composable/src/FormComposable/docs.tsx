import { CommonFieldProps, FormComposableField } from './type'
import React from 'react'

const inputTypes = {} as FormComposableField

export interface InputTypes {
  type: typeof inputTypes.type
}

export const FormField = (props: InputTypes & CommonFieldProps) => {
  props
  return <></>
}
