import {
  UserAvatar as AruiUserAvatar,
  UserAvatarBasicProps
} from './UserAvatar'
import { StoryObj, Meta } from '@storybook/react-vite'

export default {
  title: 'Components/UserAvatar',
  component: AruiUserAvatar,

  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kgphqh0uVhoXt8TK3LlkGj/G2-%2F-Design-System?node-id=1019%3A1023'
    }
  }
} as Meta<typeof AruiUserAvatar>

export const UserAvatar: StoryObj<UserAvatarBasicProps> = {
  render: (args: UserAvatarBasicProps) => {
    return <AruiUserAvatar {...args} />
  },

  args: {
    name: 'John Doe'
  },

  name: 'UserAvatar'
}
