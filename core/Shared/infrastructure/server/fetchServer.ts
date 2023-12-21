import { ErrorFactory } from '../../domain/model/Error/ActionError'

import { FetchError, Server } from './Server'
import { mapError } from './serverError'

const SECONDS_TIMEOUT = 30

const fetchWithTimeout = async (resource: any, options:any = {}) => {
  const { timeout = SECONDS_TIMEOUT * 1000 } = options

  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal
  })
  clearTimeout(id)
  return response
}

export const fetchServer = <Request, Response>(): Server<Request, Response> => {
  let _url: string = ''

  const executeRequest:any = async (
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    data?: any
  ) => {
    try {
      const options = {
        method,
        headers: {
          'Content-type': 'application/json'
        },
        Accept: 'application/json',
        body: JSON.stringify(data)
      }
      const response = await fetchWithTimeout(
        _url,
        options
      )

      if (!response.ok) {
        throw await mapError(
          new FetchError(await response.text(), response.status, response)
        )
      }
      if (response.status === 204) {
        return response
      }
      return await response.json()
    } catch (error) {
      if (error instanceof TypeError) {
        throw ErrorFactory.server(error)
      }

      throw error
    }
  }

  const server: Server<Request, Response> = {
    endpoint: (endpoint: () => string) => {
      _url = endpoint()

      return server
    },
    url: (url: string) => {
      _url += url
      return server
    },
    params: (params: Record<string, string | boolean | number>) => {
      Object.entries(params).forEach(([key, value], index) => {
        _url += index === 0 ? '?' : '&'
        _url += `${key}=${value}`
      })
      return server
    },
    get: async (): Promise<Response> => executeRequest('GET'),
    post: async (data?: Request): Promise<Response> =>
      executeRequest('POST', data),
    put: async (data?: Request): Promise<Response> =>
      executeRequest('PUT', data),
    delete: async (data?: Request): Promise<Response> =>
      executeRequest('DELETE', data)

  }

  return server
}
