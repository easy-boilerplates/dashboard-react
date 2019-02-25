import { ApiErrorData } from 'client/api/error/api-error'
import { BaseError } from 'client/utils/base-error'
import { utc } from 'moment'
import { AjaxError } from 'rxjs/ajax'

export interface SerializableSystemError {
  code: string | null
  status: number
  location: string
  date: string
  request: {
    url: string
    method: string
  }
  response: {
    errors: ApiErrorData[]
    status: number
    message: string
  }
}

export class ServerError extends BaseError {
  private readonly _error: AjaxError
  private readonly _date = utc().format('DD/MM/YYYY H:mm:ss')

  get code() {
    return this._error.xhr.getResponseHeader('request')
  }

  constructor(error: AjaxError) {
    super()
    this._error = error
  }

  serializable(): SerializableSystemError {
    return {
      code: this.code,
      status: this._error.status,
      location: window.location.href,
      date: this._date,
      request: {
        url: this._error.request.url!,
        method: this._error.request.method!
      },
      response: {
        errors: this._error.response,
        status: this._error.status,
        message: this._error.message
      }
    }
  }
}
