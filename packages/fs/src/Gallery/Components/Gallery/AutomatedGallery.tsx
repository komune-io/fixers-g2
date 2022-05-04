import { MergeMuiElementProps } from '@smartb/g2-themes'
import React from 'react'
import { Gallery, GalleryProps } from './Gallery'
import { DirectoryPath } from '../../Domain'
import { GetGalleryOptions, useGetGallery } from '../..'
import { fsConfig } from '@smartb/g2-providers'

export interface AutomatedGalleryBasicProps {
  /**
   * The directoryPath of the gallery
   */
  directoryPath: DirectoryPath
  /**
   * The getGallery hook options
   */
  getGalleryOptions?: GetGalleryOptions
}

export type AutomatedGalleryProps = MergeMuiElementProps<
  Omit<GalleryProps, 'files'>,
  AutomatedGalleryBasicProps
>

export const AutomatedGallery = (props: AutomatedGalleryProps) => {
  const { getGalleryOptions, directoryPath, ...rest } = props

  const gallery = useGetGallery({
    apiUrl: fsConfig().url,
    directoryPath: directoryPath,
    options: getGalleryOptions
  })

  return <Gallery {...rest} files={gallery.data?.files ?? []} />
}
