import { Button, Form, Icon } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { connect, DispatchProps } from 'client/redux/connect'
import { setAuth } from 'client/redux/modules/system'
import { T } from 'client/scenes/@components/t'
import { loginForm, LoginFormProps } from 'client/scenes/login/form'
import { TextField } from 'client/ui/form/text-field'
import React from 'react'
import theme from './theme.css'

const { username, password } = loginForm

interface OwnProps {}

type ComponetProps = OwnProps & FormComponentProps & DispatchProps

class LoginSceneComponent extends React.PureComponent<ComponetProps> {
  render() {
    const { form } = this.props
    return (
      <div className={theme.wrap}>
        <Form className={theme.form} onSubmit={this.handleSubmit}>
          <h1 className={theme.title}>
            <T id="login.form.title" />
          </h1>
          <TextField
            rid="login.form.field.username"
            name="username"
            options={username}
            prefix={<Icon type="user" className={theme.icon} />}
            form={form}
          />
          <TextField
            rid="login.form.field.password"
            name="password"
            type="password"
            options={password}
            prefix={props => <Icon className={theme.icon} {...props} />}
            form={form}
          />
          <Form.Item className={theme.btn}>
            <Button block type="primary" htmlType="submit">
              <T id="login.form.btn.submit" />
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }

  private handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const { form, dispatch } = this.props
    form.validateFields((err, values: LoginFormProps) => {
      if (!err) {
        if (values.username === 'demo' && values.password === 'demo')
          dispatch(setAuth(true))
      }
    })
  }
}

// tslint:disable-next-line: variable-name
export const LoginScene = connect()(
  Form.create({ name: 'login' })(LoginSceneComponent)
)
