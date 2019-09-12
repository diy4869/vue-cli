const merge = require('webpack-merge')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const webpackBaseConfig = require('./webpack.base.config')

module.exports = merge(webpackBaseConfig, {
  entry: './src/ssr/client.js',
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'manifest',
          minChunks: Infinity
        }
      }
    }
  },
  plugins: [
    new VueSSRClientPlugin()
  ]
})
