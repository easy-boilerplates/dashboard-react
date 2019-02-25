import { ApiError } from 'client/api/error/api-error'
import { AuthError } from 'client/api/error/auth-error'
import { ConnectionApiError } from 'client/api/error/connection-api-error'
import { ServerError } from 'client/api/error/server-error'
import { config } from 'config'
import { Observable, of } from 'rxjs'
import { ajax, AjaxError } from 'rxjs/ajax'
import { catchError, map } from 'rxjs/operators'

const MOCK = true

const CALLSTACK_SIZE = 5
export let CALLSTACK: string[] = []

export const enum ApiProvider {
  FINANCE = 1,
  /**
   * Self hosted application
   */
  SELF = 2
}

export const urls = {
  [ApiProvider.FINANCE]: config.api.finance,
  [ApiProvider.SELF]: '/'
}

interface FormObject {
  [key: string]: string | Blob
}

interface Request {
  /**
   * Converts object to JSON
   */
  json?: {}

  /**
   * Converts object to FormData
   */
  form?: {}

  method?: 'get' | 'post' | 'put' | 'delete'

  /**
   * Use authorization header
   * @default true
   */
  auth?: boolean

  /**
   * Returns raw response
   * @default false
   */
  raw?: boolean

  provider?: ApiProvider

  /**
   * Request to servers root
   * @example base path `http://some/api/` will be replaced with `http://some/`
   */
  root?: boolean

  responseType?: 'blob' | 'text'
}

const appendItemToForm = (fd: FormData, key: string, value: any) => {
  // Append file name for blobs
  if (value instanceof Blob) {
    fd.append(key, value, (value as any).name || (value as any).filename)
    return
  }

  fd.append(key, value)
}

const generateForm = (data: FormObject) => {
  const fd = new FormData()

  for (const key of Object.keys(data)) {
    const value = data[key]

    if (value instanceof FileList) {
      for (let i = 0; i < value.length; i++)
        appendItemToForm(fd, key, value.item(i))
    } else if (Array.isArray(value)) {
      for (const v of value) appendItemToForm(fd, key, v)
    }

    appendItemToForm(fd, key, data[key])
  }

  return fd
}

export const callApi = <T = void>(
  url: string,
  init: Request & { mock?: T; silent?: boolean } = {}
): Observable<T> => {
  const {
    json,
    form,
    mock,
    silent,
    auth,
    raw,
    provider,
    root,
    ...request
  } = init

  if (MOCK && mock !== undefined) {
    // tslint:disable-next-line:no-console
    console.info(`[ API ][ Mock ] [ ${(init && init.method) || 'GET'} ] ${url}`)
    return of(mock)
  }

  if (CALLSTACK.length === CALLSTACK_SIZE) CALLSTACK = CALLSTACK.slice(1)

  CALLSTACK.push(url)

  const headers: any = {}

  if (json) {
    headers['Content-Type'] = 'application/json'
  }

  // if (auth !== false)
  //   headers.Authorization = localStorage.getItem(LS_SESSION_ID)

  // Check for root url
  let baseUrl = urls[provider ? provider : ApiProvider.FINANCE]

  if (root) {
    if (baseUrl.includes('//')) {
      const pathArray = baseUrl.split('/')
      baseUrl = pathArray[0] + '//' + pathArray[2] + '/'
    } else {
      baseUrl = '/'
    }
  }

  return ajax({
    ...request,
    body: json ? JSON.stringify(json) : form ? generateForm(form) : undefined,
    url: `${baseUrl}${url}`,
    headers
  }).pipe(
    map(res => {
      if (raw) return res

      switch (res.responseType) {
        case 'blob':
        case 'json':
        case 'text':
          return res.response

        default:
          throw Error('Unexpected response type')
      }
    }),
    catchError(err => {
      if (err instanceof AjaxError) {
        if (err.status === 0) {
          throw new ConnectionApiError(err)
        }

        if (err.status === 400) {
          // Prevent errors on files (blob)
          if (err.responseType !== 'json') throw err

          throw new ApiError(err.response, err)
        }

        if (err.status === 401) {
          throw new AuthError()
        }

        throw new ServerError(err)
      }

      throw err
    })
  )
}
