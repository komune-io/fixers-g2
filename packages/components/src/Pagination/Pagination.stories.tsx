import { useState } from 'react'
import {
  Pagination as AruiPagination,
  PaginationBasicProps
} from './Pagination'
import { StoryObj, Meta } from '@storybook/react-vite'
import { styles, classes } from './docs'

export default {
  title: 'Components/Pagination',
  component: AruiPagination,

  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kgphqh0uVhoXt8TK3LlkGj/G2-%2F-Design-System?node-id=1017%3A1884'
    }
  },
  argTypes: {
    classes: {
      table: {
        type: {
          summary: 'PaginationClasses',
          detail: classes
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'PaginationStyles',
          detail: styles
        }
      }
    }
  }
} as Meta<typeof AruiPagination>

export const Pagination: StoryObj<PaginationBasicProps> = {
  render: (args: PaginationBasicProps) => {
    const [page, setpage] = useState(1)
    return (
      <AruiPagination
        onPageChange={(newPageNumber) => setpage(newPageNumber)}
        page={page}
        {...args}
      />
    )
  },

  args: {
    totalPage: 10
  },

  name: 'Pagination'
}
