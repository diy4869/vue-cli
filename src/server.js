const Vue = require('vue')
const fs = require('fs')
const render = require('vue-server-renderer').createRenderer({
  template: fs.readFileSync('./page/index.html', 'utf-8')
})
const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

const context = {
  title: 'hello world',
  meta: `
    <meta description="基于webpack构建的vue服务端渲染"/>
  `
}
router.get('*', async ctx => {
  console.log(ctx)
  const app = new Vue({
    data: {
      url: ctx.href
    },
    template: `
      <div>访问的url是{{url}}</div>
    `
  })
  render.renderToString(app, context, (err, html) => {
    if (err) {
      ctx.status = 500
      ctx.body = '出错了'
    }
    ctx.body = html
  })
})

app
  .use(router.routes(), router.allowedMethods())
  .listen(8000)
