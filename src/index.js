import Vue from 'vue'
import app from './app.vue'
import './index.css'
import './index.scss'
import { a } from './tree-shaking'
a()
Vue.config.productionTip = false

new Vue({
  render: h => h(app)
}).$mount('#app')

console.log(1)
