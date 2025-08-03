import { ComponentPropsWithRef, useState } from 'react'
import { Button as AruiButton, ButtonBasicProps } from './Button'
import { StoryObj, Meta } from '@storybook/react'
import { Box } from '@mui/material'
import { SwapHoriz } from '@mui/icons-material'
import { EditButton } from './EditButton'
import { DeleteButton } from './DeleteButton'
import { BackButton } from './BackButton'
import { LinkButton } from './LinkButton'

import { BrowserRouter } from 'react-router-dom'

export default {
  title: 'Components/Button',
  component: AruiButton
} as Meta<typeof AruiButton>

export const Button: StoryObj<ButtonBasicProps> = {
  render: (args: ButtonBasicProps) => (
    <AruiButton {...args}>{args.children}</AruiButton>
  ),

  args: {
    children: 'Mon Bouton'
  }
}

export const ButtonVariant: StoryObj = {
  render: () => (
    <Box display='flex' justifyContent='space-around'>
      <AruiButton variant='contained'>contained</AruiButton>
      <AruiButton variant='outlined'>outlined</AruiButton>
      <AruiButton variant='text'>text</AruiButton>
    </Box>
  ),

  name: 'button variants'
}

export const ButtonVariantSeverity: StoryObj = {
  render: () => (
    <Box display='flex' justifyContent='space-around'>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='space-around'
        height='200px'
        alignItems='center'
      >
        <AruiButton variant='contained' success>
          contained succes
        </AruiButton>
        <AruiButton variant='contained' fail>
          contained fail
        </AruiButton>
        <AruiButton variant='contained' warning>
          contained warning
        </AruiButton>
        <AruiButton variant='contained' isLoading>
          contained loading
        </AruiButton>
      </Box>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='space-around'
        alignItems='center'
      >
        <AruiButton variant='outlined' success>
          outlined succes
        </AruiButton>
        <AruiButton variant='outlined' fail>
          outlined fail
        </AruiButton>
        <AruiButton variant='outlined' warning>
          outlined warning
        </AruiButton>
        <AruiButton variant='outlined' isLoading>
          outlined loading
        </AruiButton>
      </Box>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='space-around'
        alignItems='center'
      >
        <AruiButton variant='text' success>
          text succes
        </AruiButton>
        <AruiButton variant='text' fail>
          text fail
        </AruiButton>
        <AruiButton variant='text' warning>
          text warning
        </AruiButton>
        <AruiButton variant='text' isLoading>
          text loading
        </AruiButton>
      </Box>
    </Box>
  ),

  name: 'button variants severity'
}

export const ButtonVariantDisabled: StoryObj = {
  render: () => (
    <Box display='flex' justifyContent='space-around'>
      <AruiButton variant='contained' disabled>
        contained disabled
      </AruiButton>
      <AruiButton variant='outlined' disabled>
        outlined disabled
      </AruiButton>
      <AruiButton variant='text' disabled>
        text disabled
      </AruiButton>
    </Box>
  ),

  name: 'button variants disabled'
}

export const ButtonSizes: StoryObj = {
  render: () => (
    <Box display='flex' justifyContent='space-around' alignItems='center'>
      <AruiButton variant='contained' size='large'>
        large
      </AruiButton>
      <AruiButton variant='contained' size='medium'>
        medium
      </AruiButton>
      <AruiButton variant='contained' size='small'>
        small
      </AruiButton>
    </Box>
  ),

  name: 'button sizes'
}

export const CustomIcon: StoryObj = {
  render: () => <AruiButton startIcon={<SwapHoriz />}>custom icon</AruiButton>,

  name: 'custom icon'
}

export const NoDefaultIcon: StoryObj = {
  render: () => (
    <AruiButton success noDefaultIcon>
      no icon
    </AruiButton>
  ),

  name: 'no default icon'
}

export const preConfigured: StoryObj = {
  render: () => (
    <Box display='flex' justifyContent='space-around'>
      <BackButton>BackButton</BackButton>
      <EditButton>EditButton</EditButton>
      <DeleteButton>DeleteButton</DeleteButton>
    </Box>
  ),

  name: 'pre-configured buttons'
}

export const buttonExtend: StoryObj = {
  render: () => {
    type ComponentPropsType = ComponentPropsWithRef<'a'>
    const componentProps: ComponentPropsType = {
      href: '/?path=/docs/components-button--button-extend'
    }
    return (
      <Box display='flex' justifyContent='space-around'>
        <AruiButton<ComponentPropsType>
          component={'a'}
          componentProps={componentProps}
        >
          Standard Link Button
        </AruiButton>
        <BrowserRouter>
          <LinkButton to='/'>react router Link Button</LinkButton>
        </BrowserRouter>
      </Box>
    )
  },

  name: 'extend a button with another component'
}

export const asynchronousButton: StoryObj = {
  render: () => {
    const [success, setSuccess] = useState(false)
    const asyncFucntion = async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('resolved')
          setSuccess(true)
        }, 2000)
      })
    }
    return (
      <AruiButton onClick={asyncFucntion} success={success}>
        Asynchronous action
      </AruiButton>
    )
  },

  name: 'call to an asynchronous action'
}
