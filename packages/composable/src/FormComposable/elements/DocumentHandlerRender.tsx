import { DocumentHandlerProps, DocumentHandler } from '@komune-io/g2-components'
import React from 'react'
import { FieldRenderProps } from '../type'
import { ElementRendererFunction } from '../../ComposableRender'
import { getIn } from 'formik'
import { Box } from '@mui/material'
import { useChangeHandler } from '../type/useChangeHandler'

export type DocumentHandlerExtendProps = Partial<
  Omit<
    DocumentHandlerProps,
    'uploaded' | 'onAdd' | 'label' | 'classes' | 'styles' | 'getFileUrl'
  >
>

export type DocumentHandlerRenderProps = FieldRenderProps<
  'documentHandler',
  DocumentHandlerExtendProps
>

export const DocumentHandlerRender: ElementRendererFunction<
  DocumentHandlerRenderProps
> = (props: DocumentHandlerRenderProps) => {
  const { element, formState, basicProps } = props
  const { params } = element
  const {
    errorMessage,
    label,
    onChange,
    onValueChange,
    readOnly,
    sx,
    ...basicPropsRest
  } = basicProps
  delete basicProps.emptyValueInReadOnly

  const setFieldValue = (files: File[]) =>
    formState.setFieldValue(basicProps.name, files[0], false)
  const onChangeHandler = useChangeHandler(
    formState,
    setFieldValue,
    onChange,
    onValueChange
  )

  const localFile: File | undefined = getIn(formState.values, basicProps.name)
  const uploadedGetUrl = getIn(formState.values, basicProps.name + 'Uploaded')
  if (basicProps.readOnly && !uploadedGetUrl && !localFile) return <></>
  return (
    <Box sx={sx}>
      <DocumentHandler
        uploaded={!!uploadedGetUrl || !!localFile}
        fileLabel={
          localFile?.name ?? (typeof label === 'string' ? label : undefined)
        }
        label={label}
        getFileUrl={
          localFile ? () => URL.createObjectURL(localFile) : uploadedGetUrl
        }
        onAdd={onChangeHandler}
        onDelete={
          !basicProps.readOnly
            ? () => {
                if (localFile)
                  formState.setFieldValue(basicProps.name, undefined, false)
                if (uploadedGetUrl)
                  formState.setFieldValue(
                    basicProps.name + 'Uploaded',
                    undefined,
                    false
                  )
              }
            : undefined
        }
        customErrorMessage={errorMessage}
        {...params}
        {...basicPropsRest}
      />
    </Box>
  )
}
