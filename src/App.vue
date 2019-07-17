<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
  /**
   * Fixes the scrollbar in Chrome.
   */
  html {
    overflow-y: auto !important;
  }

  body {
    margin: 0;
    padding: 0;
  }
</style>
