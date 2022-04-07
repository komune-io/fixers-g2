import {
  styled,
  TableContainer as MuiTableContainer,
  TableContainerProps as MuiTableContainerProps
} from '@mui/material'
import React from 'react'
import { MergeMuiElementProps } from '@smartb/g2-themes'

interface BasicTableContainerBasicProps {
  variant: 'grounded' | 'elevated'
  children: React.ReactNode
  expandInElevatedRow?: boolean
}

type BasicTableContainerProps = MergeMuiElementProps<
  MuiTableContainerProps,
  BasicTableContainerBasicProps
>

const BasicTableContainer = (props: BasicTableContainerProps) => {
  const { children, ...other } = props
  delete other.expandInElevatedRow
  return <MuiTableContainer {...other}>{children}</MuiTableContainer>
}

export const TableContainer = styled(BasicTableContainer)((props) => {
  const { variant, theme, expandInElevatedRow } = props
  const comunStyles = {
    '& .AruiTable-actionColumn': {
      maxWidth: '65px',
      width: '20px'
    },
    '& .AruiTable-pagination': {
      marginTop: '30px'
    },
    '& .AruiTable-tableRow': {
      '& .AruiTable-rowHoveredComponentContainer': {
        display: 'none'
      },
      position: 'relative'
    },
    '& .AruiTable-tableRow:hover': {
      '& .AruiTable-rowHoveredComponentContainer': {
        display: 'block'
      }
    }
  }
  if (variant === 'grounded') {
    return {
      ...comunStyles,
      '& .MuiTableCell-root': {
        borderBottomColor: '#D9DBE1'
      },
      '& .AruiTable-principaleTableRow, .AruiTable-tableFooterRow': {
        '& > *': { borderBottom: 'unset ' }
      }
    }
  } else {
    return {
      ...comunStyles,
      '& .MuiTableCell-root': {
        border: 'unset'
      },
      '& .AruiTable-principaleTableRow, .AruiTable-tableFooterRow': {
        borderRadius: '4px',
        background: 'white',
        boxShadow: theme.shadows[1],
        margin: '3px 0px',
        border: '2px solid transparent',
        minWidth: 'fit-content !important',
        marginBottom: expandInElevatedRow ? '20px' : ''
      },
      '& .AruiTable-tableHeaderRow': {
        minWidth: 'fit-content !important'
      },
      '& .AruiTable-tableCell, .AruiTable-tableHeaderCell, .AruiTable-tableFooterCell':
        {
          padding: '7px 12px',
          alignSelf: 'center'
        },
      '& .AruiTable-table': {
        display: 'inline-block',
        width: '100%'
      }
    }
  }
})
