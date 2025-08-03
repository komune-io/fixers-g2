import { useState } from 'react'
import { StoryObj, Meta, StoryFn } from '@storybook/react'
import { TableV2 as AruiTableV2, TableV2BasicProps } from './TableV2'
import { G2ColumnDef, useTable } from './useTable'

import { Box, Button, Divider, Stack, Typography } from '@mui/material'
import { Info } from '@mui/icons-material'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnFactory } from '../ColumnFactory'
import { BrowserRouter } from 'react-router-dom'
import { arrayMove } from '@dnd-kit/sortable'

export default {
  title: 'Layout/TableV2',
  component: AruiTableV2
} as Meta<typeof AruiTableV2>

interface Data {
  id: string
  name: string
  isRelaxed: boolean
}

const data1: Data[] = [
  {
    id: 'row 0',
    name: 'Jean',
    isRelaxed: true
  },
  {
    id: 'row 1',
    name: 'Mathieu',
    isRelaxed: false
  },
  {
    id: 'row 2',
    name: 'Simon',
    isRelaxed: true
  }
]

const data2: Data[] = [
  {
    id: 'row 3',
    name: 'Paul',
    isRelaxed: true
  },
  {
    id: 'row 4',
    name: 'Olivier',
    isRelaxed: false
  },
  {
    id: 'row 5',
    name: 'Thomas',
    isRelaxed: true
  }
]

const columns: G2ColumnDef<Data>[] = [
  {
    header: 'Id',
    id: 'id',
    cell: ({ row }) => <Typography>{row.original.id}</Typography>,
    sortable: true
  },
  {
    header: 'Name',
    id: 'name',
    cell: ({ row }) => <Typography>{row.original.name}</Typography>,
    sortable: true
  },
  {
    header: 'Is he relax ?',
    id: 'isRelaxed',
    cell: ({ row }) => (
      <Typography>{row.original.isRelaxed ? 'yes' : 'no'}</Typography>
    )
  }
]

export const TableV2: StoryObj<TableV2BasicProps<Data>> = {
  render: (args: TableV2BasicProps<Data>) => {
    const [page, setPage] = useState<number>(1)
    const [sort, setSort] = useState({})
    const tableState = useTable({
      data: page === 1 ? data1 : data2,
      columns: columns,
      enableExpanding: true,
      enableRowSelection: true,
      getRowId: (row) => row.id
    })
    return (
      <AruiTableV2
        page={page}
        totalPages={2}
        onPageChange={(newPage) => setPage(newPage)}
        tableState={tableState}
        onSortingChange={setSort}
        sortState={sort}
        {...args}
      />
    )
  },

  args: {
    renderSubComponent: (row) => (
      <Box
        sx={{
          margin: 1
        }}
      >
        <Typography>Hy, I'm the subcomponent of {row.original.name}</Typography>
      </Box>
    ),
    onRowClicked: (row) => console.log('cliked', row)
  }
}

export const Draggable: StoryObj<TableV2BasicProps<Data>> = {
  render: (args: TableV2BasicProps<Data>) => {
    const [data, setData] = useState(data1)
    const tableState = useTable({
      data: data,
      columns: columns,
      enableRowSelection: true,
      enableDragging: true,
      getRowId: (row) => row.id
    })

    const onDragRow = (
      oldRowId: string | number,
      newRowId: string | number
    ) => {
      console.log('drag end')
      setData((old) => {
        const oldIndex = old.findIndex((row) => row.id === oldRowId)
        const newIndex = old.findIndex((row) => row.id === newRowId)
        return arrayMove(data, oldIndex, newIndex)
      })
    }
    return (
      <AruiTableV2 onDragRow={onDragRow} tableState={tableState} {...args} />
    )
  }
}

export const theVariants: StoryFn = () => {
  interface DataExample {
    id: string
    name: string
    age: number
    gender: 'Male' | 'Female'
    nationality: string
  }
  const dataExample: DataExample[] = [
    {
      id: '1',
      name: 'Jean',
      age: 20,
      gender: 'Male',
      nationality: 'French'
    },
    {
      id: '2',
      name: 'Jean',
      age: 20,
      gender: 'Male',
      nationality: 'French'
    },
    {
      id: '3',
      name: 'Jean',
      age: 20,
      gender: 'Male',
      nationality: 'French'
    },
    {
      id: '3',
      name: 'Jean',
      age: 20,
      gender: 'Male',
      nationality: 'French'
    }
  ]

  const columnsExample: ColumnDef<DataExample>[] = [
    {
      header: 'Name',
      id: 'name',
      cell: ({ row }) => <Typography>{row.original.name}</Typography>
    },
    {
      header: 'Age',
      id: 'age',
      cell: ({ row }) => <Typography>{row.original.age}</Typography>
    },
    {
      header: 'Gender',
      id: 'gender',
      cell: ({ row }) => <Typography>{row.original.gender}</Typography>
    },
    {
      header: 'Nationality',
      id: 'nationality',
      cell: ({ row }) => <Typography>{row.original.nationality}</Typography>
    }
  ]
  const tableState = useTable({
    data: dataExample,
    columns: columnsExample
  })
  return (
    <Stack spacing={5}>
      <AruiTableV2<DataExample>
        tableState={tableState}
        variant='grounded'
        getRowId={(row) => row.id}
      />
      <AruiTableV2<DataExample>
        tableState={tableState}
        variant='elevated'
        getRowId={(row) => row.id}
      />
    </Stack>
  )
}

