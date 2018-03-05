<template>
  <div class="c-grid__container">
    <div class="c-grid">
      <!--<div class="c-grid__item"></div>
      <div class="c-grid__item"></div>
      <div class="c-grid__item"></div>
      <div class="c-grid__item"></div>
      <div class="c-grid__item"></div>
      <div class="c-grid__item"></div>
      <div class="c-grid__item"></div>
      <div class="c-grid__item"></div>
      <div class="c-grid__item"></div>-->

      <div v-for="" class="c-grid__item"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Grid',
    data () {
      return {
        width: 178,
        height: 330
      }
    }
  }
</script>

<style scoped>
  .c-grid__container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    /*background-color: rgba(255, 0, 0, 0.2);*/
    display: flex;
    /*justify-content: center;
    align-items: center;*/
    overflow: hidden;
  }

  .c-grid {
    /*height: 100vh;*/
    display: grid;
    /*grid-template-columns: 16px 16px;*/
    grid-template-columns: repeat(178, 16px);
    /*grid-template-rows: 16px 16px;*/
    grid-template-rows: repeat(330, 16px);
    /*background-color: rgba(255, 0, 0, 0.5);*/
  }

  .c-grid__item:nth-child(even) {
    background: rgba(0, 255, 0, 0.5);
  }

  .c-grid__item:nth-child(odd) {
    background: rgba(0, 0, 255, 0.5);
  }
</style>