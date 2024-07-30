import React from 'react'
import { ThemeContextProvider } from '@komune-io/g2-themes'
import { StorybookCanvas } from '@komune-io/g2-storybook-documentation'
import { G2ConfigBuilder, initI18next } from '../packages/providers/src'
import { I18nextProvider } from 'react-i18next'
import { MantineProvider } from '@mantine/core'

import './default.css'
import { Box, CssBaseline, IconButton } from '@mui/material'
import { Menu } from '@mui/icons-material'

export const parameters = {
  docs: {
    container: StorybookCanvas,
    components: {
      Canvas: StorybookCanvas
    }
  },
  options: {
    storySort: {
      order: [
        'Overview',
        ['Getting started', 'Cheatsheet'],
        'Components',
        'Forms',
        'Layout'
      ]
    }
  },
  viewMode: 'docs'
}

G2ConfigBuilder({
  im: {
    orgUrl: 'https://connect.kommune.dev/im',
    userUrl: 'https://connect.kommune.dev/im'
  },
  keycloak: {
    realm: 'komune-dev',
    clientId: 'komune-web',
    url: 'https://connect.kommune.dev/auth'
  },
  fs: {
    url: 'https://connect.kommune.dev/fs'
  }
})

const permanentHeader = ({ toggleOpenDrawer }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
        padding: '16px',
        gap: '16px',
        alignItems: 'center'
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex'
        }}
      >
        <img src='/komune.png' style={{ width: '100%' }} />
      </Box>
      <IconButton onClick={toggleOpenDrawer}>
        <Menu />
      </IconButton>
    </Box>
  )
}

const i18n = initI18next({ en: 'en-US', fr: 'fr-FR' })

export const withThemeProvider = (Story) => {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeContextProvider
        theme={{
          permanentHeader,
          bgColorOnMenu: true,
          colors: { background: '#FAF8F3' }
        }}
      >
        <MantineProvider>
          <CssBaseline />
          <Story />
        </MantineProvider>
      </ThemeContextProvider>
    </I18nextProvider>
  )
}

export const decorators = [withThemeProvider]
