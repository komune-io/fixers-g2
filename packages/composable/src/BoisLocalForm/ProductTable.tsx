import {
  G2ColumnDef,
  TableCellNumber,
  TableCellText,
  TableV2,
  useTable
} from '@komune-io/g2-layout'
import React, { useMemo } from 'react'
import { Product } from './DestinateForm'
import { IconButton, Typography } from '@mui/material'
import { DeleteRounded } from '@mui/icons-material'

export interface ProductTableProps {
  products?: Product[]
  deleteProduct: (product: Product) => void
}

export const ProductTable = (props: ProductTableProps) => {
  const { deleteProduct, products } = props

  const columns = useMemo(
    (): G2ColumnDef<Product>[] => [
      {
        id: 'productType',
        header: 'Produit fini',
        cell: ({ row }) => (
          <TableCellText
            value={row.original.productType.map(() => 'to map').join(', ')}
          />
        )
      },
      {
        id: 'qunatity',
        header: 'Quantité',
        cell: ({ row }) => (
          <Typography>
            <TableCellNumber value={row.original.quantity} />
            {row.original.quantityMesurement}
          </Typography>
        )
      },
      {
        id: 'woodType',
        header: 'Type de bois',
        cell: ({ row }) => (
          <TableCellText
            value={row.original.woodType.map(() => 'to map').join(', ')}
          />
        )
      },
      {
        id: 'treatment',
        header: 'Traitement',
        cell: ({ row }) => (
          <TableCellText
            value={row.original.treatment.map(() => 'to map').join(', ')}
          />
        )
      },
      {
        id: 'delete',
        cell: ({ row }) => (
          <IconButton onClick={() => deleteProduct(row.original)}>
            <DeleteRounded />
          </IconButton>
        )
      }
    ],
    [deleteProduct]
  )

  const tableState = useTable({
    columns,
    data: products ?? []
  })

  if (!products) return <></>
  return <TableV2 tableState={tableState} />
}
