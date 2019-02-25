import cn from 'classnames'
import React from 'react'
import theme from './theme.css'

interface OwnProps {
  collapsed: boolean
}

export class Sidebar extends React.PureComponent<OwnProps> {
  render() {
    const { collapsed } = this.props
    return (
      <aside className={cn(theme.sidebar, collapsed && theme.collapsed)}>
        1
      </aside>
    )
  }
}
