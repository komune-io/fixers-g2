import React, { useMemo } from 'react'
import { ElementFactory } from './ElementFactory'
import { ElementRenderersConfig, WithElementParams } from './ElementRenderer'

interface ContainerRendererProps {
  elements: WithElementParams<any, any>[]
  renderer: ElementRenderersConfig
  rendererCustom?: ElementRenderersConfig
}

export const ContainerRenderer = (props: ContainerRendererProps) => {
  const { elements, renderer, rendererCustom } = props
  const comps = useMemo(() => {
    const factoryClasses = { ...renderer, ...(rendererCustom ?? {}) }
    return elements.map((component: WithElementParams<any, any>) => {
      const element = ElementFactory(component, factoryClasses)
      return component.element.customDisplay
        ? component.element.customDisplay(element)
        : element
    })
  }, [elements, renderer, rendererCustom])
  return <>{comps}</>
}
