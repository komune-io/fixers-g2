import { Breadcrumbs as AruiBreadcrumbs, BreadcrumbsProps } from './Breadcrumbs'
import { StoryObj, Meta } from '@storybook/react-vite'
import { BrowserRouter } from 'react-router-dom'
export default {
  title: 'Components/Breadcrumbs',
  component: AruiBreadcrumbs
} as Meta<typeof AruiBreadcrumbs>

export const Breadcrumbs: StoryObj<BreadcrumbsProps> = {
  render: (args: BreadcrumbsProps) => {
    return (
      <BrowserRouter>
        <AruiBreadcrumbs {...args} />
      </BrowserRouter>
    )
  },

  args: {
    crumbs: [
      {
        label: 'link 1',
        url: ''
      },
      {
        label: 'link 2',
        url: ''
      },
      {
        label: 'link 3',
        url: ''
      },
      {
        label: 'A very very long link label',
        url: ''
      },
      {
        label: 'currentPage',
        url: ''
      }
    ]
  },

  name: 'Breadcrumbs'
}
