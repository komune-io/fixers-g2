import { useLocalStorage } from '@mantine/hooks'
import { Base64ToFile, fileToBase64 } from '@komune-io/g2-utils'
import { useCallback, useState } from 'react'
import { DocumentHandlerProps } from './DocumentHandler'

export interface LocalStorageDocumentHandler {
  getFile: () => File | undefined
  fileUrl?: string
  fileName?: string
  documentHandlerProps: DocumentHandlerProps
}

export const useLocalStorageDocumentHandler = (
  fileKey: string
): LocalStorageDocumentHandler => {
  const [fileUrl, setFileUrl] = useLocalStorage<string | undefined>({
    key: fileKey
  })
  const [fileName, setFileName] = useLocalStorage<string | undefined>({
    key: fileKey + '-fileName'
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getFile = useCallback(
    () => (fileUrl ? Base64ToFile(fileUrl, fileName) : undefined),
    [fileUrl, fileName]
  )

  const getFileUrl = useCallback(
    () =>
      fileUrl
        ? URL.createObjectURL(Base64ToFile(fileUrl, fileName))
        : undefined,
    [fileUrl]
  )

  const onAdd = useCallback(async (files: File[]) => {
    setIsLoading(true)
    const file = files[0]
    setFileName(file.name)
    const url = await fileToBase64(file)
    setFileUrl(url)
    setIsLoading(false)
  }, [])

  const onDelete = useCallback(() => {
    setFileUrl('')
    setFileName('')
  }, [])

  return {
    getFile,
    fileUrl,
    fileName,
    documentHandlerProps: {
      uploaded: !!fileUrl,
      getFileUrl,
      isLoading,
      onAdd,
      onDelete,
      dropzoneProps: {
        multiple: false,
        maxSize: 4 * 1024 * 1024
      }
    }
  }
}
