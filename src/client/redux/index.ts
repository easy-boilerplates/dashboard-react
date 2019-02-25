import { ApiError } from 'client/api/error/api-error'
import { addApiErrors } from 'client/redux/modules/errors'
import { localeHandler, LocaleStore } from 'client/redux/modules/locale'
import { systemHandler, SystemStore } from 'client/redux/modules/system'
import {
  connectRouter,
  routerMiddleware,
  RouterState
} from 'connected-react-router'
import { createBrowserHistory } from 'history'
import {
  Action,
  AnyAction,
  applyMiddleware,
  compose,
  createStore,
  Reducer
} from 'redux'
import { combineHandlers, handlerMiddleware } from 'redux-handler'
import { actionSanitizer } from 'redux-handler/utils'

interface HandlersStore {
  locale: LocaleStore
  system: SystemStore
}

interface OtherStore {
  router: RouterState
}

export type RootStore = HandlersStore & OtherStore

export const history = createBrowserHistory()

const reducer = combineHandlers<HandlersStore>({
  locale: localeHandler,
  system: systemHandler
}).buildReducer<OtherStore>({
  router: connectRouter(history) as Reducer<RouterState, AnyAction>
})

const composes = [
  applyMiddleware(
    handlerMiddleware({
      errorHandler: (error, { type }): Action | void => {
        if (error instanceof ApiError) {
          return addApiErrors({
            id: type,
            errors: error.errors,
            ajaxError: error.ajaxError
          })
        }

        // Unhandled API error:
        throw error
      }
    }),
    routerMiddleware(history)
  )
]

const composeEnhancers: typeof compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      actionSanitizer,
      stateSanitizer: (state: RootStore) =>
        // tslint:disable-next-line:no-object-literal-type-assertion
        ({ ...state, locale: { messages: 'HIDDEN' as any } } as RootStore)
    })
  : compose

export const store = createStore(reducer, composeEnhancers(...composes))
