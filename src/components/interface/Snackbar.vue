<template>
  <v-snackbar
    v-model="isVisible"
    :multi-line="message.includes('<br>')"
    :top="top"
    :right="right"
    :bottom="bottom"
    :left="left">

    <span v-html="message"></span>
    <!--<v-btn flat color="accent" @click.native="isVisible = false">Fermer</v-btn>-->

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
      left: false
    }
  },
  created () {
    this.$appBus.$on('snackbar:open', this.open)
    this.$appBus.$on('snackbar:close', this.close)
  },
  methods: {
    open (params) {
      console.log('Open snackbar', params.message)
      // Close any already open snackbar
      if (this.isVisible === true) {
        this.isVisible = false
      }
      this.isVisible = true
      this.message = params.message

      switch (params.position) {
        case 'is-top-left':
          this.top = true
          this.left = true
          break
        default:
          this.top = false
          this.right = false
          this.bottom = false
          this.left = false
      }
    },

    close () {
      this.isVisible = false
    }
  }
}
</script>
