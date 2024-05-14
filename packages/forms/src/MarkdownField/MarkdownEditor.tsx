import {
  MDXEditor,
  MDXEditorProps,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  toolbarPlugin
} from '@mdxeditor/editor'
import { MarkdownStyleContainer } from './MarkdownViewer'
import { Toolbar } from './Toolbar'
import '@mdxeditor/editor/style.css'
import React from 'react'

export interface MarkdownEditorProps extends MDXEditorProps {}

export const MarkdownEditor = (props: MarkdownEditorProps) => {
  return (
    <MarkdownStyleContainer
      sx={{
        '& .markdownEditor': {
          '--font-body': 'unset',
          '--font-mono': 'unset',
          '--baseBg': 'transparent'
        },
        '& div[contenteditable="true"]': {
          padding: 0
        }
      }}
    >
      <MDXEditor
        className='markdownEditor'
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          markdownShortcutPlugin(),
          toolbarPlugin({
            toolbarContents: Toolbar
          })
        ]}
        {...props}
      />
    </MarkdownStyleContainer>
  )
}
