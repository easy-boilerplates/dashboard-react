import { authStore } from 'client/auth'
import { DEFAULT_LOCALE } from 'client/locale'
import { connect, DispatchProps } from 'client/redux/connect'
import { fetchLocale, LocaleStore } from 'client/redux/modules/locale'
import { setAuth } from 'client/redux/modules/system'
import React from 'react'
import { IntlProvider } from 'react-intl'

interface StateProps {
  locale: LocaleStore
}

type ComponentProps = StateProps & DispatchProps

class BootstrapComponent extends React.Component<ComponentProps> {
  componentDidMount() {
    const {
      dispatch,
      locale: { messages, lang }
    } = this.props

    if (!messages[lang]) {
      dispatch(fetchLocale({ lang: DEFAULT_LOCALE }))
    }

    if (authStore.getData()) dispatch(setAuth(true))
  }

  render() {
    const {
      locale: { lang, messages },
      children
    } = this.props
    const loading = !messages[lang]

    if (loading) return null

    return (
      <IntlProvider
        key={lang}
        locale={lang}
        messages={messages[lang]}
        textComponent={React.Fragment}
      >
        {children}
      </IntlProvider>
    )
  }
}

// tslint:disable-next-line:variable-name
export const Bootstrap = connect<StateProps>(({ locale }) => ({
  locale
}))(BootstrapComponent)
