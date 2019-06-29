<template>
  <div>
    <Menu v-if="showMenu"/>
  </div>
</template>

<script>
import Menu from '@/components/interface/menu'

export default {
  name: 'Interface',
  components: { Menu },
  data () {
    return {
      showMenu: false
    }
  },
  created () {
    this.$appBus.$on('keydown:esc', () => { this.showMenu = !this.showMenu })
  }
}
</script>

<style scoped>

</style>
