import { Stepper as AruiStepper, StepperProps } from './Stepper'
import {
  SidePageStepper as AruiSidePageStepper,
  SidePageStepperProps
} from './SidePageStepper'
import { StoryObj, Meta } from '@storybook/react'
import logo from '../assets/komune.png'

export default {
  title: 'Layout/Stepper',
  component: AruiStepper
} as Meta<typeof AruiStepper>

export const Stepper: StoryObj<StepperProps> = {
  render: (args: StepperProps) => {
    return <AruiStepper {...args} />
  },

  args: {
    activeStep: 1,
    steps: [
      {
        key: 'step1',
        label: 'Step 1'
      },
      {
        key: 'step2',
        label: 'Step 2'
      },
      {
        key: 'step 3',
        label: 'Step 3'
      }
    ]
  },

  name: 'Stepper'
}

export const SidePageStepper: StoryObj<SidePageStepperProps> = {
  render: (args: SidePageStepperProps) => {
    return (
      <AruiSidePageStepper
        {...args}
        headerComponent={
          <img
            alt='komune logo'
            src={logo}
            style={{
              width: '100%',
              maxWidth: '200px',
              marginTop: '50px'
            }}
          />
        }
      />
    )
  },

  args: {
    stepperProps: {
      steps: [
        {
          key: 'step1',
          label: 'Step 1'
        },
        {
          key: 'step2',
          label: 'Step 2'
        },
        {
          key: 'step 3',
          label: 'Step 3'
        }
      ]
    }
  },

  name: 'Side page stepper'
}
