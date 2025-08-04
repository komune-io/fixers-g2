import { useMemo, useRef, useState } from 'react'
import { Popover as AruiPopover, PopoverBasicProps } from './Popover'
import { StoryObj, Meta } from '@storybook/react-vite'
import { Box, Typography } from '@mui/material'
import { Button } from '@komune-io/g2-components'

import { classes, styles } from './docs'
import { InputForm } from '@komune-io/g2-forms'

export default {
  title: 'Notifications/Popover',
  component: AruiPopover,

  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kgphqh0uVhoXt8TK3LlkGj/G2-%2F-Design-System?node-id=1017%3A1756'
    }
  },
  argTypes: {
    classes: {
      table: {
        type: {
          summary: 'PopoverClasses',
          detail: classes
        }
      }
    },
    styles: {
      table: {
        type: {
          summary: 'PopoverStyles',
          detail: styles
        }
      }
    }
  }
} as Meta<typeof AruiPopover>

export const Popover: StoryObj<PopoverBasicProps> = {
  render: (args: PopoverBasicProps) => {
    const [open, setOpen] = useState(false)
    const anchor = useRef<HTMLButtonElement>(null)
    return (
      <Box display='flex' justifyContent='center' alignItems='center'>
        <Button
          ref={anchor}
          onClick={() => {
            setOpen(!open)
          }}
        >
          Open the popover
        </Button>
        <AruiPopover
          {...args}
          open={open}
          onClose={() => setOpen(!open)}
          anchorEl={anchor.current}
          placement='top'
        >
          <Box display='flex' flexDirection='column' maxWidth='300px'>
            <Typography variant='h6' style={{ marginBottom: '15px' }}>
              This is a title
            </Typography>
            <Typography variant='body1'>
              Popover message will appear here loremipsum dolor samet…
            </Typography>
            <Button style={{ alignSelf: 'flex-end', marginTop: '10px' }}>
              Button
            </Button>
          </Box>
        </AruiPopover>
      </Box>
    )
  },

  name: 'Popover'
}

export const PopoverScenario: StoryObj<PopoverBasicProps> = {
  render: () => {
    const [emailopen, setemailopen] = useState(false)
    const [genderopen, setgenderopen] = useState(false)
    const [start, setStart] = useState(false)
    const [emailAnchor, setemailAnchor] = useState<HTMLDivElement | undefined>(
      undefined
    )
    const [genderAnchor, setgenderAnchor] = useState<
      HTMLDivElement | undefined
    >(undefined)
    const [form, setform] = useState({ email: '', password: '', gender: '' })

    const poppers = useMemo(() => {
      if (emailAnchor !== undefined && genderAnchor !== undefined) {
        return (
          <>
            <AruiPopover
              open={emailopen}
              anchorEl={emailAnchor}
              placement='bottom'
            >
              <Box display='flex' flexDirection='column' maxWidth='300px'>
                <Typography variant='body1'>
                  Please enter your account informations including a correct
                  email
                </Typography>
              </Box>
            </AruiPopover>
            <AruiPopover
              open={genderopen}
              anchorEl={genderAnchor}
              placement='bottom'
            >
              <Box display='flex' flexDirection='column' maxWidth='300px'>
                <Typography variant='body1'>
                  Please tell us more about you so we can select preferences
                  automatically
                </Typography>
              </Box>
            </AruiPopover>
          </>
        )
      }
    }, [emailAnchor, genderAnchor, emailopen, genderopen, start])

    if (!start)
      return (
        <Box display='flex' justifyContent='center' alignItems='center'>
          <Button
            onClick={() => {
              setStart(true)
              setemailopen(true)
            }}
          >
            Start the onBoarding
          </Button>
        </Box>
      )
    return (
      <Box display='flex' flexDirection='column' alignItems='center'>
        <InputForm
          ref={setemailAnchor}
          label='email:'
          value={form.email}
          onBlur={() => {
            emailopen && setemailopen(false)
            emailopen && setgenderopen(true)
          }}
          onChange={(value) => setform({ ...form, email: value })}
          onRemove={() => setform({ ...form, email: '' })}
          id='FormExampleEmail'
          inputType='textField'
          textFieldType='email'
          placeholder='example@gmail.com'
          style={{
            width: '400px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '20px'
          }}
          styles={{ label: { marginBottom: '0px' }, input: { width: '60%' } }}
        />
        <InputForm
          value={form.password}
          onChange={(value) => setform({ ...form, password: value })}
          onRemove={() => setform({ ...form, password: '' })}
          label='password:'
          id='FormExamplePassword'
          inputType='textField'
          textFieldType='password'
          style={{
            width: '400px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '20px'
          }}
          styles={{ label: { marginBottom: '0px' }, input: { width: '60%' } }}
        />
        <InputForm
          value={form.gender}
          ref={setgenderAnchor}
          onBlur={() => {
            genderopen && setgenderopen(false)
          }}
          label='gender:'
          inputType='select'
          onChangeValue={(value) => setform({ ...form, gender: value })}
          options={[
            { key: 'male', label: 'Male' },
            { key: 'female', label: 'Female' }
          ]}
          placeholder='chosse your gender'
          style={{
            width: '400px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '20px'
          }}
          styles={{ label: { marginBottom: '0px' }, input: { width: '60%' } }}
        />
        {poppers}
      </Box>
    )
  },

  name: 'An example of a popover scenario'
}
