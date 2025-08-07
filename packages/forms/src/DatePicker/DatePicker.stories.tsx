import { DatePicker as AruiDatePicker, DatePickerProps } from './DatePicker'
import { StoryObj, Meta, StoryFn } from '@storybook/react-vite'
import addDays from 'date-fns/addDays'
import { Box } from '@mui/material'
import { useState } from 'react'

export default {
  title: 'Forms/DatePicker',
  component: AruiDatePicker
} as Meta<typeof AruiDatePicker>

const fixedDate = new Date('2024-01-15T14:00:00.000Z')
const today = fixedDate

export const DatePicker: StoryObj<DatePickerProps> = {
  render: (args: DatePickerProps) => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(today)
    const handleDateChange = (date?: Date) => {
      setSelectedDate(date)
    }

    console.log(selectedDate)
    return (
      <AruiDatePicker
        value={selectedDate}
        onChangeDate={handleDateChange}
        onRemove={() => setSelectedDate(undefined)}
        {...args}
      />
    )
  },

  args: {
    id: 'datePicker-test',
    minDate: addDays(today, -10),
    maxDate: addDays(today, 10)
  },

  name: 'DatePicker'
}

export const DatePickerStatus: StoryFn<DatePickerProps> = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  return (
    <Box display='flex' flexDirection='column'>
      <AruiDatePicker
        value={selectedDate}
        placeholder='normal'
        onChangeDate={(date) => setSelectedDate(date)}
        onRemove={() => setSelectedDate(undefined)}
        style={{ margin: 10 }}
      />
      <AruiDatePicker
        value={selectedDate}
        placeholder='disabled'
        disabled
        onChangeDate={(date) => setSelectedDate(date)}
        onRemove={() => setSelectedDate(undefined)}
        style={{ margin: 10 }}
      />
      <AruiDatePicker
        value={selectedDate}
        placeholder='error'
        error
        errorMessage='there is an error'
        onChangeDate={(date) => setSelectedDate(date)}
        onRemove={() => setSelectedDate(undefined)}
        style={{ margin: 10 }}
      />
      <AruiDatePicker
        value={selectedDate}
        placeholder='english'
        locale='enUS'
        onChangeDate={(date) => setSelectedDate(date)}
        onRemove={() => setSelectedDate(undefined)}
        style={{ margin: 10 }}
      />
    </Box>
  )
}

export const DatePickerSizes: StoryFn<DatePickerProps> = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  return (
    <Box display='flex' flexDirection='column'>
      <AruiDatePicker
        value={selectedDate}
        placeholder='mui-picker small'
        size='small'
        onChangeDate={(date) => setSelectedDate(date)}
        onRemove={() => setSelectedDate(undefined)}
        style={{ margin: 10 }}
      />
      <AruiDatePicker
        value={selectedDate}
        placeholder='mui-picker medium'
        size='medium'
        onChangeDate={(date) => setSelectedDate(date)}
        onRemove={() => setSelectedDate(undefined)}
        style={{ margin: 10 }}
      />
      <AruiDatePicker
        value={selectedDate}
        placeholder='mui-picker large'
        size='large'
        onChangeDate={(date) => setSelectedDate(date)}
        onRemove={() => setSelectedDate(undefined)}
        style={{ margin: 10 }}
      />
    </Box>
  )
}
