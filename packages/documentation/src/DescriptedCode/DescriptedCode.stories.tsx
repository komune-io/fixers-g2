import React from 'react'
import {
  DescriptedCode as AruiDescriptedCode,
  DescriptedCodeProps
} from './DescriptedCode'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'
import { MarkdownHighlighter } from '../MarkdownHighlighter'
//@ts-ignore
import md from '!raw-loader!./exampleMarkdown.md'
import { CodeHighlighter } from '../CodeHighlighter'

export default {
  title: 'Documentation/DescriptedCode',
  component: AruiDescriptedCode
} as Meta

export const DescriptedCode: Story<DescriptedCodeProps> = (
  args: DescriptedCodeProps
) => (
  <>
    <AruiDescriptedCode {...args} />
    <AruiDescriptedCode {...args} />
  </>
)

const code = `{
  "id": "dp_1J2zu82eZvKYlo2CI0ivPgUD",
  "object": "dispute",
  "amount": 1000,
  "balance_transactions": [],
  "charge": "ch_1AZtxr2eZvKYlo2CJDX8whov",
  "created": 1623854384,
  "currency": "usd",
  "evidence": {
    "access_activity_log": null,
    "billing_address": null,
    "cancellation_policy": null,
    "receipt": null,
    "shipping_address": null,
    "shipping_carrier": null,
    "shipping_date": null,
    "shipping_documentation": null,
    "shipping_tracking_number": null,
    "uncategorized_file": null,
    "uncategorized_text": null
  }`

DescriptedCode.args = {
  leftElement: <MarkdownHighlighter markdown={md} />,
  rightElement: <CodeHighlighter code={code} title='Example' language='json' />
}

DescriptedCode.storyName = 'DescriptedCode'
