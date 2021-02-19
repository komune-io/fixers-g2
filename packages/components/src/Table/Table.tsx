import React, { Fragment } from 'react'
import DataTable, {
  IDataTableColumn,
  IDataTableStyles,
  IDataTableProps
} from 'react-data-table-component'
import { Typography } from '@material-ui/core'
import { CustomPagination } from './CustomPagination'
import { BasicProps, lowLevelStyles, MergeMuiElementProps } from '../Types'
import { useTheme, Theme } from '../ThemeContextProvider'

const useStyles = lowLevelStyles({
  container: {
    '& .rdt_TableRow .rdt_TableCell:last-child': {
      paddingRight: '30px'
    },
    '& .rdt_TableCol:last-child': {
      paddingRight: '30px'
    },
    '& .rdt_TableRow .rdt_TableCell:first-child': {
      paddingLeft: '30px'
    },
    '& .rdt_TableCol:first-child': {
      paddingLeft: '30px'
    },
    '& .rdt_TableBody': {
      padding: '20px',
      paddingTop: '5px'
    },
    '& .rdt_TableHead': {
      padding: '0 20px'
    }
  },
  row: {
    display: 'block'
  }
})

const customStyles = (theme: Theme) => ({
  table: {
    style: {
      backgroundColor: 'transparent'
    }
  },
  headRow: {
    style: {
      backgroundColor: 'transparent',
      borderBottom: 'none !important'
    }
  },
  rows: {
    style: {
      lineHeight: '17px',
      letterSpacing: '0px',
      margin: '4px 0',
      boxShadow: theme.shadows[1],
      borderRadius: '5px',
      border: `2px solid transparent !important`,
      '&:hover': {
        border: `2px solid ${theme.hex.secondaryColor} !important`,
        backgroundColor: `#FFFFFF !important`,
        borderRadius: 5,
        outlineWidth: 'inherit !important'
      }
    }
  },
  headCells: {
    style: {
      lineHeight: '16px',
      letterSpacing: '0px',
      color: '#353945',
      fontWeight: 600,
      fontSize: '14px',
      textAlign: 'left',
      padding: '0 20px'
    }
  },
  cells: {
    style: {
      padding: '0 20px',
      '& p': {
        color: '#353945',
        fontSize: '14px',
        fontWeight: 600,
        lineHeight: '17px'
      }
    }
  },
  noData: {
    style: {
      backgroundColor: 'transparent',
      height: '25px'
    }
  },
  expanderRow: {
    style: {
      backgroundColor: 'transparent'
    }
  },
  expanderButton: {
    style: {
      '&:hover:not(:disabled)': {
        backgroundColor: 'transparent'
      },
      '&:focus': {
        backgroundColor: 'transparent'
      }
    }
  }
})

export interface TableBasicProps<Row> extends BasicProps {
  /**
   * An array of the data that will be displayed in the table
   */
  data: Row[]
  /**
   * The columns of the table build with the data
   */
  columns: IDataTableColumn<Row>[]
  /**
   * Indicates if the user can select the row with a checkbox or not
   */
  selectableRows?: boolean
  /**
   * The envent triggered when a row is clicked.
   *
   * ⚠️ if some part of the table are not clickable add `data-tag='___react-data-table-allow-propagation___'` on the top-level components
   */
  onRowClicked?: (row: Row) => void
  /**
   * The number of pages the table contain.
   *
   * ⚠️ if you want the pagination to appear you must provide this props and also **page**
   */
  totalPages?: number
  /**
   * the envent trigger when the current page has to change
   */
  handlePageChange?: (page: number) => void
  /**
   * Indicates if the data is currently loading
   */
  isLoading?: boolean
  /**
   * This must be a unique id applied to the row
   */
  keyField?: string
  /**
   * The message appearing when no data is given
   */
  noDataMessage?: string
  /**
   * The number of pages the table contain.
   *
   * ⚠️ if you want the pagination to appear you must provide this props and also `totalPages`
   */
  page?: number
  /**
   * Indicates if the row can be expand
   */
  expandableRows?: boolean
  /**
   * The component displayed in the expanded part of a row.
   *
   * ⚠️ this component must have the prop `data?: T` to get the data of the row its expanding
   */
  ExpandableComponents?: React.ReactNode
  /**
   * indicates if the row should expand when its clicked
   */
  expandOnRowClicked?: boolean
  /**
   * The displayed component when the data is loading
   */
  loadingComponent?: React.ReactNode
  /**
   * 🚫The prop id is **unavailable** in this component
   */
  id?: string
}

export type TableProps<row> = MergeMuiElementProps<
  IDataTableProps<row>,
  TableBasicProps<row>
>

export const Table = <Row,>(props: TableProps<Row>) => {
  const {
    data,
    columns,
    selectableRows = false,
    onRowClicked,
    totalPages,
    handlePageChange,
    page,
    isLoading = false,
    className,
    keyField,
    noDataMessage,
    expandableRows = false,
    ExpandableComponents,
    expandOnRowClicked = false,
    loadingComponent,
    style,
    ...other
  } = props
  const classes = useStyles()
  const theme = useTheme()
  return (
    <Fragment>
      {isLoading ? (
        loadingComponent ?? <Typography>Loading...</Typography>
      ) : (
        <DataTable
          columns={columns}
          className={`${className} ${classes.container}`}
          style={style}
          theme='colisactiv'
          data={data}
          noHeader
          noDataComponent={
            noDataMessage ? noDataMessage : 'Aucun élément à afficher'
          }
          highlightOnHover
          pointerOnHover
          selectableRows={selectableRows}
          onRowClicked={onRowClicked}
          customStyles={customStyles(theme) as IDataTableStyles}
          keyField={keyField}
          expandableRows={expandableRows}
          expandableRowsComponent={ExpandableComponents}
          expandOnRowClicked={expandOnRowClicked}
          {...other}
        />
      )}

      {page && totalPages ? (
        <CustomPagination
          onPageChange={handlePageChange}
          page={page}
          totalPage={totalPages}
        />
      ) : undefined}
    </Fragment>
  )
}
