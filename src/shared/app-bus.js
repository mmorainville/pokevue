import Vue from 'vue'

const appBus = new Vue()
export default appBus

Vue.prototype.$appBus = appBus
