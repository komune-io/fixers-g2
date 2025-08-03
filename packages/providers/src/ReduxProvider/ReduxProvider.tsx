import { Provider } from 'react-redux'
import { AnyAction, Store } from 'redux'
import { ReactNode } from 'react'

export interface ReduxProviderProps {
  /**
   * The application that will be provided
   */
  children?: ReactNode
  /**
   * The instance of the redux store
   */
  reduxStore: Store<any, AnyAction>
}

export const ReduxProvider = (props: ReduxProviderProps) => {
  const { reduxStore, children } = props
  return <Provider store={reduxStore}>{children}</Provider>
}
