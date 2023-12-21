'use client'
import { useMutation, useQuery } from 'react-query'

import { ActionError } from '../core/Shared/domain/model/Error/ActionError'

import { useErrorHandler } from './useErrorHandler'

interface Options<Data> {
  onSuccess?: (data: Data) => Promise<unknown> | void
  onError?: (error: any) => void
  quietly?: boolean
  enabled?: boolean
}

export default function useQueryService <Data>(
  key: string,
  deps: any[],
  service: (variables?: any) => Promise<Data>,
  options?: Options<Data>
) {
  const errorHandler = useErrorHandler()
  return useQuery<Data, ActionError>([key, ...deps], service, {
    refetchOnWindowFocus: false,
    retry: false,
    onSuccess: (data) => {
      return options?.onSuccess?.(data)
    },
    onError: (err) =>
      options?.quietly && options.onError
        ? options.onError(err)
        : errorHandler.handle,
    enabled: options?.enabled,
    cacheTime: 1 * 60 * 1000 // 5 minutes of cache
  })
}

export const useMutationService = <Variables, Data = void>(
  service: (variables: Variables) => Promise<Data>,
  options: Options<Data> = {}
) => {
  const errorHandler = useErrorHandler()
  return useMutation<Data, ActionError | Error, Variables>(service, {
    retry: false,
    onSuccess: (data) => {
      options.onSuccess?.(data)
    },
    onError:
      options.quietly && options.onError ? options.onError : errorHandler.handle
  })
}
