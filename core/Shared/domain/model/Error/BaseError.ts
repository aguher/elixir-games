export default class BaseError extends Error {
  constructor (message: string) {
    super()

    if (Object.prototype.hasOwnProperty.call(this, 'captureStackTrace')) {
      Error.captureStackTrace(this, this.constructor)
    } else {
      Object.defineProperty(this, 'stack', {
        value: new Error().stack
      })
    }

    Object.defineProperty(this, 'message', {
      value: message
    })
  }
}
