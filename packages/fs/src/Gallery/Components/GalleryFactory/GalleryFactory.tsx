import { CSSProperties, useCallback, useMemo, useState } from 'react'
import { FsFile } from '../../Domain'
import { cx } from '@emotion/css'
import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  SxProps,
  Theme,
  Typography
} from '@mui/material'
import { AddPhotoAlternateRounded, CloseRounded } from '@mui/icons-material'
import { Dropzone, IMAGE_MIME_TYPE, DropzoneProps } from '@mantine/dropzone'
import { FileRejection } from 'react-dropzone'
import { BasicProps, MergeMuiElementProps } from '@komune-io/g2-themes'
import { StackProps } from '@mantine/core'
import { DropError } from '@komune-io/g2-components'
import { useTranslation } from 'react-i18next'

export interface GalleryFactoryClasses {
  image?: string
  imageContainer?: string
  closeButton?: string
  closeIcon?: string
  dropzone?: string
}

export interface GalleryFactoryStyles {
  image?: CSSProperties
  imageContainer?: CSSProperties
  closeButton?: CSSProperties
  closeIcon?: CSSProperties
  dropzone?: CSSProperties
}

export interface GalleryFactoryBasicProps extends BasicProps {
  /**
   * The images to display in the gallery.
   */
  files: FsFile[]
  /**
   * The gallery's name use in the alt attribute of the images.
   */
  galleryName?: string
  /**
   * onDelete image event handler.
   */
  onDelete?: (file: FsFile) => void
  /**
   * onDelete image event handler.
   */
  onAdd?: (files: File[]) => void
  /**
   * onReject image event handler.
   */
  onReject?: (errors: DropError[]) => void
  /**
   * loading state.
   */
  isLoading?: boolean
  /**
   * The props of the dropzone
   */
  dropzoneProps?: DropzoneProps
  /**
   * The classes applied to the different part of the component
   */
  classes?: GalleryFactoryClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: GalleryFactoryStyles
  sx?: SxProps<Theme>
}

export type GalleryFactoryProps = MergeMuiElementProps<
  StackProps,
  GalleryFactoryBasicProps
>

export const GalleryFactory = (props: GalleryFactoryProps) => {
  const {
    files = [],
    galleryName,
    onDelete,
    onAdd,
    onReject,
    isLoading = false,
    classes,
    styles,
    className,
    dropzoneProps,
    sx,
    ...rest
  } = props

  const [error, setError] = useState<DropError | undefined>(undefined)
  const { t } = useTranslation()

  const images = useMemo(() => {
    return files.map((file) => {
      return (
        <Box
          className={cx(
            'AruiGalleryFactory-imageContainer',
            classes?.imageContainer
          )}
          style={styles?.imageContainer}
          key={file.path.name}
          sx={{
            position: 'relative',
            height: '100%'
          }}
        >
          {!!onDelete && (
            <IconButton
              className={cx(
                'AruiGalleryFactory-closeButton',
                classes?.closeButton
              )}
              style={styles?.closeButton}
              onClick={() => onDelete(file)}
              sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                borderRadius: '20px',
                background: 'rgb(73, 80, 87, 0.8)',
                color: 'white',
                '&:hover': {
                  background: 'rgb(73, 80, 87, 1)'
                }
              }}
            >
              <CloseRounded
                className={cx(
                  'AruiGalleryFactory-closeIcon',
                  classes?.closeIcon
                )}
                style={styles?.closeIcon}
                sx={{
                  width: '22px',
                  height: '22px'
                }}
              />
            </IconButton>
          )}
          <img
            className={cx('AruiGalleryFactory-image', classes?.image)}
            style={styles?.image}
            src={file.url}
            alt={`The image ${
              file.path.name.split('_')[1]
            } of the gallery ${galleryName}`}
            loading='lazy'
          />
        </Box>
      )
    })
  }, [files, galleryName, onDelete, classes, styles])

  const onRejectMemoized = useCallback(
    (fileRejections: FileRejection[]) => {
      if (onReject) {
        const errors: DropError[] = []
        fileRejections.forEach((reject) => {
          reject.errors.forEach((error) => {
            errors.push(error.code as DropError)
          })
        })
        onReject(errors)
      }
      setError(fileRejections[0].errors[0].code as DropError)
    },
    [onReject]
  )

  const onDrop = useCallback(
    (files: File[]) => {
      onAdd && onAdd(files)
      setError(undefined)
    },
    [onAdd]
  )

  return (
    //@ts-ignore
    <Stack
      className={cx('AruiGalleryFactory-root', className)}
      direction='row'
      alignItems='stretch'
      sx={{
        gap: '20px',
        overflow: 'auto',
        minHeight: '150px',
        '& .AruiGalleryFactory-dropzone': {
          width: '300px',
          flexShrink: 0,
          maxWidth: '300px',
          borderRadius: '20px'
        },
        ...sx,
        '& .AruiGalleryFactory-image': {
          borderRadius: '20px',
          height: '100%'
        },
        padding: '10px 0'
      }}
      {...rest}
    >
      {images}
      {!!onAdd &&
        (!isLoading ? (
          <Dropzone
            className={cx('AruiGalleryFactory-dropzone', classes?.dropzone)}
            style={styles?.dropzone}
            onDrop={onDrop}
            onReject={onRejectMemoized}
            accept={IMAGE_MIME_TYPE}
            maxSize={10 * 1024 * 1024}
            {...dropzoneProps}
          >
            <DropzoneChildren
              error={
                error
                  ? t('g2.' + error, {
                      formats: ['png', 'gif', 'jpeg', 'svg+xml', 'webp'].join(
                        ', '
                      ),
                      sizeLimit: (dropzoneProps?.maxSize ?? 10) / 1024 / 1024
                    })
                  : undefined
              }
              addImagesString={t('g2.addImages')}
            />
          </Dropzone>
        ) : (
          <Stack
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '300px',
              flexShrink: 0,
              maxWidth: '300px'
            }}
          >
            <CircularProgress disableShrink />
          </Stack>
        ))}
    </Stack>
  )
}

interface DropzoneChildren {
  error?: string
  addImagesString?: string
}

export const DropzoneChildren = (props: DropzoneChildren) => {
  const { addImagesString, error } = props
  return (
    <Stack
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
      }}
    >
      <AddPhotoAlternateRounded
        sx={{
          width: '50px',
          height: '50px'
        }}
      />
      <Typography align='center'>{addImagesString}</Typography>
      {error && (
        <Typography
          sx={{ paddingTop: '15px' }}
          align='center'
          variant='body2'
          color='error'
        >
          {error}
        </Typography>
      )}
    </Stack>
  )
}
