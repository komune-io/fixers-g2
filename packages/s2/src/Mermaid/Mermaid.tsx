import React, { useEffect } from 'react'
import mermaid from 'mermaid'
import { BasicProps } from '@smartb/g2-themes'
import { MergeReactElementProps } from '@smartb/g2-utils'
import { cx } from '@emotion/css'

export interface MermaidBasicProps extends BasicProps {
  chart: string
}

export type MermaidProps = MergeReactElementProps<'div', MermaidBasicProps>

export const Mermaid = (props: MermaidProps) => {
  const { chart, className, ...other } = props
  mermaid.initialize({
    startOnLoad: true,
    //@ts-ignore
    theme: 'default',
    //@ts-ignore
    securityLevel: 'loose'
  })

  useEffect(() => {
    mermaid.contentLoaded()
  }, [chart])

  return (
    <div className={cx('mermaid', className)} {...other}>
      {chart}
    </div>
  )
}
