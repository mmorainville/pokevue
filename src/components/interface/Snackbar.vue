<template>
  <v-snackbar v-model="isVisible">
    {{message}}
    <v-btn flat color="accent" @click.native="isVisible = false">Close</v-btn>
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
  },
  methods: {
    open (params) {
      console.log('Open snackbar')
      this.isVisible = true
      this.message = params.message
    }
  }
}
</script>
