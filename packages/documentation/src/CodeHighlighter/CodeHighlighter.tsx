import { cx } from '@emotion/css'
import { Box, Button, Typography } from '@mui/material'
import { BasicProps } from '@komune-io/g2-themes'
import React, { useCallback, useMemo } from 'react'
import SyntaxHighlighter, {
  SyntaxHighlighterProps
} from 'react-syntax-highlighter'
import {
  atomOneDark,
  atomOneLight
} from 'react-syntax-highlighter/dist/esm/styles/hljs'
import a11yDark from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark'
import a11yLight from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-light'
import { HttpDefinitionHighlighter } from '../HttpDefinitionHighlighter'
import { useClipboard } from '@mantine/hooks'
import { useTranslation } from 'react-i18next'

export type Sytles =
  | 'a11y-dark'
  | 'a11y-light'
  | 'atome-one-light'
  | 'atome-one-dark'
  | 'gruvbox-dark'
  | 'gruvbox-light'

const highlightStyleMap = new Map<Sytles, any>([
  ['atome-one-dark', atomOneDark],
  ['atome-one-light', atomOneLight],
  ['a11y-dark', a11yDark],
  ['a11y-light', a11yLight]
])

export interface CodeHighlighterProps
  extends Omit<SyntaxHighlighterProps, 'style'>,
    BasicProps {
  /**
   * The code to highlight
   */
  code?: string
  /**
   * The javascript object to highlight. The prop `code` has the display priority. The object is automaticaly stringified and formated properly
   */
  object?: Object
  /**
   * the language of the code
   * @default "typescript"
   */
  language?: string
  /**
   * the stye of the highlight
   * @default "a11y-dark"
   */
  highlightStyle?: Sytles
  /**
   * the title displayed in an header above the component
   */
  title?: string
  /**
   * Whether the code block is copiable
   * @default true
   */
  copiable?: boolean
}

export const CodeHighlighter = (props: CodeHighlighterProps) => {
  const {
    code,
    children,
    object,
    highlightStyle = 'atome-one-dark',
    title,
    style,
    className,
    id,
    language = 'typescript',
    copiable = true,
    ...other
  } = props
  const clipboard = useClipboard({ timeout: 1000 })
  const { t } = useTranslation()

  const formatedObject = useMemo(() => {
    if (!object) return
    return JSON.stringify(object, undefined, 2)
  }, [object])

  const toHighlight = code ?? formatedObject ?? children

  const copyToClipboard = useCallback(() => {
    clipboard.copy(toHighlight)
  }, [clipboard.copy, toHighlight])

  const selectedStyle = useMemo(
    () => highlightStyleMap.get(highlightStyle),
    [highlightStyle]
  )

  const body = useMemo(() => {
    switch (language) {
      case 'http-definition':
        return (
          <HttpDefinitionHighlighter
            {...other}
            language={language}
            style={selectedStyle}
            httpDefinitions={object as any}
          />
        )
      default:
        return (
          <SyntaxHighlighter
            {...other}
            language={language}
            style={selectedStyle}
          >
            {toHighlight}
          </SyntaxHighlighter>
        )
    }
  }, [language, toHighlight, selectedStyle])

  return (
    <Box
      style={style}
      className={cx('AruiCodeHighlighter-root', className)}
      sx={{
        position: 'relative',
        '& pre': {
          borderRadius: '8px',
          border: '1px solid #EEEEEE',
          margin: 0,
          padding: '16px !important',
          ...(title
            ? {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderTop: '0px solid #EEEEEE'
              }
            : {})
        }
      }}
      id={id}
    >
      {title && (
        <Box
          className='AruiCodeHighlighter-titleContainer'
          sx={{
            width: '100%',
            padding: '8px 16px',
            boxSizing: 'border-box',
            background: '#FEF9EE',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            border: '1px solid #EEEEEE'
          }}
        >
          <Typography className='AruiCodeHighlighter-title' variant='subtitle1'>
            {title}
          </Typography>
        </Box>
      )}
      {body}
      {copiable && (
        <Button
          onClick={copyToClipboard}
          variant='outlined'
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            borderRadius: 1,
            color: clipboard.copied ? 'white' : '#E5DADA',
            borderColor: clipboard.copied ? 'success.main' : '#E5DADA',
            bgcolor: clipboard.copied ? 'success.main' : undefined,
            p: 0.5,
            '&:hover': {
              bgcolor: clipboard.copied ? 'success.main' : undefined,
              borderColor: clipboard.copied ? 'success.main' : '#E5DADA'
            }
          }}
        >
          {clipboard.copied ? t('g2.copied') : t('g2.copy')}
        </Button>
      )}
    </Box>
  )
}
