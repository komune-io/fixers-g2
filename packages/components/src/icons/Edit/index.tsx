import { ReactComponent } from './Edit.svg'
import { MergeReactElementProps } from '@komune-io/g2-utils'
import { forwardRef, Ref } from 'react'

interface EditProps {
  color?: string
}

type Props = MergeReactElementProps<'svg', EditProps>

export const Edit = forwardRef((props: Props, ref: Ref<SVGSVGElement>) => {
  const { color = '#9a9a9a' } = props
  return <ReactComponent stroke={color} ref={ref} {...props} />
})
