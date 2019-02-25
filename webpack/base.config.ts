import * as path from 'path'
import * as webpack from 'webpack'
import { isDev, rootDir } from './tools'

export const baseConfig: webpack.Configuration = {
  output: {
    path: path.join(rootDir, './dist/static'),
    filename: '[name].js',
    publicPath: '/',
    pathinfo: isDev ? false : true
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css'],
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
