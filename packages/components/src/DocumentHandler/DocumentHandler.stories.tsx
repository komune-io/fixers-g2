import {
  DocumentHandler as AruiDocumentHandler,
  DocumentHandlerBasicProps
} from './DocumentHandler'
import { StoryObj, Meta, StoryFn } from '@storybook/react'
import { Box, Stack } from '@mui/material'
import { useLocalDocumentHandler } from './useLocalDocumentHandler'
import { useLocalStorageDocumentHandler } from './useLocalStorageDocumentHandler'

export default {
  title: 'Components/DocumentHandler',
  component: AruiDocumentHandler,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kgphqh0uVhoXt8TK3LlkGj/G2-%2F-Design-System?node-id=2024%3A2001'
    }
  },
  argTypes: {}
} as Meta<typeof AruiDocumentHandler>

export const DocumentHandler: StoryObj<DocumentHandlerBasicProps> = {
  render: (args: DocumentHandlerBasicProps) => (
    <Box
      sx={{
        width: '500px',
        height: '300px'
      }}
    >
      <AruiDocumentHandler {...args} />
    </Box>
  ),

  args: {
    label: 'Specifications.pdf',
    onDelete: () => {},
    onView: () => {},
    onDownload: () => {},
    fileTypesAllowed: ['pdf', 'jpeg', 'png']
  },

  name: 'DocumentHandler'
}

export const DocumentHandlerVariant: StoryFn = () => (
  <Stack
    sx={{
      alignItems: 'center',
      gap: '30px'
    }}
  >
    <AruiDocumentHandler uploaded={false} label='mandatory.pdf' isRequired />
    <AruiDocumentHandler
      uploaded={false}
      label='error.pdf'
      customErrorMessage='Your file is wrong'
    />
    <AruiDocumentHandler uploaded={false} label='loading.pdf' isLoading />
    <AruiDocumentHandler
      uploaded
      label='uploaded.pdf'
      getFileUrl={() => 'https://www.google.com/file/d/1/view'}
    />
  </Stack>
)

export const useLocalDocumentHandlerExample: StoryFn = () => {
  const { file, documentHandlerProps } = useLocalDocumentHandler()
  console.log(file)
  return (
    <Box
      sx={{
        width: '500px',
        height: '300px'
      }}
    >
      <AruiDocumentHandler
        fileTypesAllowed={['pdf']}
        label={file?.name ?? 'Add your pdf file'}
        isRequired
        {...documentHandlerProps}
      />
    </Box>
  )
}

export const useLocalStorageDocumentHandlerExample: StoryFn = () => {
  const { fileName, documentHandlerProps } =
    useLocalStorageDocumentHandler('fileExample')
  return (
    <Box
      sx={{
        width: '500px',
        height: '300px'
      }}
    >
      <AruiDocumentHandler
        fileTypesAllowed={['pdf']}
        label={fileName ?? 'Add your pdf file'}
        isRequired
        {...documentHandlerProps}
      />
    </Box>
  )
}
