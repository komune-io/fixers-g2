import { createMakeStyles } from 'tss-react'
import { useTheme } from '../ThemeContextProvider'
import { CSSProperties } from 'react'

export interface BasicProps {
  /**
   * The id of the root component
   */
  id?: string
  /**
   * The style of the root component
   */
  style?: CSSProperties
  /**
   * The className of the root component
   */
  className?: string
}

const { makeStyles } = createMakeStyles({ useTheme })

export const makeG2Styles = <Params = void,>() => {
  return (styles: any): ((params?: Params) => any) => {
    return makeStyles<Params>()(styles) as any
  }
}

export type MergeMuiElementProps<MuiElement, P extends object = {}> = Omit<
  MuiElement,
  keyof P
> &
  P
