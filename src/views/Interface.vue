<template>
  <div class="interface">
    <div v-if="showInterface">
      <Menu class="menu"/>
      <router-view/>
    </div>

    <DialogBox/>
    <Snackbar/>
  </div>
</template>

<script>
import Menu from '@/components/interface/menu'
import Snackbar from '@/components/interface/Snackbar'
import DialogBox from '@/components/interface/DialogBox'

export default {
  name: 'Interface',
  components: { Menu, DialogBox, Snackbar },
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

<style>
  .interface {
    background-color: transparent !important;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
</style>
