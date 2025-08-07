import { Option } from '@komune-io/g2-forms'
import { Condition, SectionCondition } from '../Conditions'
import { AutoFormData } from './AutoForm'

export type BackFormField = {
  name: string
  label?: string
  type: string
  description?: string
  helperText?: string
  options?: Option[]
  conditions?: Condition[]
  properties?: string | any
}

export type BackFormSection = {
  id: string
  label?: string
  description?: string
  fields: BackFormField[]
  conditions?: SectionCondition[]
  properties?: any
}

export type BackAutoFormData = {
  label?: string
  sections: BackFormSection[]
  properties?: any
}

export const autoFormFormatter = (autoForm: BackAutoFormData): AutoFormData => {
  return {
    ...autoForm,
    sections: autoForm.sections.map((section) => ({
      ...section,
      fields: section.fields.map(
        ({ description, helperText, options, properties, ...other }) => {
          const props =
            (typeof properties === 'string'
              ? JSON.parse(properties)
              : properties) ?? {}
          const { fullRow, readOnly, defaultValue, ...otherProperties } = props
          return {
            ...other,
            fullRow,
            readOnly,
            defaultValue,
            params: {
              description,
              helperText,
              options,
              ...otherProperties
            }
          }
        }
      )
    })),
    ...autoForm.properties
  }
}
