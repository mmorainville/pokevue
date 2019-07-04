import Vue from 'vue'
import appBus from './app-bus'

class AppSnackbar {
  open (params) {
    this.message = params.message || 'Une erreur est survenue.'
    this.type = params.type || 'is-danger'
    this.position = params.position || 'is-bottom-right'

    appBus.$emit('snackbar:open', {
      message: this.message,
      type: this.type,
      position: this.position
    })
  }

  close () {
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
