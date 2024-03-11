import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import {
  ArgsTable,
  PRIMARY_STORY,
  Primary,
  Description,
  Title
} from '@storybook/addon-docs'
import { AutoForm, AutoFormProps } from './AutoForm'
import { BrowserRouter } from 'react-router-dom'
import json from './autoForm.json'
import { autoFormFormatter } from './autoFormFormatter'
import { Button } from '@smartb/g2-components'
import { CodeHighlighter } from '@smartb/g2-documentation'

export default {
  title: 'Composable/AutoForm',
  component: AutoForm,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>AutoForm</Title>
          <Description>
            The AutoForm is based on FormComposable it uses the custom type
            `AutoFormData`. It aims at handling forms automatically from the
            layout to the logic.
          </Description>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Description>
            The function `autoFormFormatter` is an utilitary that can format the
            backend autoForm object to the frontend requirements.
          </Description>
          <Description>
            The property `sectionsType` define the layout for the sections. Each
            section is a form connected to the same state. The section has the
            condition properties that make it possible to had an alert text
            conditionally based on the
            [SpEL](https://docs.spring.io/spring-framework/docs/3.0.x/reference/expressions.html)
            (spring expression language)
          </Description>
          <Description>
            For the DocumentHandler field you should provide the prop
            `downloadDocument` with a function that returns the document saved
            in base. The `onSubmit` function contains an object `command`, it is
            the standardise command we use in the requests. You will be able to
            get the multiparted documents in it.
          </Description>
        </>
      )
    }
  }
} as Meta

export const AutoFormStory: StoryFn<AutoFormProps> = (args: AutoFormProps) => {
  return (
    <BrowserRouter>
      <AutoForm
        {...args}
        onSubmit={(command, values) => console.log(command, values)}
        getFormActions={(formState) => (
          <Button onClick={formState.submitForm}>Submit</Button>
        )}
      />
    </BrowserRouter>
  )
}

AutoFormStory.args = {
  //@ts-ignore
  formData: autoFormFormatter(json)
}
