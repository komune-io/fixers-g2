import { RequestProps } from './RequestProps'
import { fetchQueryRequest, QueryParams } from './useQueryRequest'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

/**
 * Custom hook to perform a query request and manage its state using React Query.
 *
 * @template QUERY - The type of the query parameters.
 * @template RESULT - The type of the result data.
 *
 * @param {string} path - The API endpoint path.
 * @param {RequestProps} props - The request properties.
 * @param {QueryParams<QUERY[], RESULT[]>} params - The query parameters and options.
 *
 * @returns {object} - An object containing the query result, query key, and a function to invalidate the query.
 */
export const useQueryRequestArray = <QUERY, RESULT>(
  path: string,
  props: RequestProps,
  params: QueryParams<QUERY[], RESULT[]>
) => {
  const { queryKey = path, options } = params
  const queryFn = useFetchQueryRequestArray<QUERY[], RESULT[]>(path, props)
  const queryClient = useQueryClient()

  const invalidateQuery = useCallback(
    () => queryClient.invalidateQueries({ queryKey: [queryKey] }),
    [queryClient.invalidateQueries, queryKey]
  )
  return {
    ...useQuery<RESULT[] | null, unknown, RESULT[], [string, QUERY[]]>({
      queryKey: [queryKey, params.query],
      queryFn: () => queryFn(params.query),
      ...options
    }),
    key: queryKey,
    invalidateQuery: invalidateQuery
  }
}

/**
 * Custom hook to create a fetch function for a query request.
 *
 * @template QUERY - The type of the query parameters.
 * @template RESULT - The type of the result data.
 *
 * @param {string} path - The API endpoint path.
 * @param {RequestProps} props - The request properties.
 *
 * @returns {function} - A function that performs the query request and returns the result.
 */
export const useFetchQueryRequestArray = <QUERY, RESULT>(
  path: string,
  props: RequestProps
): ((query?: QUERY) => Promise<RESULT | null>) => {
  return useCallback(
    async (query?: QUERY) =>
      query
        ? (await fetchQueryRequest<QUERY, RESULT>(path, query, props)) ?? null
        : null,
    [props]
  )
}
