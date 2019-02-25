import React from 'react'
import styles from './styles.css'

interface Props {}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch() {
    this.setState({ hasError: true })
  }

  render() {
    return this.state.hasError ? (
      <div className={styles.error}>
        <div className={styles.content}>
          <div className={styles.smile}>:(</div>
          <div className={styles.text}>Something goes wrong</div>
        </div>
      </div>
    ) : (
      this.props.children
    )
  }
}
