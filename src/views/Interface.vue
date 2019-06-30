<template>
  <div>
    <Menu v-if="showMenu"/>
    <Pokedex v-if="showMenu"/>
    <Snackbar/>
  </div>
</template>

<script>
import Menu from '@/components/interface/menu'
import Pokedex from '@/components/interface/menu/pokedex'
import Snackbar from '@/components/interface/Snackbar'

export default {
  name: 'Interface',
  components: { Menu, Pokedex, Snackbar },
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
