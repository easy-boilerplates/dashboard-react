import { ApiProvider, callApi } from 'client/api/ajax'

export const messages = (lang: string) =>
  callApi<{ [key: string]: string }>(`locales/${lang}.json?${BUILD_HASH}`, {
    provider: ApiProvider.SELF,
    root: true
  })

// tslint:disable-next-line:no-default-export
export default {
  messages
}
