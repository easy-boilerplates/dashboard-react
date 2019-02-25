import { isDev } from './tools'

export const cssUse = [
  {
    loader: 'css-loader',
    options: {
      camelCase: true,
      modules: true,
      importLoaders: 1,
      localIdentName: isDev
        ? '[local]--[hash:base64:5]'
        : '[hash:base64:5]',
      sourceMap: isDev
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: isDev
    }
  }
]