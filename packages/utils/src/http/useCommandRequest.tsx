import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { useCallback } from 'react'
import { RequestProps } from './RequestProps'
import { errorHandler, HttpOptions, request, successHandler } from './request'

export type CommandResquestOptions = Partial<HttpOptions> & {
  successHandler?: () => void
}

export type CommandOptions<COMMAND, EVENT> = Omit<
  UseMutationOptions<EVENT | undefined, unknown, COMMAND | COMMAND[], unknown>,
  'mutationFn'
>

export type CommandParams<COMMAND, EVENT> = {
  options?: CommandOptions<COMMAND, EVENT>
}

export const useCommandRequest = <COMMAND, EVENT>(
  path: string,
  props: RequestProps,
  params?: CommandParams<COMMAND, EVENT>,
  requestOptions?: CommandResquestOptions
) => {
  const { url, jwt } = props
  const apiCall = useCallback(
    async (command: COMMAND | COMMAND[]) => {
      const res = await request<EVENT[]>({
        url: `${url}/${path}`,
        method: 'POST',
        body: JSON.stringify(command),
        jwt: jwt,
        errorHandler: errorHandler(path),
        ...requestOptions
      })
      if (res) {
        if (requestOptions?.successHandler) requestOptions.successHandler()
        else successHandler(path)
        return res[0]
      } else {
        return undefined
      }
    },
    [url, jwt, ...Object.values(requestOptions ?? {})]
  )

  return useMutation({ mutationFn: apiCall, ...params?.options })
}

export interface CommandFile {
  atrKey?: string
  file: File
}

export interface CommandWithFile<COMMAND> {
  command: COMMAND
  files: CommandFile[]
}

export const useCommandWithFileRequest = <COMMAND, EVENT>(
  path: string,
  props: RequestProps,
  params?: CommandParams<CommandWithFile<COMMAND>, EVENT>,
  requestOptions?: CommandResquestOptions
) => {
  const { url, jwt } = props
  const apiCall = useCallback(
    async ({ command, files }: CommandWithFile<COMMAND>) => {
      const formData = new FormData()
      files.forEach((file) => {
        formData.append(file.atrKey ?? 'file', file.file, file.file.name)
      })
      formData.append(
        'command',
        new Blob([JSON.stringify(command)], { type: 'application/json' })
      )

      const res = await request<EVENT>({
        url: `${url}/${path}`,
        method: 'POST',
        contentType: 'none',
        formData: formData,
        jwt: jwt,
        errorHandler: errorHandler(path)
      })
      if (res) {
        if (requestOptions?.successHandler) requestOptions.successHandler()
        else successHandler(path)
        return res
      } else {
        return undefined
      }
    },
    [url, jwt, ...Object.values(requestOptions ?? {})]
  )

  return useMutation({ mutationFn: apiCall, ...params?.options })
}
