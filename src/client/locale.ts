import 'intl'
import { addLocaleData, Locale } from 'react-intl'

export const DEFAULT_LOCALE = 'ru'

export type Langs = 'ru' | 'en'

export const langs: Langs[] = ['ru', 'en']
const locales: Locale[] = []

langs.forEach(locale => {
  locales.push(...require(`react-intl/locale-data/${locale}`))
})

addLocaleData(locales)
