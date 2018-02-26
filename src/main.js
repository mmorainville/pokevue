import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import Rx from 'rxjs/Rx'
import VueRx from 'vue-rx'
import './registerServiceWorker'

Vue.use(VueRx, Rx)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
