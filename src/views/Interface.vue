<template>
  <div class="interface">
    <v-container fluid grid-list-xl v-if="showInterface">
      <v-layout justify-end flex-child wrap>
        <v-flex md8>
          <router-view class="d-flex"/>
        </v-flex>

        <v-flex shrink>
          <Menu class="menu"/>
        </v-flex>
      </v-layout>
    </v-container>

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
