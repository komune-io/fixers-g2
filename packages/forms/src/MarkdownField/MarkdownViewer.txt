import { Box, BoxProps, styled } from '@mui/material'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import React from 'react'

export const MarkdownStyleContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'titlesTopLevel'
})<{
  titlesTopLevel?: 'h1' | 'h4'
}>(({ theme, titlesTopLevel }) => ({
  '& > :first-child': {
    marginTop: '0px'
  },
  '& > :last-child': {
    marginBottom: '0px'
  },
  '& ol, ul': {
    paddingInlineStart: '18px'
  },
  '& strong': {
    fontWeight: 600
  },
  '& li::marker': {
    fontWeight: 600
  },
  '& ol li::marker': {
    color: theme.palette.primary.main
  },
  '& li': {
    paddingLeft: '4px',
    margin: '8px 0px'
  },
  ...(titlesTopLevel === 'h1'
    ? {
        '& h1': {
          ...theme.typography.h4
        },
        '& h2': {
          ...theme.typography.h5
        },
        '& h3': {
          ...theme.typography.h6
        },
        '& h4': {
          ...theme.typography.h6
        },
        '& h5': {
          ...theme.typography.h6
        },
        '& h6': {
          ...theme.typography.h6
        }
      }
    : {
        '& h1': {
          ...theme.typography.h4
        },
        '& h2': {
          ...theme.typography.h4
        },
        '& h3': {
          ...theme.typography.h4
        },
        '& h4': {
          ...theme.typography.h4
        },
        '& h5': {
          ...theme.typography.h5
        },
        '& h6': {
          ...theme.typography.h6
        }
      })
}))

export interface MarkdownViewerProps extends BoxProps {
  markdown?: string
  titlesTopLevel?: 'h1' | 'h4'
}

export const MarkdownViewer = (props: MarkdownViewerProps) => {
  const { markdown, titlesTopLevel, ...other } = props
  return (
    <MarkdownStyleContainer {...other} titlesTopLevel={titlesTopLevel}>
      <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {markdown}
      </Markdown>
    </MarkdownStyleContainer>
  )
}
