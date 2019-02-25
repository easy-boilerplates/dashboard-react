import { GetFieldDecoratorOptions } from 'antd/lib/form/Form'
import { T } from 'client/scenes/@components/t'
import React from 'react'

export interface LoginFormProps {
  username: string
  password: string
}

type TLoginForm = { [key in keyof LoginFormProps]: GetFieldDecoratorOptions }

export const loginForm: TLoginForm = {
  username: {
    rules: [
      {
        required: true,
        message: <T id="login.form.field.username!required" />
      }
    ]
  },
  password: {
    rules: [
      {
        required: true,
        message: <T id="login.form.field.password!required" />
      }
    ]
  }
}
