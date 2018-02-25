<template>
  <div
    class="c-world"
    :style="styleWorld"
  >
    <player></player>
    <!--<grid></grid>-->
  </div>
</template>

<script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue'
  import Player from '../components/Player'
  import Grid from '../components/Grid'

  export default {
    name: 'Home',
    components: {
      Grid,
      Player,
      HelloWorld
    },
    mounted () {
      window.addEventListener('keydown', this.onKeyDown, false)
    },
    data () {
      return {
        xPos: 360,
        yPos: -534
      }
    },
    computed: {
      styleWorld () {
        return {
          backgroundPosition: 'calc(50% + ' + this.xPos + 'px) calc(50% + ' + this.yPos + 'px)'
        }
      }
    },
    methods: {
      onKeyDown (e) {
        // console.log(e)
        switch (e.keyCode) {
          case 38:
            // UP
            this.yPos += 1
            break
          case 40:
            // DOWN
            this.yPos -= 1
            break
          case 37:
            // LEFT
            this.xPos += 1
            break
          case 39:
            // RIGHT
            this.xPos -= 1
            break
          default:
            console.log('Unknown command')
            break
        }
      }
    }
  }
</script>

<style>
  .c-world {
    height: 100vh;
    background: url('../assets/world/spz3zUx_small_w_grid.png') 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
