import { ReactComponent } from './arrow-left.svg'
import { MergeReactElementProps } from '@komune-io/g2-utils'
import { forwardRef, Ref } from 'react'

interface ArrowProps {
  color?: string
}

type Props = MergeReactElementProps<'svg', ArrowProps>

export const Arrow = forwardRef((props: Props, ref: Ref<SVGSVGElement>) => {
  const { color = '#828282' } = props
  return <ReactComponent stroke={color} ref={ref} {...props} />
})
