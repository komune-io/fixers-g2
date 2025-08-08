import { AlertHub as AruiAlertHub, AlertHubProps } from './AlertHub'
import { StoryObj, Meta } from '@storybook/react-vite'
import { useAlertHub } from './useAlertHub'
import { Button } from '@komune-io/g2-components'
import { Fragment } from 'react'

export default {
  title: 'Notifications/AlertHub',
  component: AruiAlertHub,

  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Ruq4cXc1frJJ5qVtLtnqje/SmartB-UI-kit?node-id=210%3A435'
    }
  }
} as Meta<typeof AruiAlertHub>

function Example() {
  const { pushAlert } = useAlertHub()

  const handleClick = () => {
    pushAlert({ message: 'hello' })
  }

  const handleClickSuccess = () => {
    pushAlert({ message: 'hello', severity: 'success' })
  }

  return (
    <Fragment>
      <Button onClick={handleClick}>Show snackbar</Button>
      <Button onClick={handleClickSuccess}>Show success snackbar</Button>
    </Fragment>
  )
}

export const AlertHub: StoryObj<AlertHubProps> = {
  render: (args: AlertHubProps) => {
    return (
      <AruiAlertHub {...args}>
        <Example />
      </AruiAlertHub>
    )
  },

  name: 'AlertHub'
}
