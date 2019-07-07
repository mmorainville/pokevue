import Vue from 'vue'
import appBus from './app-bus'

class AppSnackbar {
  constructor () {
    this.isVisible = false
    this.timeout = null
  }

  open (params) {
    this.message = params.message || 'Une erreur est survenue.'
    this.type = params.type || 'is-danger'
    this.position = params.position || 'is-bottom-right'
    this.isVisible = true

    appBus.$emit('snackbar:open', {
      message: this.message,
      type: this.type,
      position: this.position
    })

    if (this.timeout) {
      clearTimeout(this.timeout)
    } else {
      this.timeout = setTimeout(this.close, 6000) // Default timeout value of the Vuetify Snackbar
    }
  }

  close () {
    this.isVisible = false
    console.log('Close snackbar')
    appBus.$emit('snackbar:close')
  }

  success (message, position) {
    let type = 'is-success'
    this.open({ message, type, position })
  }

  warning (message, position) {
    let type = 'is-warning'
    this.open({ message, type, position })
  }

  danger (message, position) {
    let type = 'is-danger'
    this.open({ message, type, position })
  }
}

const appSnackbar = new AppSnackbar()
export default appSnackbar

Vue.prototype.$appSnackbar = appSnackbar
