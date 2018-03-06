import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import fastclick from 'fastclick'
import router from './router/index'
import vueResource from 'vue-resource'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueLazyload from 'vue-lazyload'
Vue.use(VueAwesomeSwiper)
Vue.use(vueResource)
Vue.use(VueLazyload,{
  loading:require('common/image/default.png')
})


import './common/stylus/index.styl'

fastclick.attach(document.body)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  vueResource,
  render: h => h(App)
})
