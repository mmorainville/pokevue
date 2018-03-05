<template>
  <div
    class="c-world"
    :style="styleWorld"
  >
    <player :is-walking="isWalking" :direction="player.direction"></player>
    <grid></grid>
  </div>
</template>

<script>
  import Player from '../components/Player'
  import Grid from '../components/Grid'
  import Rx from 'rxjs/Rx'

  let keyDowns = Rx.Observable.fromEvent(window, 'keydown')
  let keyUps = Rx.Observable.fromEvent(window, 'keyup')

  let keyPresses = keyDowns
    .merge(keyUps)
    .groupBy(e => e.keyCode)
    .map(group => group.distinctUntilChanged(null, e => e.type))
    .mergeAll()

  let oldPos

  export default {
    name: 'World',
    components: {
      Grid,
      Player
    },
    mounted () {
      // window.addEventListener('keydown', this.onKeyDown, false)
      // window.addEventListener('keyup', this.onKeyUp, false)
      this.$observables.keyPresses$.subscribe((e) => {
        console.log(e.type + ': ' + e.keyCode)

        if (e.type === 'keydown') {
          this.lastPressedKeys.push(e.keyCode)
          // console.log(this.lastPressedKeys)

          if (!this.isWalking) {
            this.onKeyDown(e.keyCode)
          }
        } else {
          this.lastPressedKeys = this.lastPressedKeys.filter(keyCode => keyCode !== e.keyCode)
          // console.log(this.lastPressedKeys)
        }
      })
    },
    data () {
      return {
        xPos: 360, // 1056 -- 66
        yPos: -534, // 3168 -- 198
        nonWalkableArea: [
          [992, 3072]
        ],
        isWalking: false,
        player: {
          direction: 'down'
        },
        lastPressedKeys: []
      }
    },
    subscriptions () {
      return {
        keyPresses$: keyPresses
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
      move (direction, oldPosition, variable) {
        this.isWalking = true
        this.player.direction = direction

        if (direction === 'up' || direction === 'left') {
          this[variable] += 1
        } else {
          this[variable] -= 1
        }

        if ((this[variable] - oldPosition) % 16 === 0) {
          if (this.lastPressedKeys.length > 0) {
            this.onKeyDown(this.lastPressedKeys[this.lastPressedKeys.length - 1])
          } else {
            this.isWalking = false
          }
        } else {
          requestAnimationFrame(() => this.move(direction, oldPosition, variable))
        }
      },
      onKeyDown (keyCode) {
        switch (keyCode) {
          case 38:
            // UP
            // console.log('onKeyDown: UP')
            oldPos = this.yPos
            this.move('up', oldPos, 'yPos')
            break
          case 40:
            // DOWN
            // this.yPos -= 3
            // console.log('onKeyDown: DOWN')
            oldPos = this.yPos
            this.move('down', oldPos, 'yPos')
            break
          case 37:
            // LEFT
            // if (this.xPos + 3 <= 424) {
            //   this.xPos += 3
            // }
            // console.log('onKeyDown: LEFT')
            oldPos = this.xPos
            this.move('left', oldPos, 'xPos')
            break
          case 39:
            // RIGHT
            // this.xPos -= 3
            // console.log('onKeyDown: RIGHT')
            oldPos = this.xPos
            this.move('right', oldPos, 'xPos')
            break
          default:
            console.log('Unknown command')
            break
        }
      },
      onKeyUp (keyCode) {
        // console.log('onKeyUp', keyCode)
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
