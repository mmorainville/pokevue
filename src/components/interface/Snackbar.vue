<template>
  <v-snackbar v-model="isVisible" :multi-line="message.includes('<br>')">
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
      message: ''
    }
  },
  created () {
    this.$appBus.$on('snackbar:open', this.open)
    this.$appBus.$on('snackbar:close', this.close)
  },
  methods: {
    open (params) {
      console.log('Open snackbar')
      this.isVisible = true
      this.message = params.message
    },

    close () {
      this.isVisible = false
    }
  }
}
</script>
