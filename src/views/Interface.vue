<template>
  <div>
    <div v-if="showInterface">
      <Menu/>
      <router-view/>
    </div>

    <Snackbar/>
  </div>
</template>

<script>
import Menu from '@/components/interface/menu'
import Snackbar from '@/components/interface/Snackbar'

export default {
  name: 'Interface',
  components: { Menu, Snackbar },
  data () {
    return {
      showInterface: false
    }
  },
  created () {
    this.$appBus.$on('keydown:esc', this.toggleInterface)
  },
  methods: {
    toggleInterface () {
      // this.showInterface = !this.showInterface

      if (this.showInterface) {
        this.showInterface = false
        this.$router.push('/')
      } else {
        this.showInterface = true
      }
    }
  }
}
</script>

<style scoped>

</style>
