<template>
  <div class="c-player">
    <!--<img src="../assets/52432_002.png">-->
    <div
      class="c-player__sprites"
      :style="stylePlayer"
      :class="classPlayer"
    ></div>
  </div>
</template>

<script>
  export default {
    name: 'Player',
    mounted () {
      window.addEventListener('keydown', this.onKeyDown, false)
      window.addEventListener('keyup', this.onKeyUp, false)
    },
    data () {
      return {
        xPos: -16,
        yPos: 0,
        scaleX: 1,
        animation: '',
        image: require('../assets/52432_002.png')
      }
    },
    computed: {
      stylePlayer () {
        return {
          backgroundPosition: this.xPos + 'px ' + this.yPos + 'px',
          transform: 'scaleX(' + this.scaleX + ')'
        }
      },
      classPlayer () {
        return {
          'c-player__sprites--walk-up': this.animation === 'walk-up',
          'c-player__sprites--walk-down': this.animation === 'walk-down',
          'c-player__sprites--walk-left': this.animation === 'walk-left',
          'c-player__sprites--walk-right': this.animation === 'walk-right'
        }
      }
    },
    methods: {
      onKeyDown (e) {
        // console.log(e)
        switch (e.keyCode) {
          // UP
          case 38:
            this.xPos = -16
            this.yPos = -32
            this.scaleX = 1
            this.animation = 'walk-up'
            break
          // DOWN
          case 40:
            this.xPos = -16
            this.yPos = 0
            this.scaleX = 1
            this.animation = 'walk-down'
            break
          // LEFT
          case 37:
            this.xPos = -16
            this.yPos = -64
            this.scaleX = 1
            this.animation = 'walk-left'
            break
          // RIGHT
          case 39:
            this.xPos = -16
            this.yPos = -64
            this.scaleX = -1
            this.animation = 'walk-right'
            break
          default:
            console.log('Unknown command')
            break
        }
      },
      onKeyUp (e) {
        this.animation = ''
      }
    }
  }
</script>

<style scoped>
  .c-player {
    /*height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;*/
    z-index: 2;
  }

  .c-player__sprites {
    width: 16px;
    height: 20px;
    background: url('../assets/52432_003.png') -16px 0;
  }

  .c-player__sprites--walk-up {
    animation: walk-up 1s steps(1) infinite;
  }

  .c-player__sprites--walk-down {
    animation: walk-down 1s steps(1) infinite;
  }

  .c-player__sprites--walk-left {
    animation: walk-left 1s steps(1) infinite;
  }

  .c-player__sprites--walk-right {
    animation: walk-right 1s steps(1) infinite;
  }

  @keyframes walk-up {
    0% { background-position: -16px -32px; }
    25% { background-position: 0 -32px; }
    50% { background-position: -16px -32px; }
    75% { background-position: -32px -32px; }
  }

  @keyframes walk-down {
    0% { background-position: -16px 0; }
    25% { background-position: 0 0; }
    50% { background-position: -16px 0; }
    75% { background-position: -32px 0; }
  }

  @keyframes walk-left {
    0% { background-position: -16px -64px; }
    25% { background-position: 0 -64px; }
    50% { background-position: -16px -64px; }
    75% { background-position: -32px -64px; }
  }

  @keyframes walk-right {
    0% { background-position: -16px -64px; }
    25% { background-position: 0 -64px; }
    50% { background-position: -16px -64px; }
    75% { background-position: -32px -64px; }
  }
</style>