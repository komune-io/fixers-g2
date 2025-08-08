import ReactComponent from './RoundedArrow.svg'
import { MergeReactElementProps } from '@komune-io/g2-utils'
import { forwardRef, Ref } from 'react'

interface RoundedArrowProps {
  color?: string
}

type Props = MergeReactElementProps<'svg', RoundedArrowProps>

export const RoundedArrow = forwardRef(
  (props: Props, ref: Ref<SVGSVGElement>) => {
    const { color = '#828282' } = props
    return <ReactComponent fill={color} ref={ref} {...props} />
  }
)
