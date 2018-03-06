<template>
  <div
    class="c-world"
    :style="styleWorld"
  >
    <player :is-walking="isWalking || hitObstacle" :direction="player.direction"></player>
    <grid></grid>
    <!--<overlay-actions></overlay-actions>-->
  </div>
</template>

<script>
  import Player from '../components/Player'
  import Grid from '../components/Grid'
  import OverlayActions from '../components/OverlayActions'
  import Rx from 'rxjs/Rx'
  import { mapState } from 'vuex'

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
      OverlayActions,
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

          if (this.lastPressedKeys.length === 0 && this.hitObstacle) {
            this.hitObstacle = false
          }
        }
      })
    },
    data () {
      return {
        xPos: 360, // 1056 -- 66
        yPos: -534, // 3168 -- 198
        // 376 // 1040 -- 65
        // -518 // 3152 -- 197
        isWalking: false,
        hitObstacle: false,
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
      },
      currentCase () {
        let x = (1416 - this.xPos) / 16
        let y = (2634 - this.yPos) / 16

        return {
          x,
          y
        }
      },
      nextCase () {
        let x = this.currentCase.x
        let y = this.currentCase.y

        switch (this.player.direction) {
          case 'up':
            y -= 1
            break
          case 'down':
            y += 1
            break
          case 'left':
            x -= 1
            break
          case 'right':
            x += 1
            break
        }

        return {
          x,
          y
        }
      },
      ...mapState({
        grid: state => state.world.grid,
      })
    },
    methods: {
      canMove () {
        if (
          this.grid[this.nextCase.y] &&
          this.grid[this.nextCase.y][this.nextCase.x] &&
          this.grid[this.nextCase.y][this.nextCase.x].type &&
          this.grid[this.nextCase.y][this.nextCase.x].type === 'obstacle'
        ) {
          return false
        } else {
          return true
        }
      },
      move (direction, oldPosition, variable) {
        if (this.canMove()) {
          this.hitObstacle = false

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
        } else {
          this.isWalking = false
          this.hitObstacle = true
        }
      },
      onKeyDown (keyCode) {
        console.log(this.currentCase)

        this.isWalking = true

        switch (keyCode) {
          case 38:
            // UP
            // console.log('onKeyDown: UP')
            oldPos = this.yPos
            this.player.direction = 'up'
            console.log(this.nextCase)
            this.move('up', oldPos, 'yPos')
            break
          case 40:
            // DOWN
            // this.yPos -= 3
            // console.log('onKeyDown: DOWN')
            oldPos = this.yPos
            this.player.direction = 'down'
            console.log(this.nextCase)
            this.move('down', oldPos, 'yPos')
            break
          case 37:
            // LEFT
            // if (this.xPos + 3 <= 424) {
            //   this.xPos += 3
            // }
            // console.log('onKeyDown: LEFT')
            oldPos = this.xPos
            this.player.direction = 'left'
            console.log(this.nextCase)
            this.move('left', oldPos, 'xPos')
            break
          case 39:
            // RIGHT
            // this.xPos -= 3
            // console.log('onKeyDown: RIGHT')
            oldPos = this.xPos
            this.player.direction = 'right'
            console.log(this.nextCase)
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
