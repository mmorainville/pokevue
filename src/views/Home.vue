<template>
  <div
    class="c-world"
    :style="styleWorld"
    @keydown.up="move('UP')"
    @keydown.down="move('DOWN')"
    @keydown.left="move('LEFT')"
    @keydown.right="move('RIGHT')"
    tabindex="1"
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
    created: () => {
      // window.addEventListener('keypress', this.move)
    },
    data () {
      return {
        xPos: 0,
        yPos: 0
      }
    },
    computed: {
      styleWorld () {
        return {
          backgroundPosition: this.xPos + 'px ' + this.yPos + 'px'
        }
      }
    },
    methods: {
      move (direction) {
        console.log('move ' + direction)
        switch (direction) {
          case 'UP':
            this.yPos += 2
            break
          case 'DOWN':
            this.yPos -= 2
            break
          case 'LEFT':
            this.xPos += 2
            break
          case 'RIGHT':
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
    background: url('../assets/world/spz3zUx.png') left center;
    background-color: green;
  }
</style>
