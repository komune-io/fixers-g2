import { ReactNode } from 'react'
import { Meta, StoryFn } from '@storybook/react-vite'
import {
  ArgTypes,
  Primary,
  Description,
  Stories,
  Title
} from '@storybook/addon-docs/blocks'
import { FormComposable, FormComposableProps } from './FormComposable'
import { useFormComposable } from './useFormComposable'
import { FormAction } from '@komune-io/g2-forms'
import { FieldRenderProps, FormComposableField } from './type'
import {
  ElementParams,
  ElementRendererFunction,
  ElementRenderersConfig
} from '../ComposableRender'
import { Typography } from '@mui/material'
import { requiredField, requiredTrue } from './validator'
import { BrowserRouter } from 'react-router-dom'
import { FormField } from './docs'

export default {
  title: 'Composable/FormComposable',
  component: FormComposable,
  subcomponents: {
    FormField: FormField
  },
  parameters: {
    docs: {
      page: () => (
        <>
          <Primary />
          <Description>
            This components is made to display a form using
            [Formik](https://formik.org/).
          </Description>
          <ArgTypes of={FormComposable} />
          <Description>
            The form fields have common props describe below
          </Description>
          <ArgTypes of={FormField} />
          <Description>
            the separated props of each fields are describe in the components
            documentation pages
          </Description>
          <Title>Documenthandler</Title>
          <Description>
            {
              ' The document handler has a special behavior. To be able to spot the uploaded document you need to store it in the initialValues of the formState, it has to be under the key: `"${fieldName}Uploaded"`'
            }
          </Description>
          <Description>
            {
              "If it has and uploaded document and the state of the component is empty it's that the uploaded document weren't replaced by the user."
            }
          </Description>
          <Description>
            {
              " If at the submit none of the `${fieldName}Uploaded` or `${fieldName}` are in the form state it's that the user suppressed the uploaded document and didn't upload a new one"
            }
          </Description>
          <Title>Map</Title>
          <Description>
            The map field is plugin based. Each plugin has one state if you only
            have one plugin on the map the field state will be the plugin one.
            But if you have multiple plugins the state of the map will contain
            subStates for each plugin with its key
          </Description>
          <Stories />
        </>
      )
    }
  }
} as Meta<typeof FormComposable>

export type DebugExtendProps = {
  formName: string
}

type DebugRenderProps = FieldRenderProps<string, DebugExtendProps>
const DebugRender: ElementRendererFunction<DebugRenderProps> = (
  props: DebugRenderProps
) => {
  const { element, formState, basicProps } = props
  const { params } = element
  return (
    <>
      <Typography>
        {basicProps.label} {params?.formName}
      </Typography>
      <Typography>{JSON.stringify(formState.values)}</Typography>
    </>
  )
}

export type HiddenProps = {
  formName: string
}

type HiddenRenderProps = FieldRenderProps<string, HiddenProps>
const HiddenRender: ElementRendererFunction<HiddenRenderProps> = (
  _: HiddenRenderProps
) => {
  return <></>
}

const CustomRenderer: ElementRenderersConfig<any> = {
  debug: DebugRender,
  hidden: HiddenRender
}

export type CustomFieldRenderType = ElementParams<'debug', DebugExtendProps>
export type AllFormComposableField = FormComposableField | CustomFieldRenderType

const FormComposableStory: StoryFn<FormComposableProps> = (
  args: FormComposableProps
) => {
  const formState = useFormComposable({
    formikConfig: {
      initialValues: {}
    },
    onSubmit: (values) => {
      window.alert(JSON.stringify(values))
      return true
    }
    // readOnly: true,
    // emptyValueInReadOnly: "-"
  })
  const actions: FormAction[] = [
    {
      label: 'reset',
      key: 'resetFiltersButton',
      variant: 'text',
      onClick: () => formState.resetForm()
    },
    {
      label: 'Validate',
      key: 'validateFormButton',
      type: 'submit'
    }
  ]

  console.log(formState.values)

  return (
    <BrowserRouter>
      <FormComposable<typeof CustomRenderer>
        {...args}
        customFactories={CustomRenderer}
        actions={actions}
        formState={formState}
        style={{ width: '600px' }}
      />
    </BrowserRouter>
  )
}

export const TextFieldForm = {
  render: FormComposableStory,

  args: {
    fields: [
      {
        key: 'storybook-form-field-name',
        name: 'name',
        label: 'Name',
        type: 'textField',
        params: {},
        validator: (value) =>
          value === undefined || value === ''
            ? 'The name is required'
            : undefined,
        defaultValue: 'The Default Name'
      },
      {
        key: 'storybook-form-field-description',
        name: 'description',
        label: 'Description',
        type: 'textField',
        params: {
          disabled: true
        },
        validator: (value: string) => (!value ? 'required' : undefined),
        defaultValue: 'The description'
      },
      {
        key: 'storybook-form-field-debug',
        name: 'debug',
        label: 'Debug',
        type: 'debug',
        params: {
          formName: 'TextFieldForm'
        },
        defaultValue: 'The description'
      }
    ] as AllFormComposableField[]
  }
}

export const SelectForm = {
  render: FormComposableStory,

  args: {
    fields: [
      {
        key: 'storybook-form-select-from',
        name: 'from',
        label: 'From',
        type: 'select',
        params: {
          options: [
            { key: 'dollar', label: '$' },
            { key: 'euro', label: '€' }
          ]
        },
        validator: requiredField('The currency is required')
      },
      {
        key: 'storybook-form-select-to',
        name: 'to',
        label: 'to',
        type: 'select',
        params: {
          multiple: true,
          options: [
            { key: 'dollar', label: '$' },
            { key: 'euro', label: '€' }
          ]
        },
        validator: requiredField('The currency is required')
      },
      {
        key: 'storybook-form-select-value',
        name: 'value',
        label: 'Value',
        type: 'textField',
        params: {
          options: [
            { key: '100', label: '100' },
            { key: '200', label: '200' }
          ],
          disabled: true
        },
        defaultValue: '200'
      },
      {
        key: 'storybook-form-field-debug',
        name: 'debug',
        label: 'Debug',
        type: 'debug',
        params: {
          formName: 'Select Form'
        },
        defaultValue: 'The description'
      }
    ] as AllFormComposableField[]
  }
}

export const RadioSelectForm = {
  render: FormComposableStory,

  args: {
    fields: [
      {
        key: 'storybook-form-radioChoices-from',
        name: 'from',
        label: 'From',
        type: 'radioChoices',
        params: {
          options: [
            { key: 'dollar', label: '$' },
            { key: 'euro', label: '€' }
          ]
        },
        validator: requiredField('The currency is required')
      },
      {
        key: 'storybook-form-radioChoices-to',
        name: 'to',
        label: 'to',
        type: 'radioChoices',
        params: {
          multiple: true,
          options: [
            { key: 'dollar', label: '$' },
            { key: 'euro', label: '€' }
          ]
        },
        validator: requiredField('The currency is required')
      },
      {
        key: 'storybook-form-radioChoices-value',
        name: 'value',
        label: 'Value',
        type: 'radioChoices',
        params: {
          options: [
            { key: '100', label: '100' },
            { key: '200', label: '200' }
          ],
          disabled: true
        },
        defaultValue: '200'
      },
      {
        key: 'storybook-form-field-debug',
        name: 'debug',
        label: 'Debug',
        type: 'debug',
        params: {
          formName: 'Radio Select Form'
        },
        defaultValue: 'The description'
      }
    ] as AllFormComposableField[]
  }
}

const fullFields: AllFormComposableField[] = [
  {
    name: 'map',
    type: 'map',
    params: {
      draggableMarkerPlugin: {
        enable: true
      }
    },
    fullRow: true
  },
  {
    name: 'picture',
    type: 'dropPicture',
    params: {
      height: '200px'
    }
  },
  {
    key: 'storybook-form-field-name',
    name: 'name',
    label: 'Name',
    type: 'textField',
    validator: requiredField('The name is required')
  },
  {
    key: 'storybook-form-field-gender',
    name: 'gender.value',
    label: 'Gender',
    type: 'select',
    defaultValue: '',
    validator: requiredField('The gender is required'),
    params: {
      options: [
        { key: 'male', label: 'male' },
        { key: 'female', label: 'female' }
      ]
    }
  },
  {
    key: 'storybook-form-field-birthdate',
    name: 'birthdate',
    label: 'Birthdate',
    type: 'datePicker',
    defaultValue: '',
    validator: requiredField('The birthdate is required')
  },
  {
    key: 'storybook-form-field-yesOrNo',
    name: 'yesOrNo',
    label: 'Yes or no?',
    type: 'radioChoices',
    defaultValue: '',
    validator: requiredField('Answer the question'),
    params: {
      options: [
        { key: true, label: 'Yes' },
        { key: false, label: 'No' }
      ],
      row: true
    }
  },
  {
    key: 'storybook-form-field-termsOfUse',
    name: 'termsOfUse',
    label: 'do you accept the terms of use?',
    type: 'multiChoices',
    defaultValue: '',
    validator: requiredField('Answer the question'),
    params: {
      options: [
        { key: 'yes', label: 'Yes take my data' },
        {
          key: 'maybe',
          label: "I don't know cause i haven't the time to read it"
        },
        { key: 'no', label: 'no' }
      ]
    }
  },
  {
    name: 'document',
    type: 'documentHandler',
    fullRow: true,
    label: 'A document',
    params: {
      fileTypesAllowed: ['pdf']
    }
  },
  {
    key: 'storybook-form-field-terms',
    name: 'terms',
    label: 'I agree to the terms and conditions',
    type: 'checkBox',
    defaultValue: false,
    validator: requiredTrue('You have to agree')
  },
  {
    key: 'storybook-form-field-debug',
    name: 'debug',
    label: 'Debug',
    type: 'debug',
    params: {
      formName: 'Full Fields'
    },
    defaultValue: 'The description'
  }
] as AllFormComposableField[]

export const FullForm = {
  render: FormComposableStory,

  args: {
    fields: fullFields
  }
}

const withCustomDisplay = (input: ReactNode): ReactNode => {
  return <div>WithCustomDisplay: {input}</div>
}

const FullFieldsWithCustomDisplayField: AllFormComposableField[] = [
  {
    key: 'storybook-form-field-name',
    name: 'name',
    label: 'Name',
    type: 'textField',
    customDisplay: withCustomDisplay,
    validator: requiredField('The name is required')
  },
  {
    key: 'storybook-form-field-gender',
    name: 'gender.value',
    label: 'Gender',
    type: 'select',
    defaultValue: '',
    customDisplay: withCustomDisplay,
    validator: requiredField('The gender is required'),
    params: {
      options: [
        { key: 'male', label: 'male' },
        { key: 'female', label: 'female' }
      ]
    }
  },
  {
    key: 'storybook-form-field-birthdate',
    name: 'birthdate',
    label: 'Birthdate',
    type: 'datePicker',
    defaultValue: '',
    customDisplay: withCustomDisplay,
    validator: requiredField('The birthdate is required')
  },
  {
    key: 'storybook-form-field-yesOrNo',
    name: 'yesOrNo',
    label: 'Yes or no?',
    type: 'radioChoices',
    defaultValue: '',
    customDisplay: withCustomDisplay,
    validator: requiredField('Answer the question'),
    params: {
      options: [
        { key: 'yes', label: 'Yes' },
        { key: 'no', label: 'No' }
      ]
    }
  },
  {
    key: 'storybook-form-field-terms',
    name: 'terms',
    label: 'I agree to the terms and conditions',
    type: 'checkBox',
    defaultValue: false,
    customDisplay: withCustomDisplay,
    validator: requiredTrue('You have to agree')
  },
  {
    key: 'storybook-form-field-debug',
    name: 'debug',
    label: 'Debug',
    type: 'debug',
    customDisplay: withCustomDisplay,
    params: {
      formName: 'Full Fields'
    },
    defaultValue: 'The description'
  }
] as AllFormComposableField[]

export const FullFieldsWithCustom = {
  render: FormComposableStory,

  args: {
    fields: FullFieldsWithCustomDisplayField
  }
}

export const GridDisplayForm = {
  render: FormComposableStory,

  args: {
    fields: fullFields,
    display: 'grid',
    gridColumnNumber: 2
  }
}

const conditionsFormField: FormComposableField[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'textField',
    conditions: [
      {
        type: 'validator',
        expression: '#name == null',
        error: 'The field is required'
      }
    ]
  },
  {
    name: 'gender',
    label: 'Gender',
    type: 'select',
    conditions: [
      {
        type: 'display',
        expression: "#name != null && #name != ''"
      },
      {
        type: 'validator',
        expression: "#gender != 'female'",
        error: 'We are sorry but only females are allowed to create an account'
      }
    ],
    params: {
      options: [
        { key: 'male', label: 'male' },
        { key: 'female', label: 'female' }
      ]
    }
  },
  {
    name: 'birthdate',
    label: 'Birthdate',
    type: 'datePicker',
    conditions: [
      {
        type: 'validator',
        expression: '#birthdate == null',
        error: 'Please select a date'
      },
      {
        type: 'validator',
        expression: '#birthdate > 1099765436000',
        error: 'You should be 18 or more'
      }
    ]
  }
]

export const ConditionsForm = {
  render: FormComposableStory,

  args: {
    fields: conditionsFormField
  }
}
