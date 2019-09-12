import { createApp } from './app'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp()

    // 设置服务端router的位置
    router.push(context.url)
    // 等到router将可能的一部组件和钩子函数解析完成
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // 匹配不到的路由返回404 reject
      if (!matchedComponents.length) {
        return reject(new Error({ code: 404 }))
      }
      resolve(app)
    }, reject)
  })
}
