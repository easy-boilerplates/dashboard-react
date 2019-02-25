import cn from 'classnames'
import { ThemeContext, ThemeProps } from 'client/scenes/theme'
import React from 'react'
import theme from './theme.css'

export class Sidebar extends React.PureComponent {
  static contextType = ThemeContext
  readonly context!: ThemeProps
  render() {
    const { collapsed } = this.context
    return (
      <aside className={cn(theme.sidebar, collapsed && theme.collapsed)}>
        1
      </aside>
    )
  }
}
