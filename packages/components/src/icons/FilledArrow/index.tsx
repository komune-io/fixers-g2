import ReactComponent from './filledArrow.svg'
import { MergeReactElementProps } from '@komune-io/g2-utils'
import { forwardRef, Ref } from 'react'

interface FilledArrowProps {
  color?: string
}

type Props = MergeReactElementProps<'svg', FilledArrowProps>

export const FilledArrow = forwardRef(
  (props: Props, ref: Ref<SVGSVGElement>) => {
    const { color = '#828282' } = props
    return <ReactComponent fill={color} ref={ref} {...props} />
  }
)
