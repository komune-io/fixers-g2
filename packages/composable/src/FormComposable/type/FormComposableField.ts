import { FieldRenderType } from '../factories/FormElementsRenderer'
import {
  ComposableElementRendererProps,
  ElementRenderersConfig
} from '../../ComposableRender'
import { ReactNode } from 'react'
import { PotentialError } from '@smartb/g2-forms'

export type FieldValidatorFnc = (value?: any, values?: any) => PotentialError

export type FormComposableField<
  Name extends string = string,
  ELEMENT_PARAMS extends ElementRenderersConfig = {}
> = {
  /**
   * the unique key of the field by default the name
   */
  key?: string
  /**
   * the name of the field used to define it in the returned values
   */
  name: Name
  /**
   * the displayed label of the field
   */
  label?: string
  /**
   * the default value of the field
   */
  defaultValue?: any
  /**
   * the validator that takes the value of the input and return an error or undefined/nothing if the value is valid
   */
  validator?: FieldValidatorFnc
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
   * this prop tells the component that it has a name shared with another. It will store his value in an array at the given index.
   * You should also pass a different index to all the other component with the name name if you don't want theme to share the same value
   */
  sharedNameIndex?: number
  /**
   * the event called when the value of the input change
   */
  onChange?: (value: any) => void
  /**
   * Indicates if the data is on readOnly mode
   *
   * @default false
   */
  readOnly?: boolean
} & (FieldRenderType | ComposableElementRendererProps<ELEMENT_PARAMS>)
