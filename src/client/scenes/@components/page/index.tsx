import React from 'react'
import theme from './theme.css'

export class Page extends React.PureComponent {
  render() {
    return <main className={theme.page}>{this.props.children}</main>
  }
}
