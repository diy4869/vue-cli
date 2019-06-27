const webpack = require('webpack')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // loader的解析顺序是从后往前的，所以mini要放前面
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(sass|scss)/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              fallback: 'responsive-loader',
              limit: 4096,
              quality: 50,
              name: '[name]-[hash:5]-[width].[ext]',
              outputPath: 'assets'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
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
  plugins: [
    // plugin的解析顺序是从前往后的
    new htmlWebpackPlugin({
      title: 'hello world',
      filename: 'index.html',
      template: './src/index.html',
      inject: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new UglifyJsPlugin({
      uglifyOptions: {
        drop_console: false
      }
    })
  ]
}