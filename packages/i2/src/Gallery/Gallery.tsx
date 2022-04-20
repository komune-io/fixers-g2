import { ImageList, ImageListItem, Stack } from '@mui/material'
import React, { useMemo } from 'react'
import { FsFile } from './types'
import { cx } from '@emotion/css'
import { BasicProps } from '@smartb/g2-themes'

export interface GalleryClasses {
  image?: string
  item?: string
}

export interface GalleryStyles {
  image?: React.CSSProperties
  item?: React.CSSProperties
}

export interface GalleryProps extends BasicProps {
  /**
   * The images to display in the gallery.
   */
  files: FsFile[]
  /**
   * The variants to display in the gallery.
   *
   * @default "grid"
   */
  variant?: 'grid' | 'verticalList' | 'horizontalList'
  /**
   * The gallery's name use in the alt attribute of the images.
   */
  galleryName?: string
  /**
   * The classes applied to the different part of the component
   */
  classes?: GalleryClasses
  /**
   * The styles applied to the different part of the component
   */
  styles?: GalleryStyles
}

export const Gallery = (props: GalleryProps) => {
  const {
    files,
    variant = 'grid',
    galleryName,
    classes,
    styles,
    className,
    ...other
  } = props

  const images = useMemo(() => {
    if (variant !== 'grid') {
      return files.map((file) => {
        return (
          <img
            className={cx('AruiGallery-image', classes?.image)}
            key={file.path.name}
            src={file.url}
            alt={`The image ${
              file.path.name.split('_')[1]
            } of the gallery ${galleryName}`}
            loading='lazy'
          />
        )
      })
    } else {
      return files.map((file) => {
        return (
          <ImageListItem key={file.path.name} className={classes?.item}>
            <img
              className={cx('AruiGallery-image', classes?.image)}
              src={file.url}
              alt={`The image ${
                file.path.name.split('_')[1]
              } of the gallery ${galleryName}`}
              loading='lazy'
            />
          </ImageListItem>
        )
      })
    }
  }, [variant, files, galleryName, classes?.image, classes?.item])

  if (variant !== 'grid')
    return (
      <Stack
        {...other}
        className={cx('AruiGallery-root', className)}
        direction={variant === 'verticalList' ? 'column' : 'row'}
        alignItems='stretch'
        sx={{
          gap: '20px',
          overflow: 'auto',
          height: '100%',
          '& .AruiGallery-image': {
            borderRadius: '20px'
          }
        }}
      >
        {images}
      </Stack>
    )
  return (
    <ImageList
      {...other}
      className={cx('AruiGallery-root', className)}
      sx={{
        '& .AruiGallery-image': {
          borderRadius: '20px',
          height: '100%'
        }
      }}
      variant='masonry'
      cols={2}
      gap={20}
    >
      {images}
    </ImageList>
  )
}
