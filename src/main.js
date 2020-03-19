import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api'
import http from './utils/request'
import './assets/css/reset.less'
import './assets/css/util.less'

Vue.prototype.$api = api
Vue.prototype.$http = http
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
