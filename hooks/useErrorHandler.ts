import { ActionError, ErrorType } from '../core/Shared/domain/model/Error/ActionError'

export const useErrorHandler = () => {
  return {
    handle: (error: Error | ActionError) => {
      const message =
        error instanceof ActionError && error.type === ErrorType.Connection
          ? 'There was an connection error'
          : 'There was an error'

      console.error(message)
    }
  }
}
