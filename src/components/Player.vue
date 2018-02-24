<template>
  <div class="c-player">
    <!--<img src="../assets/52432_002.png">-->
    <div
      class="c-player__sprites"
      :style="stylePlayer"
    ></div>
  </div>
</template>

<script>
  export default {
    name: 'Player',
    mounted () {
      window.addEventListener('keydown', this.onKeyDown, false)
    },
    data () {
      return {
        xPos: -16,
        yPos: 0,
        scaleX: 1,
        image: require('../assets/52432_002.png')
      }
    },
    computed: {
      stylePlayer () {
        return {
          backgroundPosition: this.xPos + 'px ' + this.yPos + 'px',
          transform: 'scaleX(' + this.scaleX + ')'
        }
      }
    },
    methods: {
      onKeyDown (e) {
        // console.log(e)
        switch (e.keyCode) {
          case 38:
            this.xPos = -16
            this.yPos = -32
            this.scaleX = 1
            break
          case 40:
            this.xPos = -16
            this.yPos = 0
            this.scaleX = 1
            break
          case 37:
            this.xPos = -16
            this.yPos = -63
            this.scaleX = 1
            break
          case 39:
            this.xPos = -16
            this.yPos = -63
            this.scaleX = -1
            break
          default:
            console.log('Unknown command')
            break
        }
      }
    }
  }
</script>

<style scoped>
  .c-player {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .c-player__sprites {
    width: 16px;
    height: 20px;
    background: url('../assets/52432_003.png') -16px 0;
  }
</style>