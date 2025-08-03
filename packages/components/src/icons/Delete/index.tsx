import { ReactComponent } from './delete.svg'
import { MergeReactElementProps } from '@komune-io/g2-utils'
import { forwardRef, Ref } from 'react'

interface DeleteProps {
  color?: string
}

type Props = MergeReactElementProps<'svg', DeleteProps>

export const Delete = forwardRef((props: Props, ref: Ref<SVGSVGElement>) => {
  const { color = '#9a9a9a' } = props
  return <ReactComponent stroke={color} ref={ref} {...props} />
})
