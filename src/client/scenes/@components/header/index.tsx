import { Icon, Switch } from 'antd'
import cn from 'classnames'
import { connect, DispatchProps } from 'client/redux/connect'
import { setAuth } from 'client/redux/modules/system'
import { Theme } from 'client/scenes'
import React from 'react'
import theme from './theme.css'

interface OwnProps {
  collapsed: boolean
  toggleCollapsed: () => void
  theme: Theme
  toggleTheme: () => void
}

type ComponentProps = OwnProps & DispatchProps

class HeaderComponent extends React.PureComponent<ComponentProps> {
  render() {
    const {
      theme: basicTheme,
      collapsed,
      toggleCollapsed,
      toggleTheme
    } = this.props
    return (
      <header className={theme.header}>
        <Icon
          className={theme.btn}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={toggleCollapsed}
        />
        <div className={theme.left}>
          <Switch
            className={theme.switch}
            onClick={toggleTheme}
            checkedChildren={<div className={cn(theme.icon, theme.moon)} />}
            unCheckedChildren={<div className={cn(theme.icon, theme.sun)} />}
            defaultChecked={basicTheme === Theme.Dark}
          />
          <Icon className={theme.btn} type="logout" onClick={this.logout} />
        </div>
      </header>
    )
  }

  private logout = () => this.props.dispatch(setAuth(false))
}

// tslint:disable-next-line: variable-name
export const Header = connect()(HeaderComponent)
