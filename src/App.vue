<template>
  <div id="app">
    <v-app class="v-app">
      <router-view name="interface"/>
    </v-app>
    <router-view/>
  </div>
</template>

<style>
  body {
    margin: 0;
    padding: 0;
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
