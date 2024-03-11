import { FormAction, PotentialError } from '@komune-io/g2-forms'
import { useFormik } from 'formik'

export type FormComposableState = Omit<
  ReturnType<typeof useFormik>,
  'validateField'
> & {
  actions: FormAction[]
  validateField: (fieldName: string) => PotentialError
  readOnly: boolean
  isLoading: boolean
  emptyValueInReadOnly?: any
}
