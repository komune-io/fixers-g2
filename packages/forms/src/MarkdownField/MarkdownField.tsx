import { MarkdownViewer } from './MarkdownViewer'
import { MarkdownEditor, MarkdownEditorProps } from './MarkdownEditor'
import React from 'react'

export interface MarkdownFieldProps extends MarkdownEditorProps {
  readOnly?: boolean
}

export const MarkdownField = (props: MarkdownFieldProps) => {
  const { markdown, readOnly = false, titlesTopLevel, ...other } = props
  return readOnly ? (
    <MarkdownViewer markdown={markdown} titlesTopLevel={titlesTopLevel} />
  ) : (
    <MarkdownEditor
      markdown={markdown}
      titlesTopLevel={titlesTopLevel}
      {...other}
    />
  )
}
