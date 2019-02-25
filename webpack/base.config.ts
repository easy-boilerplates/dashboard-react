import * as webpack from 'webpack'
import { isDev, staticPath } from './tools'

export const baseConfig: webpack.Configuration = {
  output: {
    path: staticPath,
    filename: '[name].js',
    publicPath: '/',
    pathinfo: isDev ? false : true
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css', '.html'],
    modules: ['src', 'node_modules']
  }
}

export const babelLoader = {
  loader: 'babel-loader',
  options: {
    presets: ['@babel/preset-env'],
    plugins: isDev ? ['react-hot-loader/babel'] : []
  }
}
