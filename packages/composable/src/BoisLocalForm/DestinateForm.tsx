import React, { useMemo } from 'react'
import {
  FormComposable,
  FormComposableField,
  FormComposableState,
  useFormComposable
} from '../FormComposable'
import { Button } from '@komune-io/g2-components'

export type Product = {
  id: string
  productType: string[]
  quantity: number
  quantityMesurement: 'm3'
  woodType: string[]
  treatment: string[]
}

export interface DestinateFormProps {
  formState: FormComposableState
  onAddProduct: (values: Product) => void
}

export const DestinateForm = (props: DestinateFormProps) => {
  const { formState, onAddProduct } = props

  const clientFields = useMemo(
    (): FormComposableField[] => [
      {
        name: 'client',
        label: 'Client',
        type: 'autoComplete',
        required: true,
        params: {
          options: [
            {
              key: '1',
              label: "Maitre d'oeuvre 1"
            },
            {
              key: '2',
              label: "Maitre d'oeuvre 2"
            }
          ]
        }
      },
      {
        name: 'ouvrage',
        label: 'Ouvrage',
        type: 'autoComplete',
        required: true,
        params: {
          options: [
            {
              key: '1',
              label: 'Ouvrage 1'
            },
            {
              key: '2',
              label: 'Ouvrage 2'
            }
          ]
        }
      }
    ],
    []
  )

  const productFields = useMemo(
    (): FormComposableField[] => [
      {
        name: 'productType',
        label: 'Produit fini',
        type: 'autoComplete',
        required: true,
        params: {
          options: [
            {
              key: '1',
              label: 'Caisson'
            },
            {
              key: '2',
              label: 'Charpente'
            }
          ],
          multiple: true
        }
      },
      {
        name: 'quantity',
        label: 'Quantité du produit',
        type: 'textField',
        required: true,
        params: {
          textFieldType: 'number',
          inputIcon: 'en m3',
          noCheckOrClearIcon: true
        },
        conditions: [
          {
            type: 'validator',
            expression: '#quantity <= 0',
            error: 'La quantité devrait être au dessus de 0'
          }
        ]
      },
      {
        name: 'woodType',
        label: 'Type de bois',
        type: 'autoComplete',
        required: true,
        params: {
          options: [
            {
              key: '1',
              label: 'Epicéa'
            },
            {
              key: '2',
              label: 'Hêtre'
            }
          ],
          multiple: true
        }
      },
      {
        name: 'treatment',
        label: 'Classe de traitement de bois',
        type: 'autoComplete',
        required: true,
        params: {
          options: [
            {
              key: '1',
              label: 'Clorure'
            },
            {
              key: '2',
              label: 'Vernis'
            }
          ],
          multiple: true
        }
      }
    ],
    []
  )

  const productFormState = useFormComposable({
    onSubmit: onAddProduct,
    formikConfig: {
      initialValues: {
        quantityMesurement: 'm3'
      }
    }
  })

  return (
    <>
      <FormComposable
        fields={clientFields}
        formState={formState}
        display='grid'
      />
      <FormComposable
        fields={productFields}
        formState={productFormState}
        display='flex'
      />
      <Button
        onClick={productFormState.submitForm}
        sx={{
          alignSelf: 'flex-end'
        }}
      >
        Ajouter le produit
      </Button>
    </>
  )
}
