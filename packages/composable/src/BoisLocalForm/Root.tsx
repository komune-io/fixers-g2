import { Divider, Stack } from '@mui/material'
import React, { useCallback } from 'react'
import { DetailsForm } from './DetailsForm'
import { useFormComposable } from '../FormComposable'
import { DestinateForm, Product } from './DestinateForm'
import { v4 as uuidv4 } from 'uuid'
import { ProductTable } from './ProductTable'
import { Button } from '@komune-io/g2-components'

export const Root = () => {
  const formState = useFormComposable({
    onSubmit: (values) => console.log(values),
    formikConfig: {
      initialValues: {
        name: 'Nom du produit'
      }
    }
  })

  const onAddProduct = useCallback(
    async (product: Product) => {
      formState.setFieldValue('products', [
        ...(formState.values.products ?? []),
        {
          ...product,
          id: uuidv4()
        }
      ])
    },
    [formState.values.products]
  )

  const onDeleteProduct = useCallback(
    async (product: Product) => {
      const productsCopy = [...formState.values.products]
      const index = productsCopy.findIndex((el) => el.id === product.id)
      productsCopy.splice(index, 1)
      formState.setFieldValue('products', productsCopy)
    },
    [formState.values.products]
  )

  return (
    <Stack gap={4}>
      <DetailsForm formState={formState} />
      <DestinateForm formState={formState} onAddProduct={onAddProduct} />
      <Divider flexItem textAlign='left'>
        Liste des produits
      </Divider>
      <ProductTable
        products={formState.values.products}
        deleteProduct={onDeleteProduct}
      />
      <Button
        onClick={formState.submitForm}
        sx={{
          alignSelf: 'flex-end'
        }}
      >
        Valider
      </Button>
    </Stack>
  )
}
