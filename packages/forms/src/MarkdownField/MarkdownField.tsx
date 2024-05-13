import { MDXEditorProps } from '@mdxeditor/editor'
import { MarkdownViewer } from './MarkdownViewer'
import { MarkdownEditor } from './MarkdownEditor'
import React from 'react'

export interface MarkdownFieldProps extends MDXEditorProps {
  readOnly?: boolean
}

export const MarkdownField = (props: MarkdownFieldProps) => {
  const { markdown, readOnly = false, ...other } = props
  return readOnly ? (
    <MarkdownViewer markdown={markdown} />
  ) : (
    <MarkdownEditor markdown={markdown} {...other} />
  )
}
