import { StatusCodes } from 'http-status-codes'

import { ErrorFactory } from '../../domain/model/Error/ActionError'
import { parse } from '../serialization/parse'

import { FetchError } from './Server'

export const mapError = async (error: FetchError) => {
  switch (error.status) {
    case StatusCodes.BAD_REQUEST:
      return ErrorFactory.badRequest(error, parseErrorData(error))
    case StatusCodes.UNAUTHORIZED:
      return ErrorFactory.unauthorized(error)
    case StatusCodes.INTERNAL_SERVER_ERROR:
    default:
      return ErrorFactory.server(error)
  }
}

export const parseErrorData = (error: FetchError | string) => {
  try {
    return parse(JSON.parse(typeof error === 'string' ? error : error.message))
    // eslint-disable-next-line no-empty
  } catch (e) {}
}
