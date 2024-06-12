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

export interface MarkdownEditorProps extends MDXEditorProps {
  /**
   * Choose the 3 titles levels `["h1", "h2", "h3"]` or `["h4", "h5", "h6"]`
   *
   * @default "h4"
   */
  titlesTopLevel?: 'h1' | 'h4'
}

export const MarkdownEditor = (props: MarkdownEditorProps) => {
  const { titlesTopLevel } = props
  return (
    <MarkdownStyleContainer
      titlesTopLevel={titlesTopLevel}
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
            toolbarContents: () => <Toolbar titlesTopLevel={titlesTopLevel} />
          })
        ]}
        {...props}
      />
    </MarkdownStyleContainer>
  )
}
