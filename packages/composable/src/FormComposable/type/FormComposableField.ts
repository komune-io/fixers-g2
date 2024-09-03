import { FieldRenderType } from '../factories/FormElementsRenderer'
import {
  ComposableElementRendererProps,
  ElementRenderersConfig
} from '../../ComposableRender'
import { ReactNode } from 'react'
import { PotentialError } from '@komune-io/g2-forms'
import { Condition } from '../../Conditions'
import { FormComposableState } from './FormComposableState'

export type FieldValidatorFnc = (value?: any, values?: any) => PotentialError
export type OnChangeFnc = (value: any) => void
export type OnValueChangeFnc = (
  value: any,
  formState: FormComposableState
) => void

export interface CommonFieldProps<Name extends string = string> {
  /**
   * the unique key of the field by default the name
   */
  key?: string
  /**
   * the name of the field used to define it in the state values
   */
  name: Name
  /**
   * the displayed label of the field
   */
  label?: string
  /**
   * the default value of the field.
   * ⚠️ Only works at the first render it can't be computed values afterwards.
   * If you need delayed computed values use `initialValues` in the useFormComposable
   */
  defaultValue?: any
  /**
   * the validator that takes the value of the input and return an error or undefined/nothing if the value is valid
   */
  validator?: FieldValidatorFnc
  /**
   * You can conditionate the display or the validation of the field with it.
   * The conditions of the component will replace the prop `validator` if used.
   * It is based on the [SpEL](https://docs.spring.io/spring-framework/docs/3.0.x/reference/expressions.html) expression language.
   *
   * The property `type` describe the effect and the property `expression` conditions the effect.
   */
  conditions?: Condition[]
  /**
   * if you want to add other nodes around the input use this function
   */
  customDisplay?: (input: ReactNode) => ReactNode
  /**
   * indicates that the field should extend to the full row in a grid display in the form
   * @default false
   */
  fullRow?: boolean
  /**
   * Event handler called when the value of the input changes.
   * The new value is automatically set in the form state.
   */
  onChange?: OnChangeFnc
  /**
   * Event handler called when the value of the input changes.
   * The new value is not set in the form state.
   * The `onChange` event will not be called.
   */
  onValueChange?: OnValueChangeFnc
  /**
   * Indicates if the data is on readOnly mode
   *
   * @default false
   */
  readOnly?: boolean
  /**
   * Only works with the conditions not with the validator ⚠️.
   * if true it will add a validator condition to indicate that the field is required in the form.
   *
   * @default false
   */
  required?: boolean
}

export type FormComposableField<
  Name extends string = string,
  ELEMENT_PARAMS extends ElementRenderersConfig = {}
> = CommonFieldProps<Name> &
  (FieldRenderType | ComposableElementRendererProps<ELEMENT_PARAMS>)
