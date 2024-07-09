import {
  useQuery,
  useQueryClient,
  UseQueryOptions
} from '@tanstack/react-query'
import { useCallback } from 'react'
import { HttpOptions, errorHandler, request } from './index'
import { RequestProps } from './RequestProps'

export type QueryOptions<QUERY, RESULT> = Omit<
  UseQueryOptions<RESULT | null, unknown, RESULT, [string, QUERY]>,
  'queryKey' | 'queryFn'
>

export type QueryParams<QUERY, RESULT> = {
  queryKey?: string
  options?: QueryOptions<QUERY, RESULT>
  query: QUERY
}

export const useQueryRequest = <QUERY, RESULT>(
  path: string,
  props: RequestProps,
  params: QueryParams<QUERY, RESULT>
) => {
  const { queryKey = path, options } = params
  console.log('useQueryRequest: 1')
  const queryFn = useFetchQueryRequest<QUERY, RESULT>(path, props)
  console.log('useQueryRequest: 2')
  const queryClient = useQueryClient()
  console.log('useQueryRequest: 3')

  const invalidateQuery = useCallback(() => {
    console.log('useQueryRequest.invalidateQuery: 1')
    return queryClient.invalidateQueries({ queryKey: [queryKey] })
  }, [queryClient.invalidateQueries, queryKey])
  console.log('useQueryRequest: 4')

  return {
    ...useQuery<RESULT | null, unknown, RESULT, [string, QUERY]>({
      queryKey: [queryKey, params.query],
      queryFn: () => queryFn(params.query),
      ...options
    }),
    key: queryKey,
    invalidateQuery: invalidateQuery
  }
}

export const useFetchQueryRequest = <QUERY, RESULT>(
  path: string,
  props: RequestProps
): ((query?: QUERY) => Promise<RESULT | null>) => {
  return useCallback(
    async (query?: QUERY) =>
      query
        ? (
            await fetchQueryRequest<QUERY, RESULT[]>(path, query, props)
          )?.pop() ?? null
        : null,
    [props]
  )
}

export const useFetchBinary = <QUERY>(
  path: string,
  props: RequestProps
): ((query?: QUERY) => Promise<string | undefined>) => {
  return useCallback(
    async (query?: QUERY) =>
      query &&
      fetchQueryRequest(path, query, props, { returnType: 'objectUrl' }),
    [props]
  )
}

export const fetchQueryRequest = async <QUERY, RESULT>(
  path: string,
  query: QUERY,
  props: RequestProps,
  options?: Partial<HttpOptions>
) => {
  const { jwt, url } = props
  const res = await request<RESULT>({
    url: `${url}/${path}`,
    method: 'POST',
    body: JSON.stringify(query),
    jwt: jwt,
    errorHandler: errorHandler(path),
    ...options
  })
  if (res) {
    //no success handler on a query
    return res
  } else {
    return undefined
  }
}
