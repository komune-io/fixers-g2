import { MarkdownViewer } from './MarkdownViewer'
import { MarkdownEditor, MarkdownEditorProps } from './MarkdownEditor'
import React from 'react'

export interface MarkdownFieldProps extends MarkdownEditorProps {
  readOnly?: boolean
}

export const MarkdownField = (props: MarkdownFieldProps) => {
  const {
    markdown,
    readOnly = false,
    titlesTopLevel,
    styleContainerProps,
    ...other
  } = props
  return readOnly ? (
    <MarkdownViewer
      {...styleContainerProps}
      markdown={markdown}
      titlesTopLevel={titlesTopLevel}
    />
  ) : (
    <MarkdownEditor
      styleContainerProps={styleContainerProps}
      markdown={markdown}
      titlesTopLevel={titlesTopLevel}
      {...other}
    />
  )
}
