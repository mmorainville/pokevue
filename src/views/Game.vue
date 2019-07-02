<template>
  <div>
    <v-app class="v-app">
      <router-view/>
    </v-app>

    <div id="game" class="game"></div>
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

  /* Vuetify */

  .v-app {
    background-color: transparent !important;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
</style>
