import { Bootstrap } from 'client/bootstrap'
import { history, store } from 'client/redux'
import { Scenes } from 'client/scenes'
import { ErrorBoundary } from 'client/scenes/error'
import { ConnectedRouter } from 'connected-react-router'
import React from 'react'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'

class AppComponent extends React.PureComponent {
  public render() {
    return (
      <ErrorBoundary>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Bootstrap>
              <Scenes />
            </Bootstrap>
          </ConnectedRouter>
        </Provider>
      </ErrorBoundary>
    )
  }
}

// tslint:disable-next-line:variable-name
export const App =
  process.env.NODE_ENV !== 'production'
    ? hot(module)(AppComponent)
    : AppComponent
