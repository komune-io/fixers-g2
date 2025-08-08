import { Chip as AruiChip, ChipBasicProps } from './Chip'
import { StoryObj, Meta } from '@storybook/react-vite'
export default {
  title: 'Components/Chip',
  component: AruiChip
} as Meta<typeof AruiChip>

export const Chip: StoryObj<ChipBasicProps> = {
  render: (args: ChipBasicProps) => {
    return <AruiChip {...args} />
  },

  args: {
    label: 'G2 chip',
    color: '#18159D',
    onDelete: () => {}
  },

  name: 'Chip'
}
