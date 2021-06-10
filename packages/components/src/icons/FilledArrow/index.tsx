import React from 'react'
import { ReactComponent } from './filledArrow.svg'
import { MergeReactElementProps } from '@smartb/archetypes-ui-themes'

interface FilledArrowProps {
  color?: string
}

type Props = MergeReactElementProps<'svg', FilledArrowProps>

export const FilledArrow = React.forwardRef(
  (props: Props, ref: React.Ref<SVGSVGElement>) => {
    const { color = '#828282' } = props
    return <ReactComponent fill={color} ref={ref} {...props} />
  }
)