export const LoadingStates: StoryFn = () => {
  const tableState = useTable({
    data: [],
    columns: []
  })
  return (
    <Stack spacing={5}>
      <AruiTableV2 tableState={tableState} isLoading variant='grounded' />
      <AruiTableV2 tableState={tableState} isLoading variant='elevated' />
    </Stack>
  )
}

export const NotificationList: StoryFn = () => {
  interface Notification {
    id: string
    message: string
    date: number
  }

  const dataNotifications: Notification[] = [
    {
      id: '1',
      message: 'Jean sent you a message',
      date: Date.now()
    },
    {
      id: '2',
      message: 'Jean sent you a message',
      date: Date.now()
    },
    {
      id: '3',
      message: 'Jean sent you a message',
      date: Date.now()
    },
    {
      id: '4',
      message: 'Jean sent you a message',
      date: Date.now()
    }
  ]

  const columnsNotification: ColumnDef<Notification>[] = [
    {
      header: 'Notification list',
      id: 'notifications',
      cell: ({ row }) => (
        <Stack direction='row' alignItems='center' spacing={2}>
          <Divider
            orientation='vertical'
            flexItem
            sx={{
              background: '#3C78D8',
              width: '3px',
              borderRadius: '15px',
              border: 'none',
              marginTop: '-5px',
              marginBottom: '-5px'
            }}
          />
          <Info
            sx={{
              color: '#3C78D8',
              width: '30px',
              height: '30px'
            }}
          />
          <Typography>{row.original.message}</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Typography sx={{ color: 'rgba(0, 0, 0, 0.57)' }} variant='caption'>
            {new Date(row.original.date).toDateString()}
          </Typography>
        </Stack>
      )
    }
  ]
  const tableState = useTable({
    data: dataNotifications,
    columns: columnsNotification
  })
  return (
    <Stack>
      <AruiTableV2<Notification>
        tableState={tableState}
        variant='grounded'
        onRowClicked={() => {}}
        getRowId={(row) => row.id}
      />
    </Stack>
  )
}

