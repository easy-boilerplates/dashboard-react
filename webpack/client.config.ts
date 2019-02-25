const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
import * as BrowserSyncPlugin from 'browser-sync-webpack-plugin'
import * as CopyWebpackPlugin from 'copy-webpack-plugin'
import * as crypto from 'crypto'
import * as HappyPack from 'happypack'
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin'
import * as OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import * as path from 'path'
import * as Uglify from 'uglifyjs-webpack-plugin'
import * as webpack from 'webpack'
import * as WebpackBar from 'webpackbar'
import { babelLoader, baseConfig } from './base.config'
import { cssUse } from './css'
import { ResourcesPlugin } from './resource-plugin'
import { isDev, isHot, rootDir } from './tools'

const isBsync = isDev && process.env.BSYNC === '1'

const externalConfig: webpack.Configuration & { devServer: any } = {
  ...baseConfig,

  entry: {
    app: ['core-js', './src/client']
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        oneOf: [
          {
            resourceQuery: /^\?raw$/,
            use: [
              isHot ? 'style-loader' : MiniCssExtractPlugin.loader,
              'css-loader'
            ]
          },
          {
            use: [
              isHot ? 'style-loader' : MiniCssExtractPlugin.loader,
              ...cssUse
            ]
          }
        ]
      },
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
      },
      {
        test: /\.(svg)$/,
        use: ['svg-url-loader']
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              emitFile: true,
              limit: 8092,
              name: 'images/[hash].[ext]'
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/client/theme/favicons', to: '' },
      { from: 'src/client/theme/fonts', to: 'fonts' }
    ]),

    new ForkTsCheckerWebpackPlugin({
      tsconfig: path.resolve(__dirname, '../src/tsconfig.json'),
      checkSyntacticErrors: true
    }),

    new webpack.DefinePlugin({
      BUILD_HASH: JSON.stringify(crypto.randomBytes(10).toString('hex'))
    }),

    new ResourcesPlugin({
      from: 'locales/locales.json',
      to: 'locales',
      extension: 'json'
    }),

    ...(isHot
      ? []
      : [
          new MiniCssExtractPlugin({
            filename: '[name].css'
          })
        ]),

    ...(isDev
      ? [new webpack.HotModuleReplacementPlugin(), new WebpackBar()]
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
          }),
          new webpack.optimize.OccurrenceOrderPlugin(false)
        ]),

    ...(isBsync
      ? [
          new BrowserSyncPlugin(
            {
              host: 'localhost',
              port: 5003,
              proxy: 'http://localhost:5004'
            },
            {
              reload: true
            }
          )
        ]
      : [])
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },

    minimize: !isDev,
    minimizer: [
      new Uglify({
        parallel: true,
        uglifyOptions: {
          output: {
            comments: /license|@preserve|@license|@cc_on/gi
          }
        }
      }),
      new OptimizeCSSAssetsPlugin()
    ]
  },

  performance: {
    hints: false
  },

  stats: {
    modules: false,
    children: false
  },

  // CSS file mapping not allowed
  // To allow file mapping for CSS use 'source-map'
  devtool: (isDev && 'cheap-module-eval-source-map') || undefined,

  devServer: {
    hot: true,
    inline: true,
    contentBase: [
      path.join(rootDir, './dist/static'),
      path.join(rootDir, './views')
    ],
    port: 5003,
    historyApiFallback: {
      index: 'debug.html'
    },
    publicPath: '/'
  }
}

// tslint:disable-next-line:no-default-export
export default externalConfig
