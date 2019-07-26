import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home'
Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'home',
        components: Home
      }
    ]
  })
}
