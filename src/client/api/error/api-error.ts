import { AjaxError } from 'rxjs/ajax'

export interface HandleErrorEventArgs {
  errors: ApiErrorData[]
  type: string
  hasCode: (code: string) => boolean
  ajaxError: AjaxError
}

export interface ApiErrorData<T = any> {
  field?: string
  code: string
  additionalFields?: T
}

export class ApiError {
  constructor(public errors: ApiErrorData[], public ajaxError?: AjaxError) {
    errors.forEach(e => {
      if (e.field) e.field = e.field[0].toLowerCase() + e.field.slice(1)
    })
  }
}
