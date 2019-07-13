<template>
  <v-bottom-sheet
    v-model="isVisible"
    :hide-overlay="true"
    :inset="true"
  >
    <v-list>
      <v-subheader>Prof. Chen</v-subheader>
    </v-list>
  </v-bottom-sheet>
</template>

<script>
export default {
  name: 'DialogBox',
  data () {
    return {
      isVisible: false
    }
  },
  created () {
    this.$appBus.$on('dialog:open', () => {
      this.isVisible = !this.isVisible
    })
  }
}
</script>

<style scoped>

</style>
