import { connect } from 'client/redux/connect'
import { Header } from 'client/scenes/@components/header'
import { Page } from 'client/scenes/@components/page'
import { Sidebar } from 'client/scenes/@components/sidebar'
import { LoginScene } from 'client/scenes/login'
import { Theme, ThemeContext } from 'client/scenes/theme'
import React from 'react'

interface StateProps {
  auth?: boolean
}

type ComponentProps = StateProps

interface State {
  theme: Theme
  collapsed: boolean
}

class ScenesComponent extends React.PureComponent<ComponentProps, State> {
  constructor(props: ComponentProps) {
    super(props)
    this.state = {
      collapsed: false,
      theme: Theme.Light
    }
  }

  render() {
    const { auth } = this.props
    return (
      <div className={this.state.theme}>
        {!auth ? <LoginScene /> : this.renderMain()}
      </div>
    )
  }

  private renderMain = () => {
    const { theme, collapsed } = this.state
    return (
      <ThemeContext.Provider
        value={{
          theme,
          collapsed,
          toggleCollapsed: this.toggleCollapsed,
          toggleTheme: this.toggleTheme
        }}
      >
        <Header />
        <Sidebar />
        <Page>1</Page>
      </ThemeContext.Provider>
    )
  }

  private toggleCollapsed = () =>
    this.setState(prevState => ({ collapsed: !prevState.collapsed }))

  private toggleTheme = () =>
    this.setState(prevState => ({
      theme: prevState.theme === Theme.Light ? Theme.Dark : Theme.Light
    }))
}

// tslint:disable-next-line: variable-name
export const Scenes = connect<StateProps>(({ router, system }) => ({
  router,
  auth: system.auth
}))(ScenesComponent)
