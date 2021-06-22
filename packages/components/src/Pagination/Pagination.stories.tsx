import React, { useState } from 'react'
import {
  Pagination as AruiPagination,
  PaginationBasicProps,
} from './Pagination'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'
import { styles, classes } from './docs'
import { withDesign } from 'storybook-addon-designs'

export default {
  title: 'Components/Pagination',
  component: AruiPagination,
  decorators:[withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/4Nl4422AUGHNVClZOHzPg8/SmartB-UI-kit?node-id=208%3A1792',
    },
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
} as Meta

export const Pagination: Story<PaginationBasicProps> = (args: PaginationBasicProps) => {
  const [page, setpage] = useState(1)
  return (
    <AruiPagination onPageChange={(newPageNumber) => setpage(newPageNumber) } page={page} {...args}/>
  )
}

Pagination.args = {
  totalPage: 10
}


Pagination.storyName = 'Pagination'

