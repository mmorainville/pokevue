import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './plugins/axios'
import vuetify from './plugins/vuetify'
import './shared/app-bus'
import './shared/app-snackbar'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
