<template>
  <div
    class="c-world"
    :style="styleWorld"
  >
    <player></player>
  </div>
</template>

<script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue'
  import Player from '../components/Player'

  export default {
    name: 'Home',
    components: {
      Player,
      HelloWorld
    },
    mounted () {
      window.addEventListener('keydown', this.onKeyDown, false)
    },
    data () {
      return {
        xPos: 362,
        yPos: -540
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
            this.yPos += 2
            break
          case 40:
            // DOWN
            this.yPos -= 2
            break
          case 37:
            // LEFT
            this.xPos += 2
            break
          case 39:
            // RIGHT
            this.xPos -= 2
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
  }
</style>
