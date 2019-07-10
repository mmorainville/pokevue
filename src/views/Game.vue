<template>
  <div>
    <v-app class="v-app">
      <router-view/>
      <div id="game" class="game"></div>
    </v-app>
  </div>
</template>

<script>
import '@/game'

export default {
  name: 'Game'
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
