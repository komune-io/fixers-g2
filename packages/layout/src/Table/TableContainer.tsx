import {
  styled,
  TableContainer as MuiTableContainer,
  TableContainerProps as MuiTableContainerProps
} from '@mui/material'
import React from 'react'
import { MergeMuiElementProps } from '@komune-io/g2-themes'
import { LinkProps } from 'react-router-dom'

interface BasicTableContainerBasicProps {
  variant: 'grounded' | 'elevated'
  children: React.ReactNode
  expandInElevatedRow?: boolean
  getRowLink?: (row: any) => LinkProps
}

type BasicTableContainerProps = MergeMuiElementProps<
  MuiTableContainerProps,
  BasicTableContainerBasicProps
>

const BasicTableContainer = (props: BasicTableContainerProps) => {
  const { children, ...other } = props
  delete other.expandInElevatedRow
  delete other.getRowLink
  return <MuiTableContainer {...other}>{children}</MuiTableContainer>
}

export const TableContainer = styled(BasicTableContainer)((props) => {
  const { variant, theme, expandInElevatedRow, getRowLink } = props
  const comunStyles = {
    '& .AruiTable-actionColumn': {
      width: '65px',
      maxWidth: '65px'
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
    },
    '& .AruiTable-tableHead': {
      // backgroundColor: '#ffffff99',
      position: 'sticky',
      // top: '0px',
      // backdropFilter: 'blur(15px)',
      zIndex: 5
    },
    '& .AruiTable-table': {
      borderCollapse: 'unset'
    },
    '& .AruiTable-tableCell': getRowLink
      ? {
          zIndex: 2,
          position: 'relative',
          pointerEvents: 'none'
        }
      : undefined,
    '& .AruiTable-tableCell :is(button, a, label, .AruiTooltip-root)':
      getRowLink
        ? {
            pointerEvents: 'auto'
          }
        : undefined
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
        borderRadius: theme.shape.borderRadius,
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
          padding: `${theme.spacing(1)} ${theme.spacing(1.5)}`,
          alignSelf: 'center'
        },
      '& .AruiTable-table': {
        width: '100%'
      }
    }
  }
})
