const webpack = require('webpack')
// const path = require('path')
// const glob = require('glob')
const env = require('./env')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.config')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const OptimizationCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// const PurgecssPlugin = require('purgecss-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const prodConfig = merge(webpackBaseConfig, {
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0, // 生产块的最小大小
      maxSize: 0,
      name: true,
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2
        }
      }
    },
    minimizer: [
      new TerserPlugin({
        sourceMap: env === 'development',
        terserOptions: {
          cache: true,
          compress: {
            drop_debugger: true,
            drop_console: true
          }
        }
      })
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'hello world',
      filename: 'index.html',
      template: './src/index.html',
      inject: true
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(env)
    }),
    // 压缩css
    new OptimizationCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
    // 去掉没用的css
    // new PurgecssPlugin({
    //   paths: glob.sync(path.join(__dirname, 'src'))
    // }),
    new ProgressBarPlugin({
      callback: function (res) {
        console.log(res)
        console.log('打包完成')
      }
    })
  ]
})

module.exports = prodConfig
