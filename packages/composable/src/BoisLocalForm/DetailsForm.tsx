import { useMemo } from 'react'
import {
  FormComposable,
  FormComposableField,
  FormComposableState
} from '../FormComposable'

export interface DetailsFormProps {
  formState: FormComposableState
}

export const DetailsForm = (props: DetailsFormProps) => {
  const { formState } = props

  const fields = useMemo(
    (): FormComposableField[] => [
      {
        name: 'name',
        label: 'Nom du produit',
        type: 'textField',
        required: true,
        params: {
          size: 'large'
        },
        fullRow: true
      },
      {
        name: 'transformationActor',
        label: 'Acteur de la transformation',
        type: 'autoComplete',
        required: true,
        params: {
          options: [
            {
              key: '1',
              label: 'Sud charpente'
            },
            {
              key: '2',
              label: 'Urban nt'
            }
          ]
        }
      },
      {
        name: 'deliveryDate',
        label: 'Date de livraison',
        type: 'datePicker',
        required: true,
        params: {
          minDate: new Date()
        },
        conditions: [
          {
            type: 'validator',
            expression: '#deliveryDate <= #now',
            error: "La date de livraison devrait être supérier à aujourd'hui"
          }
        ]
      }
    ],
    []
  )

  return <FormComposable fields={fields} formState={formState} display='grid' />
}
