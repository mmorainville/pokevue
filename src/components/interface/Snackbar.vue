<template>
  <v-snackbar
    v-model="isVisible"
    :multi-line="message.includes('<br>')"
    :top="top"
    :right="right"
    :bottom="bottom"
    :left="left"
    :timeout="timeout"
  >

    <span v-html="message"></span>
    <!--<v-btn text color="accent" @click.native="isVisible = false">Fermer</v-btn>-->

  </v-snackbar>
</template>

<script>
export default {
  name: 'Snackbar',
  data () {
    return {
      isVisible: false,
      message: '',
      top: false,
      right: false,
      bottom: false,
      left: false,
      timeout: 1500
    }
  },
  created () {
    this.$appBus.$on('snackbar:open', this.open)
    this.$appBus.$on('snackbar:close', this.close)
  },
  methods: {
    open (params) {
      console.log('Open snackbar', params.message)
      this.isVisible = true
      this.message = params.message

      switch (params.position) {
        case 'is-top':
          this.top = true
          this.left = false
          this.timeout = 1500
          break
        case 'is-top-left':
          this.top = true
          this.left = true
          this.timeout = 1500
          break
        default:
          this.top = false
          this.right = false
          this.bottom = false
          this.left = false
          this.timeout = 0
      }
    },

    close () {
      this.isVisible = false
    }
  }
}
</script>
