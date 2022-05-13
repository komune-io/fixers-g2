import { useCallback } from 'react'
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions
} from 'react-query'
import { request } from '@smartb/g2-utils'
import {
  DirectoryPath,
  FileDeleteCommand,
  FileDeletedEvent,
  FileGetListCommand,
  FileUploadCommand,
  FileUploadedEvent,
  FsFile
} from '../Domain'

export type GetGalleryOptions =
  | Omit<
      UseQueryOptions<
        { files: FsFile[] } | undefined,
        unknown,
        { files: FsFile[] } | undefined,
        string[]
      >,
      'queryKey' | 'queryFn'
    >
  | undefined

export interface getGalleryParams {
  directoryPath: DirectoryPath
  /**
   * @default "gallery"
   */
  queryKey?: string
  jwt?: string
  apiUrl: string
  options?: GetGalleryOptions
}

export const useGetGallery = (params: getGalleryParams) => {
  const { apiUrl, jwt, options, directoryPath, queryKey = 'gallery' } = params

  const getGallery = useCallback(async () => {
    const res = await request<{ files: FsFile[] }[]>({
      url: `${apiUrl}/listFiles`,
      method: 'POST',
      body: JSON.stringify(directoryPath as FileGetListCommand),
      jwt: jwt
    })
    if (res) {
      return res[0]
    } else {
      return undefined
    }
  }, [apiUrl, jwt, directoryPath])

  return useQuery([queryKey, directoryPath.objectId], getGallery, options)
}

export type DeleteFilesOptions = Omit<
  UseMutationOptions<
    FileDeletedEvent[] | undefined,
    unknown,
    FileDeleteCommand[],
    unknown
  >,
  'mutationFn'
>

export interface deleteFilesParams {
  jwt?: string
  apiUrl: string
  options?: DeleteFilesOptions
}

export const useDeleteFiles = (params: deleteFilesParams) => {
  const { apiUrl, jwt, options } = params

  const deleteFile = useCallback(
    async (commands: FileDeleteCommand[]) => {
      const res = await request<FileDeletedEvent[]>({
        url: `${apiUrl}/deleteFile`,
        method: 'POST',
        body: JSON.stringify(commands),
        jwt: jwt
      })
      if (res) {
        return res
      } else {
        return undefined
      }
    },
    [apiUrl, jwt]
  )

  return useMutation(deleteFile, options)
}

export type UploadFilesOptions = Omit<
  UseMutationOptions<
    FileUploadedEvent[] | undefined,
    unknown,
    FormData,
    unknown
  >,
  'mutationFn'
>

export interface uploadFilesParams {
  jwt?: string
  apiUrl: string
  options?: UploadFilesOptions
  directoryPath: DirectoryPath
}

export const useUploadFiles = (params: uploadFilesParams) => {
  const { apiUrl, jwt, options, directoryPath } = params

  const uploadFile = useCallback(
    async (formData: FormData) => {
      formData.append('directory', directoryPath.directory)
      formData.append('objectId', directoryPath.objectId)
      formData.append('objectType', directoryPath.objectType)
      const res = await request<FileUploadedEvent[]>({
        url: `${apiUrl}/uploadFile`,
        method: 'POST',
        formData: formData,
        jwt: jwt
      })
      if (res) {
        return res
      } else {
        return undefined
      }
    },
    [apiUrl, jwt, directoryPath]
  )

  return useMutation(uploadFile, options)
}
