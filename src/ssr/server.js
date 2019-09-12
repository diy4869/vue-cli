const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const MemoryFs = require('memory-fs')
const { createBundleRenderer } = require('vue-server-renderer')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const template = fs.readFileSync(path.join(__dirname, '../page/index.html'), 'utf-8')

const clientConfig = require('../../config/webpack.client.config')
const serverConfig = require('../../config/webpack.server.config')
const baseConfig = require('../../config/webpack.base.config')
console.log(__dirname)

const compiler = webpack(serverConfig)
// const clientCompiler = webpack(clientConfig)
// const serverCompoler = webpack(serverConfig)
const mfs = new MemoryFs()
console.log(compiler)
compiler.outputFileSystem = mfs
console.log(compiler)
console.log(compiler.outputFileSystem.data)
mfs.readFileSync('http://127.0.0.1/vue-ssr-server-bundle.json', 'utf-8')

function createBundleRender (serverBundle, clientMainfest) {
  createBundleRenderer(serverBundle, {
    runInNewContext: false,
    template,
    clientMainfest
  })
}

const express = require('express')
const server = express()

server.get('*', (req, res) => {
  const context = {
    url: req.url
  }
  render.renderToString(context, (err, html) => {
    if (err) console.log(err)
    res.end(html)
  })
})

server
  .use(
    devMiddleware(compiler, {
      publicPath: clientConfig.output.publicPath
    })
  )
  .use(
    hotMiddleware(compiler, {

    })
  )
  .listen(3000, () => {
    console.log('服务启动中。。。。')
  })
