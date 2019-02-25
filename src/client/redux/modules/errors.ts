import { ApiErrorData } from 'client/api/error/api-error'
import { handler } from 'redux-handler'
import { Action } from 'redux-handler/types'
import { AjaxError } from 'rxjs/ajax'

export interface ApiErrorsStore {
  [key: string]: {
    data: ApiErrorData[]
    ajaxError: AjaxError | undefined
  }
}

export interface ErrorsStore {
  api: ApiErrorsStore
}

export const errorsHandler = handler<ErrorsStore>(
  {
    api: {}
  },
  { prefix: 'error' }
)

interface AddApiErrorsArgs {
  errors: ApiErrorData[]
  id: string
  ajaxError: AjaxError | undefined
}

export const addApiErrors = errorsHandler
  .action<AddApiErrorsArgs>('ADD_ERROR')
  .sync((s, a) => ({
    ...s,
    api: {
      ...s.api,
      [a.args.id]: {
        data: a.args.errors,
        ajaxError: a.args.ajaxError
      }
    }
  }))

export const removeApiErrors = errorsHandler
  .action<Action>('REMOVE_API_ERRORS')
  .sync((s, a) => {
    // Prevent change state when no errors
    if (!s.api[a.args.type]) return s

    const api = { ...s.api }

    // tslint:disable-next-line:no-dynamic-delete
    delete api[a.args.type]

    return {
      ...s,
      api
    }
  })