export const AxessExample: StoryFn = () => {
  interface AxessData {
    id: string
    protocol: string
    sectors: string
    vintage: string
    marketprice: string
    purchaseprice: string
    gain: string
    quantity: string
    total: string
  }

  const axessData: AxessData[] = [
    {
      id: '1',
      protocol: 'Protocol name',
      sectors: 'Category, Category, Category',
      vintage: '-',
      marketprice: '500 $',
      purchaseprice: '300 $',
      gain: '+47%',
      quantity: '1000 tCO2e',
      total: '340 000 $'
    },
    {
      id: '2',
      protocol: 'Protocol name',
      sectors: 'Category, Category, Category',
      vintage: '-',
      marketprice: '500 $',
      purchaseprice: '300 $',
      gain: '+47%',
      quantity: '1000 tCO2e',
      total: '340 000 $'
    },
    {
      id: '3',
      protocol: 'Protocol name',
      sectors: 'Category, Category, Category',
      vintage: '-',
      marketprice: '500 $',
      purchaseprice: '300 $',
      gain: '+47%',
      quantity: '1000 tCO2e',
      total: '340 000 $'
    },
    {
      id: '4',
      protocol: 'Protocol name',
      sectors: 'Category, Category, Category',
      vintage: '-',
      marketprice: '500 $',
      purchaseprice: '300 $',
      gain: '+47%',
      quantity: '1 000 tCO2e',
      total: '340 000 $'
    }
  ]

  const axessColumns: G2ColumnDef<AxessData>[] = [
    {
      header: 'Protocol',
      id: 'protocol',
      cell: ({ row }) => (
        <Typography variant='body2'>{row.original.protocol}</Typography>
      )
    },
    {
      header: 'Sectors',
      id: 'sectors',
      cell: ({ row }) => (
        <Typography variant='body2'>{row.original.sectors}</Typography>
      )
    },
    {
      header: 'Vintage',
      id: 'vintage',
      cell: ({ row }) => (
        <Typography variant='body2'>{row.original.vintage}</Typography>
      ),
      className: 'vintageColumn'
    },
    {
      header: 'Mark. price',
      id: 'marketprice',
      cell: ({ row }) => (
        <Typography variant='body2'>{row.original.marketprice}</Typography>
      ),
      className: 'marketColumn'
    },
    {
      header: 'Purch. price',
      id: 'purchaseprice',
      cell: ({ row }) => (
        <Typography variant='body2'>{row.original.purchaseprice}</Typography>
      ),
      footer: () => <Typography variant='body2'>290 $</Typography>,
      className: 'dataColumn'
    },
    {
      header: 'Gain',
      id: 'gain',
      cell: ({ row }) => (
        <Typography variant='body2'>{row.original.gain}</Typography>
      ),
      footer: () => <Typography variant='body2'>+47%</Typography>,
      className: 'dataColumn'
    },
    {
      header: 'Quantity',
      id: 'quantity',
      cell: ({ row }) => (
        <Typography variant='body2'>{row.original.quantity}</Typography>
      ),
      footer: () => <Typography variant='body2'>5 000 tCO2E</Typography>,
      className: 'dataColumn'
    },
    {
      header: 'Total',
      id: 'total',
      cell: ({ row }) => (
        <Typography variant='subtitle2'>{row.original.total}</Typography>
      ),
      footer: () => <Typography variant='subtitle2'>1 450 000 $</Typography>,
      className: 'dataColumn'
    }
  ]
  const tableState = useTable({
    data: axessData,
    columns: axessColumns,
    noToggleAllPageRowsSelected: true,
    enableRowSelection: true
  })
  return (
    <Stack
      sx={{
        '& .vintageColumn': {
          textAlign: 'center'
        },
        '& .dataColumn': {
          textAlign: 'right'
        },
        '& .marketColumn': {
          textAlign: 'right'
        },
        '& .AruiTable-tableCell.dataColumn': {
          background: '#F2F3F5'
        },
        '& .AruiTable-tableHeaderRow': {
          background: '#404A68',
          color: 'white'
        },
        '& .AruiTable-tableHeaderCell': {
          color: 'white'
        },
        '& .AruiTable-tableFooterCell.dataColumn': {
          background: '#404A68',
          color: 'white'
        },
        '.AruiTable-rowHoveredComponentContainer': {
          width: 'fit-content',
          paddingRight: '10px',
          paddingLeft: '50px',
          right: '0px',
          background:
            'linear-gradient(270deg, #D9DBE1 84.38%, rgba(217, 219, 225, 0) 100%)',
          '& button': {
            color: 'black',
            fontSize: '1rem',
            fontWeight: 600
          }
        }
      }}
    >
      <AruiTableV2<AxessData>
        tableState={tableState}
        getRowId={(row) => row.id}
        variant='grounded'
        withFooter
        renderRowHoveredComponent={() => (
          <Stack direction='row' spacing={2} alignItems='center' height='100%'>
            <Button>Buy</Button>
            <Button>Sell</Button>
            <Button>Burn</Button>
          </Stack>
        )}
      />
    </Stack>
  )
}

export const ColumnFactoryExample: StoryFn = () => {
  interface Person {
    id: string
    firstName: string
    lastName: string
    birthDate: number
    phone: string
    email: string
    city: string
  }

  const persons: Person[] = [
    {
      id: '1',
      firstName: 'Jack',
      lastName: 'Burdon',
      birthDate: Date.now(),
      email: 'jack@burdon.com',
      phone: '0610203040',
      city: 'Montpellier'
    },
    {
      id: '2',
      firstName: 'Alice',
      lastName: 'Brace',
      birthDate: Date.now(),
      email: 'alice@brace.com',
      phone: '0610203040',
      city: 'Montpellier'
    },
    {
      id: '3',
      firstName: 'Henri',
      lastName: 'Rutelle',
      birthDate: Date.now(),
      email: 'heanri@rutelle.com',
      phone: '0610203040',
      city: 'Montpellier'
    }
  ]

  const columns = ColumnFactory<Person>({
    generateColumns: (generators) => ({
      profile: generators.profile({
        header: 'Profile',
        getCellProps: (person) => ({
          value: {
            givenName: person.firstName,
            familyName: person.lastName
          }
        })
      }),

      birthDate: generators.date({
        header: 'Birth date',
        getCellProps: (person) => ({
          value: person.birthDate
        })
      }),

      city: generators.text({
        header: 'City',
        getCellProps: (person) => ({
          value: person.city
        })
      }),

      contact: generators.contact({
        header: 'Contact',
        getCellProps: (person) => ({
          value: {
            email: person.email,
            phone: person.phone
          }
        })
      })
    })
  })
  const tableState = useTable({
    data: persons,
    columns: columns,
    noToggleAllPageRowsSelected: true,
    enableRowSelection: true
  })
  return (
    <Stack>
      <BrowserRouter>
        <AruiTableV2
          getRowLink={() => ({
            to: 'https://tanstack.com/table/v8/docs/examples/react/row-dnd'
          })}
          tableState={tableState}
        />
      </BrowserRouter>
    </Stack>
  )
}
