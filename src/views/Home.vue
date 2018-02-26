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

  let timerWalk

  export default {
    name: 'Home',
    components: {
      Grid,
      Player,
      HelloWorld
    },
    mounted () {
      window.addEventListener('keydown', this.onKeyDown, false)
      window.addEventListener('keyup', this.onKeyUp, false)
    },
    data () {
      return {
        xPos: 360, // 1056
        yPos: -534, // 3168
        nonWalkableArea: [
          [992, 3072]
        ]
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
        let previousPosition = {
          x: this.xPos,
          y: this.yPos
        }

        // console.log(e)
        switch (e.keyCode) {
          case 38:
            // UP
            this.yPos += 3
            break
          case 40:
            // DOWN
            this.yPos -= 3
            break
          case 37:
            // LEFT
            if (this.xPos + 3 <= 424) {
              this.xPos += 3
            }
            break
          case 39:
            // RIGHT
            this.xPos -= 3
            break
          default:
            console.log('Unknown command')
            break
        }
      },
      onKeyUp (e) {
        // clearInterval(timerWalk);
      }
    }
  }
</script>

<style>
  .c-world {
    height: 100vh;
    background: url('../assets/world/spz3zUx_small.png') 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
