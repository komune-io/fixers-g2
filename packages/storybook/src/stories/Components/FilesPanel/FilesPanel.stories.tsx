import React from 'react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import {
  FilesPanel as AruiFilesPanel,
  FolderItem,
  ThemeContextProvider,
  Button
} from '@smartb/archetypes-ui-components'
import { withA11y } from '@storybook/addon-a11y'
import { myTheme } from '../../../Docs/Theme/Theme'
import { Box } from '@material-ui/core'

export default {
  title: 'Components|FilesPanel',
  decorators: [withKnobs, withA11y]
}

export const FilesPanel = () => {
  const isLoading = boolean('isLoading', false)
  const children: FolderItem = {
    type: 'folder',
    label: 'base',
    key: 'base',
    items: [
      {
        type: 'folder',
        label: 'dossier',
        key: 'dossier',
        onClick: () => console.log('folder')
      },
      {
        type: 'file',
        label: 'myFile',
        key: 'myFile',
        src: 'https://pic.clubic.com/v1/images/1730786/raw',
        onClick: () => console.log('file'),
        hoverComponent: (
          <Box
            style={{ height: '100%' }}
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            <Button onClick={() => console.log('view')}>View</Button>
          </Box>
        ),
        isLoading: isLoading
      }
    ]
  }
  return (
    <ThemeContextProvider theme={myTheme}>
      <AruiFilesPanel folder={children} />
    </ThemeContextProvider>
  )
}
