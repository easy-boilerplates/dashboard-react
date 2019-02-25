import * as crypto from 'crypto'
import * as HappyPack from 'happypack'
import * as path from 'path'
import * as webpack from 'webpack'
import * as nodeExternals from 'webpack-node-externals'
import { babelLoader, baseConfig } from './base.config'
import { isDev, rootDir } from './tools'

const serverConfig: webpack.Configuration = {
  ...baseConfig,

  target: 'node',

  externals: [nodeExternals({
    whitelist: [
      'intl',
      'react-intl'
    ]
  })],

  node: {
    __dirname: false,
    __filename: false
  },

  entry: {
    server: './src/server'
  },

  output: {
    path: path.join(rootDir, './dist'),
    filename: '[name].js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: !isDev
          ? 'happypack/loader?id=tsx'
          : [
              babelLoader,
              {
                loader: 'ts-loader',
                options: {
                  transpileOnly: true,
                  experimentalWatchApi: true
                }
              }
            ]
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      BUILD_HASH: JSON.stringify(crypto.randomBytes(10).toString('hex'))
    }),

    ...(isDev
      ? []
      : [
        new HappyPack({
          id: 'tsx',
          loaders: [
            babelLoader,
            {
              loader: 'ts-loader',
              options: {
                happyPackMode: true
              }
            }
          ]
        })
      ])
  ]
}

// tslint:disable-next-line:no-default-export
export default serverConfig
