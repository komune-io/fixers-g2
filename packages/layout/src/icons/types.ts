import { ComponentPropsWithRef, ElementType } from 'react'

export type MergeReactElementProps<
  T extends ElementType,
  P extends object = {}
> = Omit<ComponentPropsWithRef<T>, keyof P> & P
