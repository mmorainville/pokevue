<template>
  <div>
    <div id="game" class="game"></div>
    <Menu />
  </div>
</template>

<script>
import '@/game'
import Menu from '../components/interface/menu'

export default {
  name: 'Game',
  components: {
    Menu
  }
}
</script>

<style>
  .game {
    background-color: black;
    height: 100vh;
    overflow: hidden;
    width: 100vw;
  }
</style>
