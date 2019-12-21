import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
// import { mockXHR } from '../mock'
// if (process.env.NODE_ENV === 'production') {
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

Vue.filter('priceParse', price => {
  // 可以有很多的自定义过滤器
  return Math.round(Math.abs(price))
})

Vue.filter('toDecimal', price => {
  // 可以有很多的自定义过滤器
  const prices = Math.abs(price)
  var f = parseFloat(prices)
  if (isNaN(f)) {
    return false
  }
  var f = Math.round(prices * 100) / 100
  var s = f.toString()
  // var rs = s.indexOf('.')
  // if (rs < 0) {
  //   rs = s.length
  //   s += '.'
  // }
  // while (s.length <= rs + 2) {
  //   s += '0'
  // }
  return s
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
