import { useElementSize } from '@mantine/hooks'
import { MutableRefObject, useLayoutEffect, useMemo, useState } from 'react'

export type IsOverFlowingReturn = {
  isOverflowing: boolean
  canRemoveContentContainer: boolean
  containerRef: MutableRefObject<any>
  contentRef: MutableRefObject<any>
}

export const useIsOverflowing = () => {
  const containerSize = useElementSize()
  const contentSize = useElementSize()
  const [renderedContentWidth, setRenderedContentWidth] = useState<
    undefined | number
  >(undefined)

  useLayoutEffect(() => {
    if (contentSize.width > 0) {
      setRenderedContentWidth(contentSize.width)
    }
  }, [contentSize.width])

  const isOverflowing = useMemo(() => {
    if (!renderedContentWidth) return false
    if (renderedContentWidth > containerSize.width) return true
    return false
  }, [renderedContentWidth, containerSize.width])

  const canRemoveContentContainer = useMemo(
    () => !!renderedContentWidth,
    [renderedContentWidth]
  )

  return {
    isOverflowing,
    canRemoveContentContainer,
    containerRef: containerSize.ref,
    contentRef: contentSize.ref
  }
}
