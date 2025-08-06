import { Stack, Typography, Divider } from '@mui/material'
import React, { useMemo } from 'react'
import {
  FormComposable,
  FormComposableBasicProps,
  FormComposableField,
  FormComposableState
} from '../FormComposable'
import {
  SectionCondition,
  evalDisplayConditions,
  evalMessageConditions
} from '../Conditions'
import { Section } from '@komune-io/g2-layout'
import { UseAutoFormStateParams, useAutoFormState } from './useAutoFormState'

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
  /**
   * The section properties can be used to add custom properties
   */
  properties?: any
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
} & Omit<UseAutoFormStateParams, 'onSubmit' | 'actions'>

export interface AutoFormProps extends UseAutoFormStateParams {
  formData?: AutoFormData
  getFormActions?: (formState: FormComposableState) => React.ReactNode
}

export const AutoForm = (props: AutoFormProps) => {
  const { formData, getFormActions, ...autoFormStateParams } = props

  const sectionsType = formData?.sectionsType ?? 'default'

  const formState = useAutoFormState(autoFormStateParams)

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
        <Typography variant='subtitle2'>{section.description}</Typography>
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
    <Stack gap={3} key={section.id}>
      {displayLabel && section.label && (
        <TitleDivider
          withDivider={sectionsType === 'divided'}
          title={section.label}
        />
      )}
      {sectionContent}
    </Stack>
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
