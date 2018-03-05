<template>
  <div
    class="c-player__sprites"
    :class="classPlayer"
  ></div>
</template>

<script>
  export default {
    name: 'Player',
    props: {
      isWalking: Boolean,
      direction: String
    },
    mounted () {
      // window.addEventListener('keydown', this.onKeyDown, false)
      // window.addEventListener('keyup', this.onKeyUp, false)
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
      classPlayer () {
        return {
          'c-player__sprites--face-up': this.direction === 'up',
          'c-player__sprites--face-down': this.direction === 'down',
          'c-player__sprites--face-left': this.direction === 'left',
          'c-player__sprites--face-right': this.direction === 'right',
          'c-player__sprites--walk-up': this.direction === 'up' && this.isWalking,
          'c-player__sprites--walk-down': this.direction === 'down' && this.isWalking,
          'c-player__sprites--walk-left': this.direction === 'left' && this.isWalking,
          'c-player__sprites--walk-right': this.direction === 'right' && this.isWalking,
        }
      }
    },
    methods: {
      onKeyDown (e) {
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
  }

  .c-player__sprites {
    width: 16px;
    height: 20px;
    background: url('../assets/52432_003.png') -16px 0;
    z-index: 2;
  }

  .c-player__sprites--face-up {
    background-position: -16px -32px;
    transform: scaleX(1)
  }

  .c-player__sprites--face-down {
    background-position: -16px 0;
    transform: scaleX(1)
  }

  .c-player__sprites--face-left {
    background-position: -16px -64px;
    transform: scaleX(1)
  }

  .c-player__sprites--face-right {
    background-position: -16px -64px;
    transform: scaleX(-1)
  }

  .c-player__sprites--walk-up {
    animation: walk-up 0.768s steps(1) infinite;
  }

  .c-player__sprites--walk-down {
    animation: walk-down 0.576s steps(1) infinite;
  }

  .c-player__sprites--walk-left {
    animation: walk-left 0.768s steps(1) infinite;
  }

  .c-player__sprites--walk-right {
    animation: walk-right 0.768s steps(1) infinite;
  }

  @keyframes walk-up {
    0% { background-position: -32px -32px; }
    25% { background-position: -16px -32px; }
    50% { background-position: 0 -32px; }
    75% { background-position: -16px -32px; }
  }

  @keyframes walk-down {
    0% { background-position: -32px 0; }
    25% { background-position: -16px 0; }
    50% { background-position: 0 0; }
    75% { background-position: -16px 0; }
  }

  @keyframes walk-left {
    0% { background-position: -32px -64px; }
    25% { background-position: -16px -64px; }
    50% { background-position: 0 -64px; }
    75% { background-position: -16px -64px; }
  }

  @keyframes walk-right {
    0% { background-position: -32px -64px; }
    25% { background-position: -16px -64px; }
    50% { background-position: 0 -64px; }
    75% { background-position: -16px -64px; }
  }
</style>