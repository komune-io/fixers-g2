import { Stack, Typography, Divider } from '@mui/material'
import React, { useCallback, useMemo, Fragment } from 'react'
import {
  FormComposable,
  FormComposableBasicProps,
  FormComposableField,
  FormComposableState,
  FormikFormParams,
  useFormComposable
} from '../FormComposable'
import {
  SectionCondition,
  evalDisplayConditions,
  evalMessageConditions
} from '../Conditions'
import { FormikHelpers } from 'formik'
import { CommandWithFile } from '@komune-io/g2-utils'
import { Section } from '@komune-io/g2-layout'

export type FormSection = {
  /**
   * the id of the section
   */
  id: string
  /**
   * the label of the section
   */
  label?: string
  /**
   * the description of the section
   */
  description?: string
  /**
   * the fields of the section
   */
  fields: FormComposableField<string, {}>[]
  /**
   * The section conditions
   */
  conditions?: SectionCondition[]
} & Pick<
  FormComposableBasicProps<{}>,
  'display' | 'gridColumnNumber' | 'orientation'
>

export type AutoFormData = {
  /**
   * describe the type of display for the sections
   * @default "default"
   */
  sectionsType?: 'default' | 'divided' | 'papered'
  /**
   * The different sections of the form
   */
  sections: FormSection[]
} & Pick<
  FormikFormParams<{}>,
  'readOnly' | 'emptyValueInReadOnly' | 'formikConfig'
>

export interface AutoFormProps
  extends Pick<
    FormikFormParams<{}>,
    'readOnly' | 'isLoading' | 'formikConfig'
  > {
  onSubmit?: (
    command: CommandWithFile<any>,
    values: any,
    formikHelpers: FormikHelpers<any>
  ) => boolean | void | Promise<any> | Promise<boolean>
  formData?: AutoFormData
  getFormActions?: (formState: FormComposableState) => React.ReactNode
  initialValues?: any
  downloadDocument?: (fieldName: string) => Promise<string | undefined>
}

export const AutoForm = (props: AutoFormProps) => {
  const {
    formData,
    isLoading,
    readOnly,
    onSubmit,
    formikConfig,
    getFormActions,
    initialValues,
    downloadDocument
  } = props

  const sectionsType = formData?.sectionsType ?? 'default'

  const initial = useMemo(() => {
    const initialValuesCopy = { ...initialValues }
    formData?.sections.forEach((section) =>
      section.fields.forEach((field) => {
        if (field.type === 'documentHandler') {
          if (initialValuesCopy[field.name] && downloadDocument) {
            initialValuesCopy[`${field.name}Uploaded`] = () =>
              downloadDocument(field.name)
            initialValuesCopy[field.name] = undefined
          }
        }
      })
    )
    return initialValuesCopy
  }, [initialValues, formData, downloadDocument])

  const onSubmitCommand = useCallback(
    async (values: any, formikHelpers: FormikHelpers<any>) => {
      if (onSubmit) {
        const command: CommandWithFile<any> = {
          command: {},
          files: []
        }
        formData?.sections.forEach((section) =>
          section.fields.forEach((field) => {
            if (values[field.name] != undefined) {
              if (field.type === 'documentHandler') {
                command.files.push({
                  file: values[field.name],
                  atrKey: field.name
                })
              } else {
                command.command[field.name] = values[field.name]
              }
            }
          })
        )
        await onSubmit(command, values, formikHelpers)
      }
    },
    [onSubmit, formData]
  )

  const formState = useFormComposable({
    onSubmit: onSubmitCommand,
    isLoading,
    readOnly: formData?.readOnly ?? readOnly,
    formikConfig: {
      ...formikConfig,
      ...formData?.formikConfig,
      initialValues: initial
    }
  })

  const actions = useMemo(
    () => getFormActions && getFormActions(formState),
    [formState]
  )

  const formSectionsDisplay = useMemo(() => {
    return formData?.sections.map((section) => {
      return (
        <FormSection
          key={section.id}
          section={section}
          formState={formState}
          sectionsType={sectionsType}
          displayLabel={formData?.sections.length > 1}
        />
      )
    })
  }, [formData, formState, sectionsType])

  return (
    <>
      {formSectionsDisplay}
      {actions}
    </>
  )
}

export interface FormSectionProps {
  sectionsType: 'default' | 'divided' | 'papered'
  section: FormSection
  formState: FormComposableState
  displayLabel?: boolean
}

export const FormSection = (props: FormSectionProps) => {
  const { sectionsType, section, formState, displayLabel = true } = props
  const display = evalDisplayConditions(section.conditions, formState.values)

  if (!display) return <></>
  const message = evalMessageConditions(section.conditions, formState.values)
  const sectionContent = (
    <>
      {section.description && (
        <Typography variant='body2'>{section.description}</Typography>
      )}
      <FormComposable
        formState={formState}
        fields={section.fields}
        display={section.display}
        gridColumnNumber={section.gridColumnNumber}
        orientation={section.orientation}
      />
      {message && (
        <Typography
          sx={{
            color: (theme) => theme.palette[message.type].main
          }}
        >
          {message.message}
        </Typography>
      )}
    </>
  )

  if (sectionsType === 'papered')
    return (
      <Section
        flexContent
        headerProps={{
          content: [
            {
              leftPart: [
                <TitleDivider
                  key='SectionTitle'
                  withDivider={false}
                  title={section.label}
                />
              ]
            }
          ]
        }}
      >
        {sectionContent}
      </Section>
    )
  return (
    <Fragment key={section.id}>
      {displayLabel && section.label && (
        <TitleDivider
          withDivider={sectionsType === 'divided'}
          title={section.label}
        />
      )}
      {sectionContent}
    </Fragment>
  )
}

export interface TitleDividerProps {
  title?: string
  withDivider?: boolean
}

export const TitleDivider = (props: TitleDividerProps) => {
  const { title, withDivider = true } = props
  return (
    <Stack gap={2}>
      <Typography variant='h6'>{title}</Typography>
      {withDivider && <Divider />}
    </Stack>
  )
}
