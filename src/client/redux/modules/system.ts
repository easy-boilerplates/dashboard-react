import { authStore } from 'client/auth'
import { RootStore } from 'client/redux'
import { handler } from 'redux-handler'

export interface SystemStore {
  auth?: boolean
}

export const systemHandler = handler<SystemStore, RootStore>(
  {},
  {
    prefix: 'system'
  }
)

export const setAuth = systemHandler
  .action<boolean>('AUTHORIZE')
  .sync((s, { args: auth }) => {
    authStore.setData(auth)
    return {
      ...s,
      auth
    }
  })
