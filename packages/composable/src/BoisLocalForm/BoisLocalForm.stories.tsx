import { Meta } from '@storybook/react'
import { Root } from './Root'

export default {
  title: 'Composable/BoisLocalForm',
  component: Root
} as Meta<typeof Root>

export const FiltersStory = () => {
  return <Root />
}
