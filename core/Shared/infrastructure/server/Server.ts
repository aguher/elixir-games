import { ActionError } from '../../domain/model/Error/ActionError'

export interface SSEStream {
  open: () => void
  close: () => void
}

export interface SSECallback<Data> {
  onUpdate: (data: Data) => void
  onError: (error: ActionError | Error) => void
}

export interface Server<Request, Response> {
  endpoint: (endpoint: () => string) => Server<Request, Response>
  params: (params: Record<string, string | boolean | number>) => Server<Request, Response>
  url: (url: string) => Server<Request, Response>
  get: () => Promise<Response>
  post: (data?: Request) => Promise<Response>
  put: (data?: Request) => Promise<Response>
  delete: (data?: Request) => Promise<Response>
}
// eslint-disable-next-line no-undef
export interface RequestOptions extends RequestInit {
  [key: string]: any
}
export type FetchLike = (url: string, opts: RequestOptions) => Promise<Response>
export type ConfiguredMiddleware = (next: FetchLike) => FetchLike

export interface Headers {
  [key: string]: string
}

export class FetchError extends Error {
  status: number
  response: Response

  constructor (message: string, status: number, response: Response) {
    super(message)
    this.status = status
    this.response = response
  }
}
