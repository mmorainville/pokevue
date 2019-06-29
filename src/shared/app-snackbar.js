// import { Snackbar } from 'buefy/dist/components/snackbar'
import Vue from 'vue'

class AppSnackbar {
  open (params) {
    this.message = params.message || Vue.$i18n.t('messageError')
    this.type = params.type || 'is-danger'
    this.position = params.position || 'is-bottom-right'

    // Snackbar.open({
    //   message: this.message,
    //   type: this.type,
    //   position: this.position,
    //   queue: false
    // })
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

Vue.prototype.$appSnackbar = new AppSnackbar()
