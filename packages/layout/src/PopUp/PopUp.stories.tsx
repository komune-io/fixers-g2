import React, { useState } from 'react'
import { PopUp as AruiPopUp, PopUpBasicProps } from './PopUp'
import {
  ConfirmationPopUp as AruiConfirmationPopUp,
  ConfirmationPopUpBasicProps
} from './ConfirmationPopUp'
import { StoryObj, Meta, StoryFn } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { ArgTypes, Title, Primary, Stories } from '@storybook/addon-docs'
import { styles, classes, Action } from './types'
import { Box, Typography } from '@mui/material'
import imageHolder from '../assets/imageHolder.jpg'
import { Action as PopUpAtion, Button } from '@komune-io/g2-components'

export default {
  title: 'Layout/PopUp',
  component: AruiPopUp,

  subcomponents: { ConfirmationPopUp: AruiConfirmationPopUp },
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>PopUp</Title>
          <Primary />
          <ArgTypes of={AruiPopUp} />
          <Stories />
          <ArgTypes of={AruiConfirmationPopUp} />
        </>
      )
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kgphqh0uVhoXt8TK3LlkGj/G2-%2F-Design-System?node-id=1014%3A390'
    }
  }
} as Meta<typeof AruiPopUp>

export const PopUp: StoryObj<PopUpBasicProps> = {
  render: (args: PopUpBasicProps) => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(!open)}>Open the popup</Button>
        <AruiPopUp {...args} open={open} onClose={() => setOpen(!open)} />
      </>
    )
  },

  args: {
    children: (
      <>
        <Typography variant='h4' style={{ marginBottom: '15px' }}>
          Popup title
        </Typography>
        <Typography variant='body1'>
          This is a placeholer text just to show the default size and weight for
          body text typography in a popup.
        </Typography>
      </>
    ),
    actions: [
      {
        label: 'annuler',
        key: 'cancelPopupButton',
        onClick: action('clicked on annuler'),
        variant: 'text'
      },
      {
        label: 'continuer',
        key: 'continuPopupButton',
        onClick: action('clicked on continuer')
      }
    ]
  },

  argTypes: {
    children: {
      control: null
    },
    actions: {
      table: {
        type: {
          summary: 'Action[]',
          detail: Action
        }
      }
    },
    classes: {
      table: {
        type: {
          summary: 'PopUpClasses',
          detail: classes
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'PopUpStyles',
          detail: styles
        }
      }
    }
  },

  name: 'PopUp'
}

export const alternativePopUp: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false)
    const actions: PopUpAtion[] = [
      {
        label: 'continuer',
        key: 'continuPopupButton',
        onClick: () => setOpen(!open)
      },
      {
        label: 'annuler',
        key: 'cancelPopupButton',
        onClick: () => setOpen(!open),
        variant: 'text'
      }
    ]
    return (
      <>
        <Button onClick={() => setOpen(!open)}>Open the popup</Button>
        <AruiPopUp
          open={open}
          onClose={() => setOpen(!open)}
          styles={{ actions: { flexDirection: 'column' } }}
          actions={actions}
        >
          <Box display='flex' justifyContent='center'>
            <img
              src={imageHolder}
              alt='image holder'
              style={{ marginBottom: '10px' }}
            />
          </Box>
          <Typography
            variant='h4'
            style={{ marginBottom: '15px' }}
            align='center'
          >
            Popup title
          </Typography>
          <Typography variant='body1' align='center'>
            This is a placeholer text just to show the default size and weight
            for body text typography in a popup.
          </Typography>
        </AruiPopUp>
      </>
    )
  },

  name: 'An alternative popup'
}

export const ConfirmationPopUp: StoryObj<ConfirmationPopUpBasicProps> = {
  render: (args: ConfirmationPopUpBasicProps) => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(!open)}>Open the popup</Button>
        <AruiConfirmationPopUp
          {...args}
          open={open}
          onClose={() => setOpen(!open)}
        />
      </>
    )
  },

  args: {
    strongConfirmation: true
  },

  name: 'ConfirmationPopUp'
}

export const ConfirmationDeletionPopUp: StoryObj<ConfirmationPopUpBasicProps> =
  {
    render: (args: ConfirmationPopUpBasicProps) => {
      const [open, setOpen] = useState(false)
      return (
        <>
          <Button onClick={() => setOpen(!open)}>Open the popup</Button>
          <AruiConfirmationPopUp
            {...args}
            open={open}
            variant='deletion'
            onClose={() => setOpen(!open)}
          />
        </>
      )
    }
  }
