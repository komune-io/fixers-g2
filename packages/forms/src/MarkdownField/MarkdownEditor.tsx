import {
  MDXEditor,
  MDXEditorMethods,
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
import React, { useRef } from 'react'
import { useDidUpdate } from '@mantine/hooks'
import { BoxProps } from '@mui/material'

export interface MarkdownEditorProps extends MDXEditorProps {
  /**
   * Choose the 3 titles levels `["h1", "h2", "h3"]` or `["h4", "h5", "h6"]`
   *
   * @default "h4"
   */
  titlesTopLevel?: 'h1' | 'h4'
  /**
   * The props of the style container that styles the markdown
   */
  styleContainerProps?: BoxProps
  /**
   * Use this prop if you want to remove the toolbar
   *
   * @default false
   */
  removeToolBar?: boolean
}

export const MarkdownEditor = (props: MarkdownEditorProps) => {
  const { titlesTopLevel, styleContainerProps, removeToolBar = false } = props

  const ref = useRef<MDXEditorMethods>(null)

  useDidUpdate(() => ref.current?.setMarkdown(props.markdown), [props.markdown])

  return (
    <MarkdownStyleContainer
      {...styleContainerProps}
      titlesTopLevel={titlesTopLevel}
      sx={{
        '& .mdxeditor-toolbar svg': {
          color: 'currentcolor'
        },
        '& .markdownEditor': {
          '--font-body': 'unset',
          '--font-mono': 'unset',
          '--baseBg': 'transparent'
        },
        '& div[contenteditable="true"]': {
          padding: 0
        },
        ...styleContainerProps?.sx
      }}
    >
      <MDXEditor
        className='markdownEditor'
        ref={ref}
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          markdownShortcutPlugin(),
          ...(removeToolBar
            ? []
            : [
                toolbarPlugin({
                  toolbarContents: () => (
                    <Toolbar titlesTopLevel={titlesTopLevel} />
                  )
                })
              ])
        ]}
        {...props}
      />
    </MarkdownStyleContainer>
  )
}
