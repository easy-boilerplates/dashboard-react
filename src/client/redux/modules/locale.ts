import { api } from 'client/api'
import { DEFAULT_LOCALE, Langs } from 'client/locale'
import { RootStore } from 'client/redux'
import {
  available,
  completed,
  fulfilled,
  handler,
  pending,
  rx
} from 'redux-handler'

type MessagesData = Partial<{ [key in Langs]: Record<string, string> }>

export interface LangData {
  lang: Langs
}

export interface LocaleStore extends LangData {
  loading?: boolean
  messages: MessagesData
}

const initialState: LocaleStore = {
  lang: DEFAULT_LOCALE,
  messages: {}
}

export const localeHandler = handler<LocaleStore, RootStore>(initialState, {
  prefix: 'locale'
})

export const fetchLocale = localeHandler.action<LangData>('FETCH_LOCALE').pipe(
  available((getState, { args: { lang } }) => {
    const state = getState().locale
    return !state.loading && state.messages[lang] === undefined
  }),
  rx(({ lang }) => api.locale.messages(lang)),
  pending(s => ({ ...s, loading: true })),
  fulfilled((s, { payload, args: { lang } }) => ({
    ...s,
    lang,
    messages: {
      ...s.messages,
      [lang]: payload
    }
  })),
  completed(s => ({ ...s, loading: false }))
)

export const setLang = localeHandler
  .action<LangData>('SET_LANG')
  .sync((s, { args: { lang } }) => ({
    ...s,
    lang
  }))
