import { ReactComponent } from './404.svg'
import { ComponentPropsWithRef, forwardRef, Ref } from 'react'

export const NotFoundIcon = forwardRef(
  (props: ComponentPropsWithRef<'svg'>, ref: Ref<SVGSVGElement>) => {
    return <ReactComponent ref={ref} {...props} />
  }
)
