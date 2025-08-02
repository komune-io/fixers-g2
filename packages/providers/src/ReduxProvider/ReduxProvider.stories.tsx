import { ReduxProvider as AruiReduxProvider } from './ReduxProvider'
import { StoryObj, Meta, StoryFn } from '@storybook/react'
import { ArgTypes, Title, Primary, Description } from '@storybook/addon-docs'
import { CodeHighlighter } from '@komune-io/g2-documentation'
import initRedux from './store'
import { redux } from './docs'

export default {
  title: 'Providers/ReduxProvider',
  component: AruiReduxProvider,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>ReduxProvider</Title>
          <Description>
            To instanciate the redux store and to get the State type in your
            application you have to call statically the `initRedux` function in
            your application:
          </Description>
          <CodeHighlighter code={redux} />
          <Primary />
          <ArgTypes of={AruiReduxProvider} />
        </>
      )
    }
  }
} as Meta<typeof AruiReduxProvider>

export const ReduxProvider: StoryObj = {
  render: () => {
    const { store } = initRedux()
    return <AruiReduxProvider reduxStore={store}></AruiReduxProvider>
  },

  name: 'ReduxProvider'
}
