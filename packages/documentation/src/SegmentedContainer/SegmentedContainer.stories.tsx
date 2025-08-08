import {
  SegmentedContainer as AruiSegmentedContainer,
  SegmentedContainerProps
} from './SegmentedContainer'
import { StoryObj, Meta } from '@storybook/react-vite'
import { MarkdownHighlighter } from '../MarkdownHighlighter'
//@ts-ignore
import md from './exampleMarkdown.md?raw'
import { CodeHighlighter } from '../CodeHighlighter'

export default {
  title: 'Documentation/SegmentedContainer',
  component: AruiSegmentedContainer
} as Meta<typeof AruiSegmentedContainer>

export const SegmentedContainer: StoryObj<SegmentedContainerProps> = {
  render: () => (
    <>
      <AruiSegmentedContainer
        leftElement={<MarkdownHighlighter markdown={md} />}
        rightElement={
          <CodeHighlighter
            object={{
              id: 'dp_1J2zu82eZvKYlo2CI0ivPgUD',
              object: 'dispute',
              amount: 1000,
              balance_transactions: [],
              charge: 'ch_1AZtxr2eZvKYlo2CJDX8whov',
              created: 1623854384,
              currency: 'usd'
            }}
            title='Example'
            language='json'
          />
        }
      />
      <AruiSegmentedContainer
        leftElement={<MarkdownHighlighter markdown={md} />}
        rightElement={
          <CodeHighlighter
            object={{
              id: 'dp_1J2zu82eZvKYlo2CI0ivPgUD',
              object: 'dispute',
              amount: 1000,
              balance_transactions: [],
              charge: 'ch_1AZtxr2eZvKYlo2CJDX8whov',
              created: 1623854384,
              currency: 'usd'
            }}
            title='Example'
            language='json'
          />
        }
      />
    </>
  ),
  name: 'SegmentedContainer'
}
