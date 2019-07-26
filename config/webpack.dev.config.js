const webpack = require('webpack')
const path = require('path')
const env = require('./env')
const webpackBaseConfig = require('./webpack.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')

const devConfig = merge(webpackBaseConfig, {
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    host: 'localhost',
    port: 3000,
    hot: true,
    compress: true,
    noInfo: true,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  devtool: env === 'development' ? 'source-map' : 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(env)
    }),
    // plugin的解析顺序是从前往后的
    new HtmlWebpackPlugin({
      title: 'hello world',
      filename: 'index.html',
      template: './src/index.html',
      inject: true
    })
  ]
})

module.exports = devConfig
