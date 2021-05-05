import React from 'react'
import { ReactComponent } from './unCheckIcon.svg'
import { MergeReactElementProps } from '@smartb/archetypes-ui-themes'

interface UnCheckIconProps {
}

type Props = MergeReactElementProps<'svg', UnCheckIconProps>

export const UnCheckIcon = React.forwardRef(
  (props: Props, ref: React.Ref<SVGSVGElement>) => {
    return <ReactComponent ref={ref} {...props} />
  }
)
