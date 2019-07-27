const Vue = require('vue')
const fs = require('fs')
const path = require('path')

const { createBundleRenderer } = require('vue-server-renderer')
const template = fs.readFileSync(path.join(__dirname, 'page/index.html'), 'utf-8')
const serverBundle = path.join(__dirname, '../dist/vue-ssr-server-bundle.json')
const clientMainfest = path.join(__dirname, '../dist/vue-ssr-client-manifest.json')

const render = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template,
  clientMainfest
})
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

server.listen(8000, () => {
  console.log('服务启动中。。。。')
})
