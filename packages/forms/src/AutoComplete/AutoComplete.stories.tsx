import React from 'react'
import {
  AutoComplete as AruiAutoComplete,
  AutoCompleteBasicProps
} from './AutoComplete'
import { Meta, StoryFn } from '@storybook/react'

export default {
  title: 'Forms/AutoComplete',
  component: AruiAutoComplete,
  argTypes: {
    options: {
      control: null
    }
  }
} as Meta

interface Book {
  title: string
  author: string
  id: string
}

const books: Book[] = [
  { title: 'Komune Potter', author: 'JK C2', id: 'b1' },
  { title: 'The Lord of the Bs', author: 'S.S.M. Tolkien', id: 'b2' },
  { title: 'Impact Wars', author: 'Carbon Lucas', id: 'b3' },
  { title: 'Blockchainator', author: 'A strange guy', id: 'b4' },
  { title: 'Impactosorus', author: 'Greg beatcoyn', id: 'b5' }
]

export const AutoComplete: StoryFn<AutoCompleteBasicProps<Book>> = (
  args: AutoCompleteBasicProps<Book>
) => {
  return (
    <AruiAutoComplete<Book>
      style={{
        width: 500
      }}
      {...args}
    />
  )
}

AutoComplete.args = {
  options: books,
  id: 'test',
  noOptionsText: 'Rechercher un livre',
  getOptionLabel: (book) => book.title ?? ''
}

AutoComplete.storyName = 'AutoComplete'
