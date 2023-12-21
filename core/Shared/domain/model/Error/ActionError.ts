/* eslint-disable no-unused-vars */
import BaseError from './BaseError'

export interface Errors {
  // eslint-disable-next-line no-use-before-define
  errors: UpdateError[]
}

export interface ErrorData {
  data: Errors
}

export interface UpdateError {
  detail: string
  title: string
  status: string
}

export const InternalErrors = {
  MAPPING_REQUEST: 'internal/mapping-request',
  MAPPING_RESPONSE: 'internal/mapping-response'
}

export enum ErrorType {
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED',
  Connection = 'CONNECTION',
  Server = 'SERVER',
  Internal = 'INTERNAL'
}

export const ErrorFactory = {
  badRequest: <T = {}>(originalError?: Error, data?: T) =>
    new ActionError<T>(ErrorType.BadRequest, originalError, undefined, data),
  unauthorized: (originalError: Error) =>
    new ActionError(ErrorType.Unauthorized, originalError),
  connection: (originalError: Error) =>
    new ActionError(ErrorType.Connection, originalError),
  server: (originalError: Error) =>
    new ActionError(ErrorType.Server, originalError),
  internal: <T = {}>(code: string, originalError?: Error, data?: T) =>
    new ActionError<T>(ErrorType.Internal, originalError, code, data)
}

export class ActionError<Data = {}> extends BaseError {
  type: ErrorType
  code?: number | string
  originalError?: Error
  data?: Data

  constructor (
    type: ErrorType,
    originalError?: Error,
    code?: string,
    data?: Data
  ) {
    originalError ? super(originalError.message) : super('')

    this.type = type
    this.code = code || (originalError as any).status
    this.originalError = originalError
    this.data = data
  }
}
