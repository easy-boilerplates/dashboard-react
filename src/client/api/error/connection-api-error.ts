import { ServerError } from 'client/api/error/server-error'

export class ConnectionApiError extends ServerError {
  static CODE = 'Connection API error'

  get code() {
    return ConnectionApiError.CODE
  }
}
