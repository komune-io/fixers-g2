import React from 'react'
import { Meta } from '@storybook/react'
import { Table as AruiTable, TableBasicProps } from './Table'
import { Column, CellProps } from 'react-table'
import { Story } from '@storybook/react/types-6-0'
import { Box, Divider, Stack, Typography } from '@mui/material'
import {
  ArgsTable,
  PRIMARY_STORY,
  Title,
  Description,
  Primary,
  Stories
} from '@storybook/addon-docs'
import { CodeHighlighter } from '@smartb/g2-documentation'
import { customCellExample, classes, styles } from './types'
import { Info } from '@mui/icons-material'

export default {
  title: 'Layout/Table',
  component: AruiTable,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>Table</Title>
          <Description>
            This table is created using the library
            [react-table](https://react-table.tanstack.com/).
          </Description>
          <Description>
            You will have to provide the data and the columns used to create the
            table. The columns need to have an id or an acessor as described
            here:
            https://react-table.tanstack.com/docs/api/useTable#column-options.
          </Description>
          <Description>
            To create a custom cell you will have to type the parameters with
            customs types provided by g2 like so:
          </Description>
          <CodeHighlighter code={customCellExample} />
          <Description>
            There is 2 variants you can use. They are fundamentally different:
          </Description>
          <Description>
            - the `grounded` variant is based on the Material-ui
            [`Table`](https://mui.com/components/tables/#main-content)
            component. And use the the appropriate html tags for a table.
          </Description>
          <Description>
            - the `elevated` variant is a virtualized table created with div
            tags. It's the most custamizable one but it less accessible because
            it doesn't follow the html rule.
          </Description>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      )
    }
  },
  argTypes: {
    classes: {
      table: {
        type: {
          summary: 'AppClasses',
          detail: classes
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'AppStyles',
          detail: styles
        }
      }
    }
  }
} as Meta

export const Table: Story<TableBasicProps<Data>> = (
  args: TableBasicProps<Data>
) => {
  return <AruiTable {...args}></AruiTable>
}

interface Data {
  id: string
  name: string
  isRelaxed: boolean
}

const data: Data[] = [
  {
    id: '0',
    name: 'Jean',
    isRelaxed: true
  },
  {
    id: '1',
    name: 'Mathieu',
    isRelaxed: false
  },
  {
    id: '2',
    name: 'Simon',
    isRelaxed: true
  }
]

const columns: Column<Data>[] = [
  {
    Header: 'Id',
    accessor: 'id',
    Cell: ({ row }: CellProps<Data>) => (
      <Typography>{row.original.id}</Typography>
    )
  },
  {
    Header: 'Name',
    accessor: 'name',
    Cell: ({ row }: CellProps<Data>) => (
      <Typography>{row.original.name}</Typography>
    )
  },
  {
    Header: 'Is he relax ?',
    accessor: 'isRelaxed',
    Cell: ({ row }: CellProps<Data>) => (
      <Typography>{row.original.isRelaxed ? 'yes' : 'no'}</Typography>
    )
  }
]

Table.args = {
  data: data,
  columns: columns,
  setSelectedRows: (rows) => console.log(rows),
  renderSubComponent: (row, rowProps) => (
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

export const theVariants: Story = () => {
  type DataExample = {
    name: string
    age: number
    gender: 'Male' | 'Female'
    nationality: string
  }
  const dataExample: DataExample[] = [
    {
      name: 'Jean',
      age: 20,
      gender: 'Male',
      nationality: 'French'
    },
    {
      name: 'Jean',
      age: 20,
      gender: 'Male',
      nationality: 'French'
    },
    {
      name: 'Jean',
      age: 20,
      gender: 'Male',
      nationality: 'French'
    },
    {
      name: 'Jean',
      age: 20,
      gender: 'Male',
      nationality: 'French'
    }
  ]

  const columnsExample: Column<DataExample>[] = [
    {
      Header: 'Name',
      accessor: 'name',
      Cell: ({ row }: CellProps<DataExample>) => (
        <Typography>{row.original.name}</Typography>
      )
    },
    {
      Header: 'Age',
      accessor: 'age',
      Cell: ({ row }: CellProps<DataExample>) => (
        <Typography>{row.original.age}</Typography>
      )
    },
    {
      Header: 'Gender',
      accessor: 'gender',
      Cell: ({ row }: CellProps<DataExample>) => (
        <Typography>{row.original.gender}</Typography>
      )
    },
    {
      Header: 'Nationality',
      accessor: 'nationality',
      Cell: ({ row }: CellProps<DataExample>) => (
        <Typography>{row.original.nationality}</Typography>
      )
    }
  ]
  return (
    <Stack spacing={4}>
      <AruiTable<DataExample>
        data={dataExample}
        columns={columnsExample}
        variant='grounded'
      />
      <AruiTable<DataExample>
        data={dataExample}
        columns={columnsExample}
        variant='elevated'
      />
    </Stack>
  )
}

export const potentialUse: Story = () => {
  type Notification = {
    message: string
    date: number
  }

  const dataNotifications: Notification[] = [
    {
      message: 'Jean sent you a message',
      date: Date.now()
    },
    {
      message: 'Jean sent you a message',
      date: Date.now()
    },
    {
      message: 'Jean sent you a message',
      date: Date.now()
    },
    {
      message: 'Jean sent you a message',
      date: Date.now()
    }
  ]

  const columnsNotification: Column<Notification>[] = [
    {
      Header: 'Notification list',
      id: 'notifications',
      Cell: ({ row }: CellProps<Notification>) => (
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
  return (
    <Stack>
      <AruiTable<Notification>
        data={dataNotifications}
        columns={columnsNotification}
        variant='grounded'
        onRowClicked={() => {}}
      />
    </Stack>
  )
}
