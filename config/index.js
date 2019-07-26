const webpack = require('webpack')
const path = require('path')
const glob = require('glob')
const env = require('./env')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const TerserPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const OptimizationCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')

module.exports = {
  mode: env,
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[chunkhash].js'
  },
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
  module: {
    /**
     * webpack loader 加载顺序
     * mini/style,css,postcss,sass/less/stylus
     */
    rules: [
      {
        test: /\.css$/,
        // loader的解析顺序是从后往前的，所以mini要放前面
        use: [{
          loader: MiniCssExtractPlugin.loader
        }, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(sass|scss)/,
        use: [{
          loader: MiniCssExtractPlugin.loader
        }, 'css-loader', 'postcss-loader', 'sass-loader']
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
              name: '[name].[hash:8].[ext]',
              outputPath: 'assets'
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        enforce: 'pre',
        test: /\.(js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '~': path.resolve(__dirname, 'src/assets')
    },
    // false可以不带扩展
    enforceExtension: false,
    // 自动解析确定的扩展
    extensions: ['.js', '.json', '.vue']
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
  devtool: env === 'development' ? 'source-map' : 'eval-source-map',
  plugins: [
    new ProgressBarPlugin({
      callback: function (res) {
        console.log(res)
        console.log('打包完成')
      }
    }),
    // 模块分析插件
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerHost: '127.0.0.1',
      analyzerPort: 8889,
      reportFilename: 'report.html',
      defaultSizes: 'parsed',
      openAnalyzer: true,
      generateStatsFile: false,
      statsFilename: 'stats.json',
      statsOptions: null,
      logLevel: 'info'
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(env)
    }),
    new VueLoaderPlugin(),
    // plugin的解析顺序是从前往后的
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'hello world',
      filename: 'index.html',
      template: './src/index.html',
      inject: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contentHash:8].css',
      chunkFilename: 'css/[id].css'
    }),
    // 压缩css
    new OptimizationCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
    // 去掉没用的css
    new PurgecssPlugin({
      paths: glob.sync(path.join(__dirname, 'src'))
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
