import { MergeMuiElementProps } from '@komune-io/g2-themes'
import { Gallery, GalleryProps } from './Gallery'
import { DirectoryPath } from '../../Domain'
import { GetGalleryOptions, useGetGallery } from '../..'
import { fsConfig } from '@komune-io/g2-providers'

export interface AutomatedGalleryBasicProps {
  /**
   * The directoryPath of the gallery
   */
  directoryPath: DirectoryPath
  /**
   * The getGallery hook options
   */
  getGalleryOptions?: GetGalleryOptions
  /**
   * The getGallery query key
   */
  getGalleryQueryKey?: string
}

export type AutomatedGalleryProps = MergeMuiElementProps<
  Omit<GalleryProps, 'files'>,
  AutomatedGalleryBasicProps
>

export const AutomatedGallery = (props: AutomatedGalleryProps) => {
  const { getGalleryOptions, directoryPath, getGalleryQueryKey, ...rest } =
    props

  const gallery = useGetGallery({
    apiUrl: fsConfig().url,
    directoryPath: directoryPath,
    options: getGalleryOptions,
    queryKey: getGalleryQueryKey
  })

  return <Gallery {...rest} files={gallery.data?.items ?? []} />
}
