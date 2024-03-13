import { FormComposableField } from '@komune-io/g2-composable'
import { useMemo } from 'react'
import { Address, mergeFields } from '.'
import { validators } from '@komune-io/g2-utils'
import { useTranslation } from 'react-i18next'

export type AddressFieldsName = 'street' | 'postalCode' | 'city'

export type AddressReadOnlyFields = {
  [k in keyof Address]?: boolean
}

export type AddressFieldsOverride = Partial<
  Record<AddressFieldsName, Partial<FormComposableField<AddressFieldsName>>>
>

export interface UseAddressFieldsParams {
  /**
   * use This prop to override the fields
   */
  fieldsOverride?: AddressFieldsOverride
}

export const useAddressFields = (params?: UseAddressFieldsParams) => {
  const { fieldsOverride } = params || {}

  const { t } = useTranslation()

  const addressFields = useMemo(
    () => ({
      street: mergeFields<FormComposableField<AddressFieldsName>>(
        {
          name: 'street',
          type: 'textField',
          label: t('g2.facultativeField', { label: t('g2.address') }),
          validator: validators.street(t)
        },
        fieldsOverride?.street
      ),
      postalCode: mergeFields<FormComposableField<AddressFieldsName>>(
        {
          name: 'postalCode',
          type: 'textField',
          label: t('g2.facultativeField', { label: t('g2.postalCode') }),
          validator: validators.postalCode(t)
        },
        fieldsOverride?.postalCode
      ),
      city: mergeFields<FormComposableField<AddressFieldsName>>(
        {
          name: 'city',
          type: 'textField',
          label: t('g2.facultativeField', { label: t('g2.city') }),
          validator: validators.city(t)
        },
        fieldsOverride?.city
      )
    }),
    [t, fieldsOverride]
  )

  return {
    addressFields
  }
}
