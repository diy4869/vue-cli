const path = require('path')
const env = require('./env')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: env,
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/'
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
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          formatter: require('eslint-friendly-formatter')
        }
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
    extensions: ['.js', '.vue']
  },
  devtool: env === 'development' ? 'source-map' : 'none',
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contentHash:8].css',
      chunkFilename: 'css/[id].css'
    })
  ]
}
