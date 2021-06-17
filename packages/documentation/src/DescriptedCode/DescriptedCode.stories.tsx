import React from 'react'
import {
  DescriptedCode as AruiDescriptedCode,
  DescriptedCodeProps
} from './DescriptedCode'
import { Meta } from '@storybook/react'
import { Story } from '@storybook/react/types-6-0'
//@ts-ignore
import md from '!raw-loader!./exampleMarkdown.md'

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
    "cancellation_policy_disclosure": null,
    "cancellation_rebuttal": null,
    "customer_communication": null,
    "customer_email_address": null,
    "customer_name": null,
    "customer_purchase_ip": null,
    "customer_signature": null,
    "duplicate_charge_documentation": null,
    "duplicate_charge_explanation": null,
    "duplicate_charge_id": null,
    "product_description": null,
    "receipt": null,
    "refund_policy": null,
    "refund_policy_disclosure": null,
    "refund_refusal_explanation": null,
    "service_date": null,
    "service_documentation": null,
    "shipping_address": null,
    "shipping_carrier": null,
    "shipping_date": null,
    "shipping_documentation": null,
    "shipping_tracking_number": null,
    "uncategorized_file": null,
    "uncategorized_text": null
  },
  "evidence_details": {
    "due_by": 1625529599,
    "has_evidence": false,
    "past_due": false,
    "submission_count": 0
  },
  "is_charge_refundable": true,
  "livemode": false,
  "metadata": {},
  "payment_intent": null,
  "reason": "general",
  "status": "warning_needs_response"
  }`

DescriptedCode.args = {
  markdownDescription: md,
  code: code,
  codeHighlighterProps: {
    title: 'Example',
    language: 'json',
    highlightStyle: 'hopscotch'
  }
}
DescriptedCode.storyName = 'DescriptedCode'
