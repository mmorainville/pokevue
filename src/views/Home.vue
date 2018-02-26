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
  import Rx from 'rxjs/Rx'

  let keyDowns = Rx.Observable.fromEvent(window, 'keydown')
  let keyUps = Rx.Observable.fromEvent(window, 'keyup')

  let keyPresses = keyDowns
    .merge(keyUps)
    .groupBy(e => e.keyCode)
    .map(group => group.distinctUntilChanged(null, e => e.type))
    .mergeAll()

  let timerWalk
  let oldXPos
  let oldYPos

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
      // this.$observables.keyPresses$.subscribe((e) => {
      //   if (e.type === 'keydown') {
      //     this.onKeyDown(e)
      //   } else {
      //     this.onKeyUp(e)
      //   }
      // })
    },
    data () {
      return {
        xPos: 360, // 1056 -- 66
        yPos: -534, // 3168 -- 198
        nonWalkableArea: [
          [992, 3072]
        ],
        pressedKeys: {
          38: false,
          40: false,
          37: false,
          39: false
        },
        isWalking: false
      }
    },
    subscriptions() {
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
      onKeyDown (e) {
        let previousPosition = {
          x: this.xPos,
          y: this.yPos
        }

        if (Object.keys(this.pressedKeys).includes('' + e.keyCode)) {
          this.pressedKeys[e.keyCode] = true
        }

        // console.log(e)
        switch (e.keyCode) {
          case 38:
            // UP
            // this.yPos += 3
            if (!this.isWalking) {
              oldYPos = this.yPos
              timerWalk = setInterval(() => {
                this.isWalking = true
                this.yPos += 1
                if (!this.pressedKeys[e.keyCode] && (this.yPos - oldYPos) % 16 === 0) {
                  clearInterval(timerWalk)
                  this.isWalking = false
                }
              }, 24)
            }
            break
          case 40:
            // DOWN
            // this.yPos -= 3
            if (!this.isWalking) {
              oldYPos = this.yPos
              timerWalk = setInterval(() => {
                this.isWalking = true
                this.yPos -= 1
                if (!this.pressedKeys[e.keyCode] && (this.yPos - oldYPos) % 16 === 0) {
                  clearInterval(timerWalk)
                  this.isWalking = false
                }
              }, 24)
            }
            break
          case 37:
            // LEFT
            // if (this.xPos + 3 <= 424) {
            //   this.xPos += 3
            // }
            if (!this.isWalking) {
              oldXPos = this.xPos
              timerWalk = setInterval(() => {
                this.isWalking = true
                this.xPos += 1
                if (!this.pressedKeys[e.keyCode] && (this.xPos - oldXPos) % 16 === 0) {
                  clearInterval(timerWalk)
                  this.isWalking = false
                }
              }, 24)
            }
            break
          case 39:
            // RIGHT
            // this.xPos -= 3
            if (!this.isWalking) {
              oldXPos = this.xPos
              timerWalk = setInterval(() => {
                this.isWalking = true
                this.xPos -= 1
                if (!this.pressedKeys[e.keyCode] && (this.xPos - oldXPos) % 16 === 0) {
                  clearInterval(timerWalk)
                  this.isWalking = false
                }
              }, 24)
            }
            break
          default:
            console.log('Unknown command')
            break
        }
      },
      onKeyUp (e) {
        console.log('onKeyUp')

        if (Object.keys(this.pressedKeys).includes('' + e.keyCode)) {
          this.pressedKeys[e.keyCode] = false
        }

        // clearInterval(timerWalk)
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
