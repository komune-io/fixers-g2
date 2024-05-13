import { Box, styled } from '@mui/material'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import React from 'react'

export const MarkdownStyleContainer = styled(Box)(({ theme }) => ({
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
  '& h1': {
    ...theme.typography.h1
  },
  '& h2': {
    ...theme.typography.h2
  },
  '& h3': {
    ...theme.typography.h3
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
}))

export interface MarkdownViewerProps {
  markdown?: string
}

export const MarkdownViewer = (props: MarkdownViewerProps) => {
  const { markdown } = props
  return (
    <MarkdownStyleContainer>
      <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {markdown}
      </Markdown>
    </MarkdownStyleContainer>
  )
}
