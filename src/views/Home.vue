<template>
  <div
    class="c-world"
    :style="styleWorld"
  >
    <player :is-walking="isWalking" :direction="player.direction"></player>
    <!--<grid></grid>-->
  </div>
</template>

<script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue'
  import Player from '../components/Player'
  import Grid from '../components/Grid'
  import Rx from 'rxjs/Rx'

  const pauser = new Rx.Subject()

  let keyDowns = Rx.Observable.fromEvent(window, 'keydown')
  // keyDowns.connect()

  let keyUps = Rx.Observable.fromEvent(window, 'keyup')

  // let disposableKeyDowns = keyDowns.connect()

  // pauser
  //   .switchMap(paused => paused ? Rx.Observable.never() : keyDowns)
  //   .subscribe(x => console.log(x))

  // pauser
  //   .switchMap(active =>
  //     Rx.Observable.if(() => active, keyDowns, Rx.Observable.empty())
  //   ).subscribe()

  let keyPresses = keyDowns
    .merge(keyUps)
    .groupBy(e => e.keyCode)
    .map(group => group.distinctUntilChanged(null, e => e.type))
    .mergeAll()
    // .publishReplay(1)

  // keyPresses.connect()

  let timerWalk
  let animationRequest
  let oldPos

  export default {
    name: 'Home',
    components: {
      Grid,
      Player,
      HelloWorld
    },
    mounted () {
      // window.addEventListener('keydown', this.onKeyDown, false)
      // window.addEventListener('keyup', this.onKeyUp, false)
      // this.$observables.keyPresses$.subscribe((e) => {
      //   if (e.type === 'keydown') {
      //     this.onKeyDown(e)
      //   } else {
      //     this.onKeyUp(e)
      //   }
      // })
      // this.$observables.pauser$.subscribe((e) => {
      //   console.log('KEYDOWNS', e)
      //   // this.onKeyDown(e)
      // })

      // pauser
      //   .switchMap(paused => paused ? Rx.Observable.never() : keyDowns)
      //   .subscribe(e => {
      //     this.onKeyUp(e)
      //     console.log(e)
      //   })

      this.$observables.pauser$.switchMap(paused => paused ? Rx.Observable.never() : keyPresses)
        .subscribe(e => {
          console.log(e)
          if (e.type === 'keydown') {
            this.pressedKeys[e.keyCode] = true
            this.onKeyDown(e)
          } else {
            this.pressedKeys[e.keyCode] = false
            this.onKeyUp(e)
          }
        })

      pauser.next(false)

      // pauser.next(true)
      // setTimeout(() => {
      //   pauser.next(false)
      //
      //   setTimeout(() => {
      //     pauser.next(true)
      //   }, 5000)
      // }, 2000)

      // setTimeout(() => {
      //   pauser.next(false)
      // }, 5000)

      // this.$observables.keyUps$.subscribe((e) => {
      //   this.onKeyUp(e)
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
        isWalking: false,
        player: {
          direction: 'down'
        }
      }
    },
    subscriptions () {
      return {
        // keyPresses$: keyPresses,
        keyDowns$: keyDowns,
        keyUps$: keyUps,
        pauser$: pauser
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
      move (direction, oldPosition, variable, e) {
        this.isWalking = true
        this.player.direction = direction

        if (direction === 'up' || direction === 'left') {
          this[variable] += 1
        } else {
          this[variable] -= 1
        }

        if ((this[variable] - oldPos) % 16 === 0) {
          this.isWalking = false
          cancelAnimationFrame(animationRequest)
          pauser.next(false)
        } else {
          animationRequest = requestAnimationFrame(() => this.move(direction, oldPosition, variable, e))
        }
      },
      onKeyDown (e) {
        console.log('onKeyDown')
        pauser.next(true)

        // console.log(e)
        switch (e.keyCode) {
          case 38:
            // UP
            console.log('onKeyDown: UP')
            oldPos = this.yPos
            animationRequest = requestAnimationFrame(() => {
              this.move('up', oldPos, 'yPos', e)
            })
            break
          case 40:
            // DOWN
            // this.yPos -= 3
            console.log('onKeyDown: DOWN')
            oldPos = this.yPos
            animationRequest = requestAnimationFrame(() => {
              this.move('down', oldPos, 'yPos', e)
            })
            break
          case 37:
            // LEFT
            // if (this.xPos + 3 <= 424) {
            //   this.xPos += 3
            // }
            console.log('onKeyDown: LEFT')
            oldPos = this.xPos
            animationRequest = requestAnimationFrame(() => {
              this.move('left', oldPos, 'xPos', e)
            })
            break
          case 39:
            // RIGHT
            // this.xPos -= 3
            console.log('onKeyDown: RIGHT')
            oldPos = this.xPos
            animationRequest = requestAnimationFrame(() => {
              this.move('right', oldPos, 'xPos', e)
            })
            break
          default:
            console.log('Unknown command')
            break
        }
      },
      onKeyUp (e) {
        console.log('onKeyUp')
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
