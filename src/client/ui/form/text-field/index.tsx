import { Form, Input } from 'antd'
import { GetFieldDecoratorOptions, WrappedFormUtils } from 'antd/lib/form/Form'
import { IconProps } from 'antd/lib/icon'
import { T } from 'client/scenes/@components/t'
import React from 'react'
import theme from './theme.css'

type PrefixCbProps = (props: IconProps) => React.ReactNode

interface Props {
  rid: string
  name: string
  type?: 'password'
  options?: GetFieldDecoratorOptions
  form: WrappedFormUtils
  prefix?: React.ReactNode | PrefixCbProps
}

interface State {
  type: 'text' | 'password'
}

export class TextField extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      type: props.type ? props.type : 'text'
    }
  }

  render() {
    const {
      rid,
      name,
      type,
      form: { getFieldDecorator },
      options
    } = this.props

    return (
      <T id={rid}>
        {placeholder => (
          <Form.Item>
            {getFieldDecorator(name, options)(
              <Input
                className={theme.wrap}
                type={this.state.type}
                prefix={this.renderPrefix()}
                placeholder={placeholder}
                autoComplete={
                  type === 'password' ? 'current-password' : undefined
                }
              />
            )}
          </Form.Item>
        )}
      </T>
    )
  }

  private renderPrefix = () => {
    const { prefix, type } = this.props
    const hasPasswordIcon = type === 'password' && prefix

    if (hasPasswordIcon && this.isDynamicElement(prefix)) {
      const iconType = this.state.type === 'text' ? 'unlock' : 'lock'
      return prefix({ type: iconType, onClick: this.toggleType })
    }

    return prefix
  }

  private isDynamicElement = (
    value: React.ReactNode | PrefixCbProps
  ): value is PrefixCbProps => typeof value === 'function'

  private toggleType = () =>
    this.setState(prevState => ({
      type: prevState.type === 'text' ? 'password' : 'text'
    }))
}
